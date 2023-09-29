import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { counterState } from '../../atom';
import { SystemTimer } from './Timer';

const SystemCounter = styled(SystemTimer)`
    margin: 0;
`;

export default function Counter() {
    const [counter, setCounter] = useRecoilState(counterState);

    return <SystemCounter>{counter}</SystemCounter>;
}
