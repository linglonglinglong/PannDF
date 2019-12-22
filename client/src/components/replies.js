import React from 'react';
import '../style/App.css';
import Latex from 'react-latex';

export default class Replies extends React.Component {
    state = {
        replies: [],
    }

    processReply(reId) {
        // console.log(this.props.idMap[reId]);
        return (
            <li className="ind-rep" key={reId}>
                <h2>{this.props.idMap[reId].title}</h2>
                <h3>{this.props.idMap[reId].author}</h3>
                {this.props.idMap[reId].comment &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Comment: </span>
                        <span className="note-content-value">
                            <Latex>{this.props.idMap[reId].comment}</Latex>
                        </span>
                    </React.Fragment>
                }
                {this.props.idMap[reId].review &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Review: </span>
                        <span className="note-content-value">
                            <Latex>{this.props.idMap[reId].review}</Latex>
                        </span>
                    </React.Fragment>
                }
                {this.props.idMap[reId].decision &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Decision: </span>
                        <span className="note-content-value">{this.props.idMap[reId].decision}</span>
                    </React.Fragment>
                }
                {this.props.idMap[reId].rating &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Rating: </span>
                        <span className="note-content-value">{this.props.idMap[reId].rating}</span>
                    </React.Fragment>
                }
                {this.props.idMap[reId].confidence &&
                    <React.Fragment>
                        <br></br>
                        <span className="note-content-field">Confidence: </span>
                        <span className="note-content-value">{this.props.idMap[reId].confidence}</span>
                    </React.Fragment>
                }
            </li>
        );
    }

    componentDidMount() {
        var re = [];

        for (var id of this.props.reList) {
            // console.log(id);
            re.push(this.processReply(id));
        }

        this.setState({
            replies: re,
        });
    }

    render() {
        // console.log(this.props.reList);
        return (
            <ul className="replies">
                {this.state.replies}
            </ul>

        );
    }
}