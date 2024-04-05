import Piano from './Piano';

export default {
    title: 'Components/Piano',
    component: Piano,
};

export const Default = {
    args: {
        notes: [],
    }
};

export const ChordPlayed = {
    args: {
        notes: [
            'C4',
            'D#4',
            'G4',
        ],
    }
};