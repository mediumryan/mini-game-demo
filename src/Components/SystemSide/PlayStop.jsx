import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
// import state data
import { isPlayingState, timerState } from '../../atom';
// import icons
import { FaPlay, FaStop } from 'react-icons/fa';

const Button = styled.button`
    color: var(--accent-100);
    font-size: 1.25rem;
    padding: 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    transition: 300ms transform;
    &:hover {
        transform: scale(1.25);
    }
`;

export default function PlayStop() {
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const setTimer = useSetRecoilState(timerState);

    return (
        <div>
            {(isPlaying === 'none') | (isPlaying === 'win') ? (
                <Button
                    onClick={() => {
                        setIsPlaying('playing');
                    }}
                >
                    <FaPlay />
                </Button>
            ) : (
                isPlaying === 'playing' && (
                    <Button
                        onClick={() => {
                            setIsPlaying('over');
                            setTimer(10);
                        }}
                    >
                        <FaStop />
                    </Button>
                )
            )}
        </div>
    );
}
