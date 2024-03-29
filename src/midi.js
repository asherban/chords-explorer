import { useCallback, useEffect, useState } from 'react';
import { requestWakeLock, releaseWakeLock } from './wakelock';

let wakeLockTimer = null
const wakeLockTimeout = 5 * 1000 * 60 // 5 minutes

function notifyNoteChangedEvent(notes) {
    const event = new CustomEvent("noteschanged", { detail: { notes } })
    document.dispatchEvent(event)

    if (wakeLockTimer !== null) {
        clearTimeout(wakeLockTimer)
    }
    wakeLockTimer = setTimeout(() => releaseWakeLock(), wakeLockTimeout)
    requestWakeLock()
}

export function enableMIDI() {
    let notes = []

    const addNote = note => {
        notes = [...notes, note]
        notes.sort()
    }

    const removeNote = note => {
        notes = notes.filter(i => i !== note)
    }

    const getMIDIMessage = message => {
        const [command, note, velocity] = message.data;
        switch (command) {
            case 144: // on
                if (velocity > 0) {
                    addNote(note)
                    notifyNoteChangedEvent(notes)
                }
                break;
            case 128: // off
                removeNote(note)
                notifyNoteChangedEvent(notes)
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
            const event = new CustomEvent("midideviceschange", { detail: { count } })
            document.dispatchEvent(event)
        }
    }

    const onMIDIError = () => console.log('Could not access your MIDI devices.')

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIError);
}

export function useNotes() {
    const [notes, setNotes] = useState([])
    const handleNotesChanged = useCallback(({ detail }) => setNotes([...detail.notes]), [notes])
    useEffect(() => {
        document.addEventListener("noteschanged", handleNotesChanged)

        return () => {
            document.removeEventListener("noteschanged", handleNotesChanged)
        }
    }, [handleNotesChanged])

    return notes
}