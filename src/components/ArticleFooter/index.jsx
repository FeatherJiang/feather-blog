import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Badge from 'material-ui/Badge';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import UnStarIcon from 'material-ui/svg-icons/toggle/star-border';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import { CREATED, DELETED } from '../../config/statusCode';
import API from '../../API';

const style = {
  info: {
    height: '50px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  infoItem: {
    display: 'inline-block',
    margin: '0 10px',
    padding: '12px 0',
  },
  badge: {
    paddingBottom: '0',
    paddingLeft: '10px',
  },
  starButton: {
    float: 'right',
  },
};

export default class ArticleFooter extends React.Component {
  constructor() {
    super();
    this.state = {
      like: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.like) {
      this.unstar();
    } else {
      this.star();
    }
  }

  async star() {
    try {
      const result = await API.putStar({ parameter: this.props.aid });
      if (result.statusCode === CREATED) {
        this.setState({ like: true });
      }
    } catch (error) {
      throw error;
    }
  }

  async unstar() {
    try {
      const result = await API.delStar({ parameter: this.props.aid });
      if (result.statusCode === DELETED) {
        this.setState({ like: false });
      }
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div className="ArticleFooter">
        <Row>
          <Col xs={12}>
            <div className="info" style={style.info}>
              <div className="star" style={style.infoItem}>
                <StarIcon />
                <Badge
                  badgeContent={this.props.starNum}
                  primary
                  style={style.badge}
                />
              </div>
              <div className="eye" style={style.infoItem}>
                <EyeIcon />
                <Badge
                  badgeContent={this.props.watchNum}
                  primary
                  style={style.badge}
                />
              </div>
              <div className="comment" style={style.infoItem}>
                <CommentIcon />
                <Badge
                  badgeContent={this.props.commentsNum}
                  primary
                  style={style.badge}
                />
              </div>
              <FloatingActionButton mini onClick={this.handleClick} style={style.starButton}>
                {
                  this.state.like ? <StarIcon /> : <UnStarIcon />
                }
              </FloatingActionButton>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

ArticleFooter.propTypes = {
  aid: PropTypes.number.isRequired,
  starNum: PropTypes.number.isRequired,
  watchNum: PropTypes.number.isRequired,
  commentsNum: PropTypes.number.isRequired,
};
