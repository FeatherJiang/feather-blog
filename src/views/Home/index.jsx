import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Profile from '../../components/Profile';
import Logo from '../../components/Logo';
import ArticleOverview from '../../components/ArticleOverview';

const style = {
  home: {
    paddingTop: '160px',
  },
  gridMargin: {
    marginTop: '40px',
    marginBottom: '40px',
  },
};

function Home() {
  return (
    <div className="Home" style={style.home}>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={7} md={6} lg={5} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
            <Profile />
          </Col>
          <Col xs={12} sm={5} md={4} lg={3} xsOffset={0} smOffset={0} mdOffset={0} lgOffset={0}>
            <Logo />
          </Col>
        </Row>
        <Row style={style.gridMargin}>
          <Col xs={12} sm={12} md={10} lg={8} xsOffset={0} smOffset={0} mdOffset={1} lgOffset={2}>
            <ArticleOverview />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Home;
