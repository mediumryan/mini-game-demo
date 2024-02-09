import { atom, selector } from 'recoil';

// rect of the buttonSide
export const rectWidth = atom({
    key: 'rect_width',
    default: 0,
});
export const randWidth = selector({
    key: 'random_width',
    get: ({ get }) => {
        const width = get(rectWidth);
        return Math.random() * width;
    },
});
export const rectHeight = atom({
    key: 'rect_height',
    default: 0,
});
export const randHeight = selector({
    key: 'random_height',
    get: ({ get }) => {
        const height = get(rectHeight);
        return Math.random() * height;
    },
});
// playing
export const isPlayingState = atom({
    key: 'is_playing_state',
    default: 'none', // 'none' | 'playing' | 'over' | 'win'
});
// timer
export const timerState = atom({
    key: 'timer_state',
    default: 10,
});
// counter
export const carrotCountState = atom({
    key: 'carrot_count',
    default: 5,
});
export const bugCountState = atom({
    key: 'bug_count',
    default: 10,
});
