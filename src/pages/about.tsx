import { Box, Typography, Container, Paper, Grid, Card, CardContent } from "@mui/material";
import * as React from "react";

export const AboutUs = () => {
    const teamMembers = [
        {
            name: "Momen Al-Silawy",
            id: "2021904087"
        },
        {
            name: "Abed AlHady Obeidat",
            id: "2021904075"
        },
        {
            name: "Mostafa Al-rashdan",
            id: "2021904073"
        },
        {
            name: "Osama Nusseirat",
            id: "2021904141"
        }
    ];

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={4}
            sx={{
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                padding: 4,
                height: "86vh",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography
                textAlign="center"
                variant="h4"
                gutterBottom
                marginTop={"12px"}
                sx={{ fontWeight: "bold", color: "#0d47a1"}}
            >
                About the Project
            </Typography>

            <Typography
                variant="body1"
                width={"66%"}
                sx={{ margin: "0 auto", color: "#1a237e", lineHeight: 1.6 }}
            >
                This project was developed as part of our Bachelor's degree in Cybersecurity. Our goal was to create a
                user-friendly, secure, and efficient dashboard tool for managing cloud-based and local resources.
                The system is built with cutting-edge technologies to ensure fast performance, intuitive usability,
                and strong data protection.
            </Typography>

            <Typography
                variant="body1"
                width={"66%"}
                sx={{ margin: "0 auto", color: "#1a237e", lineHeight: 1.6 }}
            >
                Throughout the development process, we analyzed modern cloud tools, implemented real-time
                monitoring, and ensured security through encryption and access control. The result is a powerful
                tool ideal for IT professionals and organizations managing infrastructure in dynamic cloud environments.
            </Typography>

            <Box>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#0d47a1", fontWeight: "bold", textAlign: "center" }}
                >
                    Meet the Team
                </Typography>
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    padding: 2,
                                    backgroundColor: "#ffffff",
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    animation: `fadeIn 0.5s ease-in-out ${index * 0.2}s`, // Animation with delay
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: 6,
                                    },
                                    "@keyframes fadeIn": {
                                        from: { opacity: 0, transform: "translateY(20px)" },
                                        to: { opacity: 1, transform: "translateY(0)" },
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" color="#333" sx={{ fontWeight: "bold",color: "#0d47a1" }}>
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body2" color="#1a237e">
                                        ID: {member.id}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}                </Grid>
            </Box>

            <Box sx={{ textAlign: "center", alignItems: "center" }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                    Supervisor:
                </Typography>
                <Typography variant="body1" color="#1a237e">
                    Dr - Qusai Al-Zoubi
                </Typography>
            </Box>

            <Box sx={{ textAlign: "center", alignItems: "center" }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                    Technologies which we used:
                </Typography>
                <Box px={2}>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li style={{ color: "#1a237e" }}>📦 FastAPI & Python (Backend)</li>
                        <li style={{ color: "#1a237e" }}>🎨 Material UI & TypeScript (Frontend)</li>
                        <li style={{ color: "#1a237e" }}>⚡ ReactJs Vite version</li>
                        <li style={{ color: "#1a237e" }}>🔐 Encryption using Python cryptography</li>
                        <li style={{ color: "#1a237e" }}>📁 PostgresSQL to store data</li>
                    </ul>
                </Box>
            </Box>
        </Box>
    );
};