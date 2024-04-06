import './Piano.css'
import PropTypes from 'prop-types'

const getHz = (N = 0) => 440 * Math.pow(2, N / 12);
const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const freqs = (start, end) => {
    let black = 0,
        white = -2;
    return Array(end - start)
        .fill()
        .map((_, i) => {
            const key = (start + i) % 12;
            const midi = start + i + 69 /* A4 === MIDI note number 69 */
            const note = notes[key < 0 ? 12 + key : key];
            const octave = Math.ceil(4 + (start + i) / 12);
            if (i === 0 && note === "C") black = -3;
            note.includes("#")
                ? ((black += 3), ["C#", "F#"].includes(note)
                    && (black += 3))
                : (white += 3);

            return {
                note,
                midi: midi,
                freq: getHz(start + i),
                octave: note === "B" || note === "A#"
                    ? octave - 1 : octave,
                offset: note.includes("#") ? black : white,
            };
        });
};

const keysData = freqs(-48, 40)

function PianoKey({ note, offset, pressed }) {
    return <div
        className={pressed ? "keydown" : null}
        name={note}
        data-note={note}
        style={{ "--gcs": offset }}
        type="button"
    ></div>
}
PianoKey.propTypes = {
    note: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    pressed: PropTypes.bool.isRequired
}

function Piano({notes}) {
    return (
        <div className="synth">
            <h2>PIANO</h2>
            <div id="kb88" className="kb kb--88">
                {keysData.map(item => {
                    const note = `${item.note}${item.octave}`;
                    const pressed = notes.indexOf(note) >=0;
                    return <PianoKey key={note} pressed={pressed} note={note} offset={item.offset}></PianoKey>
            })}
            </div>
        </div>
    )
}
Piano.propTypes = {
    notes: PropTypes.array.isRequired
}

export default Piano