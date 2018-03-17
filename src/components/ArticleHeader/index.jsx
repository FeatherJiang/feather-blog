import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
import feather from '../../assets/img/feather.jpg';

const style = {
  paper: {
    height: '340px',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imgWapper: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
  },
  title: {
    position: 'absolute',
    left: '30px',
    bottom: '30px',
    color: '#fff',
    fontSize: '30px',
  },
  avatarWapper: {
    display: 'inline-block',
    height: '60px',
  },
  info: {
    display: 'inline-block',
    height: '40px',
    marginLeft: '20px',
    padding: '10px 0',
    verticalAlign: 'top',
  },
  avatar: {
    marginTop: '10px',
    marginLeft: '30px',
  },
  name: {
    margin: '0',
    fontWeight: 'bold',
  },
  time: {
    margin: '0',
  },
  typeList: {
    height: '30px',
    padding: '15px 0',
    paddingRight: '30px',
    overflow: 'hidden',
  },
  typeWapper: {
    float: 'right',
  },
  type: {
    height: '30px',
    lineHeight: '30px',
    cursor: 'pointer',
  },
  gridMargin: {
    padding: '10px 0',
  },
};

function ArticleHeader(props) {
  return (
    <div style={style.paper}>
      <Row>
        <Col xs={12}>
          <div className="img-wapper" style={style.imgWapper}>
            <img src={props.banner} alt="" style={style.img} />
            <span className="title" style={style.title}>{props.title}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div className="avatar-wapper" style={style.avatarWapper}>
            <Avatar src={feather} style={style.avatar} />
          </div>
          <div className="info" style={style.info}>
            <p style={style.name}>Feather</p>
            <p style={style.time}>{new Date(props.createdAt).toLocaleString()}</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className="typeList" style={style.typeList}>
            {
              props.types.map(type => (
                <Link to={`/types/${type.name}`} href={`/types/${type.name}`} style={style.typeWapper} key={type.tid}>
                  <Chip
                    style={style.type}
                    labelStyle={style.type}
                  >
                    {type.name}
                  </Chip>
                </Link>
              ))
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

ArticleHeader.propTypes = {
  banner: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.any),
};

ArticleHeader.defaultProps = {
  types: [],
};

export default ArticleHeader;
