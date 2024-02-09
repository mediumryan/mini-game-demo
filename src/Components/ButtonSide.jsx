import { memo, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
// import state data
import {
    bugCountState,
    carrotCountState,
    isPlayingState,
    rectHeight,
    rectWidth,
    timerState,
} from '../atom';
// import images
import BUG from './../Images/bug.png';
import CARROT from './../Images/carrot.png';

const ButtonSideWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 75%;
`;

const Bug = styled.img`
    display: ${(props) => (props.play === 'playing' ? 'block' : 'none')};
    position: absolute;
    width: 50px;
    height: 50px;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}px;
    cursor: pointer;
`;

const Carrot = styled(Bug)``;

const ButtonSide = () => {
    const elementRef = useRef(null);
    const [width, setWidth] = useRecoilState(rectWidth);
    const [height, setHeight] = useRecoilState(rectHeight);

    useEffect(() => {
        const element = elementRef.current;
        if (element) {
            const rect = element.getBoundingClientRect();
            setWidth(rect.width);
            setHeight(rect.height);
        }
    }, []);

    // 랜덤 좌표 생성
    const getRandomCoordinate = (maxValue) => {
        return Math.floor(Math.random() * maxValue);
    };

    // 카운트
    const bugCount = useRecoilValue(bugCountState);
    const [carrotCount, setCarrotCount] = useRecoilState(carrotCountState);

    // 플레이 상태
    const [isPlay, setIsPlay] = useRecoilState(isPlayingState);

    // 타이머
    const setTimer = useSetRecoilState(timerState);

    return (
        <ButtonSideWrapper ref={elementRef}>
            {/* 버그 요소들 배치 */}
            {Array.from({ length: bugCount }, (_, index) => (
                <Bug
                    src={BUG}
                    alt="bug"
                    key={index}
                    top={getRandomCoordinate(height - 50)}
                    left={getRandomCoordinate(width - 50)}
                    play={isPlay}
                    onClick={() => {
                        setIsPlay('over');
                        setTimer(10);
                        setCarrotCount(5);
                    }}
                />
            ))}
            {/* 당근 요소들 배치 */}
            {Array.from({ length: carrotCount }, (_, index) => (
                <Carrot
                    src={CARROT}
                    alt="carrot"
                    key={index}
                    top={getRandomCoordinate(height - 50)}
                    left={getRandomCoordinate(width - 50)}
                    play={isPlay}
                    onClick={() => {
                        // carrotCount를 1 줄이기
                        if (carrotCount === 1) {
                            setIsPlay('win');
                            setTimer(10);
                            setCarrotCount(5);
                            return;
                        }
                        setCarrotCount((prevCount) => prevCount - 1);
                    }}
                />
            ))}
        </ButtonSideWrapper>
    );
};

export default memo(ButtonSide);
