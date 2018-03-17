import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import { Row, Col } from 'react-flexbox-grid';

import CommentForm from '../CommentForm';
import { setCommentId } from '../../store/comment/action';

const style = {
  commentItem: {
    marginTop: '20px',
    padding: '20px',
  },
  name: {
    marginRight: '20px',
    fontWeight: 'bold',
  },
  time: {
    color: '#999',
  },
};

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: props.cid,
    };
    this.toggleReply = this.toggleReply.bind(this);
  }

  toggleReply() {
    if (this.props.commentData.id !== this.state.cid) {
      this.props.setCommentId(parseInt(this.state.cid, 10));
    } else {
      this.props.setCommentId(parseInt(0, 10));
    }
  }

  render() {
    return (
      <Paper className="commentItem" style={style.commentItem}>
        <Row>
          <Col xs={2} sm={1}>
            <Avatar src={this.props.avatar} />
          </Col>
          <Col xs={8} sm={10}>
            <div className="commentInfo">
              <span className="name" style={style.name}>{this.props.name}</span>
              <span className="time" style={style.time}>
                {new Date(this.props.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="comment">
              <span>
                {this.props.content}
              </span>
            </div>
          </Col>
          <Col xs={2} sm={1}>
            <IconButton onClick={this.toggleReply}>
              <ReplyIcon />
            </IconButton>
          </Col>
        </Row>
        {
          this.props.children.map(item => (<Row key={item}><Col xs={12}>{item}</Col></Row>))
        }
        <Row>
          <Col xs={12}>
            <CommentForm aid={this.props.aid} pid={this.state.cid} />
          </Col>
        </Row>
      </Paper>
    );
  }
}

CommentItem.propTypes = {
  aid: PropTypes.number.isRequired,
  cid: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.node,
  commentData: PropTypes.objectOf(PropTypes.number).isRequired,
  setCommentId: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  children: null,
};

export default connect(
  state => ({
    commentData: state.commentData,
  }),
  {
    setCommentId,
  },
)(CommentItem);
