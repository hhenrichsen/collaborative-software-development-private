import {Layout, LayoutProps} from '@motion-canvas/2d';
import {SignalValue, PossibleVector2} from '@motion-canvas/core';

export interface ScanlineProps extends LayoutProps {
  reflectionOffset?: SignalValue<PossibleVector2>;
  rowSize?: SignalValue<number>;
  baseBrightness?: SignalValue<number>;
  effectStrength?: SignalValue<number>;
  maxBrightness?: SignalValue<number>;
  scanSpeed?: SignalValue<number>;
}

export class Scanlines extends Layout {
  public constructor(props: ScanlineProps) {
    super({...props});
  }
}
