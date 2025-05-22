"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {isUsingMockData} from "./index";

export interface LogMessage {
    id: string
    timestamp: string
    resource: any
    resource_id: any
    level: "info" | "warning" | "error" | "debug"
    message: string
    process?: string
    pid?: number
}

export interface AttackEvent {
    id: string
    timestamp: string
    resourceId: string
    resourceName: string
    attackType: "format-string" | "off-by-one" | "heap-overflow" | "stack-overflow"
    status: "detected" | "in-progress" | "mitigated"
    details: string
}

const WS_URL =  "ws://localhost:8000/ws"

export function useWebSocket() {
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [connectionError, setConnectionError] = useState<string | null>(null)
    const [logs, setLogs] = useState<LogMessage[]>([])
    const [attacks, setAttacks] = useState<AttackEvent[]>([])
    const socketRef = useRef<WebSocket | null>(null)
    //@ts-ignore
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const reconnectAttemptsRef = useRef(0)
    const maxReconnectAttempts = 5
    const baseReconnectDelay = 1000
    const mockDataCleanupRef = useRef<(() => void) | null>(null)
    const usingMockData = isUsingMockData()

    const setupMockData = useCallback(() => {

        const attackInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                const attackTypes = ["format-string", "off-by-one", "heap-overflow", "stack-overflow"]
                const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)]
                const newAttack: AttackEvent = {
                    id: Math.random().toString(36).substring(2, 9),
                    timestamp: new Date().toISOString(),
                    resourceId: "1",
                    resourceName: "Mock Resource",
                    attackType: attackType as any,
                    status: "detected",
                    details: getAttackDetails(attackType),
                }
                setAttacks((prev) => [...prev, newAttack])
            }
        }, 15000)

        return () => {
            clearInterval(attackInterval)
        }
    }, [])

    const attemptReconnect = useCallback(() => {
        if (usingMockData) return
        if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
            setConnectionError("Maximum reconnection attempts reached. Using mock data.")
            mockDataCleanupRef.current = setupMockData()
            return
        }

        const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current)
        console.log(`Reconnecting in ${delay}ms...`)
        reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++
            connect()
        }, delay)
    }, [setupMockData, usingMockData])

    const connect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }
        if (isConnecting) return

        setIsConnecting(true)
        setConnectionError(null)

        if (usingMockData) {
            setIsConnected(true)
            setIsConnecting(false)
            if (mockDataCleanupRef.current) mockDataCleanupRef.current()
            mockDataCleanupRef.current = setupMockData()
            return
        }

        try {
            const socket = new WebSocket(WS_URL)

            socket.onopen = () => {
                console.log("WebSocket connected")
                setIsConnected(true)
                setIsConnecting(false)
                reconnectAttemptsRef.current = 0
            }

            socket.onmessage = (event) => {
                
                try {
                    const data = JSON.parse(event.data)
                    if (data.type === "log") {
                        setLogs((prev) => [...prev.slice(-99), data.payload])
                    } else if (data.type === "attack") {
                        setAttacks((prev) => [...prev, data.payload])
                    }
                } catch (err) {
                    console.error("Failed to parse WebSocket message:", err)
                }
            }

            socket.onclose = (event) => {
                console.log("WebSocket disconnected:", event.code, event.reason)
                setIsConnected(false)
                setIsConnecting(false)
                if (!usingMockData) {
                    attemptReconnect()
                }
            }

            socket.onerror = (err) => {
                console.error("WebSocket error:", err)
                setConnectionError("Connection failed. Switching to mock data.")
                setIsConnected(false)
                setIsConnecting(false)
                mockDataCleanupRef.current = setupMockData()
            }

            socketRef.current = socket
        } catch (err) {
            console.error("WebSocket init error:", err)
            setConnectionError("WebSocket init failed. Switching to mock data.")
            setIsConnected(false)
            setIsConnecting(false)
            mockDataCleanupRef.current = setupMockData()
        }
    }, [isConnecting, setupMockData, attemptReconnect, usingMockData])

    const disconnect = useCallback(() => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close(1000, "Manual disconnect")
        }

        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }

        if (mockDataCleanupRef.current) {
            mockDataCleanupRef.current()
            mockDataCleanupRef.current = null
        }

        setIsConnected(false)
    }, [])

    const sendMessage = (message: any) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message))
        } else if (usingMockData || !isConnected) {
            console.log("Mock send message:", message)

            if (message.type === "simulate-attack") {
                const newAttack: AttackEvent = {
                    id: Math.random().toString(36).substring(2, 9),
                    timestamp: new Date().toISOString(),
                    resourceId: message.resourceId,
                    resourceName: message.resourceName,
                    attackType: message.attackType,
                    status: "in-progress",
                    details: getAttackDetails(message.attackType),
                }
                setAttacks((prev) => [...prev, newAttack])
            }

            if (message.type === "deploy-countermeasure") {
                setAttacks((prev) =>
                    prev.map((a) =>
                        a.id === message.attackId ? { ...a, status: "mitigated" } : a
                    )
                )
            }
        } else {
            setConnectionError("WebSocket not connected.")
            connect()
        }
    }

    useEffect(() => {
        connect()
        return () => {
            disconnect()
        }
    }, [connect, disconnect])

    useEffect(() => {
        if (!isConnected && !isConnecting) {
            connect()
        }
    }, [usingMockData, connect, isConnected, isConnecting])

    return {
        isConnected,
        isConnecting,
        connectionError,
        logs,
        attacks,
        sendMessage,
        connect,
        disconnect,
        socket: socketRef.current,
        usingMockData,
    }
}


function getAttackDetails(attackType: string): string {
    switch (attackType) {
        case "format-string":
            return "Format string vulnerability exploited in printf-like function allowing arbitrary memory reads and writes"
        case "off-by-one":
            return "Off-by-one error in boundary checking allowing buffer to be overwritten by one byte"
        case "heap-overflow":
            return "Heap buffer overflow detected in dynamic memory allocation, potentially corrupting heap metadata"
        case "stack-overflow":
            return "Stack buffer overflow detected, potentially overwriting return address and function pointers"
        default:
            return "Unknown attack vector detected"
    }
}
