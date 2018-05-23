import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ArticleHeader from '../../components/ArticleHeader';
import ArticleMarkdown from '../../components/ArticleMarkdown';
import ArticleFooter from '../../components/ArticleFooter';
import ArticleComment from '../../components/ArticleComment';
import config from '../../config';
import { GETED } from '../../config/statusCode';
import API from '../../API';
import { toggleLoading } from '../../store/loading/action';
import { toggleSnackbar } from '../../store/snackbar/action';

const style = {
  article: {
    paddingTop: '160px',
    '@media (max-width: 575px)': {
      paddingTop: '20px',
    },
  },
  paper: {
    overflow: 'hidden',
  },
};

class Article extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      banner: '',
      createdAt: '',
      types: [],
      content: '',
      starNum: 0,
      watchNum: 0,
      commentsNum: 0,
    };
  }
  componentWillMount() {
    this.getArticle(this.props.match.params.id);
  }

  async getArticle(parameter) {
    this.props.toggleLoading();
    try {
      const result = await API.getArticle({ parameter });
      if (result.statusCode === GETED) {
        this.setState({
          title: result.data.title,
          banner: result.data.banner,
          createdAt: result.data.createdAt,
          types: result.data.types,
          content: result.data.content,
          starNum: result.data.starNum,
          watchNum: result.data.watchNum,
          commentsNum: result.data.commentsNum,
        });
      }
      this.props.toggleLoading();
    } catch (error) {
      this.props.toggleLoading();
      this.props.toggleSnackbar(error.error);
    }
  }

  render() {
    return (
      <div className="Article" style={style.article}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={10} lg={8} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
              <Paper style={style.paper}>
                <ArticleHeader
                  banner={config.baseURL + this.state.banner}
                  title={this.state.title}
                  createdAt={this.state.createdAt}
                  types={this.state.types}
                />
                <ArticleMarkdown
                  content={this.state.content}
                />
                <ArticleFooter
                  aid={parseInt(this.props.match.params.id, 10)}
                  starNum={this.state.starNum}
                  watchNum={this.state.watchNum}
                  commentsNum={this.state.commentsNum}
                />
                <ArticleComment aid={parseInt(this.props.match.params.id, 10)} />
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Article.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  toggleLoading: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default connect(null, {
  toggleLoading,
  toggleSnackbar,
})(Radium(Article));
