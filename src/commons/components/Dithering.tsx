import {initial, Layout, LayoutProps, signal} from '@motion-canvas/2d';
import ditheringShader from './dithering.glsl?raw';
import {SignalValue, SimpleSignal} from '@motion-canvas/core';

export interface DitheringProps extends LayoutProps {
  levels?: SignalValue<number>;
  strength?: SignalValue<number>;
  pixelSize?: SignalValue<number>;
}

export class Dithering extends Layout {
  @initial(4)
  @signal()
  public declare readonly levels: SimpleSignal<number>;

  @initial(1)
  @signal()
  public declare readonly strength: SimpleSignal<number>;

  @initial(1)
  @signal()
  public declare readonly pixelSize: SimpleSignal<number>;

  public constructor(props: DitheringProps) {
    super({
      ...props,
    });
    this.shaders(() => ({
      fragment: ditheringShader,
      uniforms: {
        levels: this.levels(),
        strength: this.strength(),
        pixelSize: this.pixelSize(),
      },
    }));
  }
}
