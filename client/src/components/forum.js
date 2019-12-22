import React from 'react';
import '../style/App.css';
import Comments from "./comments.js";

export default class Forum extends React.Component {
    state = {
        loading: true,
        lst: {}, // {new_comment: [reply_comments]}
        curList: {},
        replies: 0,
        idMap: {},  // {id: necessary info}
        invitation: null,
        checked: {},
    }

    processComment(comm) {
        const title = comm.content.title;
        const replyto = comm.replyto;
        const rating = comm.content.rating;
        const confidence = comm.content.confidence;
        const comment = comm.content.comment;
        const decision = comm.content.decision;
        const review = comm.content.review;

        var author = "";
        const writer = comm.writers[0];
        for (let index = writer.length - 1; index >= 0; index--) {

            if (writer[index] === '/') {
                break;
            } else {
                author = writer[index] + author;
            }
        }

        var invitation = "";
        const inv = comm.invitation;
        for (let index = inv.length - 1; index >= 0; index--) {
            if (inv[index] === '/') {
                break;
            } else {
                invitation = inv[index] + invitation;
            }
        }

        return {
            title: title,
            comment: comment,
            author: author,
            invitation: invitation,
            replyto: replyto,
            decision: decision,
            rating: rating,
            confidence: confidence,
            review: review,
        };
    }

    checkChange(entry, e) {
        let stateChecked = this.state.checked;
        stateChecked[entry] = e.target.checked
        let curList = this.updateCurList(this.state.lst, this.state.idMap, stateChecked);
        this.setState({
            checked: stateChecked,
            curList: curList,
        });
        console.log(this.state.checked);
    }

    updateCurList(list, idReMap, checked) {
        const curList = {};
        // console.log(list);
        for (var root in list) {
            // console.log(root);
            const inv = idReMap[root].invitation;
            if (checked[inv]) {
                curList[root] = list[root];
            }
        }
        return curList;
    }

    filterOptions() {
        const invs = this.state.invitation;
        // console.log(invs);
        var li = [];
        const iterator1 = invs.entries();
        for (var inv of iterator1) {
            // console.log(inv);
            const entry = inv[0];
            li.push(
                <label key={entry}>
                    <input type="checkbox" onChange={(e) => this.checkChange(entry, e)} name="inv" value={entry}
                        checked={this.state.checked[entry]} />
                    {entry}
                </label>
            );
        }
        // console.log(li);
        return (
            <ul>
                {li}
            </ul>
        );
    }

    async componentDidMount() {
        const docInfoURL = "./forum.json";
        const response = await fetch(docInfoURL);
        const data = await response.json();
        const content = data.notes;
        const forumId = content[0].forum;
        var replies = data.count - 1;
        var invitation = new Set();  //
        var list = {};
        var checked = {};
        // console.log(forumId);

        // process reply list to a map
        const idReMap = {};
        for (var reply in content) {
            idReMap[content[reply].id] = this.processComment(content[reply]);
        }

        // get a map of {new_comment: [reply_comments]}. everything saved as id
        // first, get all the new_comments
        for (var id in idReMap) {
            // console.log(id);

            // side task: add invitation to the list
            if (idReMap[id].replyto != null) {
                invitation.add(idReMap[id].invitation);
            }

            // get all the new_comments
            if (idReMap[id].replyto === forumId) {
                list[id] = [];
            }
        }

        // create the real mapping
        for (var root in list) {  // root is the original post
            var cur = root;  // cur is the current post that we look for replies
            var bool = true;
            while (bool) {  // this while loop only stops when we found all replies of the root post
                var found = false;  // found a reply?
                var replyId = null;  // the id of the reply
                for (var idd in idReMap) {
                    if (idReMap[idd].replyto === cur) {  // cur has a reply
                        found = true;
                        replyId = idd;
                    }
                }
                if (found) {
                    list[root].push(replyId);
                    cur = replyId;  //find the next in reply thread
                } else {
                    bool = false;
                    break;
                }
            }
        }

        // console.log(list);

        // update checked list
        const iterator1 = invitation.entries();
        for (var inv of iterator1) {
            checked[inv[0]] = true;
        }

        const curList = this.updateCurList(list, idReMap, checked);
        // console.log(curList);

        this.setState({
            loading: false,
            lst: list,
            curList: curList,
            replies: replies,
            idMap: idReMap,
            invitation: invitation,
            checked: checked,
        });
    }

    render() {
        // console.log(this.state.curList);
        if (this.state.loading) {
            return (<div className="doc-page">
                <h1>Loading</h1>
            </div>
            );
        }

        return (
            <div className="forum">
                <h5>Replies: {this.state.replies}</h5>
                <div className="doc-filter"><strong>Filter by author type:</strong> {this.filterOptions()}</div>
                <Comments idMap={this.state.idMap} list={this.state.curList}></Comments>
            </div >
        );
    }
}