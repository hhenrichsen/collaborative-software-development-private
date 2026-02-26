import { Colors } from "../";
import {
  computed,
  initial,
  Layout,
  LayoutProps,
  Rect,
  signal,
  Txt,
  TxtProps,
} from "@motion-canvas/2d";
import {
  clampRemap,
  createComputed,
  createRef,
  deepLerp,
  range,
  remap,
  SignalValue,
  SimpleSignal,
  ThreadGenerator,
  TimingFunction,
  Vector2,
} from "@motion-canvas/core";
import { Plot } from "./Plot";
import { getColorInArray, signum } from "../Util";

export interface BarChartProps extends LayoutProps {
  bars?: SignalValue<number[]>;
  labels?: SignalValue<string[]>;
  colors?: SignalValue<string[]>;
  min?: SignalValue<number>;
  max?: SignalValue<number>;
  ticks?: SignalValue<number>;
  labelProps?: SignalValue<TxtProps>;
}

export class BarChart extends Layout {
  @initial([50, 100])
  @signal()
  public declare readonly bars: SimpleSignal<number[]>;

  @initial([])
  @signal()
  private declare readonly nextBars: SimpleSignal<number[]>;

  @initial(["A", "B"])
  @signal()
  public declare readonly labels: SimpleSignal<string[]>;

  @initial([Colors.Catppuccin.Mocha.Green, Colors.Catppuccin.Mocha.Peach])
  @signal()
  public declare readonly colors: SimpleSignal<string[]>;

  @initial(0)
  @signal()
  public declare readonly min: SimpleSignal<number>;

  @initial(125)
  @signal()
  public declare readonly max: SimpleSignal<number>;

  @initial(5)
  @signal()
  public declare readonly ticks: SimpleSignal<number>;

  @initial({})
  @signal()
  public declare readonly labelProps: SimpleSignal<TxtProps>;

  @initial(0)
  @signal()
  private declare readonly barTweenProgress: SimpleSignal<number>;

  @computed()
  private deltaBars() {
    return this.nextBars().length - this.bars().length;
  }

  public constructor(props: BarChartProps) {
    super(props);

    const completeBars = createComputed(
      () =>
        Math.min(this.bars().length, this.labels().length) +
        this.deltaBars() *
          (signum(this.deltaBars()) > 0
            ? clampRemap(
                0,
                1 - 1 / (this.deltaBars() + 1),
                0,
                1,
                this.barTweenProgress()
              )
            : clampRemap(
                1 / this.deltaBars() + 1,
                1,
                0,
                1,
                this.barTweenProgress()
              ))
    );
    const width = createComputed(() => (0.8 * this.size.x()) / completeBars());
    const spacing = createComputed(
      () => (0.2 * this.size.x()) / completeBars() + 1
    );

    const plot = createRef<Plot>();

    this.add(
      <>
        <Plot
          ref={plot}
          minX={0}
          maxX={1}
          ticksX={1}
          minY={this.min}
          maxY={this.max}
          ticksY={this.ticks}
          size={this.size}
          labelFormatterX={() => ""}
        />
        ,
        <Layout size={this.size}>
          {() =>
            range(0, completeBars()).map((i) => {
              const timing =
                signum(this.deltaBars()) > 0
                  ? clampRemap(
                      1 / (this.deltaBars() + 1),
                      1,
                      0,
                      1,
                      this.barTweenProgress()
                    )
                  : clampRemap(
                      0,
                      1 - (1 / this.deltaBars() + 1),
                      0,
                      1,
                      this.barTweenProgress()
                    );
              const iSize = 1 / this.deltaBars();
              return (
                <Rect
                  x={() =>
                    -this.size().x / 2 +
                    i * (width() + spacing()) +
                    width() / 2 +
                    spacing() / 2
                  }
                  y={() => this.size().y / 2}
                  offset={Vector2.bottom}
                  width={width}
                  height={() =>
                    remap(
                      this.min(),
                      this.max(),
                      0,
                      this.size().y,
                      i < this.bars().length
                        ? this.bars()[i]
                        : (timing + signum(signum(this.deltaBars()) - 1)) *
                            this.nextBars()[i]
                    )
                  }
                  fill={() =>
                    getColorInArray(this.colors(), i, this.bars().length)
                  }
                />
              );
            })
          }
        </Layout>
        <Layout top={() => plot().bottom()} width={this.size.x}>
          {() =>
            range(0, completeBars()).map((i) => (
              <Txt
                x={() =>
                  -this.size().x / 2 +
                  i * (width() + spacing()) +
                  width() / 2 +
                  spacing() / 2
                }
                y={10}
                offset={Vector2.top}
                rotation={90}
                text={this.labels()[i]}
                fill={Colors.Catppuccin.Mocha.Text}
                fontSize={10}
                {...this.labelProps()}
              />
            ))
          }
        </Layout>
        ,
      </>
    );
  }

  public *tweenBars(
    bars: number[],
    duration: number,
    timingFunction: TimingFunction
  ): ThreadGenerator {
    if (this.bars().length == bars.length) {
      yield* this.bars.context.tweener(
        bars,
        duration,
        timingFunction,
        deepLerp
      );
    } else {
      this.nextBars(bars);
      this.barTweenProgress(0);
      yield* this.barTweenProgress(1, duration, timingFunction);
      this.bars(bars);
      this.barTweenProgress(0);
    }
  }
}
