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

currentChord = []

midi.addEventListener('noteon', (event) => {
    const note = midi.getElementsByTagName("button")[`midi_${event.detail.note}`]
    note.classList.add('keydown')
    noteName = Tonal.Midi.midiToNoteName(event.detail.note)
    currentChord.push(noteName)
    chordNames = Tonal.Chord.detect(currentChord, { assumePerfectFifth: true })
    if (chordNames.length == 0) {
        chordNames = "Unknown"
    }
    chord.innerHTML = chordNames
    
    // note.style.setProperty('--v', event.detail.velocity)
})

midi.addEventListener('noteoff', (event) => {
    const note = midi.getElementsByTagName("button")[`midi_${event.detail.note}`]
    noteName = Tonal.Midi.midiToNoteName(event.detail.note)
    currentChord = currentChord.filter((c) => c != noteName)
    note.classList.remove('keydown')
    chordNames = Tonal.Chord.detect(currentChord, { assumePerfectFifth: true })
    if (chordNames.length == 0) {
        chordNames = "Unknown"
    }
    chord.innerHTML = chordNames
})