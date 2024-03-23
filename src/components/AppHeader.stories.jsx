import AppHeader from "./AppHeader";

export default {
    component: AppHeader,
    title: "AppHeader",
    // tags: ["autodocs"],
};

export const Default = {
    args: {
        midiCount: 0,
        wakeLock: false,
    }
};

export const MidiConnected = {
    args: {
        ...Default.args,
        midiCount: 2,
    }
};

export const WakeLockSet = {
    args: {
        ...Default.args,
        midiCount: 1,
        wakeLock: true,
    }
};