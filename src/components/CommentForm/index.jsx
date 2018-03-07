import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-flexbox-grid';

const style = {
  commentForm: {
    marginTop: '20px',
    padding: '20px',
  },
  avatarWapper: {
    position: 'relative',
    marginTop: '20px',
  },
  avatarUpload: {
    position: 'absolute',
    zIndex: '1',
    top: '0px',
    left: '0px',
    width: '40px',
    height: '40px',
    opacity: '0',
    cursor: 'pointer',
  },
  buttonWapper: {
    marginTop: '20px',
  },
};

export default class CommentForm extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <Paper className="CommentForm" style={style.commentForm}>
        <Row>
          <Col xs={2} sm={1}>
            <div className="avatarWapper" style={style.avatarWapper}>
              <Avatar />
              <input type="file" style={style.avatarUpload} />
            </div>
          </Col>
          <Col xs={10} sm={3}>
            <TextField fullWidth floatingLabelText="name" hintText="optional" errorText="" />
            <TextField fullWidth floatingLabelText="email" hintText="optional" errorText="" />
          </Col>
          <Col xs={12} sm={6}>
            <div>
              <TextField
                fullWidth
                multiLine
                rows={4}
                rowsMax={4}
                floatingLabelText="comment"
                hintText="required"
                errorText=""
              />
            </div>
          </Col>
          <Col xs={12} sm={2}>
            <div className="buttonWapper" style={style.buttonWapper}>
              <RaisedButton label="Submit" primary />
            </div>
          </Col>
        </Row>
      </Paper>
    );
  }
}
