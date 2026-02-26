import {initial, Layout, LayoutProps, signal} from '@motion-canvas/2d';
import chromaticAberration from './chromaticaberration.glsl?raw';
import {SignalValue, SimpleSignal} from '@motion-canvas/core';

export interface ChromaticAberrationProps extends LayoutProps {
  radius?: SignalValue<number>;
}

export class ChromaticAberration extends Layout {
  @initial(1)
  @signal()
  public declare readonly radius: SimpleSignal<number>;

  public constructor(props: ChromaticAberrationProps) {
    super({
      ...props,
    });
    this.shaders({
      fragment: chromaticAberration,
      uniforms: {
        radius: this.radius,
      },
    });
  }
}
