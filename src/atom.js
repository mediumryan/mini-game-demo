import { atom } from 'recoil';

export const isPlayingState = atom({
    key: 'is_playing_state',
    default: 'none', // 'none' | 'playing' | 'over'
});

export const timerState = atom({
    key: 'timer_state',
    default: 10,
});

export const counterState = atom({
    key: 'counter_state',
    default: 5,
});
