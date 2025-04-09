module.exports = {
  rules: {
    "attr-bans": [
      true,
      [
        "align",
        "background",
        "bgcolor",
        "border",
        "frameborder",
        "longdesc",
        "marginwidth",
        "marginheight",
        "scrolling",
        "style",
        "width"
      ]
    ],
    "attr-name-style": [
      true,
      "dash"
    ],
    "attr-no-dup": true,
    "attr-no-unsafe-char": true,
    "attr-quote-style": "double",
    "attr-req-value": true,
    "attr-validate": true,
    "class-no-dup": true,
    "doctype-first": "warning",
    "doctype-html5": true,
    "fig-req-figcaption": true,
    "head-req-title": true,
    "head-valid-content-model": true,
    "html-req-lang": true,
    "html-valid-content-model": true,
    "id-no-dup": true,
    "img-req-alt": true,
    "img-req-src": true,
    "indent-style": [
      true,
      "spaces"
    ],
    "indent-width": [
      true,
      4
    ],
    "input-radio-req-name": true,
    "input-req-label": true,
    "line-max-len": [
      true,
      100
    ],
    "line-no-trailing-whitespace": true,
    "link-req-noopener": true,
    "tag-bans": [
      true,
      [
        "acronym",
        "applet",
        "basefont",
        "big",
        "center",
        "dir",
        "font",
        "frame",
        "frameset",
        "isindex",
        "noframes",
        "s",
        "strike",
        "tt",
        "u",
        "b"
      ]
    ],
    "tag-close": true,
    "tag-name-lowercase": true,
    "tag-name-match": true,
    "tag-self-close": [
      true,
      "always"
    ],
    "title-no-dup": true,
    "title-max-len": 60
  }
};
