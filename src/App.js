import { styled } from 'styled-components';
import Background from './Components/Background';
import SystemSide from './Components/SystemSide/SystemSide';
import ButtonSide from './Components/ButtonSide';

const MainWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: var(--bg-100);
    color: var(--text-100);
`;

const Contents = styled.div`
    position: relative;
    width: 75%;
    height: 75%;
    border-radius: 20px;
    display: grid;
    grid-template-rows: 4fr 3fr;
    overflow: hidden;
`;

function App() {
    return (
        <MainWrapper>
            <Contents>
                <Background />
                <SystemSide />
                <ButtonSide />
            </Contents>
        </MainWrapper>
    );
}

export default App;
