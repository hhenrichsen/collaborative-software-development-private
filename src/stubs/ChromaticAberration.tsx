import {Layout, LayoutProps} from '@motion-canvas/2d';
import {SignalValue} from '@motion-canvas/core';

export interface ChromaticAberrationProps extends LayoutProps {
  radius?: SignalValue<number>;
}

export class ChromaticAberration extends Layout {
  public constructor(props: ChromaticAberrationProps) {
    super({...props});
  }
}
