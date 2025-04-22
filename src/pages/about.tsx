import { Box, Typography, Container, Paper, Grid, Card, CardContent } from "@mui/material";
import React from "react";

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
        <Box display="flex" flexDirection="column" gap={4} m={2}>
            <Typography textAlign="center" variant="h4" gutterBottom marginTop={"12px"}>
                About the Project
            </Typography>

            <Typography variant="body1" width={"66%"}>
                This project was developed as part of our Bachelor's degree in Cybersecurity. Our goal was to create a 
                user-friendly, secure, and efficient dashboard tool for managing cloud-based and local resources.
                The system is built with cutting-edge technologies to ensure fast performance, intuitive usability, 
                and strong data protection.
            </Typography>

            <Typography variant="body1" width={"66%"}>
                Throughout the development process, we analyzed modern cloud tools, implemented real-time 
                monitoring, and ensured security through encryption and access control. The result is a powerful 
                tool ideal for IT professionals and organizations managing infrastructure in dynamic cloud environments.
            </Typography>

            <Box>
                <Typography variant="h5" gutterBottom>
                    Meet the Team
                </Typography>
                <Grid container spacing={3}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ padding: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" color="black">{member.name}</Typography>
                                    <Typography variant="body2" color="gray">ID: {member.id}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Supervisor:
                </Typography>
                <Typography variant="body1" color="black">Dr - Qusai Al-Zoubi</Typography>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Technologies which we used:
                </Typography>
                <Box px={2}>
                <ul>
                    <li style={{ color: "black" }}>📦 FastAPI & Python (Backend)</li>
                    <li style={{ color: "black" }}>🎨 Material UI & TypeScript (Frontend)</li>
                    <li style={{ color: "black" }}>⚡ ReactJs Vite version</li>
                    <li style={{ color: "black" }}>🔐 Encryption using Python cryptography</li>
                    <li style={{ color: "black" }}>📁 PostgresSQL to store data</li>
                </ul>
                </Box>
            </Box>
        </Box>
    );
};
