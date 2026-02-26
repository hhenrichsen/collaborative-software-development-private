import { Colors } from "../commons";
import {
  Circle,
  Icon,
  Layout,
  LayoutProps,
  Line,
  Txt,
  initial,
  signal,
} from "@motion-canvas/2d";
import {
  SimpleSignal,
  SignalValue,
  all,
  chain,
  spawn,
} from "@motion-canvas/core";

interface BranchState {
  commits: Circle[];
  joiners: Line[];
  label: Layout;
  y: number;
  color: string;
  branchLine: Line | null;
  parentBranch: string | null;
  sourceCommit: Circle | null;
}

export interface GitGraphProps extends LayoutProps {
  commitSize?: SignalValue<number>;
  commitGap?: SignalValue<number>;
}

export class GitGraph extends Layout {
  @initial(80)
  @signal()
  public declare readonly commitSize: SimpleSignal<number, this>;

  @initial(200)
  @signal()
  public declare readonly commitGap: SimpleSignal<number, this>;

  private branches = new Map<string, BranchState>();

  public constructor(props: GitGraphProps) {
    super({ ...props });
  }

  public getBranch(name: string): BranchState | undefined {
    return this.branches.get(name);
  }

  public *addBranch(
    name: string,
    color: string,
    fromBranch: string,
    y: number
  ) {
    const parent = this.branches.get(fromBranch);
    if (!parent) return;

    const sourceCommit = parent.commits[parent.commits.length - 1];
    if (!sourceCommit) return;

    const label = (
      <Layout
        direction={"row"}
        layout
        alignItems={"center"}
        gap={10}
        y={y}
        x={sourceCommit.x() + 200}
        offset={[-1, 0]}
        opacity={0}
      >
        <Icon icon="octicon:git-branch-16" color={color} size={40} />
        <Txt fill={color} fontFamily={"Ellograph CF"}>
          {name}
        </Txt>
      </Layout>
    ) as Layout;

    const branchLine = (
      <Line
        points={() => {
          const sx = sourceCommit.x();
          const sy = sourceCommit.bottom().y + 10;
          return [
            [sx, sy],
            [sx, y - 80],
            [sx + 80, y],
            [label.x() - 10, y],
          ];
        }}
        stroke={Colors.Catppuccin.Mocha.Text}
        lineWidth={4}
        lineCap={"round"}
        end={0}
        opacity={0}
      />
    ) as Line;

    this.add(branchLine);
    this.add(label);

    const state: BranchState = {
      commits: [],
      joiners: [],
      label,
      y,
      color,
      branchLine,
      parentBranch: fromBranch,
      sourceCommit,
    };
    this.branches.set(name, state);

    branchLine.opacity(1);
    yield* branchLine.end(1, 0.5);
    yield* label.opacity(1, 0.5);
  }

  public *addCommit(branchName: string, fill?: string) {
    const branch = this.branches.get(branchName);
    if (!branch) return;

    const size = this.commitSize();
    const gap = this.commitGap();
    const color = fill ?? branch.color;
    const prevCommit = branch.commits[branch.commits.length - 1];

    let x: number;
    if (prevCommit) {
      x = prevCommit.x() + gap;
    } else if (branch.sourceCommit) {
      x = branch.sourceCommit.x() + gap;
    } else if (branch.parentBranch) {
      const parent = this.branches.get(branch.parentBranch);
      const parentLastCommit = parent?.commits[parent.commits.length - 1];
      x = parentLastCommit ? parentLastCommit.x() + gap : 0;
    } else {
      x = branch.commits.length * gap;
    }

    const commit = (
      <Circle fill={color} size={0} x={x} y={branch.y} />
    ) as Circle;

    if (prevCommit) {
      const joiner = (
        <Line
          points={() => [
            prevCommit.right().addX(10),
            commit.left().addX(-10),
          ]}
          stroke={Colors.Catppuccin.Mocha.Text}
          lineWidth={4}
          lineCap={"round"}
          end={0}
          opacity={0}
        />
      ) as Line;
      this.add(joiner);
      branch.joiners.push(joiner);
      joiner.opacity(1);
      spawn(joiner.end(1, 0.5));
    }

    this.add(commit);
    branch.commits.push(commit);

    if (branch.branchLine && branch.sourceCommit) {
      const firstCommit = branch.commits[0];
      const src = branch.sourceCommit;
      if (firstCommit) {
        branch.branchLine.points(() => [
          [src.x(), src.bottom().y + 10],
          [src.x(), branch.y - 80],
          [src.x() + 80, branch.y],
          [firstCommit.left().x - 10, branch.y],
        ]);
      }
    }

    this.updateLabelPosition(branch);

    yield* commit.size(size, 0.5);
  }

  public *mergeBranch(sourceName: string, targetName: string) {
    const source = this.branches.get(sourceName);
    const target = this.branches.get(targetName);
    if (!source || !target) return;

    yield* source.label.opacity(0, 0.5);
    source.label.remove();
    if (source.branchLine) {
      yield* source.branchLine
        .start(1, 0.5)
        .do(() => source.branchLine?.remove());
    }

    const targetLastCommit = target.commits[target.commits.length - 1];
    const gap = this.commitGap();
    const lastSourceCommit = source.commits[source.commits.length - 1];

    const finalLastX = targetLastCommit
      ? targetLastCommit.x() + gap * source.commits.length
      : gap * (source.commits.length - 1);
    const labelTargetX = finalLastX + this.commitSize() / 2 + 60;

    target.label.position(target.label.position());
    yield* target.label.x(labelTargetX, 0.5);

    yield* all(
      ...source.commits.map((c) => c.fill(target.color, 0.5)),
      ...source.commits.map((c, i) => {
        const newX = targetLastCommit
          ? targetLastCommit.x() + gap * (i + 1)
          : gap * i;
        return c.position([newX, target.y], 0.5);
      })
    );

    if (targetLastCommit && source.commits.length > 0) {
      const joiner = (
        <Line
          points={() => [
            targetLastCommit.right().addX(10),
            source.commits[0].left().addX(-10),
          ]}
          stroke={Colors.Catppuccin.Mocha.Text}
          lineWidth={4}
          lineCap={"round"}
          end={0}
        />
      ) as Line;
      this.add(joiner);
      target.joiners.push(joiner);
      yield* joiner.end(1, 0.5);
    }

    target.commits.push(...source.commits);
    target.joiners.push(...source.joiners);

    this.updateLabelPosition(target);

    this.branches.delete(sourceName);
  }

  public *addTag(branchName: string, text: string) {
    const branch = this.branches.get(branchName);
    if (!branch) return;

    const commit = branch.commits[branch.commits.length - 1];
    if (!commit) return;

    const tagIndicator = (
      <Line
        points={[
          commit.top().addY(-10),
          commit.top().addY(-40),
        ]}
        stroke={Colors.Catppuccin.Mocha.Peach}
        lineWidth={4}
        end={0}
        opacity={0}
        lineCap={"round"}
      />
    ) as Line;

    const tagContainer = (
      <Line
        x={commit.x()}
        y={() => commit.top().addY(-70).y}
        points={[
          [-85, -30],
          [75, -30],
          [75, 30],
          [-85, 30],
          [-115, 0],
        ]}
        closed
        width={150}
        height={60}
        radius={8}
        end={0.67}
        start={0.67}
        stroke={Colors.Catppuccin.Mocha.Peach}
        lineWidth={2}
      >
        <Txt opacity={0} fontWeight={600}>
          {text}
        </Txt>
      </Line>
    ) as Line;

    const tagDot = (
      <Circle
        size={20}
        fill={Colors.Catppuccin.Mocha.Crust}
        position={() => tagContainer.left().addX(10)}
      />
    ) as Circle;

    const tagGroup = (
      <Layout>
        {tagIndicator}
        {tagContainer}
        {tagDot}
      </Layout>
    ) as Layout;

    this.add(tagGroup);

    const tagTxt = tagContainer.childrenAs<Txt>()[0];
    tagIndicator.opacity(1);
    yield* chain(
      tagIndicator.end(1, 0.5),
      all(tagContainer.end(1, 0.5), tagContainer.start(0, 0.5)),
      tagContainer.fill(Colors.Catppuccin.Mocha.Peach, 0.5),
      tagTxt.opacity(1, 0.5)
    );
  }

  public *initBranch(name: string, color: string, y: number) {
    const label = (
      <Layout
        direction={"row"}
        layout
        alignItems={"center"}
        gap={10}
        y={y}
        x={0}
        offset={[-1, 0]}
        opacity={0}
      >
        <Icon icon="octicon:git-branch-16" color={color} size={40} />
        <Txt fill={color} fontFamily={"Ellograph CF"}>
          {name}
        </Txt>
      </Layout>
    ) as Layout;

    this.add(label);

    const state: BranchState = {
      commits: [],
      joiners: [],
      label,
      y,
      color,
      branchLine: null,
      parentBranch: null,
      sourceCommit: null,
    };
    this.branches.set(name, state);

    yield* label.opacity(1, 0.5);
  }

  private updateLabelPosition(branch: BranchState) {
    const lastCommit = branch.commits[branch.commits.length - 1];
    if (lastCommit) {
      branch.label.position(() => [
        lastCommit.right().x + 60,
        branch.y,
      ]);
    }
  }

}
