import { useNotes } from "./midi"
import { Chord, Midi } from "tonal"

function notesToChords(midiNotes) {
    const notes = midiNotes.map(n => Midi.midiToNoteName(n))
    return Chord.detect(notes, { assumePerfectFifth: true })
}

export default function() {
    const notes = useNotes()
    
    const [primary, ...secondaries] = notesToChords(notes)
    return <div className="flex flex-col items-center">
        <h1 className="text-8xl font-bold text-slate-950 p-6">{primary}</h1>
        <h2 className="text-4xl text-slate-500">{secondaries.join(", ")}</h2>
    </div>
}