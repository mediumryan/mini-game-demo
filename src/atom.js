import { atom } from 'recoil';

// button side Rect
export const rectWidth = atom({
    key: 'rect_width',
    default: 0,
});
export const rectHeight = atom({
    key: 'rect_height',
    default: 0,
});
// playing
export const isPlayingState = atom({
    key: 'is_playing_state',
    default: 'none', // 'none' | 'playing' | 'over'
});
// timer
export const timerState = atom({
    key: 'timer_state',
    default: 10,
});
// counter
export const counterState = atom({
    key: 'counter_state',
    default: 5,
});
