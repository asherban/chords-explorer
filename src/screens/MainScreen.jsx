import AppHeader from "../components/AppHeader";
import Piano from "../Piano";
import ChordCard from "../components/ChordCard";
import Box from '@mui/material/Box';
import React from 'react';

function MainScreen() {
    const state = {
        midiCount: 1,
        wakeLock: true,
        notes: ["C4", "E4", "B4"],
        assumePerfectFifth: true,
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="header">
                <AppHeader {...state}/>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ChordCard {...state}/>
            </Box>
            <Box component="footer">
                <Piano/>
            </Box>
        </Box>
    );
}

export default MainScreen;