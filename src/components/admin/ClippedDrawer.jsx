import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from '@mui/material';
import india from "../../assets/india1440.png"
import india1 from "../../assets/india420.png"
import { useNavigate, Link } from 'react-router-dom';
import ImageWithText from '../imageWithText/ImageWithText';


export default function ClippedDrawer({ children }) {
    const navigate = useNavigate()
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ImageWithText image={isSmallScreen ? india1 : india} />
            <Toolbar />
            {children}
        </Box>
    );
}
