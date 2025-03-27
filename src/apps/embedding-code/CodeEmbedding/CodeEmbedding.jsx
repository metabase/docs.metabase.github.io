import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CODE_SNIPPETS } from "./constants";
import cx from "classnames";

const customCodeStyle = {
  backgroundColor: "transparent",
  fontFamily: "'Roboto Mono', Consolas, monaco, monospace",
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "2",
  padding: 0,
  maxWidth: "100%",
};

const customLineNumberStyle = {
  marginRight: "1.5rem",
  paddingRight: 0,
  minWidth: "1.25rem",
};

export default class CodeEmbedding extends Component {
  constructor() {
    super();

    this.state = {
      snippetIndex: 0,
    };
  }

  onTabClick(codeId) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        snippetIndex: CODE_SNIPPETS.findIndex(({ id }) => codeId === id),
      });
    };
  }

  render() {
    return (
      <div className="bg-blue-25 code-embedding">
        <nav className="px-6 py-4 code-embedding__nav">
          <ul className="m-0 list-inline align-items-start d-flex flex-row flex-wrap justify-content-start">
            {CODE_SNIPPETS.map(({ id, label }, index) => (
              <li
                key={id}
                className={cx("mb-0", {
                  "mr-2": index < CODE_SNIPPETS.length - 1,
                })}
              >
                <button
                  className={cx("px-3 py-2 code-embedding__button", {
                    disabled: this.state.snippetIndex === index,
                  })}
                  disabled={this.state.snippetIndex === index}
                  onClick={this.onTabClick(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {CODE_SNIPPETS.map(({ id, language, snippet }, index) => (
          <div
            key={id}
            className={cx("d-flex", "code-embedding__snippet", {
              "d-none": !(this.state.snippetIndex === index),
            })}
          >
            <SyntaxHighlighter
              language={language}
              style={tomorrowNightBlue}
              PreTag="div"
              CodeTag="div"
              wrapLines
              customStyle={customCodeStyle}
              showLineNumbers
              lineNumberStyle={customLineNumberStyle}
            >
              {snippet}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    );
  }
}
