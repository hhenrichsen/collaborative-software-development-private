import {initial, Layout, signal} from '@motion-canvas/2d';
import {SimpleSignal} from '@motion-canvas/core';
import {RoughCanvas} from 'roughjs/bin/canvas';

export class Rough extends Layout {
  @initial(10)
  @signal()
  public declare readonly roughness: SimpleSignal<number>;

  protected draw(context: CanvasRenderingContext2D): void {
    if (this.clip()) {
      const size = this.computedSize();
      if (size.width === 0 || size.height === 0) {
        return;
      }

      context.beginPath();
      context.rect(size.width / -2, size.height / -2, size.width, size.height);
      context.closePath();
      context.clip();
    }

    const element = document.createElement('canvas');
    const ctx = element.getContext('2d');
    const roughCanvas = new RoughCanvas(element);
    const canvasProxy = new Proxy(context, {
      get(target, prop) {
        if (prop in roughCanvas) {
          return roughCanvas[prop].bind(roughCanvas);
        }
        return ctx[prop].bind(ctx);
      },
    });

    this.drawChildren(canvasProxy);
    context.drawImage(element, 0, 0);
  }
}
