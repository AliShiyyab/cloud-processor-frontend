import { Grid } from "@mui/material"
import * as React from 'react';
import {CloudResourcesTable} from "./dashboard/table";
import {AttackOptions, EnhancedAttackSimulator} from "./dashboard/attack_simulator";
import {useEffect, useState} from "react";
import {attackApi, CloudResource, resourceApi } from "../api";
import { Vulnerability } from "./dashboard/vulnerability-scanner";
import {toast} from "react-toastify";
import {useWebSocket} from "../api/web_socket";
import {LogMonitor} from "./dashboard/logMonitor";
import {CountermeasureSystem} from "./dashboard/counter";
export const Dashboard = () => {
    const [resources, setResources] = useState<CloudResource[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [resourcesId, setResourcesId] = useState()
    const [logsMonitor, setLogsMonitor] = useState<any[]>([])
    //@ts-ignore
    const handleLogs = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("http://127.0.0.1:8000/api/logs/logs", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            setLogsMonitor(data)
        } catch (err: any) {
            console.error("Error fetching logs:", err)
        } finally {
            setIsLoading(false)
        }
    }
    const [isSocket, setIsSocket] = useState(false)
    useEffect(() => {
        if(isSocket){
            const interval = setInterval(() => {
                handleLogs()
            }, 1000)
            return () => clearInterval(interval)
        }
        

         // cleanup on unmount
    }, [isSocket])
    const [selectedResource, setSelectedResource] = useState<string | undefined>(undefined)
    const { logs, attacks, sendMessage, isConnected, isConnecting, connectionError, connect, usingMockData } =
        useWebSocket()
    

    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
    const [activeAttacks, setActiveAttacks] = useState<
        {
            resourceId: string
            attackType: string
            technique: string
        }[]
    >([])

    // Load resources on component mount
    useEffect(() => {
        fetchResources()
    }, [])

    // Function to fetch resources from the API
    //@ts-ignore
    const fetchResources = async () => {
        setIsLoading(true)
        try {
            const data = await resourceApi.getResources()
            setResources(data)
        } catch (err) {
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to load resources",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }
    //@ts-ignore
    const handleSimulateAttack = async (
        resourceId: string,
        resourceName: string,
        attackType: string,
        options?: AttackOptions,
    ) => {
        try {
            // @ts-ignore
            setResourcesId(resourceId)
            await attackApi.simulateAttack(resourceId, attackType)
            setIsSocket(true)
            handleLogs()
            if (usingMockData) {
                sendMessage({
                    type: "simulate-attack",
                    resourceId,
                    resourceName,
                    attackType,
                    options,
                })
            }

            setResources((prev) =>
                prev.map((resource) => (resource.id === resourceId ? { ...resource, underAttack: true } : resource)),
            )

            // Add to active attacks
            setActiveAttacks((prev) => [
                ...prev,
                {
                    resourceId,
                    attackType,
                    technique: options?.technique || attackType,
                },
            ])

            toast({
                title: "Attack Simulation Started",
                description: `Simulating ${attackType} attack on ${resourceName}`,
            })
        } catch (err) {
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to simulate attack",
                variant: "destructive",
            })
        }
    }

    //@ts-ignore
    const handleDeployCountermeasure = async (attackId: string) => {
            window.location.reload()            
    }

    const handleStartScan = (resourceId: string) => {
        // This function is called when a vulnerability scan is started
        toast({
            title: "Vulnerability Scan Started",
            description: `Scanning resource for vulnerabilities...`,
        })
    }

    return (
        <Grid>
            <Grid gap={2} margin={5}>
                <CloudResourcesTable/>
            </Grid>
            <Grid gap={2} margin={5}>
                <EnhancedAttackSimulator onSimulateAttack={handleSimulateAttack} resources={resources}
                                         vulnerabilities={vulnerabilities}/>
            </Grid>
            <Grid gap={2} margin={5}>
                <LogMonitor logs={logsMonitor}/>
            </Grid>
            <Grid gap={2} margin={5}>
                <CountermeasureSystem resources={resources} resourceId={resourcesId} onDeployCountermeasure={handleDeployCountermeasure} attacks={attacks}/>
            </Grid>
        </Grid>
    );
}
