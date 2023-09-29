import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { rectHeight, rectWidth } from '../atom';

const ButtonSideWrapper = styled.div`
    z-index: 2;
`;

export default function ButtonSide() {
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

    console.log(width, height);

    return <ButtonSideWrapper ref={elementRef}>ButtonSide</ButtonSideWrapper>;
}
