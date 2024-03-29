import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
// import components
import { TimerCounter } from './Timer';
// impor state data
import { carrotCountState } from '../../atom';

export default function Counter() {
    const [carrotCount, setCarrotCount] = useRecoilState(carrotCountState);

    return (
        <TimerCounter style={{ color: carrotCount === 1 && '#61398f' }}>
            {carrotCount}
        </TimerCounter>
    );
}
