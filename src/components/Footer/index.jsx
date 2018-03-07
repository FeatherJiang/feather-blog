import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import githubIcon from '../../assets/img/github-square.png';

const style = {
  footer: {
    padding: '40px 8px',
    background: '#fff',
    color: '#999',
  },
  imgWapper: {
    textAlign: 'center',
  },
  img: {
    width: '30px',
    height: '30px',
    marginTop: '5px',
    borderRadius: '5px',
  },
  copyright: {
    marginTop: '10px',
    textAlign: 'center',
  },
  powerby: {
    marginTop: '10px',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

function Footer() {
  return (
    <div className="Footer" style={style.footer}>
      <Row>
        <Col xs={12} sm={4}>
          <div style={style.imgWapper}>
            <img src={githubIcon} alt="" style={style.img} />
          </div>
        </Col>
        <Col xs={12} sm={4}>
          <div style={style.copyright}>Copyright © 2018 Feather&apos;s Blog</div>
        </Col>
        <Col xs={12} sm={4}>
          <div style={style.powerby}>Power by React/Theme - material</div>
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
