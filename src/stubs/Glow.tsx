import {Layout, LayoutProps} from '@motion-canvas/2d';
import {SignalValue} from '@motion-canvas/core';

export interface GlowProps extends LayoutProps {
  amount?: SignalValue<number>;
  copyOpacity?: SignalValue<number>;
}

export class Glow extends Layout {
  public constructor(props: GlowProps) {
    super({...props});
  }
}
