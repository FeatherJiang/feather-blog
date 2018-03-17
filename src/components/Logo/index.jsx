import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import ViewCarouselIcon from 'material-ui/svg-icons/action/view-carousel';
import LinearProgress from 'material-ui/LinearProgress';
import { List, ListItem } from 'material-ui/List';
import { Row, Col } from 'react-flexbox-grid';
import logo from '../../assets/img/Logo.png';
import API from '../../API';
import { GETED } from '../../config/statusCode';

const style = {
  paper: {
    height: '400px',
  },
  search: {
    position: 'relative',
    height: '40px',
  },
  searchButton: {
    position: 'absolute',
    zIndex: '1',
    top: '-28px',
    right: '10%',
  },
  searchText: {
    position: 'absolute',
    top: '-40px',
    left: '10%',
    width: '68%',
  },
  searchList: {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
  },
  imgWapper: {
    height: '300px',
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: '300px',
  },
  img: {
    width: '200px',
    height: '200px',
    borderRadius: '20px',
    verticalAlign: 'middle',
  },
  name: {
    lineHeight: '60px',
    fontWeight: 'bold',
  },
  button: {
    width: '60px',
    height: '60px',
  },
};

class Logo extends React.Component {
  constructor() {
    super();
    this.timer = null;
    this.state = {
      focus: false,
      loading: false,
      visual: false,
      page: 1,
      limit: 10,
      order: 'DESC',
      key: '',
      articles: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /* eslint-disable */
  async getArticles() {
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
          articles: result.data.rows,
        });
      }
      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  handleClick() {
    this.setState({
      focus: true,
      visual: true,
    }, () => {
      this.refs.searchInput.focus();
    });
  }

  handleBlur() {
    this.timer = setTimeout(()=> {
      this.setState({
        focus: false,
        visual: false,
        key: '',
      });
    }, 300)
  }

  handleChange(e, str) {
    if (str) {
      clearTimeout(this.timer);
      this.timer = setTimeout(()=> {
        this.setState({
          loading: true,
          key: str,
        }, () => {
          this.getArticles();
        });
      }, 300)
    } else {
      this.setState({
        loading: false,
        articles: [],
      });
    }
  }

  render() {
    return (
      <Paper style={style.paper}>
        <Row>
          <Col xs={12}>
            <div className="search" style={style.search}>
              <FloatingActionButton style={style.searchButton} onClick={this.handleClick}>
                <SearchIcon />
              </FloatingActionButton>
              {
                this.state.focus ?
                  <TextField
                    id="search"
                    name="search"
                    style={style.searchText}
                    underlineShow
                    ref="searchInput"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  /> : null
              }
              {
                this.state.visual ?
                <Paper className="searchList" style={style.searchList}>
                  {
                    this.state.loading ? <LinearProgress mode="indeterminate" /> : null
                  }
                  <List>
                    <Link to={{ pathname: '/page/1', state: this.state.key }} href="/page/1">
                      <ListItem primaryText="search all" rightIcon={<SearchIcon />} />
                    </Link>
                    {
                      this.state.articles.map(article => (
                        <Link key={article.aid} to={`/article/${article.aid}`} href={`/article/${article.aid}`}>
                          <ListItem primaryText={article.title} rightIcon={<SearchIcon />} />
                        </Link>
                      ))
                    }
                  </List>
                </Paper> : null
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="img-wapper" style={style.imgWapper}>
              <img src={logo} alt="" style={style.img} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={7} xsOffset={1}>
            <span style={style.name}>Feather&apos;s Blog</span>
          </Col>
          <Col xs={4}>
            <IconMenu
              iconButtonElement={<IconButton style={style.button}><ViewCarouselIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              maxHeight={272}
            >
              <Link to="/tags" href="/tags"><MenuItem primaryText="Tags" /></Link>
              <Link to="/aboutme" href="/aboutme"><MenuItem primaryText="About Me" /></Link>
            </IconMenu>
          </Col>
        </Row>
      </Paper>
    );
  }
  /* eslint-enable */
}

export default Logo;
