import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';
import config from '../../config';
import feather from '../../assets/img/feather.jpg';

const style = {
  paper: {
    overflow: 'hidden',
  },
  imgWapper: {
    position: 'relative',
    height: '280px',
    overflow: 'hidden',
    '@media (max-width: 575px)': {
      height: '200px',
    },
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
  overview: {
    padding: '20px',
    borderBottom: '1px solid #eee',
  },
  overviewText: {
    lineHeight: '26px',
  },
  readLink: {
    display: 'inline-block',
    marginLeft: '30px',
    color: 'rgb(33, 150, 243)',
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
    '@media (max-width: 575px)': {
      width: '80px',
      height: '20px',
      overflow: 'hidden',
    },
  },
  typeList: {
    height: '60px',
    overflow: 'hidden',
  },
  typeWapper: {
    float: 'right',
    margin: '15px 0',
  },
  type: {
    height: '30px',
    margin: '0 5px',
    lineHeight: '30px',
    cursor: 'pointer',
  },
  gridMargin: {
    padding: '10px 0',
  },
};

function ArticleOverview(props) {
  return (
    <div className="paperWapper" style={style.paperWapper}>
      <Paper style={style.paper}>
        <Row>
          <Col xs={12}>
            <Link to={`/article/${props.data.aid}`} href={`/article/${props.data.aid}`}>
              <div className="img-wapper" style={style.imgWapper}>
                <img src={config.baseURL + props.data.banner} alt="" style={style.img} />
                <span className="title" style={style.title}>
                  {props.data.title}
                </span>
              </div>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="overview" style={style.overview}>
              <span style={style.overviewText}>{props.data.overview}</span>
              <Link to={`/article/${props.data.aid}`} href={`/article/${props.data.aid}`}>
                <span style={style.readLink}>阅读全文</span>
              </Link>
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
              <p style={style.time}>{new Date(props.data.createdAt).toLocaleString()}</p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="typeList" style={style.typeList}>
              {props.data.types.map(type => (
                <Link
                  to={`/types/${type.name}`}
                  href={`/types/${type.name}`}
                  style={style.typeWapper}
                  key={type.tid}
                >
                  <Chip style={style.type} labelStyle={style.type}>
                    {type.name}
                  </Chip>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Paper>
    </div>
  );
}

ArticleOverview.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Radium(ArticleOverview);
