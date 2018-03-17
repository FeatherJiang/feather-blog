import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import LinearProgress from 'material-ui/LinearProgress';

import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import Pagination from '../../components/Pagination';
import { GETED } from '../../config/statusCode';
import API from '../../API';
import { toggleSnackbar } from '../../store/snackbar/action';

const style = {
  commentWapper: {
    padding: '0 20px 20px 20px',
  },
};

class ArticleComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      limit: 10,
      count: 0,
      order: 'DESC',
      comments: [],
    };
    this.onClickPre = this.onClickPre.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  componentWillMount() {
    this.getComments(this.props.aid);
  }

  onClickPre() {
    this.setState(preState => ({ page: preState.page - 1 }), () => {
      this.getComments(this.props.aid);
    });
  }

  onClickNext() {
    this.setState(preState => ({ page: preState.page + 1 }), () => {
      this.getComments(this.props.aid);
    });
  }

  async getComments(parameter) {
    this.setState({
      loading: true,
    });
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getComments({ parameter, params });
      if (result.statusCode === GETED) {
        this.setState({
          count: result.data.count,
          comments: result.data.rows,
        });
      }
      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      this.props.toggleSnackbar(error.error);
    }
  }

  generateCommentList(comments) {
    const commentDom = [];
    if (comments instanceof Array) {
      const list = [];
      comments.forEach((item) => {
        list.push((
          <CommentItem
            key={item.cid}
            aid={this.props.aid}
            cid={item.cid}
            avatar={item.avatar}
            name={item.name}
            createdAt={item.createdAt}
            content={item.content}
          >
            {this.generateCommentList(item.children)}
          </CommentItem>
        ));
      });
      commentDom.push(list);
    }
    return commentDom;
  }

  render() {
    return (

      <div className="ArticleComment">
        {
          this.state.loading ?
            <Row>
              <Col xs={12}>
                <LinearProgress mode="indeterminate" />
              </Col>
            </Row> : null
        }
        <Row>
          <Col xs={12}>
            <div className="CommentFormWapper" style={style.commentWapper}>
              <CommentForm aid={this.props.aid} pid={0} />
            </div>
          </Col>
          <Col xs={12}>
            <div className="CommentList" style={style.commentWapper}>
              {this.generateCommentList(this.state.comments)}
            </div>
          </Col>
          <Col xs={12}>
            <div className="CommentPaginationWapper" style={style.commentWapper}>
              <Pagination
                page={this.state.page}
                limit={this.state.limit}
                count={this.state.count}
                onClickPre={this.onClickPre}
                onClickNext={this.onClickNext}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ArticleComment.propTypes = {
  aid: PropTypes.number.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default connect(null, {
  toggleSnackbar,
})(ArticleComment);
