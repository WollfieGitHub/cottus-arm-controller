import {useEffect} from "react";
import useCottusArmViewModel from "./CottusArmViewModel";
import {Box, Card, CardMedia} from "@mui/material";
import CottusArmCanvas from "./canvas/CottusArmCanvas";

const CottusArmView = () => {
    const { getCottusArm, cottusArm } = useCottusArmViewModel();
    
    useEffect(() => {
        getCottusArm().then();
    }, [getCottusArm])
    
    return (<Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CottusArmCanvas articulations={[]} />
        </Box>
    </Card>)
}

export default CottusArmView;