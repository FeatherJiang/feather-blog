import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { GETED } from '../../config/statusCode';
import API from '../../API';
import { toggleLoading } from '../../store/loading/action';
import { toggleSnackbar } from '../../store/snackbar/action';

const style = {
  tags: {
    paddingTop: '160px',
  },
  tagList: {
    marginBottom: '190px',
  },
  tag: {
    display: 'inline-block',
    padding: '0 10px',
    height: '40px',
    fontSize: '30px',
    lineHeight: '40px',
    verticalAlign: 'top',
    color: 'rgba(0,0,0,1)',
    borderRadius: '2px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxSizing: 'border-box',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    ':hover': {
      backgroundColor: 'rgb(255, 255, 255)',
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    },
  },
};

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      total: 0,
    };
  }
  componentDidMount() {
    this.getTags();
  }

  async getTags() {
    this.props.toggleLoading();
    try {
      const result = await API.getTags();
      let total = 0;
      result.data.forEach((item) => {
        total += item.articleCount;
      });
      if (result.statusCode === GETED) {
        this.setState({
          tags: result.data,
          total,
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
      <div className="tags" style={style.tags}>
        <Grid fluid>
          <Row style={style.tagList}>
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
              {
                this.state.tags.map((tag) => {
                  const tagStyle = Object.assign({}, style.tag);
                  const fontSize = ((tag.articleCount / this.state.total) * 30) + 12;
                  const color = (tag.articleCount / this.state.total) + 0.2;
                  tagStyle.fontSize = `${fontSize}px`;
                  tagStyle.color = `rgba(0,0,0,${color})`;
                  return (
                    <Link to={`/tags/${tag.name}`} href={`/tags/${tag.name}`} key={tag.tid}>
                      <div className="tag" key={tag.tid} style={tagStyle}>{tag.name}</div>
                    </Link>
                  );
                })
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Tags.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default connect(null, {
  toggleLoading,
  toggleSnackbar,
})(Radium(Tags));
