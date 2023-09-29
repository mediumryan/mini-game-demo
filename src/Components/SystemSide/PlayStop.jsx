import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { isPlayingState } from '../../atom';
// icons
import { FaPlay, FaStop } from 'react-icons/fa';

const PlayStopWrapper = styled.div``;

const PlayButton = styled.button`
    color: var(--accent-100);
    background-color: var(--primary-100);
    border: 5px solid var(--primary-200);
    border-radius: 8px;
    font-size: var(--font-size-medium);
    margin: var(--margin-medium) 0;
    padding: var(--padding-small) var(--padding-medium);
    transition: 150ms all;
    &:hover {
        transform: scale(1.05);
    }
`;

const StopButton = styled(PlayButton)``;

export default function PlayStop() {
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    return (
        <PlayStopWrapper>
            {isPlaying === 'none' ? (
                <PlayButton>
                    <FaPlay />
                </PlayButton>
            ) : isPlaying === 'playing' ? (
                <StopButton>
                    <FaStop />
                </StopButton>
            ) : null}
        </PlayStopWrapper>
    );
}
