// @flow

import React, { Component } from "react";

import "../style/Highlight.css";

import type { T_LTWH } from "../js/types.js";

type Props = {
  position: {
    boundingRect: T_LTWH,
    rects: Array<T_LTWH>
  },
  onClick?: () => void,
  onMouseOver?: () => void,
  onMouseOut?: () => void,
  comment: {
    emoji: string,
    text: string
  },
  isScrolledTo: boolean
};

class Highlight extends Component<Props> {
  processHighlight(rect, comment) {
    // console.log(emoji);
    var color = null;
    if (comment && comment.emoji === "TYPO") {
      color = "#FFA595";
    }
    if (comment && comment.emoji === "QUESTION") {
      color = "#C4BAE2";
    }

    if (color) {
      rect["backgroundColor"] = color;
    }
    // console.log(rect);
    return rect;
  }

  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo
    } = this.props;

    const { rects, boundingRect } = position;
    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {/* {comment ? (
          <div
          className="Highlight__emoji"
          style={{
            left: 200,
            top: boundingRect.top
          }}
          >
          {comment.emoji}
          </div>
        ) : null} */}
        <div className="Highlight__parts">
          {rects.map((rect, index) => (
            // console.log(rect),
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              // style={rect}
              style={this.processHighlight(rect, comment)}
              className={`Highlight__part`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
