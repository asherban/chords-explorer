import { Card, CardContent, Typography } from '@mui/material';
import { Chord } from 'tonal';
import PropTypes from 'prop-types';

const ChordCard = ({ notes, assumePerfectFifth }) => {
    const chords = Chord.detect(notes, { assumePerfectFifth: assumePerfectFifth });

    return (
        <Card sx={{ width: '30em', padding: '10px 0', height: '12em' }} variant="none" square={true}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h2" component="h2" style={{ marginBottom: '30px' }}>
                    {chords[0]}
                </Typography>
                <Typography variant="h5" color="textSecondary" component="p" style={{ textAlign: 'center' }}>
                    {chords.slice(1).join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
};
ChordCard.propTypes = {
    notes: PropTypes.array.isRequired,
    assumePerfectFifth: PropTypes.bool.isRequired
};

export default ChordCard;