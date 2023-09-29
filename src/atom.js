import { atom } from 'recoil';

export const isPlayingState = atom({
    key: 'is_playing_state',
    default: 'none', // 'none' | 'playing' | 'over'
});
