import {initial, Layout, LayoutProps, vector2Signal} from '@motion-canvas/2d';
import chromaticAberration from './chromaticaberration.glsl?raw';
import {PossibleVector2, SignalValue, Vector2Signal} from '@motion-canvas/core';

export interface ChromaticAberrationProps extends LayoutProps {
  redOffset?: SignalValue<PossibleVector2>;
  greenOffset?: SignalValue<PossibleVector2>;
  blueOffset?: SignalValue<PossibleVector2>;
}

export class ChromaticAberration extends Layout {
  @initial([-2, 0])
  @vector2Signal('redOffset')
  public declare readonly redOffset: Vector2Signal;

  @initial([0, 0])
  @vector2Signal('greenOffset')
  public declare readonly greenOffset: Vector2Signal;

  @initial([2, 0])
  @vector2Signal('blueOffset')
  public declare readonly blueOffset: Vector2Signal;

  public constructor(props: ChromaticAberrationProps) {
    super({
      ...props,
    });
    this.shaders(() => ({
      fragment: chromaticAberration,
      uniforms: {
        redOffset: this.redOffset(),
        greenOffset: this.greenOffset(),
        blueOffset: this.blueOffset(),
      },
    }));
  }
}
