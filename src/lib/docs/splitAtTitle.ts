// Splits a rendered doc after its h1, so the layout can put chrome (the AI
// tools row, DocActions.astro) between the title and the body. The h1 comes
// from the Markdown, not the layout. A doc with no h1 splits at the start.
export const splitAtTitle = (html: string): [title: string, body: string] => {
  const end = html.indexOf("</h1>");
  if (end === -1) return ["", html];
  const cut = end + "</h1>".length;
  return [html.slice(0, cut), html.slice(cut)];
};
