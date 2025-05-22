const API_URL = "http://127.0.0.1:8000/api"

export interface CloudResource {
    id: string
    name: string
    type: string
    status: string
    ip: string
    created: string
    underAttack: boolean
}

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

export const resourceApi = {
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
            const resource = {
                id: (Math.floor(Math.random() * 1000) + 6).toString(),
                name: name,
                type: type,
                status: "provisioning",
                ip: type === "VM" || type === "Service" ? "192.168.1." + (Math.floor(Math.random() * 254) + 1) : "N/A",
                created: new Date().toISOString().split("T")[0],
                underAttack: false,
            }

            setTimeout(() => {
                console.log("Resource status changed to running:", resource.id)
            }, 2000)

            return resource
        }
    },

    //@ts-ignore
    deleteResource: async (id: string): Promise<void> => {
        try {
            await fetchWithErrorHandling(`${API_URL}/resources/resources/${id}`, {
                method: "DELETE",
            })
        } catch (error) {
            console.log("Using mock deleteResource due to error or development mode for resource:", id)
            return
        }
    },
}

export const attackApi = {
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
            return
        }
    },
}
