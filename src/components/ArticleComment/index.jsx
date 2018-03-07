import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';

const style = {
  commentWapper: {
    padding: '0 20px 20px 20px',
  },
};

export default class ArticleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          commentId: 1,
          children: [
            {
              commentId: 1,
              children: [],
            },
          ],
        },
        {
          commentId: 1,
          children: [],
        },
      ],
    };
  }
  componentWillMount() {

  }

  generateCommentList(comments) {
    const commentDom = [];
    if (comments instanceof Array) {
      const list = [];
      comments.forEach((item) => {
        list.push(<CommentItem>{this.generateCommentList(item.children)}</CommentItem>);
      });
      commentDom.push(list);
    }
    return commentDom;
  }

  render() {
    return (
      <div className="ArticleComment">
        <Row>
          <Col xs={12}>
            <div className="CommentFormWapper" style={style.commentWapper}>
              <CommentForm />
            </div>
          </Col>
          <Col xs={12}>
            <div className="CommentList" style={style.commentWapper}>
              {this.generateCommentList(this.state.comments)}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
