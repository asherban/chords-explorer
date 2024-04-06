import { Card, CardContent } from "@mui/material";
import Score from "./Score";
import PropTypes from 'prop-types';

function StaveCard({notes}) {
    return (
        <Card sx={{ width: '20em', padding: '10px 0', height: '12em', variant: "outlined", display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="outlined" square={true}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Score notes={notes}/>
            </CardContent>
        </Card>
    );
}
StaveCard.propTypes = {
    notes: PropTypes.array.isRequired
}

export default StaveCard;