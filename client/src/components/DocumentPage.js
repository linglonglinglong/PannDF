import React from 'react';
import { Link } from 'react-router-dom';
import '../style/App.css';

import Forum from './forum.js';

class DocumentPage extends React.Component {
    state = {
        loading: true,
        title: null,
        abstract: null,
        tldr: null,
        authors: null,
        keywords: null,
    }

    async componentDidMount() {
        const docInfoURL = "./notes.json";
        const response = await fetch(docInfoURL);
        const data = await response.json();
        const content = data.notes[0].content;
        // console.log(content);
        // process author list
        var au = "";
        au = content.authors.map(author => au + author + ", ");
        au[au.length - 1] = au[au.length - 1].substring(0, au[au.length - 1].length - 2)
        // process keywords list
        var kw = "";
        kw = content.keywords.map(keyword => kw + keyword + ", ");
        kw[kw.length - 1] = kw[kw.length - 1].substring(0, kw[kw.length - 1].length - 2)
        this.setState({
            loading: false,
            title: content.title,
            abstract: content.abstract,
            tldr: content['TL;DR'],
            authors: au,
            keywords: kw,
        });
    }

    render() {
        // console.log(this.state);
        if (this.state.loading) {
            return (<div className="doc-page">
                <h1>Loading</h1>
            </div>
            );
        }

        return (
            <div className="doc-page">
                <h1>{this.state.title}</h1>
                <Link style={{ fontSize: "30px" }} to='/pdf'>go to pdf</Link>
                <h3 className="authors">{this.state.authors}</h3>
                <span className="note-content-field">Abstract: </span>
                <span className="note-content-value">{this.state.abstract}</span>
                <br></br>
                <span className="note-content-field">TL;DR: </span>
                <span className="note-content-value">{this.state.tldr}</span>
                <br></br>
                <span className="note-content-field">Keywords: </span>
                <span className="note-content-value">{this.state.keywords}</span>
                <hr></hr>
                <Forum></Forum>
            </div >
        );
    }
}

export default DocumentPage;