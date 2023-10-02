import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { SystemTimer } from './Timer';
import { carrotCountState } from '../../atom';

const SystemCounter = styled(SystemTimer)`
    margin: 0;
`;

export default function Counter() {
    const [carrotCount, setCarrotCount] = useRecoilState(carrotCountState);

    return <SystemCounter>{carrotCount}</SystemCounter>;
}
