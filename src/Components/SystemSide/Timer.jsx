import React, { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { carrotCountState, isPlayingState, timerState } from '../../atom';

export const SystemTimer = styled.span`
    color: var(--text-100);
    background-color: var(--bg-200);
    font-size: var(--font-size-medium);
    padding: var(--padding-double-medium);
    margin: var(--margin-medium-large) 0;
    border: 5px solid var(--primary-200);
    border-radius: 8px;
    cursor: default;
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

    return <SystemTimer>00:{timer}</SystemTimer>;
}
