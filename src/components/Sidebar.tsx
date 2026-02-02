'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import BookIcon from '@mui/icons-material/MenuBook';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme, Theme, CSSObject, styled } from '@mui/material/styles';

const drawerWidth = 280;

const pages = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'About & CV', path: '/about', icon: <PersonIcon /> },
    { name: 'Projects', path: '/projects', icon: <WorkIcon /> },
    { name: 'Blog', path: '/blog', icon: <ArticleIcon /> },
    { name: 'Reading List', path: '/reading', icon: <BookIcon /> },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const pathname = usePathname();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
            <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar
                    sx={{ width: 120, height: 120, mb: 2, border: `4px solid ${theme.palette.background.default}` }}
                    alt="Elyas Heidari"
                    src="/profile.jpg" // Placeholder, user might need to add this
                >
                    EH
                </Avatar>
                <Typography variant="h5" component="div" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                    Elyas Heidari
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    PhD Researcher @ DKFZ
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton href="https://github.com/EliHei2" target="_blank" size="small" color="primary">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton href="https://linkedin.com/in/elyas-heidari" target="_blank" size="small" color="primary">
                        <LinkedInIcon />
                    </IconButton>
                </Box>
            </Box>

            <Divider sx={{ mx: 2 }} />

            <List sx={{ px: 2, py: 2 }}>
                {pages.map((page) => {
                    const isActive = pathname === page.path;
                    return (
                        <ListItem key={page.name} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={Link}
                                href={page.path}
                                selected={isActive}
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.contrastText',
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'inherit' : 'text.secondary' }}>
                                    {page.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={page.name}
                                    primaryTypographyProps={{ fontWeight: isActive ? 600 : 400 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Box sx={{ mt: 'auto', p: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    © {new Date().getFullYear()} Elyas Heidari
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Mobile Menu Button */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' }, position: 'fixed', top: 16, left: 16, zIndex: 1200, bgcolor: 'background.paper', boxShadow: 1 }}
            >
                <MenuIcon />
            </IconButton>

            {/* Desktop Drawer */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid rgba(255,255,255,0.05)' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
