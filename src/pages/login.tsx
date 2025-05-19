import  { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import * as React from 'react';
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    navigate("/")
                } else {
                    console.warn('No access_token in response');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url("https://www.axians.co.uk/app/uploads/sites/75/2024/08/AdobeStock_472181971-scaled.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    backgroundColor: 'white', 
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            style={{ backgroundColor: "#5800fc" }}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};