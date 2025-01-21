import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckIcon = ({ selected }) => {

    if (selected) {
     return <CheckCircleIcon style={{ color: 'green' }} />
    }
        
    return <PanoramaFishEyeIcon style={{ color: 'grey' }} />;
}

export default CheckIcon