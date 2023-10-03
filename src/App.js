import { styled } from 'styled-components';
import Background from './Components/Background';
import SystemSide from './Components/SystemSide/SystemSide';
import ButtonSide from './Components/ButtonSide';
import Modal from './Components/Modal/Modal';

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
    width: 100%;
    height: 100%;
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
                <Modal />
            </Contents>
        </MainWrapper>
    );
}

export default App;
