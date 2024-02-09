import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
// import state data
import { carrotCountState, isPlayingState, timerState } from '../../atom';

export const TimerCounter = styled.span`
    color: var(--text-100);
    font-size: 1.15rem;
    margin: 0.5rem;
`;

export default function Timer() {
    const [timer, setTimer] = useRecoilState(timerState);
    const [isPlay, setIsPlay] = useRecoilState(isPlayingState);
    const setCarrot = useSetRecoilState(carrotCountState);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isPlay === 'playing') {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current); // 타이머 종료
                        return 0;
                    }
                    return prev - 1;
                });

                if (timer <= 1) {
                    setIsPlay('over'); // 타이머 종료 상태 설정
                    setTimer(10);
                    setCarrot(5);
                }
            }, 1000);
        } else {
            // isPlay가 'playing'이 아닌 경우, 타이머 종료
            clearInterval(intervalRef.current);
            setCarrot(5);
        }

        // 컴포넌트 언마운트 시 clearInterval을 호출하여 메모리 누수 방지
        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isPlay, setTimer, setIsPlay, timer]);

    return <TimerCounter>00:{timer}</TimerCounter>;
}
