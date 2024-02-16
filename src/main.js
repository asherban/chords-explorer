import { initializeWeblock } from "./wakelock.mjs";
import { enableMIDI } from "./midi.js"

function initializeApp() {
    initializeWeblock()
    enableMIDI(midi);
}

initializeApp()