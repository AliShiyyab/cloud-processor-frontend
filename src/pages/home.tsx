import { Box, Typography, Card, CardMedia, CardContent, keyframes } from "@mui/material";
import * as React from 'react';
import {useEffect} from "react";

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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
    ];

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            sx={{
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                color: "white",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
                animation: `${fadeIn} 1s ease-in-out`,
            }}
        >
            <Typography
                textAlign={"center"}
                variant="h4"
                gutterBottom
                marginTop={"12px"}
                sx={{
                    fontWeight: "bold",
                    color: "#0d47a1",
                    animation: `${slideIn} 1s ease-in-out`,
                }}
            >
                Dashboard Resources Management & Cloud Security
            </Typography>
            <Typography
                variant="body1"
                width={"66%"}
                sx={{
                    textAlign: "center",
                    margin: "0 auto",
                    color: "#1a237e",
                    animation: `${fadeIn} 1.2s ease-in-out`,
                }}
            >
                This project is a comprehensive dashboard tool built for managing resources and enhancing
                cloud security. Designed with usability and protection in mind, it provides real-time
                monitoring, analysis, and control of cloud-based systems.
            </Typography>

            <Typography
                variant="body1"
                width={"66%"}
                sx={{
                    textAlign: "center",
                    margin: "0 auto",
                    color: "#1a237e",
                    animation: `${fadeIn} 1.4s ease-in-out`,
                }}
            >
                The dashboard offers a sleek interface with fast and responsive interaction powered by
                HTMX, Tailwind CSS, and FastAPI. Whether managing local resources or cloud services,
                our system is built to be secure, simple, and effective.
            </Typography>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    width={"66%"}
                    sx={{
                        color: "#0d47a1",
                        textAlign: "center",
                        animation: `${fadeIn} 1.6s ease-in-out`,
                    }}
                >
                    Key features include:
                </Typography>
                <Box px={2}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li style={{ color: "#1a237e", marginBottom: "8px" }}>
                            🔒 Secure user authentication and role-based access
                        </li>
                        <li style={{ color: "#1a237e", marginBottom: "8px" }}>
                            📊 Real-time resource tracking and visualizations
                        </li>
                        <li style={{ color: "#1a237e", marginBottom: "8px" }}>
                            🚨 Immediate security alerts and notifications
                        </li>
                        <li style={{ color: "#1a237e", marginBottom: "8px" }}>
                            🛡️ Encrypted data handling using modern cryptography
                        </li>
                    </ul>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        margin: "0 auto",
                        color: "#1a237e",
                        animation: `${fadeIn} 1.8s ease-in-out`,
                    }}
                >
                    This tool is perfect for cloud administrators, IT professionals, and organizations
                    seeking efficient and secure cloud infrastructure management.
                </Typography>
            </Box>
            <Box
                display={"flex"}
                flexWrap={"wrap"}
                justifyContent={"center"}
                gap={4}
                sx={{ marginTop: 4 }}
            >
                {weProvide.map((val, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            maxWidth: 345,
                            borderRadius: 3,
                            boxShadow: 5,
                            transition: "transform 0.3s, box-shadow 0.3s",
                            animation: `${fadeIn} 1s ease-in-out ${idx * 0.2}s`,
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: 10,
                            },
                        }}
                    >
                        <CardMedia
                            sx={{ height: 200, objectFit: "cover" }}
                            image={val.image}
                            title="image not found"
                        />
                        <CardContent>
                            <Typography
                                color="primary"
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: "bold", color: "#0d47a1" }}
                            >
                                {val.title}
                            </Typography>
                            <Typography variant="body2" color="#1a237e">
                                {val.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};