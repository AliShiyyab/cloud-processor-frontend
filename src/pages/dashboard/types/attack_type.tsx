import {AttackType} from "../attack_simulator";

export const attackTypes: AttackType[] = [
    {
        id: "format-string",
        name: "format-string",
        description: "Exploits memory corruption vulnerabilities by overflowing buffers with malicious data",
        category: "memory",
        techniques: [
            {
                id: "stack-overflow",
                name: "Stack Buffer Overflow",
                description:
                    "Overflows buffers allocated on the stack, potentially overwriting return addresses and function pointers",
                complexity: "medium",
                impact: "critical",
            },
            {
                id: "heap-overflow",
                name: "Heap Buffer Overflow",
                description: "Targets dynamically allocated memory on the heap, potentially corrupting heap metadata",
                complexity: "high",
                impact: "high",
            },
            {
                id: "format-string",
                name: "Format String Attack",
                description:
                    "Exploits format string vulnerabilities in printf-like functions to read or write to arbitrary memory locations",
                complexity: "medium",
                impact: "critical",
            },
            {
                id: "off-by-one",
                name: "Off-by-One Error",
                description: "Exploits boundary condition errors in loops or buffer access",
                complexity: "medium",
                impact: "medium",
            },
        ],
        prerequisites: [
            "Memory-unsafe programming languages (C, C++)",
            "Lack of bounds checking",
            "Disabled memory protection mechanisms",
        ],
        impacts: ["Remote code execution", "Privilege escalation", "System crash", "Data corruption"],
    },
    {
        id: "off-by-one",
        name: "off-by-one",
        description: "Exploits vulnerabilities in database query construction to manipulate or extract data",
        category: "database",
        techniques: [
            {
                id: "error-based",
                name: "Error-based SQL Injection",
                description: "Uses database error messages to extract information",
                complexity: "low",
                impact: "high",
            },
            {
                id: "union-based",
                name: "Union-based SQL Injection",
                description: "Uses UNION SQL operator to combine results from multiple SELECT statements",
                complexity: "medium",
                impact: "high",
            },
            {
                id: "blind",
                name: "Blind SQL Injection",
                description: "Extracts data when no error messages or direct output is available",
                complexity: "high",
                impact: "medium",
            },
            {
                id: "time-based",
                name: "Time-based SQL Injection",
                description: "Uses time delays to extract information when no output is available",
                complexity: "high",
                impact: "medium",
            },
        ],
        prerequisites: ["Unsanitized user input", "Dynamic SQL queries", "Insufficient input validation"],
        impacts: ["Data breach", "Data manipulation", "Authentication bypass", "Information disclosure"],
    },
    {
        id: "heap-overflow",
        name: "heap-overflow",
        description: "Injects malicious scripts into web pages viewed by other users",
        category: "application",
        techniques: [
            {
                id: "reflected",
                name: "Reflected XSS",
                description: "Malicious script is reflected off a web server, such as in search results or error messages",
                complexity: "low",
                impact: "medium",
            },
            {
                id: "stored",
                name: "Stored XSS",
                description: "Malicious script is stored on the target server, such as in a database",
                complexity: "medium",
                impact: "high",
            },
            {
                id: "dom-based",
                name: "DOM-based XSS",
                description: "Vulnerability exists in client-side code rather than server-side code",
                complexity: "high",
                impact: "medium",
            },
        ],
        prerequisites: [
            "Insufficient output encoding",
            "Lack of Content Security Policy",
            "Client-side input processing without validation",
        ],
        impacts: ["Session hijacking", "Credential theft", "Malware distribution", "Defacement"],
    },
    {
        id: "stack-overflow",
        name: "stack-overflow",
        description: "Overwhelms target systems with traffic from multiple sources to disrupt services",
        category: "network",
        techniques: [
            {
                id: "volumetric",
                name: "Volumetric Attack",
                description: "Consumes bandwidth with high volume of traffic",
                complexity: "low",
                impact: "high",
            },
            {
                id: "protocol",
                name: "Protocol Attack",
                description: "Exploits weaknesses in network protocols",
                complexity: "medium",
                impact: "high",
            },
            {
                id: "application-layer",
                name: "Application Layer Attack",
                description: "Targets specific applications or services",
                complexity: "high",
                impact: "critical",
            },
            {
                id: "amplification",
                name: "Amplification Attack",
                description: "Uses services that generate larger responses than requests",
                complexity: "medium",
                impact: "critical",
            },
        ],
        prerequisites: ["Exposed network services", "Lack of rate limiting", "Insufficient bandwidth capacity"],
        impacts: ["Service unavailability", "Performance degradation", "Financial losses", "Reputation damage"],
    },
]