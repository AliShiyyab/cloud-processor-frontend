import { Box, Typography, Container, Paper, Grid, Card, CardMedia, CardContent } from "@mui/material";
import React from "react";

export const Home = () => {
    const weProvide = [
        {
            title: "Resource Management",
            image: "https://www.solutions360.com/wp-content/uploads/2024/04/Resource-management-2.jpg",
            description:
                "Streamline cloud and local resource control with advanced usage monitoring, deployment tools, and automated scaling.",
        },
        {
            title: "Security Insights",
            image: "https://www.eco.de/wp-content/uploads/2024/03/si_24.png",
            description:
                "Gain deep visibility into security events with threat detection, access audits, and encrypted traffic analysis.",
        },
        {
            title: "User & Access Control",
            image: "https://f.hubspotusercontent30.net/hubfs/6697086/Assurance_lab_August_2020/Images/46a561_a59fb7db5f0646c6aad5efd96bbf464b_mv2-1.png",
            description:
                "Manage users, roles, and permissions with granular control and multi-factor authentication options.",
        },
    ]

    return (
        <Box display={"flex"} flexDirection={"column"} gap={4} m={2}>
            <Typography textAlign={"center"} variant="h4" gutterBottom marginTop={"12px"}>
                Dashboard Resources Management & Cloud Security
            </Typography>
            <Typography variant="body1" width={"66%"}>
                This project is a comprehensive dashboard tool built for managing resources and enhancing
                cloud security. Designed with usability and protection in mind, it provides real-time
                monitoring, analysis, and control of cloud-based systems.
            </Typography>

            <Typography variant="body1" width={"66%"}>
                The dashboard offers a sleek interface with fast and responsive interaction powered by
                HTMX, Tailwind CSS, and FastAPI. Whether managing local resources or cloud services,
                our system is built to be secure, simple, and effective.
            </Typography>
            <Box display={"flex"} flexDirection={"column"} >
                <Typography variant="body1" width={"66%"}>
                    Key features include:
                </Typography>
                <Box px={2}>
                <ul>

                    <li style={{ color: "black" }}>🔒 Secure user authentication and role-based access</li>
                    <li style={{ color: "black" }}>📊 Real-time resource tracking and visualizations</li>
                    <li style={{ color: "black" }}>🚨 Immediate security alerts and notifications</li>
                    <li style={{ color: "black" }}>🛡️ Encrypted data handling using modern cryptography</li>
                </ul>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    This tool is perfect for cloud administrators, IT professionals, and organizations
                    seeking efficient and secure cloud infrastructure management.
                </Typography>
            </Box>
            <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={12}>
                {weProvide.map((val, idx) => (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 200, objectFit: "contain" }}
                            image={val.image}
                            title="image not found"
                        />
                        <CardContent>
                            <Typography color="black" gutterBottom variant="h5" component="div">
                                {val.title}
                            </Typography>
                            <Typography variant="body2" color="black">
                                {val.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};
