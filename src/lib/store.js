import { produce } from "immer";
import { Midi, Note } from "tonal";
import { enableMIDI } from "./midi";


let state = {
    notesPlaying: [],
    midiDeviceCount: 0,
    wakeLock: false,
    assumePerfectFifth: true,
}

export const ACTIONS = {
    ADD_MIDI_NOTE: 'ADD_MIDI_NOTE',
    REMOVE_MIDI_NOTE: 'REMOVE_MIDI_NOTE',
    SET_PLAYING_NOTES: 'SET_PLAYING_NOTES',
    SET_MIDI_DEVICE_COUNT: 'SET_MIDI_DEVICE_COUNT',
    SET_WAKE_LOCK: 'SET_WAKE_LOCK',
};

let listeners = [];

const emitChange = () => {
    listeners.forEach(listener => {
        listener();
    });
}

export const dispatch = (action) => {
    state = produce(state, (draft) => {
        switch (action.type) {
            case ACTIONS.ADD_MIDI_NOTE: {
                const newNote = Midi.midiToNoteName(action.payload)
                draft.notesPlaying.push(newNote)
                draft.notesPlaying = Note.sortedUniqNames(draft.notesPlaying)
                break;
            }
            case ACTIONS.REMOVE_MIDI_NOTE: {
                const noteToRemove = Midi.midiToNoteName(action.payload)
                draft.notesPlaying = draft.notesPlaying.filter(note => note !== noteToRemove)
                break;
            }
            case ACTIONS.SET_PLAYING_NOTES:
                draft.notesPlaying = action.payload
                break;
            case ACTIONS.SET_MIDI_DEVICE_COUNT:
                draft.midiDeviceCount = action.payload
                break;
            case ACTIONS.SET_WAKE_LOCK:
                draft.wakeLock = action.payload
                break;
            default:
                return draft;
        }
    });
    emitChange();
};

export const initializeStore = () => {
    enableMIDI(dispatch);
}

export const subscribe = (listener) => {
    listeners = [...listeners, listener];
    return () => {
        listeners = listeners.filter(l => l !== listener);
    };
};

export const getSnapshotData = () => {
    return state;
}


