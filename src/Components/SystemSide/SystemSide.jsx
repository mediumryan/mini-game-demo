import { styled } from 'styled-components';
import PlayStop from './PlayStop';
import Timer from './Timer';
import Counter from './Counter';

const SystemSideWrapper = styled.div`
    z-index: 2;
    display: flex;
    flex-direction: column;
`;

export default function SystemSide() {
    return (
        <SystemSideWrapper>
            <PlayStop />
            <Timer />
            <Counter />
        </SystemSideWrapper>
    );
}
