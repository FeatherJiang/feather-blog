import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import { Row, Col } from 'react-flexbox-grid';

import CommentForm from '../CommentForm';

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

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
    };
    this.toggleReply = this.toggleReply.bind(this);
  }

  toggleReply() {
    this.setState((preState) => {
      const state = preState.reply;
      return { reply: !state };
    });
  }

  render() {
    return (
      <Paper className="commentItem" style={style.commentItem}>
        <Row>
          <Col xs={2} sm={1}>
            <Avatar />
          </Col>
          <Col xs={8} sm={10}>
            <div className="commentInfo">
              <span className="name" style={style.name}>name</span>
              <span className="time" style={style.time}>2018/1/5</span>
            </div>
            <div className="comment">
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptate rem perspiciatis
                fuga similique maiores quaerat distinctio vero neque et iusto,
                quo sequi optio earum nobis reiciendis minima provident placeat ipsam?
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
            this.props.children.map(item => (<Row><Col xs={12}>{item}</Col></Row>))
        }
        {
          this.state.reply ?
            <Row>
              <Col xs={12}>
                <CommentForm />
              </Col>
            </Row> : null
        }
      </Paper>
    );
  }
}

CommentItem.propTypes = {
  children: PropTypes.node,
};

CommentItem.defaultProps = {
  children: null,
};
