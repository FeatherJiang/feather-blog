import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import { Row, Col } from 'react-flexbox-grid';
import { CREATED } from '../../config/statusCode';
import API from '../../API';

const style = {
  commentForm: {
    marginTop: '20px',
    padding: '20px',
  },
  avatarWapper: {
    position: 'relative',
    marginTop: '20px',
    overflow: 'hidden',
  },
  avatarUpload: {
    position: 'absolute',
    zIndex: '1',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    fontSize: '0px',
    borderRadius: '50%',
    opacity: '0',
    cursor: 'pointer',
  },
  buttonWapper: {
    marginTop: '20px',
  },
};

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: '/api/v1/imgs/default/anonymous-avatar.png',
      name: '',
      email: '',
      content: '',
      commentError: '',
      loading: false,
    };
    this.uploadImg = this.uploadImg.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  uploadImg(e) {
    if (e.target instanceof HTMLInputElement) {
      const { files } = e.target;
      if (!files) {
        return;
      }
      this.addAvatar(files[0]);
    }
  }

  async addAvatar(file) {
    this.setState({ loading: true });
    try {
      const data = new FormData();
      data.append('file', file);
      const result = await API.postImgs({ data });
      if (result.statusCode === CREATED) {
        this.setState({
          loading: false,
          avatar: result.data[0].url,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async addComment() {
    this.setState({ loading: true });
    if (this.state.content === '') {
      this.setState({
        commentError: 'comment required',
        loading: false,
      });
      return;
    }
    const json = {
      pid: this.props.pid,
      avatar: this.state.avatar,
      name: this.state.name || 'anonymous',
      email: this.state.email,
      content: this.state.content,
    };
    try {
      const result = await API.postComment({ parameter: this.props.aid, data: json });
      if (result.statusCode === CREATED) {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1500);
      }
    } catch (error) {
      throw error;
    }
  }

  render() {
    if (this.props.commentData.id === this.props.pid) {
      return (
        <Paper className="CommentForm" style={style.commentForm}>
          <Row>
            <Col xs={12} sm={2} md={2} lg={1}>
              <div className="avatarWapper" style={style.avatarWapper} title="点击上传头像">
                <Avatar src={this.state.avatar} />
                <input type="file" style={style.avatarUpload} onChange={this.uploadImg} />
              </div>
            </Col>
            <Col xs={12} sm={4} md={2} lg={2}>
              <TextField
                fullWidth
                floatingLabelText="name"
                hintText="optional"
                errorText=""
                onChange={(e, text) => {
                  this.setState({ name: text });
                }}
              />
              <TextField
                fullWidth
                floatingLabelText="email"
                hintText="optional"
                errorText=""
                onChange={(e, text) => {
                  this.setState({ email: text });
                }}
              />
            </Col>
            <Col xs={12} sm={4} md={6} lg={7}>
              <div>
                <TextField
                  fullWidth
                  multiLine
                  rows={4}
                  rowsMax={4}
                  floatingLabelText="comment"
                  hintText="required"
                  errorText={this.state.commentError}
                  onChange={(e, text) => {
                    if (text === '') {
                      this.setState({ commentError: 'comment required' });
                    } else {
                      this.setState({ commentError: '' });
                    }
                    this.setState({ content: text });
                  }}
                />
              </div>
            </Col>
            <Col xs={12} sm={2} md={2} lg={1}>
              <div className="buttonWapper" style={style.buttonWapper}>
                <RaisedButton
                  label="Submit"
                  primary
                  disabled={this.state.loading}
                  onClick={this.addComment}
                />
              </div>
            </Col>
            <Col xs={12}>
              {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
            </Col>
          </Row>
        </Paper>
      );
    }
    return null;
  }
}

CommentForm.propTypes = {
  aid: PropTypes.number.isRequired,
  pid: PropTypes.number.isRequired,
  commentData: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default connect(state => ({
  commentData: state.commentData,
}))(CommentForm);
