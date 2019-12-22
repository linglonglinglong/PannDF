import React from 'react';
import '../style/App.css';

import Replies from './replies.js'
import Latex from 'react-latex';

export default class Comments extends React.Component {
    state = {
        replies: [],
        list: null,
    }

    processReview(review) {
        return (
            <React.Fragment>
                {review.summary &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-review-field">Summary: </span>
                        <span className="note-content-value">
                            <Latex>{review.summary}</Latex>
                        </span>
                    </React.Fragment>
                }
                {review.pro &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-review-field">Pros: </span>
                        <span className="note-content-value">
                            <Latex>{review.pro}</Latex>
                        </span>
                    </React.Fragment>
                }
                {review.con &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-review-field">Cons: </span>
                        <span className="note-content-value">
                            <Latex>{review.con}</Latex>
                        </span>
                    </React.Fragment>
                }
                {review.improvement &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-review-field">Suggestion for Improvement: </span>
                        <span className="note-content-value">
                            <Latex>{review.improvement}</Latex>
                        </span>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }

    processComment(rootId) {
        return (
            <li className="ind-comm" key={rootId}>
                <h2>{this.props.idMap[rootId].title}</h2>
                <h3>{this.props.idMap[rootId].author}</h3>
                {this.props.idMap[rootId].comment &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Comment: </span>
                        <span className="note-content-value">
                            <Latex>{this.props.idMap[rootId].comment}</Latex>
                        </span>
                    </React.Fragment>
                }
                {this.props.idMap[rootId].review &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Review: </span>
                        <span className="note-content-value">
                            {this.processReview(this.props.idMap[rootId].review)}
                        </span>
                    </React.Fragment>
                }
                {this.props.idMap[rootId].decision &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Decision: </span>
                        <span className="note-content-value">{this.props.idMap[rootId].decision}</span>
                    </React.Fragment>
                }
                {this.props.idMap[rootId].rating &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Rating: </span>
                        <span className="note-content-value">{this.props.idMap[rootId].rating}</span>
                    </React.Fragment>
                }
                {this.props.idMap[rootId].confidence &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Confidence: </span>
                        <span className="note-content-value">{this.props.idMap[rootId].confidence}</span>
                    </React.Fragment>
                }
                {this.props.list[rootId].length !== 0 &&
                    <Replies reList={this.props.list[rootId]} idMap={this.props.idMap}></Replies>
                }
            </li>
        );
    }

    updateComments() {
        var re = [];

        for (var root in this.props.list) {
            // console.log(this.props.idMap[root].invitation);
            re.push(this.processComment(root));
        }

        this.setState({
            replies: re,
            list: this.props.list,
        });
    }

    componentDidMount() {
        // console.log(this.props.checked);
        // console.log(this.props.list);
        this.updateComments();
    }

    componentDidUpdate() {
        // console.log(this.state.list);
        // console.log(this.props.list);
        if (this.state.list !== this.props.list) {
            // console.log(1);
            this.updateComments();
        }
    }

    render() {
        // console.log(this.state.replies);
        return (
            <ul className="comments">
                {this.state.replies}
            </ul>

        );
    }
}
