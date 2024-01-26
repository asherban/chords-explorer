const getHz = (N = 0) => 440 * Math.pow(2, N / 12);
const notes = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
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

const render = (data) => data.map(item => `
  <button name="midi_${item.midi}" data-note="${item.note}${item.octave}"
  data-freq="${item.freq}" style="--gcs:${item.offset}" 
  type="button>"></button>`).join('\n')

kb88.innerHTML = render(freqs(-48, 40))

