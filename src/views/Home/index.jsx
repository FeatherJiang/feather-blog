import React from 'react';
import Radium from 'radium';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Profile from '../../components/Profile';
import Logo from '../../components/Logo';
import ArticleOverview from '../../components/ArticleOverview';
import Pagination from '../../components/Pagination';
import API from '../../API';

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
  }
  componentWillMount() {
    this.getArticles();
  }
  async getArticles() {
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticles({ params });
      this.setState({
        count: result.data.count,
        articles: result.data.rows,
      });
    } catch (error) {
      throw error;
    }
  }
  render() {
    return (
      <div className="Home" style={style.home}>
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
          <Row style={style.gridMargin}>
            <Col xs={12} sm={12} md={10} lg={8} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
              <Pagination
                page={this.state.page}
                limit={this.state.limit}
                count={this.state.count}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Radium(Home);
