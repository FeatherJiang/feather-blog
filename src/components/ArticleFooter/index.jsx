import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Badge from 'material-ui/Badge';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import StarIcon from 'material-ui/svg-icons/toggle/star';
import UnStarIcon from 'material-ui/svg-icons/toggle/star-border';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import CommentIcon from 'material-ui/svg-icons/communication/comment';

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
    this.setState(((preState) => {
      const state = preState.like;
      return { like: !state };
    }));
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
                  badgeContent={4}
                  primary
                  style={style.badge}
                />
              </div>
              <div className="eye" style={style.infoItem}>
                <EyeIcon />
                <Badge
                  badgeContent={4}
                  primary
                  style={style.badge}
                />
              </div>
              <div className="comment" style={style.infoItem}>
                <CommentIcon />
                <Badge
                  badgeContent={4}
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
