import Score from './Score';

export default {
  title: 'Components/Score',
  component: Score,
};

export const Default = {
    args: {
      notes: [
        "C4", "E4", "G4"
      ],
    },
};

export const Empty = {
  args: {
    notes: [],
  },
};
