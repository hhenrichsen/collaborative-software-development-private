import { Glow, Colors } from "../commons";
import { Layout, Rect, Txt, View2D } from "@motion-canvas/2d";
import { spawn, chain, waitFor } from "@motion-canvas/core";
import { Scanlines } from "../components/Scanlines";

export function* partTitle(view: View2D, title: string) {
  view.add(
    <Glow copyOpacity={0.5}>
      <Scanlines rowSize={0.5} reflectionOffset={0}>
        <Layout direction={"column"} layout alignItems={"center"} gap={4}>
          <Layout height={104}>
            <Txt
              fontFamily={"Greycliff CF"}
              fill={Colors.Catppuccin.Mocha.Text}
              fontSize={96}
              stroke={Colors.Catppuccin.Mocha.Crust}
              lineWidth={8}
              strokeFirst
              ref={(node) =>
                spawn(() =>
                  chain(
                    waitFor(0.5),
                    node
                      .text(title, 1)
                      .wait(4)
                      .back(1)
                      .do(() => node.remove())
                  )
                )
              }
            ></Txt>
          </Layout>
          <Rect
            height={4}
            radius={2}
            width={0}
            stroke={Colors.Catppuccin.Mocha.Crust}
            lineWidth={4}
            strokeFirst
            fill={Colors.Catppuccin.Mocha.Text}
            ref={(node) =>
              spawn(() =>
                node
                  .width(1000, 2)
                  .wait(3)
                  .back(2)
                  .do(() => node.remove())
              )
            }
          ></Rect>
        </Layout>
      </Scanlines>
    </Glow>
  );

  yield* waitFor(7);
}
