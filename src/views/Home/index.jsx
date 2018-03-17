import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import LinearProgress from 'material-ui/LinearProgress';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Profile from '../../components/Profile';
import Logo from '../../components/Logo';
import ArticleOverview from '../../components/ArticleOverview';
import Pagination from '../../components/Pagination';
import { GETED } from '../../config/statusCode';
import API from '../../API';
import { toggleLoading } from '../../store/loading/action';
import { toggleSnackbar } from '../../store/snackbar/action';

const style = {
  home: {
    paddingTop: '160px',
    '@media (max-width: 575px)': {
      paddingTop: '20px',
    },
  },
  gridMargin: {
    marginBottom: '40px',
  },
};

class Home extends React.Component {
  constructor() {
    super();
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
    this.getArticles();
  }

  onClickPre() {
    this.setState(preState => ({ page: preState.page - 1 }), () => {
      this.getArticles();
    });
  }

  onClickNext() {
    this.setState(preState => ({ page: preState.page + 1 }), () => {
      this.getArticles();
    });
  }

  async getArticles() {
    this.props.toggleLoading();
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticles({ params });
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
      <div className="Home" style={style.home}>
        <div className="loading" style={style.loading}>
          {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
        </div>
        <Grid fluid>
          <Row style={style.gridMargin}>
            <Col xs={12} sm={7} md={6} lg={5} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
              <Profile />
            </Col>
            <Col xs={12} sm={5} md={4} lg={3} xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0}>
              <Logo />
            </Col>
          </Row>
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
            this.state.count !== 0 ?
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

Home.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    toggleLoading,
    toggleSnackbar,
  },
)(Radium(Home));
