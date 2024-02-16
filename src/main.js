import { initializeWeblock } from "../bak/src/wakelock.mjs";
import { enableMIDI } from "./midi.js"

function initializeApp() {
    initializeWeblock()
    enableMIDI(midi);
}

initializeApp()