import { useContext } from "react";
import { UserInfoContext } from '../../providers/UserInfoProvider';
import Joyride from 'react-joyride';
import { steps } from '../../tutorial/tutorial';
import { useUniversalPost } from '../../api/UniversalPost';

const Tutorial = () => {
    const {userInfo, setUserInfo} = useContext(UserInfoContext);
      const [sendData, isLoading, error] = useUniversalPost("USER");

    const handleFinish = ({action}) => {
        if (action !== 'reset') {
            return;
        }

        setUserInfo((prevData) => {
            const updatedUser = { ...prevData, have_seen_tutorial: true };

            sendData(updatedUser);
            
            return updatedUser;
        });
    }

    return (
        <Joyride
            steps={steps}
            run={!userInfo.have_seen_tutorial}
            scrollToFirstStep={true}
            continuous={true}
            showSkipButton={false}
            locale={{
                next: 'Ďalej',
                skip: 'Preskočiť',
                back: 'Späť',
                last: 'Koniec',
            }}
            callback={handleFinish}
        />
    );
}

export default Tutorial;