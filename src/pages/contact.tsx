import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";

export const ContactUs = () => {
    return (
        <Box display="flex" flexDirection="column" gap={4} p={2} m={0}>
            <Typography textAlign="center" variant="h4" gutterBottom marginTop={"12px"}>
                Contact Us
            </Typography>

            <Typography variant="body1" width="full">
                Have questions, feedback, or need support? Reach out to our team or supervisor using the form below.
                We’re happy to assist with anything related to the Dashboard Resource Management and Cloud Security system.
            </Typography>

            <Paper sx={{ p: 4, width: "full" }} elevation={3}>
                <Typography variant="h6" gutterBottom>
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
                    <Button variant="contained" color="primary">Submit</Button>
                </Box>
            </Paper>

            <Box>
                <Typography variant="h6" gutterBottom>
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
