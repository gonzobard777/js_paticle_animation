import {useCellState} from '@do-while-for-each/tree-cell-react';
import {useEffect, useRef, useState} from 'react';
import {CanvasAnimationController} from '../controller/canvas-animation.controller';
import s from './canvas-animation.module.css';
import {height, width} from '../../constant';

export function CanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [controller] = useState(() => new CanvasAnimationController());
  const [{}] = useCellState(() => controller.state);

  useEffect(() => {
    controller.setCanvasElement(canvasRef.current!);
    return () => controller.dispose();
  }, []);

  return (
    <canvas className={s.container}
            width={width} height={height}
            ref={canvasRef}/>
  );
}
