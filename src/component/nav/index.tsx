import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import {useEffect, useMemo, useState} from 'react';

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const token = localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token, isAuthenticated]);

    useEffect(() => {
        const onStorageChange = () => {
            const token = localStorage.getItem('access_token');
            setIsAuthenticated(!!token);
        };

        window.addEventListener('storage', onStorageChange);

        onStorageChange();

        return () => window.removeEventListener('storage', onStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false)
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const staticPages = [
        { name: 'Home Page', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const authPages =useMemo(() => {
        return isAuthenticated
            ? [
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Logout', path: '#' }, // Handled separately
            ]
            : [
                { name: 'Sign In', path: '/sign-in' },
                { name: 'Sign Up', path: '/sign-up' },
            ]
    },[isAuthenticated,token]);

    const pages = [...staticPages, ...authPages];

    return (
        <AppBar position="static" sx={{ width: '100%', backgroundColor: "#5800fc" }}>
            <Container maxWidth={false} disableGutters>
                <Toolbar disableGutters>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 8, width: '10px' }} />

                    {/* Mobile Menu Button */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="navigation menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map(({ name, path }) => (
                                <MenuItem
                                    key={name}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        if (name === 'Logout') handleLogout();
                                    }}
                                >
                                    <Typography textAlign="center">
                                        {name === 'Logout' ? (
                                            'Logout'
                                        ) : (
                                            <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                {name}
                                            </Link>
                                        )}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Desktop Menu */}
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex', gap: 44 },
                            justifyContent: { md: 'center' }
                        }}
                    >
                        {pages.map(({ name, path }) =>
                            name === 'Logout' ? (
                                <Button
                                    key={name}
                                    onClick={handleLogout}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    key={name}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    to={path}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {name}
                                </Button>
                            )
                        )}
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 8, width: '10px' }} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
