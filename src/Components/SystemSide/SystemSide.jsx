import { styled } from 'styled-components';
// import components
import PlayStop from './PlayStop';
import Timer from './Timer';
import Counter from './Counter';

const SystemSideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 2rem;
    margin: 5rem 0 15rem 0;
    background-color: var(--bg-100);
    border-radius: 10px;
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
