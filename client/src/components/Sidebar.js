// @flow

import React from "react";

import type { T_Highlight } from "../js/type.js";
type T_ManuscriptHighlight = T_Highlight;

type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void
};

const updateHash = highlight => {
  window.location.hash = `highlight-${highlight.id}`;
};

const backColor = emoji => {
  if (emoji === "TYPO") {
    return 'tomato';
  }
  if (emoji === "QUESTION") {
    return '#745AC8';
  }
};

const processWriter = writer => {
  var author = "";
  for (let index = writer.length - 1; index >= 0; index--) {

    if (writer[index] === '/') {
      break;
    } else {
      author = writer[index] + author;
    }
  }
  return author;
}

function Sidebar({ highlights, resetHighlights }: Props) {
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Inline Comments</h2>

        <p>
          {/* <small> */}
          To add inline comments, highlight text and click "Add highlight".
          To create area highlight, hold ⌥ Option key (Alt), then click and
          drag.
          {/* </small> */}
        </p>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              {
                highlight.comment.emoji && highlight.comment.emoji.length !== 0 &&
                <strong className="sidebar__emoji" style={{ backgroundColor: backColor(highlight.comment.emoji) }}>
                  {highlight.comment.emoji}</strong>
              }
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <span>
              <div className="highlight__writer">{processWriter(highlight.writer)}</div>
            </span>
            <span>
              <div className="highlight__location">
                Page {highlight.position.pageNumber}
              </div>
            </span>
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <a href="#" onClick={resetHighlights}>
            Reset highlights
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
