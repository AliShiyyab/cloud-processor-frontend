import * as React from 'react';
import { useState, useEffect } from "react"
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Select, MenuItem, InputLabel, FormControl, Snackbar, Alert, IconButton,
    Badge, Box, CircularProgress, Typography, Menu, MenuItem as MenuListItem
} from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"
import AddIcon from "@mui/icons-material/Add"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import DeleteIcon from "@mui/icons-material/Delete"
import CloudIcon from "@mui/icons-material/Cloud"
import StorageIcon from "@mui/icons-material/Storage"
import DnsIcon from "@mui/icons-material/Dns"
import ShieldIcon from "@mui/icons-material/Shield"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import {CloudResource, resourceApi} from "../../api";


export function CloudResourcesTable() {
    const [resources, setResources] = useState<CloudResource[]>([])
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [newResource, setNewResource] = useState({ name: "", type: "VM" })
    const [toast, setToast] = useState<{ message: string; severity: "success" | "error" } | null>(null)

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [menuResourceId, setMenuResourceId] = useState<string | null>(null)


    useEffect(() => {
        fetchResources()
    }, [])

    //@ts-ignore
    const fetchResources = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await resourceApi.getResources()
            setResources(data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load resources"
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    //@ts-ignore
    const handleCreateResource = async () => {
        if (!newResource.name) return
        try {
            const resource = await resourceApi.createResource(newResource.name, newResource.type)
            setResources((prev) => [...prev, resource])
            setIsCreateDialogOpen(false)
            setNewResource({ name: "", type: "VM" })
            setToast({ message: `Resource "${resource.name}" created successfully`, severity: "success" })
        } catch (err) {
            setToast({
                message: err instanceof Error ? err.message : "Failed to create resource",
                severity: "error",
            })
        }
    }

    //@ts-ignore
    const handleDeleteResource = async (id: string) => {
        try {
            await resourceApi.deleteResource(id)
            setResources((prev) => prev.filter((r) => r.id !== id))
            setToast({ message: "Resource deleted successfully", severity: "success" })
        } catch (err) {
            setToast({
                message: err instanceof Error ? err.message : "Failed to delete resource",
                severity: "error",
            })
        }
        handleMenuClose()
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "running":
                return "success"
            case "stopped":
                return "default"
            case "provisioning":
                return "info"
            case "available":
                return "success"
            default:
                return "default"
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "VM":
                return <DnsIcon sx={{ mr: 1 }} fontSize="small" />
            case "Storage":
                return <StorageIcon sx={{ mr: 1 }} fontSize="small" />
            case "Service":
                return <CloudIcon sx={{ mr: 1 }} fontSize="small" />
            default:
                return <CloudIcon sx={{ mr: 1 }} fontSize="small" />
        }
    }

    // Dropdown menu handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, resourceId: string) => {
        setMenuAnchorEl(event.currentTarget)
        setMenuResourceId(resourceId)
    }
    const handleMenuClose = () => {
        setMenuAnchorEl(null)
        setMenuResourceId(null)
    }

    return (
        <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                    <Typography variant="h6">Cloud Resources</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Manage your virtual machines, storage, and services.
                    </Typography>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={fetchResources}
                        disabled={isLoading}
                        sx={{ mr: 1 }}
                    >
                        {isLoading ? <CircularProgress size={20} /> : "Refresh"}
                    </Button>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsCreateDialogOpen(true)}>
                        Create Resource
                    </Button>
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {isLoading && resources.length === 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center" height={160}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>IP Address</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Security</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resources.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: "text.secondary" }}>
                                        No resources found. Create a new resource to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                resources.map((resource) => (
                                    <TableRow key={resource.id}>
                                        <TableCell sx={{ fontWeight: "medium" }}>{resource.name}</TableCell>
                                        <TableCell>
                                            <Badge
                                                badgeContent={resource.status}
                                                color={getStatusColor(resource.status)}
                                                sx={{
                                                    "& .MuiBadge-badge": {
                                                        right: -20,
                                                        top: 8,
                                                        padding: "0 8px",
                                                        borderRadius: "12px",
                                                        textTransform: "capitalize",
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{resource.ip_address}</TableCell>
                                        <TableCell>{resource.created_at}</TableCell>
                                        <TableCell>
                                            {resource.underAttack ? (
                                                <Badge
                                                    badgeContent="Under Attack"
                                                    color="error"
                                                    sx={{
                                                        "& .MuiBadge-badge": {
                                                            right: -40,
                                                            top: 8,
                                                            padding: "0 8px",
                                                            borderRadius: "12px",
                                                        },
                                                    }}
                                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                                >
                                                    <WarningAmberIcon color="error" fontSize="small" />
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    badgeContent="Secure"
                                                    color="success"
                                                    sx={{
                                                        "& .MuiBadge-badge": {
                                                            right: -40,
                                                            top: 8,
                                                            padding: "0 8px",
                                                            borderRadius: "12px",
                                                        },
                                                    }}
                                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                                >
                                                    <ShieldIcon color="success" fontSize="small" />
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => handleDeleteResource(resource.id)} size="small">
                                                <DeleteIcon fontSize="small" color={"error"} sx={{ mr: 1 }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Create Resource Dialog */}
            <Dialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Create New Resource</DialogTitle>
                <DialogContent dividers>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            label="Resource Name"
                            fullWidth
                            margin="normal"
                            value={newResource.name}
                            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                            placeholder="Enter resource name"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="resource-type-label">Resource Type</InputLabel>
                            <Select
                                labelId="resource-type-label"
                                value={newResource.type}
                                label="Resource Type"
                                onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                            >
                                <MenuItem value="VM">Virtual Machine</MenuItem>
                                <MenuItem value="STORAGE">Storage</MenuItem>
                                <MenuItem value="SERVICE">Service</MenuItem>
                                <MenuItem value="DATABASE">DATABASE</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateResource}
                        disabled={!newResource.name.trim()}
                    >
                        Deploy
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Toast / Snackbar */}
            <Snackbar
                open={!!toast}
                autoHideDuration={4000}
                onClose={() => setToast(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                {toast && (
                    <Alert
                        onClose={() => setToast(null)}
                        severity={toast.severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {toast.message}
                    </Alert>
                )}
            </Snackbar>
        </Paper>
    )
}
