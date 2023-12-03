import {height, width} from '../../constant';

export class CanvasAnimationController {

  context: CanvasRenderingContext2D;

  constructor() {
  }

  get state() {
    return {
      hello: '123'
    };
  }

  setCanvasElement(canvasElement: HTMLCanvasElement) {
    this.context = canvasElement.getContext('2d')!;
    // this.runIntervaled();
    this.runInRaf();
  }


  x = -1;
  y = 400;
  step = 20;
  radius = 10;

  runIntervaled() {
    const intervalId = setInterval(() => {
      this.context.beginPath();
      this.x += this.step;
      // y += step;
      if (this.x > 1005) {
        clearInterval(intervalId);
        return;
      }
      requestAnimationFrame(() => {
        this.context.clearRect(0, 0, width, height);
        this.context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        this.context.fill();
        // this.context.stroke();
      });
    }, 1);
  }

  runInRaf() {
    // requestAnimationFrame(this.mainLoop.bind(this));
    // requestAnimationFrame(this.mainLoopWithTail.bind(this));
    requestAnimationFrame(this.mainLoopTrailGradient.bind(this));
  }

  mainLoop() {
    if (this.x > 1005) {
      return;
    }
    this.x += this.step;
    this.context.clearRect(0, 0, width, height);

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.fill();
    requestAnimationFrame(this.mainLoop.bind(this));
  }

  mainLoopWithTail() {
    if (this.x > 1005) {
      return;
    }
    this.x += this.step;
    this.context.clearRect(0, 0, width, height);

    for (let i = this.radius - 1; i >= 0; i--) {
      this.context.beginPath();
      const x = (this.x - i) * 7;
      const radius = this.radius - i;
      this.context.arc(x, this.y, radius, 0, 2 * Math.PI);
      this.context.fillStyle = "rgba(0, 0, 0, " + (this.radius - i) / 10 + ")";
      this.context.fill();
    }
    requestAnimationFrame(this.mainLoopWithTail.bind(this));
  }

  mainLoopTrailGradient() {
    const isOut = this.x > width + this.radius * 2;
    if (isOut) {
      return;
    }
    this.x += this.step;


    // Draw over the whole canvas to create the trail effect
    this.context.fillStyle = 'rgba(255, 255, 255, .05)';
    this.context.fillRect(0, 0, width, height);

    // Draw the dot
    this.context.beginPath();
    this.context.fillStyle = '#000000';
    this.context.moveTo(this.x, this.y);
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
    requestAnimationFrame(this.mainLoopTrailGradient.bind(this));
  }

  dispose() {
    this.context = null as any;
  }

}
