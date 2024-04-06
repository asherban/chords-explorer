import AppHeader from "../components/AppHeader";
import Piano from "../components/Piano";
import ChordCard from "../components/ChordCard";
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function MainScreen({state}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="header">
                <AppHeader midiCount={state.midiDeviceCount} wakeLock={state.wakeLock}/>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ChordCard notes={state.notesPlaying} assumePerfectFifth={state.assumePerfectFifth}/>
            </Box>
            <Box component="footer">
                <Piano notes={state.notesPlaying}/>
            </Box>
        </Box>
    );
}
MainScreen.propTypes = {
    state: PropTypes.object.isRequired
}

export default MainScreen;