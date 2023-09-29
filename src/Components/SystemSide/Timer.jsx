import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { timerState } from '../../atom';

export const SystemTimer = styled.span`
    color: var(--text-100);
    background-color: var(--bg-200);
    font-size: var(--font-size-medium);
    padding: var(--padding-double-medium);
    margin: var(--margin-medium-large) 0;
    border: 5px solid var(--primary-200);
    border-radius: 8px;
    cursor: default;
`;

export default function Timer() {
    const [timer, setTimer] = useRecoilState(timerState);

    return <SystemTimer>00:{timer}</SystemTimer>;
}
