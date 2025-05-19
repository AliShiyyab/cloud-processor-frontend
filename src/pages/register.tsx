import * as React from 'react';
import { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // @ts-ignore
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                setSuccessMessage('Registration successful!');
                navigate('/sign-in');
            } else {
                const data = await response.json();
                toast('Registration failed');
            }
        } catch (error: any) {
            toast("error.message");
            console.error('Error:', error);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage:
                    'url("https://www.axians.co.uk/app/uploads/sites/75/2024/08/AdobeStock_472181971-scaled.jpeg")',
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        Register
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            autoFocus
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {errorMessage && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}

                        {successMessage && (
                            <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
                                {successMessage}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: '#5800fc' }}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};
