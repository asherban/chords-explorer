// ChordCard.stories.jsx
import ChordCard from './ChordCard';

export default {
  title: 'Components/ChordCard',
  component: ChordCard,
};

export const Default = {
    args: {
        notes: ["C4", "E4", "B4"],
        assumePerfectFifth: true,
    },
}

export const SingleChord = {
    args: {
        notes: ["C4", "E4", "B4"],
        assumePerfectFifth: true,
    },
}