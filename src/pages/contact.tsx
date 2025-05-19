import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import * as React from "react";

export const ContactUs = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={4}
            sx={{
                background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                minHeight: "93vh",
                justifyContent: "center",
                alignItems: "center",
                animation: "fadeIn 1.5s ease-in-out",
                "@keyframes fadeIn": {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            }}
        >
            <Typography
                textAlign="center"
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#0d47a1" }}
            >
                Contact Us
            </Typography>

            <Typography variant="body1" width="600px" sx={{ color: "#1a237e", textAlign: "center" }}>
                Have questions, feedback, or need support? Reach out to our team or supervisor using the form below.
                We’re happy to assist with anything related to the Dashboard Resource Management and Cloud Security system.
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    width: "full",
                    maxWidth: "600px",
                    backgroundColor: "#ffffff",
                    borderRadius: 3,
                    boxShadow: 5,
                    animation: "fadeInUp 1.5s ease-in-out",
                    "@keyframes fadeInUp": {
                        from: { opacity: 0, transform: "translateY(20px)" },
                        to: { opacity: 1, transform: "translateY(0)" },
                    },
                }}
                elevation={3}
            >
                <Typography variant="h6" gutterBottom sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                    Send a Message
                </Typography>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                    <Box display={"flex"} flexDirection={"row"} gap={2}>
                        <TextField fullWidth label="First Name" variant="outlined" />
                        <TextField fullWidth label="Last Name" variant="outlined" />
                        <TextField fullWidth label="Email Address" variant="outlined" />
                    </Box>

                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        label="Your Message"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: "#0d47a1",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                                transform: "scale(1.05)", // Hover effect
                                transition: "transform 0.3s ease-in-out",
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>

            <Box>
                <Typography variant="h6" gutterBottom sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                    Supervisor Contact
                </Typography>
                <Typography variant="body1" color="black">
                    Dr - Qusai AlZoubi<br />
                    Email: <a href="mailto:q.zoubi@university.edu">q.zoubi@university.edu</a>
                </Typography>
            </Box>
        </Box>
    );
};