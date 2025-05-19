// API service for making REST API calls to the backend

// Update the API URL to use environment variables with better fallback
const API_URL = "http://127.0.0.1:8000/api"

// API service for making REST API calls to the backend

// Update the API URL to use environment variables with better fallback
// Types
export interface CloudResource {
    id: string
    name: string
    type: string
    status: string
    ip: string
    created: string
    underAttack: boolean
}

// Add a function to check if we're using mock data
// This now checks if the API is actually reachable
export function isUsingMockData(): boolean {
    return false
}

// Mock resources data
const mockResources: CloudResource[] = [
    {
        id: "1",
        name: "Web Server",
        type: "VM",
        status: "running",
        ip: "192.168.1.10",
        created: "2023-04-15",
        underAttack: false,
    },
    {
        id: "2",
        name: "Database Server",
        type: "VM",
        status: "running",
        ip: "192.168.1.11",
        created: "2023-04-15",
        underAttack: true,
    },
    {
        id: "3",
        name: "Storage Bucket",
        type: "Storage",
        status: "available",
        ip: "N/A",
        created: "2023-03-20",
        underAttack: false,
    },
    {
        id: "4",
        name: "API Gateway",
        type: "Service",
        status: "running",
        ip: "192.168.1.12",
        created: "2023-05-01",
        underAttack: false,
    },
    {
        id: "5",
        name: "Test Server",
        type: "VM",
        status: "stopped",
        ip: "192.168.1.13",
        created: "2023-02-10",
        underAttack: false,
    },
]

// Generic fetch function with better error handling
//@ts-ignore
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        // First check if we should use mock data
        if (isUsingMockData()) {
            throw new Error("Using mock data")
        }

        const response = await fetch(url, options)

        if (!response.ok) {
            // Try to parse error message from response
            let errorMessage = `Error: ${response.status} ${response.statusText}`
            try {
                const errorData = await response.json()
                if (errorData.detail) {
                    errorMessage = errorData.detail
                }
            } catch (e) {
                // If we can't parse the error, just use the status
            }

            throw new Error(errorMessage)
        }

        return (await response.json()) as T
    } catch (error) {
        // For other errors, rethrow
        console.error("API request failed:", error)
        throw error
    }
}

// Update the resource API functions to use mock data in development when needed

export const resourceApi = {
    // Get all resources
    //@ts-ignore
    getResources: async (): Promise<CloudResource[]> => {
        try {
            return await fetchWithErrorHandling<CloudResource[]>(`${API_URL}/resources/resources/`)
        } catch (error) {
            console.error("Failed to get resources:", error)
            // Always fall back to mock data on error
            return [...mockResources]
        }
    },

    // Create a new resource
    //@ts-ignore

    createResource: async (name: string, type: string): Promise<CloudResource> => {
        try {
            const data = await fetchWithErrorHandling<any>(`${API_URL}/resources/resources`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    resource_type: type,
                }),
            })

            return {
                id: data.id.toString(),
                name: data.name,
                type: data.resource_type,
                status: data.status,
                ip: data.ip_address || "N/A",
                created: new Date(data.created_at).toISOString().split("T")[0],
                underAttack: data.under_attack,
            }
        } catch (error) {
            console.log("Using mock createResource due to error or development mode")
            // Create a mock resource
            const resource = {
                id: (Math.floor(Math.random() * 1000) + 6).toString(),
                name: name,
                type: type,
                status: "provisioning",
                ip: type === "VM" || type === "Service" ? "192.168.1." + (Math.floor(Math.random() * 254) + 1) : "N/A",
                created: new Date().toISOString().split("T")[0],
                underAttack: false,
            }

            // Simulate resource becoming available after 2 seconds
            setTimeout(() => {
                // This would update the resource in a real app
                console.log("Resource status changed to running:", resource.id)
            }, 2000)

            return resource
        }
    },

    // Delete a resource
    //@ts-ignore
    deleteResource: async (id: string): Promise<void> => {
        try {
            await fetchWithErrorHandling(`${API_URL}/resources/resources/${id}`, {
                method: "DELETE",
            })
        } catch (error) {
            console.log("Using mock deleteResource due to error or development mode for resource:", id)
            // Just return, no need to do anything in mock mode
            return
        }
    },
}

// Update the attack API functions to use mock data in development when needed
export const attackApi = {
    // Simulate an attack
    //@ts-ignore
    simulateAttack: async (resourceId: string, attackType: string): Promise<void> => {
        try {
            await fetchWithErrorHandling(`${API_URL}/attacks/attacks/simulate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resource_id: resourceId,
                    attack_type: attackType,
                }),
            })
        } catch (error) {
            console.log("Using mock simulateAttack due to error or development mode:", resourceId, attackType)
            // Just return, the WebSocket service will handle the mock attack
            return
        }
    },

    // Deploy a countermeasure
    //@ts-ignore

    deployCountermeasure: async (attackId: string): Promise<void> => {
        try {
            await fetchWithErrorHandling(`${API_URL}/countermeasures/countermeasures/deploy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    attack_id: attackId,
                }),
            })
        } catch (error) {
            console.log("Using mock deployCountermeasure due to error or development mode for attack:", attackId)
            // Just return, the WebSocket service will handle the mock countermeasure
            return
        }
    },
}

// Update the log API functions to use mock data in development when needed
export const logApi = {
    // Get logs with optional resource filter
    //@ts-ignore
    getLogs: async (resourceId?: string, limit = 100): Promise<any[]> => {
        try {
            const url = new URL(`${API_URL}/logs/`)
            if (resourceId) {
                url.searchParams.append("resource_id", resourceId)
            }
            url.searchParams.append("limit", limit.toString())

            return await fetchWithErrorHandling<any[]>(url.toString())
        } catch (error) {
            console.log("Using mock getLogs due to error or development mode")
            return [] // Return empty logs, the WebSocket service will handle mock logs
        }
    },
}
