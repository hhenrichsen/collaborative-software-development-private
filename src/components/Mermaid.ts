import {
  BBox,
  DependencyContext,
  SerializedVector2,
  SignalValue,
  SimpleSignal,
  useLogger,
} from '@motion-canvas/core';
import {DesiredLength} from '@motion-canvas/2d/lib/partials';
import {computed, initial, signal} from '@motion-canvas/2d/lib/decorators';
import {Rect, RectProps} from '@motion-canvas/2d';
import mermaid from 'mermaid';
import {Colors} from '../commons/Colors';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#ffffff00',
    primaryTextColor: Colors.Catppuccin.Mocha.Text,
    primaryBorderColor: Colors.Catppuccin.Mocha.Text,
    lineColor: Colors.Catppuccin.Mocha.Text,
    secondaryColor: Colors.Catppuccin.Mocha.Peach,
    tertiaryColor: Colors.Catppuccin.Mocha.Green,
  },
});

export interface MermaidProps extends RectProps {
  diagram?: SignalValue<string>;
  alpha?: SignalValue<number>;
  smoothing?: SignalValue<boolean>;
}

export class Mermaid extends Rect {
  private static svgPool: Record<string, string> = {};
  private static imagePool: Record<string, HTMLImageElement> = {};
  private static renderCounter = 0;
  private static renderPromises: Record<string, Promise<string>> = {};

  private static sanitizeSvg(svg: string): string {
    const viewBoxMatch = svg.match(/viewBox="[\d.\s]+ ([\d.]+) ([\d.]+)"/);
    if (!viewBoxMatch) return svg;
    const [, width, height] = viewBoxMatch;
    return svg
      .replace(/(<svg[^>]*)\s+width="[^"]*%"/, `$1 width="${width}"`)
      .replace(/(<svg[^>]*)\s+height="[^"]*%"/, `$1 height="${height}"`);
  }

  private static createContainer(id: string): HTMLDivElement {
    const container = document.createElement('div');
    container.id = id;
    container.style.position = 'fixed';
    container.style.top = '-10000px';
    container.style.left = '-10000px';
    container.style.width = '1920px';
    container.style.height = '1080px';
    document.body.appendChild(container);
    return container;
  }

  private static ensureRendered(src: string): Promise<string> {
    if (Mermaid.svgPool[src]) {
      return Promise.resolve(Mermaid.svgPool[src]);
    }
    if (Mermaid.renderPromises[src]) {
      return Mermaid.renderPromises[src];
    }

    const counter = Mermaid.renderCounter++;
    const diagramId = `mermaid-svg-${counter}`;
    const container = Mermaid.createContainer(`mermaid-container-${counter}`);

    const promise = mermaid
      .render(diagramId, src, container)
      .then(({svg}) => {
        const sanitized = Mermaid.sanitizeSvg(svg);
        Mermaid.svgPool[src] = sanitized;
        return sanitized;
      })
      .finally(() => {
        container.remove();
        delete Mermaid.renderPromises[src];
      });

    Mermaid.renderPromises[src] = promise;
    return promise;
  }

  private static getImage(svg: string): HTMLImageElement {
    if (Mermaid.imagePool[svg]) return Mermaid.imagePool[svg];
    const img = document.createElement('img');
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    Mermaid.imagePool[svg] = img;
    return img;
  }

  @initial('')
  @signal()
  public declare readonly diagram: SimpleSignal<string, this>;

  @initial(1)
  @signal()
  public declare readonly alpha: SimpleSignal<number, this>;

  @initial(true)
  @signal()
  public declare readonly smoothing: SimpleSignal<boolean, this>;

  public constructor(props: MermaidProps) {
    super(props);
  }

  protected override collectAsyncResources(): void {
    super.collectAsyncResources();
    this.image();
  }

  @computed()
  protected image(): HTMLImageElement | null {
    const src = this.diagram().trim();
    if (!src) return null;

    const cachedSvg = Mermaid.svgPool[src];
    if (!cachedSvg) {
      DependencyContext.collectPromise(Mermaid.ensureRendered(src));
      return null;
    }

    const img = Mermaid.getImage(cachedSvg);
    if (!img.complete) {
      DependencyContext.collectPromise(
        new Promise<void>(resolve => {
          img.addEventListener('load', () => {
            resolve();
          }, {once: true});
        }),
      );
      return null;
    }

    return img;
  }

  protected override desiredSize(): SerializedVector2<DesiredLength> {
    const custom = super.desiredSize();
    if (custom.x === null && custom.y === null) {
      const img = this.image();
      if (img) {
        return {x: img.naturalWidth, y: img.naturalHeight};
      }
    }
    return custom;
  }

  protected override applyFlex() {
    super.applyFlex();
    const img = this.image();
    if (img) {
      this.element.style.aspectRatio = (
        this.ratio() ?? img.naturalWidth / img.naturalHeight
      ).toString();
    }
  }

  protected override draw(context: CanvasRenderingContext2D): void {
    this.drawShape(context);
    const img = this.image();
    if (img) {
      const a = this.alpha();
      if (a > 0) {
        const size = this.computedSize();
        const box = BBox.fromSizeCentered(size);
        context.save();
        context.clip(this.getPath());
        if (a < 1) {
          context.globalAlpha *= a;
        }
        context.imageSmoothingEnabled = this.smoothing();
        context.drawImage(img, box.x, box.y, box.width, box.height);
        context.restore();
      }
    }
    this.drawChildren(context);
  }

  /** Pre-render a diagram and cache the SVG. */
  public static async renderToCache(src: string): Promise<string> {
    return Mermaid.ensureRendered(src.trim());
  }
}
