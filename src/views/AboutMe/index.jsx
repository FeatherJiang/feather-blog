import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';

import ArticleHeader from '../../components/ArticleHeader';
import ArticleMarkdown from '../../components/ArticleMarkdown';
import background from '../../assets/img/BlackBackground.jpg';
import { GETED } from '../../config/statusCode';
import API from '../../API';
import { toggleLoading } from '../../store/loading/action';
import { toggleSnackbar } from '../../store/snackbar/action';

const style = {
  aboutme: {
    paddingTop: '160px',
    '@media (max-width: 575px)': {
      paddingTop: '20px',
    },
  },
  paper: {
    overflow: 'hidden',
  },
};

class AboutMe extends React.Component {
  constructor() {
    super();
    this.state = {
      introduce: '',
      createdAt: '',
    };
  }

  componentWillMount() {
    this.getUser();
  }

  async getUser() {
    this.props.toggleLoading();
    try {
      const result = await API.getUser();
      if (result.statusCode === GETED) {
        this.setState({
          introduce: result.data.introduce,
          createdAt: result.data.createdAt,
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
      <div className="AboutMe" style={style.aboutme}>
        <Grid fluid>
          <Row>
            <Col xs={12} sm={12} md={10} lg={8} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
              <Paper style={style.paper}>
                <ArticleHeader
                  banner={background}
                  title="遇见未来的自己"
                  createdAt={this.state.createdAt}
                />
                <ArticleMarkdown content={this.state.introduce} />
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

AboutMe.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
  toggleSnackbar: PropTypes.func.isRequired,
};

export default connect(null, {
  toggleLoading,
  toggleSnackbar,
})(Radium(AboutMe));
