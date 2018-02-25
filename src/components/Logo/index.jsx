import React from 'react';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import ViewCarouselIcon from 'material-ui/svg-icons/action/view-carousel';
import { Row, Col } from 'react-flexbox-grid';
import background from '../../assets/img/BLACK_I_desktop-1.jpg';

const style = {
  paper: {
    height: '400px',
  },
  search: {
    position: 'relative',
    height: '40px',
  },
  searchButton: {
    position: 'absolute',
    zIndex: '1',
    top: '-25px',
    right: '10%',
  },
  searchText: {
    position: 'absolute',
    top: '-40px',
    left: '10%',
    width: '68%',
  },
  imgWapper: {
    height: '300px',
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: '300px',
  },
  img: {
    width: '200px',
    height: '200px',
    borderRadius: '20px',
    verticalAlign: 'middle',
  },
  name: {
    lineHeight: '60px',
    fontWeight: 'bold',
  },
  button: {
    width: '60px',
    height: '60px',
  },
};

function Logo() {
  return (
    <Paper style={style.paper}>
      <Row>
        <Col xs={12}>
          <div className="search" style={style.search}>
            <FloatingActionButton style={style.searchButton}>
              <SearchIcon />
            </FloatingActionButton>
            <TextField id="search" style={style.searchText} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="img-wapper" style={style.imgWapper}>
            <img src={background} alt="" style={style.img} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={7} xsOffset={1}>
          <span style={style.name}>feather&apos;s blog</span>
        </Col>
        <Col xs={4}>
          <IconMenu
            iconButtonElement={<IconButton style={style.button}><ViewCarouselIcon /></IconButton>}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            maxHeight={272}
          >
            <MenuItem value="AL" primaryText="Alabama" />
            <MenuItem value="AK" primaryText="Alaska" />
            <MenuItem value="AZ" primaryText="Arizona" />
          </IconMenu>
        </Col>
      </Row>
    </Paper>
  );
}

export default Logo;
