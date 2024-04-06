import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

import PianoIcon from '@mui/icons-material/Piano';
import PianoOffIcon from '@mui/icons-material/PianoOff';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ScreenLockPortraitIcon from '@mui/icons-material/ScreenLockPortrait';
import PropTypes from 'prop-types';


export default function AppHeader({ midiCount, wakeLock }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Chords Explorer
                    </Typography>
                    {wakeLock && <ScreenLockPortraitIcon/> }
                    <Badge badgeContent={midiCount} color="primary">
                        { midiCount ? <PianoIcon /> : <PianoOffIcon/>}
                    </Badge>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
AppHeader.propTypes = {
    midiCount: PropTypes.number.isRequired,
    wakeLock: PropTypes.bool.isRequired
};