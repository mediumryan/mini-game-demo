import { styled } from 'styled-components';
// import components
import SystemSide from './Components/SystemSide/SystemSide';
import ButtonSide from './Components/ButtonSide';
import Modal from './Components/Modal/Modal';
// import images
import bg from './Images/background.png';

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(${bg}) center;
    background-size: cover;
`;

function App() {
    return (
        <MainWrapper>
            <SystemSide />
            <ButtonSide />
            <Modal />
        </MainWrapper>
    );
}

export default App;
