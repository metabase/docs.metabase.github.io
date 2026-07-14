import { Liquid } from 'liquidjs';
import path from "node:path";

const ROOT = process.cwd();

// Renders Jekyll's `_includes/*.html` partials, matching Jekyll's Liquid
// dialect: `{% include foo.html param="x" %}` style tags and `include.param`
// lookups inside the partial.
export const liquidEngine = new Liquid({
  root: path.join(ROOT, "_includes"),
  jekyllInclude: true,
  jekyllWhere: true,
  strictVariables: false, // TODO: Can we flip this to true?
});
