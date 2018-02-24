import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Profile from '../../components/Profile';

const style = {
  home: {
    paddingTop: '160px',
  },
};

function Home() {
  return (
    <div className="Home" style={style.home}>
      <Grid fluid>
        <Row>
          <Col xs={12} sm={7} md={5} lg={4} xsOffset={0} smOffset={2} mdOffset={2} lgOffset={3}>
            <Profile />
          </Col>
          <Col xs={12} sm={5} md={3} lg={2} xsOffset={0} smOffset={2} mdOffset={0} lgOffset={0} />
        </Row>
      </Grid>
    </div>
  );
}

export default Home;
