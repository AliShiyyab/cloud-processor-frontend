import * as React from "react"
import { useState } from "react"
import {
    Card, CardContent, CardHeader, CardActions,
    Typography, Tabs, Tab, Box, FormControl, InputLabel,
    MenuItem, Select, Button, Slider, Switch, Badge, Divider, Alert, CircularProgress
} from "@mui/material"
import { AlertTriangle, Play, Cpu, Network, Database, Lock, FileCode, RefreshCw } from "lucide-react"
import {CloudResource} from "../../api";
import {Vulnerability} from "./vulnerability-scanner";
import {attackTypes} from "./types/attack_type";

export interface AttackType {
    id: string
    name: string
    description: string
    category: "network" | "memory" | "application" | "database" | "system"
    techniques: AttackTechnique[]
    prerequisites: string[]
    impacts: string[]
}

interface AttackTechnique {
    id: string
    name: string
    description: string
    complexity: "low" | "medium" | "high"
    impact: "low" | "medium" | "high" | "critical"
}

export interface AttackOptions {
    technique: string
    duration: number
    stealthMode: boolean
    targetVulnerability?: string
    intensity: number
    useExploit: boolean
}

interface EnhancedAttackSimulatorProps {
    resources: CloudResource[]
    vulnerabilities: Vulnerability[]
    onSimulateAttack: (resourceId: string, resourceName: string, attackType: string, options: AttackOptions) => void
}

export function EnhancedAttackSimulator({
                                            resources,
                                            vulnerabilities,
                                            onSimulateAttack,
                                        }: EnhancedAttackSimulatorProps) {
    const [selectedResource, setSelectedResource] = useState("")
    const [selectedAttackType, setSelectedAttackType] = useState("")
    const [selectedTechnique, setSelectedTechnique] = useState("")
    const [isSimulating, setIsSimulating] = useState(false)
    const [attackDuration, setAttackDuration] = useState(30)
    const [stealthMode, setStealthMode] = useState(false)
    const [attackIntensity, setAttackIntensity] = useState(50)
    const [useExploit, setUseExploit] = useState(false)
    const [selectedVulnerability, setSelectedVulnerability] = useState("")
    const [tab, setTab] = useState(0)
    
    const selectedAttackTypeObj = attackTypes.filter((at) => at.id === selectedAttackType)?.[0]
    const selectedTechniqueObj = selectedAttackTypeObj?.techniques.filter((t) => t.id === selectedTechnique)?.[0]
    const resourceVulnerabilities = vulnerabilities.filter(
        (v) => v.resourceId === selectedResource && v.status === "open" && v.exploitable,
    )

    const handleSimulateAttack = () => {
        if (!selectedResource || !selectedAttackType || !selectedTechnique) return
        setIsSimulating(true)
        const resource = resources.filter((r) => r.id === selectedResource)?.[0]
        if (!resource) return
        const options: AttackOptions = {
            technique: selectedTechnique,
            duration: attackDuration,
            stealthMode,
            intensity: attackIntensity,
            useExploit,
            targetVulnerability: useExploit ? selectedVulnerability : undefined,
        }
        onSimulateAttack(selectedResource, resource.name, selectedAttackType, options)
        setTimeout(() => setIsSimulating(false), 2000)
    }

    const getComplexityBadge = (complexity: string) => {
        switch (complexity) {
            case "low":
                return <Badge color="success"  sx={{ mr: 1 }}>Low Complexity</Badge>
            case "medium":
                return <Badge color="warning"  sx={{ mr: 1 }}>Medium Complexity</Badge>
            case "high":
                return <Badge color="error"  sx={{ mr: 1 }}>High Complexity</Badge>
            default:
                return null
        }
    }

    const getImpactBadge = (impact: string) => {
        switch (impact) {
            case "low":
                return <Badge color="info"  sx={{ mr: 1 }}>Low Impact</Badge>
            case "medium":
                return <Badge color="warning"  sx={{ mr: 1 }}>Medium Impact</Badge>
            case "high":
                return <Badge color="error"  sx={{ mr: 1 }}>High Impact</Badge>
            case "critical":
                return <Badge color="error"  sx={{ mr: 1 }}>Critical Impact</Badge>
            default:
                return null
        }
    }

    return (
        <Card>
            <CardHeader
                avatar={<AlertTriangle color="#facc15" size={24} />}
                title="Advanced Attack Simulator"
                subheader="Simulate sophisticated cyber attacks on your resources"
            />
            <CardContent>
                {tab === 0 && (
                    <Box display="flex" flexDirection="column" gap={3}>
                        <FormControl fullWidth>
                            <InputLabel>Target Resource</InputLabel>
                            <Select
                                value={selectedResource}
                                label="Target Resource"
                                onChange={(e) => setSelectedResource(e.target.value)}
                            >
                                {resources.map((resource) => (
                                    <MenuItem key={resource.id} value={resource.id}>
                                        {resource.name} ({resource.resource_type})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Attack Type</InputLabel>
                            <Select
                                value={selectedAttackType}
                                label="Attack Type"
                                onChange={(e) => setSelectedAttackType(e.target.value)}
                            >
                                {attackTypes.map((attackType) => (
                                    <MenuItem key={attackType.id} value={attackType.id}>
                                        <Box display="flex" alignItems="center">
                                            {attackType.name}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedAttackTypeObj && (
                            <FormControl fullWidth>
                                <InputLabel>Attack Technique</InputLabel>
                                <Select
                                    value={selectedTechnique}
                                    label="Attack Technique"
                                    onChange={(e) => setSelectedTechnique(e.target.value)}
                                >
                                    {selectedAttackTypeObj.techniques.map((technique) => (
                                        <MenuItem key={technique.id} value={technique.id}>
                                            {technique.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {selectedTechniqueObj && (
                                    <Box mt={1}>
                                        <Typography variant="body2">{selectedTechniqueObj.description}</Typography>
                                        <Box mt={1} display="flex" gap={1}>
                                            {getComplexityBadge(selectedTechniqueObj.complexity)}
                                            {getImpactBadge(selectedTechniqueObj.impact)}
                                        </Box>
                                    </Box>
                                )}
                            </FormControl>
                        )}
                        <Divider />
                        {useExploit && resourceVulnerabilities.length > 0 && (
                            <FormControl fullWidth>
                                <InputLabel>Target Vulnerability</InputLabel>
                                <Select
                                    value={selectedVulnerability}
                                    label="Target Vulnerability"
                                    onChange={(e) => setSelectedVulnerability(e.target.value)}
                                >
                                    {resourceVulnerabilities.map((vuln) => (
                                        <MenuItem key={vuln.id} value={vuln.id}>
                                            {vuln.name} ({vuln.severity})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <CardActions>
                            <Button
                                
                                color="primary"
                                fullWidth
                                onClick={handleSimulateAttack}
                                disabled={!selectedResource || !selectedAttackType || !selectedTechnique || isSimulating}
                                startIcon={isSimulating ? <CircularProgress size={20} /> : <Play size={16} />}
                            >
                                {isSimulating ? "Simulating..." : "Simulate Attack"}
                            </Button>
                        </CardActions>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}