import { Card, CardContent } from "@mui/material";
import { Flow } from "vexflow";
import Score from "./Score";

function StaveCard({notes}) {
    return (
        <Card sx={{ width: '20em', padding: '10px 0', height: '12em', variant: "outlined", display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="outlined" square={true}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Score notes={notes}/>
            </CardContent>
        </Card>
    );
}

export default StaveCard;