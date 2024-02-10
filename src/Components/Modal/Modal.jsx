import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
// import state data
import { isPlayingState, timerState } from '../../atom';
// import icons
import { FaArrowRotateRight } from 'react-icons/fa6';
import { ImHappy2, ImSad2 } from 'react-icons/im';

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${(props) =>
        props.play === 'playing' || props.play === 'none' ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--bg-100);
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 2;
`;

const ModalInner = styled.div`
    width: 30%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 3px solid white;
    font-size: 1.25rem;
    padding: 1rem;
    & > p {
        text-align: center;
        line-height: 1.5;
        letter-spacing: 2px;
    }
    @media only screen and (min-width: 320px) and (max-width: 768px) {
        width: 75%;
        height: 25%;
    }
`;

const ModalRetry = styled.button`
    color: var(--bg-100);
    font-size: 1.5rem;
    padding: 1rem;
    transition: 300ms all;
    &:hover {
        transform: scale(1.05);
        color: var(--accent-100);
    }
`;

export default function Modal() {
    const [isPlay, setIsPlay] = useRecoilState(isPlayingState);
    const setTimer = useSetRecoilState(timerState);

    return (
        <ModalWrapper play={isPlay}>
            <ModalInner>
                <p>
                    {isPlay === 'over' ? (
                        <ImSad2 />
                    ) : (
                        isPlay === 'win' && <ImHappy2 />
                    )}
                </p>
                <p>
                    {isPlay === 'over'
                        ? 'Failed, wanna retry again?'
                        : isPlay === 'win' && 'Success. Congratulations!'}
                </p>
                <ModalRetry
                    onClick={() => {
                        setIsPlay('playing');
                        setTimer(10);
                    }}
                >
                    <FaArrowRotateRight />
                </ModalRetry>
            </ModalInner>
        </ModalWrapper>
    );
}
