import { useEffect } from "react";

export const useAudio = (src) => {
    const playSound = () => {
        const audio = new Audio(src);
        audio.play();
    };

    return playSound;
}