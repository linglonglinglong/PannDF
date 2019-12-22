// @flow

import React, { Component } from "react";

import URLSearchParams from "url-search-params";

import PdfLoader from "./PdfLoader.js";
import PdfHighlighter from "./PdfHighlighter.js";
import Tip from "./Tip.js";
import Highlight from "./Highlight.js";
import Popup from "./Popup.js";
import AreaHighlight from "./AreaHighlight.js";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner.js";
import Sidebar from "./Sidebar.js";

import type { T_Highlight, T_NewHighlight } from "../js/type.js";

import "../style/Doc.css";

type T_ManuscriptHighlight = T_Highlight;

type Props = {};

type State = {
  highlights: Array<T_ManuscriptHighlight>
};

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () => window.location.hash.slice("#highlight-".length);

const resetHash = () => {
  window.location.hash = "";
};

const tagColor = (comment) => {
  // console.log(comment);
  if (comment && comment.emoji) {
    var tc = null;
    if (comment.emoji === "TYPO") {
      tc = "tomato";
    }
    if (comment.emoji === "QUESTION") {
      tc = "#9788C6";
    }

    if (tc) {
      return <span style={{ color: tc }}>{comment.emoji}</span>;
    } else {
      return <span>{comment.emoji}</span>
    }
  }
}

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    // console.log(comment),
    <div className="Highlight__popup">
      {tagColor(comment)} <span>{comment.text}</span>
    </div>
  ) : null;

// const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf";  // this one has demo comments
const DEFAULT_URL = "https://arxiv.org/pdf/1811.07555.pdf";  // this one is the same as the info page
// const DEFAULT_URL = "./test.pdf";  // you can try yours (CORS may restrict on only local or arXiv)

const searchParams = new URLSearchParams(window.location.search);
const url = searchParams.get("url") || DEFAULT_URL;


export default class Doc extends Component<Props, State> {
  state = {
    highlights: testHighlights[url] ? [...testHighlights[url]] : []
  };

  state: State;

  resetHighlights = () => {
    this.setState({
      highlights: []
    });
  };

  scrollViewerTo = (highlight: any) => { };

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  addHighlight(highlight: T_NewHighlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId(), writer: "NIPS.cc/2018/Workshop/CDNNRIA/Paper30/AnonReviewer1" }, ...highlights]
    });
    console.log(this.state.highlights);
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
            ...h,
            position: { ...h.position, ...position },
            content: { ...h.content, ...content },
          }
          : h;
      })
    });
  }

  render() {
    const { highlights } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh" }}>

        <div
          style={{
            height: "100vh",
            width: "75vw",
            overflowY: "scroll",
            position: "relative"
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {pdfDocument => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={comment => {
                        this.addHighlight({ content, position, comment });

                        hideTipAndSelection();
                      }}
                    />
                  )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                      <AreaHighlight
                        highlight={highlight}
                        onChange={boundingRect => {
                          this.updateHighlight(
                            highlight.id,
                            { boundingRect: viewportToScaled(boundingRect) },
                            { image: screenshot(boundingRect) }
                          );
                        }}
                      />
                    );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
        />
      </div >
    );
  }
}
