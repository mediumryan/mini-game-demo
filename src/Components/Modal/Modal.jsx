import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { isPlayingState, timerState } from '../../atom';
import { FaArrowRotateRight } from 'react-icons/fa6';
import { ImHappy2, ImSad2 } from 'react-icons/im';

const ModalWrapper = styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 50%;
    background-color: rgba(0, 0, 0, 0.75);
    color: var(--bg-300);
    z-index: 2;
    display: ${(props) =>
        props.play === 'playing' || props.play === 'none' ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    span {
        font-size: var(--font-size-large);
    }
    p {
        font-size: var(--font-size-medium);
    }
`;

const ModalRetry = styled.button`
    color: var(--text-100);
    background-color: var(--bg-300);
    border-radius: 8px;
    font-size: var(--font-size-medium-large);
    padding: var(--padding-small) var(--padding-medium);
    margin-top: var(--margin-medium-large);
    transition: 150ms all;
    &:hover {
        transform: scale(1.05);
    }
`;

export default function Modal() {
    const [isPlay, setIsPlay] = useRecoilState(isPlayingState);
    const setTimer = useSetRecoilState(timerState);

    return (
        <ModalWrapper play={isPlay}>
            <span>
                {isPlay === 'over' ? (
                    <ImSad2 />
                ) : isPlay === 'win' ? (
                    <ImHappy2 />
                ) : null}
            </span>
            <p>
                {isPlay === 'over'
                    ? 'You fail, wanna retry?'
                    : isPlay === 'win'
                    ? 'You Win! Congratulation!'
                    : null}
            </p>
            <ModalRetry
                onClick={() => {
                    setIsPlay('playing');
                    setTimer(10);
                }}
            >
                <FaArrowRotateRight />
            </ModalRetry>
        </ModalWrapper>
    );
}
