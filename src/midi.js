function enableMIDI(element) {
    const onMIDISuccess = (midiAccess) => {
        for (var input of midiAccess.inputs.values()) {
            console.log("Connected midi device:", input.name)
            input.onmidimessage = getMIDIMessage;
        }
    }

    onMIDIError = () => console.log('Could not access your MIDI devices.')

    const getMIDIMessage = message => {
        const [command, note, velocity] = message.data;
        switch (command) {
            case 144: // on
                if (velocity > 0) {
                    const event = new CustomEvent('noteon', { detail: { note, velocity } });
                    element.dispatchEvent(event)
                }
                break;
            case 128: // off
                const event = new CustomEvent('noteoff', { detail: { note } });
                element.dispatchEvent(event)
                break;
        }
    }

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIError);
}


enableMIDI(midi);

function sortNotes(notes) {
    const noteOrder = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
    
    return notes.sort((a, b) => {
        const octaveA = parseInt(a.slice(-1), 10);
        const octaveB = parseInt(b.slice(-1), 10);
        const noteA = a.slice(0, -1);
        const noteB = b.slice(0, -1);

        if (octaveA !== octaveB) {
            return octaveA - octaveB;
        } else {
            return noteOrder.indexOf(noteA) - noteOrder.indexOf(noteB);
        }
    });
}


currentChord = []

const renderChords = (chordsArray) => {
    const liItems = chordsArray.map((c) => `<li>${c}</li>`)
    chords = document.getElementById("chords")
    chords.innerHTML = `${liItems.join("\n")}`
}

const processPlayedChord = (chord) => {
    sortNotes(chord)
    chordNames = Tonal.Chord.detect(currentChord, { assumePerfectFifth: true })
    renderChords(chordNames)
}

midi.addEventListener('noteon', (event) => {
    const note = midi.getElementsByTagName("button")[`midi_${event.detail.note}`]
    note.classList.add('keydown')
    noteName = Tonal.Midi.midiToNoteName(event.detail.note)
    currentChord.push(noteName)
    processPlayedChord(currentChord)
})

midi.addEventListener('noteoff', (event) => {
    const note = midi.getElementsByTagName("button")[`midi_${event.detail.note}`]
    noteName = Tonal.Midi.midiToNoteName(event.detail.note)
    currentChord = currentChord.filter((c) => c != noteName)
    note.classList.remove('keydown')
    processPlayedChord(currentChord)
})