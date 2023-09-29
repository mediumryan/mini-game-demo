import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { isPlayingState } from '../../atom';

const PlayStopWrapper = styled.div``;

const PlayButton = styled.button``;

const StopButton = styled(PlayButton)``;

export default function PlayStop() {
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    return (
        <PlayStopWrapper>
            {isPlaying === 'none' ? (
                <PlayButton></PlayButton>
            ) : isPlaying === 'playing' ? (
                <StopButton></StopButton>
            ) : null}
        </PlayStopWrapper>
    );
}
