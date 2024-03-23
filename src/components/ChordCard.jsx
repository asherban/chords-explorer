import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Chord } from 'tonal';

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

export default ChordCard;