import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ArticleOverview from '../../components/ArticleOverview';
import Pagination from '../../components/Pagination';
import API from '../../API';

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
  }

  componentWillMount() {
    if (this.props.match.params.type) {
      this.getArticlesByTypes(this.props.match.params.type);
    } else if (this.props.match.params.tag) {
      this.getArticlesByTags(this.props.match.params.tag);
    } else if (this.props.match.params.year) {
      this.getArticlesByArchive(`${this.props.match.params.year}/${this.props.match.params.month}`);
    }
  }
  async getArticlesByTypes(parameter) {
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticlesByTypes({ parameter, params });
      this.setState({
        count: result.data.count,
        articles: result.data.rows,
      });
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByTags(parameter) {
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticlesByTags({ parameter, params });
      this.setState({
        count: result.data.count,
        articles: result.data.rows,
      });
    } catch (error) {
      throw error;
    }
  }

  async getArticlesByArchive(parameter) {
    try {
      const params = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
        key: this.state.key,
      };
      const result = await API.getArticlesByArchive({ parameter, params });
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

Page.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Radium(Page);
