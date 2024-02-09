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
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border: 3px solid white;
    font-size: 1.25rem;
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
                <p className="modal_emoji">
                    {isPlay === 'over' ? (
                        <ImSad2 />
                    ) : (
                        isPlay === 'win' && <ImHappy2 />
                    )}
                </p>
                <p className="modal_message">
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
