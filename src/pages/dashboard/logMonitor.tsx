import * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
    Alert,
    Badge,
    Box,
    Button,
    InputAdornment,
    Tab,
    Tabs,
    TextField,
    Typography,
    Paper,
    IconButton,
    Stack,
    Divider,
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import WarningIcon from "@mui/icons-material/WarningAmber"
import ErrorIcon from "@mui/icons-material/ErrorOutline"
import TerminalIcon from "@mui/icons-material/Terminal"
import SearchIcon from "@mui/icons-material/Search"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ClearIcon from "@mui/icons-material/Clear"
import {LogMessage} from "../../api/web_socket";

interface LogMonitorProps {
    logs: LogMessage[]
    selectedResource?: string
}

export function LogMonitor({ logs, selectedResource }: LogMonitorProps) {
    const [filter, setFilter] = useState("")
    const [autoScroll, setAutoScroll] = useState(true)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const [filteredLogs, setFilteredLogs] = useState<LogMessage[]>([])
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        let filtered = logs

        if (selectedResource) {
            filtered = filtered.filter((log) => log.resource_id === selectedResource)
        }

        if (activeTab !== "all") {
            filtered = filtered.filter((log) => log.level === activeTab)
        }

        if (filter) {
            const searchTerm = filter.toLowerCase()
            
        }

        setFilteredLogs(filtered)
    }, [logs, filter, selectedResource, activeTab])

    useEffect(() => {
        if (autoScroll && scrollAreaRef.current) {
            const scrollArea = scrollAreaRef.current
            scrollArea.scrollTop = scrollArea.scrollHeight
        }
    }, [filteredLogs, autoScroll])

    const counts = {
        info: logs.filter((log) => log.level === "info").length,
        warning: logs.filter((log) => log.level === "warning").length,
        error: logs.filter((log) => log.level === "error").length,
        debug: logs.filter((log) => log.level === "debug").length,
    }

    return (
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, alignItems: "center" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <TerminalIcon />
                    <Typography variant="h6" component="div">
                        System Logs
                    </Typography>
                    {selectedResource && (
                        <Badge
                            badgeContent={selectedResource}
                            color="primary"
                            sx={{ "& .MuiBadge-badge": { fontSize: 12, height: 22, minWidth: 22 } }}
                        />
                    )}
                </Stack>
                <Button
                    variant={autoScroll ? "contained" : "outlined"}
                    size="small"
                    startIcon={<ArrowDownwardIcon />}
                    onClick={() => setAutoScroll(!autoScroll)}
                >
                    {autoScroll ? "Auto-scroll on" : "Auto-scroll off"}
                </Button>
            </Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Real-time process and system logs
            </Typography>
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2 }}
            >
                <Tab label={`All (${logs.length})`} value="all" />
                <Tab label={`Info (${counts.info})`} value="info" />
                <Tab label={`Warnings (${counts.warning})`} value="warning" />
                <Tab label={`Errors (${counts.error})`} value="error" />
                <Tab label={`Debug (${counts.debug})`} value="debug" />
            </Tabs>
            <Box
                ref={scrollAreaRef}
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    p: 2,
                    bgcolor: "background.paper",
                }}
            >
                {filteredLogs.length === 0 ? (
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                        {`No ${activeTab === "all" ? "" : activeTab} logs matching your filters`}
                    </Typography>
                ) : (
                    filteredLogs.map((log) => <LogEntry key={log.id} log={log} />)
                )}
            </Box>
        </Paper>
    )
}

interface LogEntryProps {
    log: LogMessage
}

function LogEntry({ log }: LogEntryProps) {
    const getLevelIcon = (level: string) => {
        switch (level) {
            case "info":
                return <InfoIcon color="info" fontSize="small" />
            case "warning":
                return <WarningIcon sx={{ color: "#FBBF24" }} fontSize="small" /> // amber-400
            case "error":
                return <ErrorIcon color="error" fontSize="small" />
            case "debug":
                return <TerminalIcon color="disabled" fontSize="small" />
            default:
                return <InfoIcon fontSize="small" />
        }
    }

    const getLevelColor = (level: string) => {
        switch (level) {
            case "info":
                return "info.main"
            case "warning":
                return "#FBBF24"
            case "error":
                return "error.main"
            case "debug":
                return "text.disabled"
            default:
                return "text.primary"
        }
    }

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString()
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                mb: 1,
                p: 1,
                borderLeft: `4px solid ${getLevelColor(log.level)}`,
                bgcolor: "background.paper",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    {getLevelIcon(log.level)}
                    <Badge
                        badgeContent={""}
                        sx={{
                            bgcolor: getLevelColor(log.level),
                            color: "background.paper",
                            px: 1,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            height: 22,
                            minWidth: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    />
                    <Typography fontWeight="medium">{log.resource_id}</Typography>
                    {log.process && (
                        <Badge
                            badgeContent={`${log.process}${log.pid ? `:${log.pid}` : ""}`}
                            color="default"
                            sx={{
                                fontFamily: "monospace",
                                px: 1,
                                borderRadius: 1,
                                fontSize: "0.75rem",
                                height: 22,
                                minWidth: 50,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />
                    )}
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    {formatTimestamp(log.timestamp)}
                </Typography>
            </Box>
            <Typography sx={{ pl: 4, whiteSpace: "pre-wrap" }}>{log.message}</Typography>
        </Paper>
    )
}
