export function enableMIDI(element) {
    let currentChord = []

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

    const onMIDISuccess = (midiAccess) => {
        const count = midiAccess.inputs.size
        midiCount.innerHTML = count
        for (var input of midiAccess.inputs.values()) {
            console.log("Connected midi device:", input.name)
            input.onmidimessage = getMIDIMessage;
        }
    }

    const onMIDIError = () => console.log('Could not access your MIDI devices.')

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIError);

    const renderChords = (chordsArray) => {
        const liItems = chordsArray.map((c) => `<li>${c}</li>`)
        const chords = document.getElementById("chords")
        chords.innerHTML = `${liItems.join("\n")}`
    }
    
    const processPlayedChord = (chord) => {
        currentChord = Tonal.Note.sortedNames(chord)
        const chordNames = Tonal.Chord.detect(currentChord, { assumePerfectFifth: true })
        renderChords(chordNames)
    }
    
    element.addEventListener('noteon', (event) => {
        const note = element.getElementsByTagName("button")[`midi_${event.detail.note}`]
        note.classList.add('keydown')
        const noteName = Tonal.Midi.midiToNoteName(event.detail.note)
        currentChord.push(noteName)
        processPlayedChord(currentChord)
    })
    
    element.addEventListener('noteoff', (event) => {
        const note = element.getElementsByTagName("button")[`midi_${event.detail.note}`]
        const noteName = Tonal.Midi.midiToNoteName(event.detail.note)
        currentChord = currentChord.filter((c) => c != noteName)
        note.classList.remove('keydown')
        processPlayedChord(currentChord)
    })
}

