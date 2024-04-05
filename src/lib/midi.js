import { requestWakeLock, releaseWakeLock } from './wakelock';

import { dispatch, ACTIONS } from './store';

let wakeLockTimer = null
const wakeLockTimeout = 5 * 1000 * 60 // 5 minutes

function resetWakeLockTimer() {
    if (wakeLockTimer !== null) {
        clearTimeout(wakeLockTimer)
    }
    wakeLockTimer = setTimeout(() => releaseWakeLock(), wakeLockTimeout)
    requestWakeLock()
}


export function enableMIDI() {
    const getMIDIMessage = message => {
        const [command, note, velocity] = message.data;
        switch (command) {
            case 144: // on
                if (velocity > 0) {
                    dispatch({ type: ACTIONS.ADD_MIDI_NOTE, payload: note })
                    resetWakeLockTimer()
                }
                break;
            case 128: // off
                dispatch({ type: ACTIONS.REMOVE_MIDI_NOTE, payload: note })
                resetWakeLockTimer()
                break;
        }
    }

    const onMIDISuccess = (midiAccess) => {
        const inputs = midiAccess.inputs.values()
        console.log("on midi success")
        let count = 0
        for (var input of inputs) {
            input.onmidimessage = null
        }
        midiAccess.onstatechange = ({ port }) => {
            console.log("onstatechange", port)
            if (port.state === "connected") {
                console.log(port.name, "connected")
                port.onmidimessage = getMIDIMessage
                count++
            } else {
                count--
            }
            dispatch({ type: ACTIONS.SET_MIDI_DEVICE_COUNT, payload: count })
        }
    }

    const onMIDIError = () => console.log('Could not access your MIDI devices.')

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIError);
}
