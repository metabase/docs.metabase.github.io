declare module "postcss-resolve-nested-selector" {
  import type { Node } from "postcss";

  export default function resolveNestedSelector(
    selector: string,
    node: Node,
  ): string[];
}
