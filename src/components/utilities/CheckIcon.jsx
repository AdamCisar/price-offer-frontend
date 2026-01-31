import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckIcon = (props) => {

    if (props.selected) {
     return <CheckCircleIcon style={{ color: 'green', ...props.style }} />
    }
        
    return <PanoramaFishEyeIcon style={{ color: 'grey', ...props.style }} />;
}

export default CheckIcon