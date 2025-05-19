import * as React from "react"
import { useState } from "react"
import {
    CheckCircle as CheckIcon,
    AccessTime as ClockIcon,
    Security as ShieldIcon,
    FlashOn as ZapIcon,
    WarningAmber as AlertTriangleIcon,
} from "@mui/icons-material"
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material"
import {AttackEvent} from "../../api/web_socket";

interface CountermeasureSystemProps {
    attacks: AttackEvent[]
    onDeployCountermeasure: (attackId: string) => void
    resourceId: any
    resources: any
}

export function CountermeasureSystem({
                                         attacks,
                                         resourceId,
                                         resources,
                                         onDeployCountermeasure,
                                     }: CountermeasureSystemProps) {
    
    const [deployingCountermeasures, setDeployingCountermeasures] = useState<Record<string, boolean>>({})

    const handleDeployCountermeasure = (attackId: string) => {
        console.log(attackId, "sadadads")
        setDeployingCountermeasures((prev) => ({...prev, [attackId]: true}))
        onDeployCountermeasure(attackId)

        setTimeout(() => {
            setDeployingCountermeasures((prev) => ({...prev, [attackId]: false}))
        }, 2000)
    }

    const getAttackTypeLabel = (type: string) => {
        switch (type) {
            case "format-string":
                return "Format-String-Assisted"
            case "off-by-one":
                return "Off-by-One"
            case "heap-overflow":
                return "Heap Buffer"
            case "stack-overflow":
                return "Stack Buffer"
            default:
                return type
        }
    }

    const getStatusChip = (status: string) => {
        switch (status) {
            case "detected":
                return <Chip icon={<ClockIcon/>} label="Detected" color="warning" variant="outlined" size="small"/>
            case "in-progress":
                return <Chip icon={<ZapIcon/>} label="In Progress" color="error" variant="outlined" size="small"/>
            case "mitigated":
                return <Chip icon={<CheckIcon/>} label="Mitigated" color="success" variant="outlined" size="small"/>
            default:
                return <Chip label={status} variant="outlined" size="small"/>
        }
    }
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString()
    }
    console.log(attacks, "attacksattacksattacks")
    const activeAttacks = attacks.filter((attack) => attack.status !== "mitigated")
    const mitigatedAttacks = attacks.filter((attack) => attack.status === "mitigated")

    return (
        <Card>
            <CardHeader
                avatar={<ShieldIcon color="success"/>}
                title="Countermeasure System"
                subheader="Deploy countermeasures to mitigate detected attacks"
            />
            <Divider/>
            <CardContent sx={{p: 0}}>
                <Box px={2} py={1}>
                    <Typography variant="subtitle1" fontWeight="medium">
                        Active Threats
                    </Typography>
                </Box>
                {resources?.filter((i) => i.id == resourceId)?.length > 0 ? (
                    <Box maxHeight={300} overflow="auto" px={2} pb={2}>
                        <List disablePadding>
                            {resources?.filter((i) => i.id == resourceId)?.map((attack) => (
                                <ListItem key={attack.id} sx={{
                                    flexDirection: "column",
                                    alignItems: "stretch",
                                    border: "1px solid #ddd",
                                    borderRadius: 2,
                                    mb: 2,
                                    p: 2
                                }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <AlertTriangleIcon color="error" fontSize="small"/>
                                            <Typography fontWeight="medium">{attack.resourceName}</Typography>
                                            {getStatusChip(attack.status)}
                                        </Stack>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatTimestamp(attack.timestamp)}
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={1} mt={1}>
                                        <Chip variant="outlined" size="small"
                                              label={`${getAttackTypeLabel(attack.attackType)} Overflow`}/>
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary" mt={1}>
                                        {attack.details}
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{mt: 2}}
                                        onClick={() => handleDeployCountermeasure(attack.id)}
                                        disabled={deployingCountermeasures[attack.id]}
                                        startIcon={<ShieldIcon/>}
                                    >
                                        {deployingCountermeasures[attack.id] ? "Deploying..." : "Deploy Countermeasure"}
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height={80} color="text.secondary">
                        No active threats detected
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}
