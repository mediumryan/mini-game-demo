import { styled } from 'styled-components';
import Bg from './../Images/background.png';

const BackgroundImg = styled.img`
    position: absolute;
    width: 100%;
    z-index: 1;
`;

export default function Background() {
    return <BackgroundImg src={Bg} alt="Background Image" />;
}
