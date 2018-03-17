import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ArticleOverview from '../../components/ArticleOverview';
import Pagination from '../../components/Pagination';
import { GETED } from '../../config/statusCode';
import API from '../../API';
import { toggleLoading } from '../../store/loading/action';
import { toggleSnackbar } from '../../store/snackbar/action';

const style = {
  page: {
    paddingTop: '160px',
    '@media (max-width: 575px)': {
      paddingTop: '20px',
    },
  },
  gridMargin: {
    marginBottom: '40px',
  },
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      count: 0,
      order: 'DESC',
      key: '',
      articles: [],
    };
    this.onClickPre = this.onClickPre.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        key: this.props.location.state,
      }, () => {
        this.getArticlesData();
      });
    } else {
      this.getArticlesData();
    }
  }

  componentDidUpdate(preProps) {
    if (JSON.stringify(preProps.match.params) !== JSON.stringify(this.props.match.params)) {
      window.scrollTo(0, 0);
      this.getArticlesData();
    }
  }

  onClickPre() {
    this.setState(preState => ({ page: preState.page - 1 }), () => {
      this.getArticlesData();
    });
  }

  onClickNext() {
    this.setState(preState => ({ page: preState.page + 1 }), () => {
      this.getArticlesData();
    });
  }

  getArticlesData() {
    if (this.props.match.params.number) {
      this.setState({ page: parseInt(this.props.match.params.number, 10) });
      this.getArticles();
    } else if (this.props.match.params.type) {
      this.getArticlesByTypes(this.props.match.params.type);
    } else if (this.props.match.params.tag) {
      this.getArticlesByTags(this.props.match.params.tag);
    } else if (this.props.match.params.year) {
      this.getArticlesByArchive(`${this.props.match.params.year}/${this.props.match.params.month}`);
    }
  }

  async getArticles(parameter) {
    this.props.toggleLoading();
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticles({ parameter, params });
      if (result.statusCode === GETED) {
        this.setState({
          count: result.data.count,
          articles: result.data.rows,
        });
      }
      this.props.toggleLoading();
    } catch (error) {
      this.props.toggleLoading();
      this.props.toggleSnackbar(error.error);
    }
  }

  async getArticlesByTypes(parameter) {
    this.props.toggleLoading();
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticlesByTypes({ parameter, params });
      if (result.statusCode === GETED) {
        this.setState({
          count: result.data.count,
          articles: result.data.rows,
        });
      }
      this.props.toggleLoading();
    } catch (error) {
      this.props.toggleLoading();
      this.props.toggleSnackbar(error.error);
    }
  }

  async getArticlesByTags(parameter) {
    this.props.toggleLoading();
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticlesByTags({ parameter, params });
      if (result.statusCode === GETED) {
        this.setState({
          count: result.data.count,
          articles: result.data.rows,
        });
      }
      this.props.toggleLoading();
    } catch (error) {
      this.props.toggleLoading();
      this.props.toggleSnackbar(error.error);
    }
  }

  async getArticlesByArchive(parameter) {
    this.props.toggleLoading();
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticlesByArchive({ parameter, params });
      if (result.statusCode === GETED) {
        this.setState({
          count: result.data.count,
          articles: result.data.rows,
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
      <div className="Page" style={style.page}>
        <Grid fluid>
          {
            this.state.articles.map(article => (
              <Row style={style.gridMargin} key={article.aid}>
                <Col
                  xs={12}
                  sm={12}
                  md={10}
                  lg={8}
                  xsOffset={0}
                  smOffset={0}
                  mdOffset={1}
                  lgOffset={2}
                >
                  <ArticleOverview data={article} />
                </Col>
              </Row>
              ))
          }
          {
            !this.props.loadingData.loading ?
              <Row style={style.gridMargin}>
                <Col
                  xs={12}
                  sm={12}
                  md={10}
                  lg={8}
                  xsOffset={0}
                  smOffset={0}
                  mdOffset={1}
                  lgOffset={2}
                >
                  <Pagination
                    page={this.state.page}
                    limit={this.state.limit}
                    count={this.state.count}
                    onClickPre={this.onClickPre}
                    onClickNext={this.onClickNext}
                  />
                </Col>
              </Row> : null
          }
        </Grid>
      </div>
    );
  }
}

Page.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  loadingData: PropTypes.objectOf(PropTypes.bool).isRequired,
  toggleLoading: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    loadingData: state.loadingData,
  }),
  {
    toggleLoading,
    toggleSnackbar,
  },
)(Radium(Page));
