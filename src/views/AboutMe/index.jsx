import React from 'react';
import Paper from 'material-ui/Paper';
import Radium from 'radium';
import { Grid, Row, Col } from 'react-flexbox-grid';

import ArticleHeader from '../../components/ArticleHeader';
import ArticleMarkdown from '../../components/ArticleMarkdown';

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

function Article() {
  return (
    <div className="Article" style={style.article}>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={10} lg={8} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
            <Paper style={style.paper}>
              <ArticleHeader />
              <ArticleMarkdown source="" />
            </Paper>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Radium(Article);
