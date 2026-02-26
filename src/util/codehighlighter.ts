import { CatppuccinMochaHighlightStyle } from "../commons";
import { parser as MarkdownParser } from "@lezer/markdown";
import { LezerHighlighter } from "@motion-canvas/2d";
import { parser as JavascriptParser } from "@lezer/javascript";

export const CatpuccinMarkdown = new LezerHighlighter(
  MarkdownParser,
  CatppuccinMochaHighlightStyle
);
export const CatpuccinJavascript = new LezerHighlighter(
  JavascriptParser.configure({
    dialect: "ts",
  }),
  CatppuccinMochaHighlightStyle
);
