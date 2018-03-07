import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ClearAllIcon from 'material-ui/svg-icons/communication/clear-all';
import LinkIcon from 'material-ui/svg-icons/content/link';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import HomeIcon from 'material-ui/svg-icons/action/home';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark';
import InboxIcon from 'material-ui/svg-icons/content/inbox';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import LabelIcon from 'material-ui/svg-icons/action/label';
import KeyboardArrowDownIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import feather from '../../assets/img/feather.jpg';
import bluePond from '../../assets/img/BluePond.jpg';
import API from '../../API';

const style = {
  menuTop: {
    color: '#999',
    backgroundImage: `url(${bluePond})`,
    backgroundSize: '260px 280px',
    overflow: 'hidden',
  },
  avatarWapper: {
    height: '50px',
    margin: '30px 2px 10px 20px',
  },
  menuButton: {
    float: 'right',
    width: '50px',
    height: '50px',
  },
  listItem: {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  iconButton: {
    top: '0',
    right: '4px',
    width: '48px',
    height: '48px',
  },
  iconColor: '#fff',
};

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      types: [],
      archive: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    this.getTypes();
    this.getArchive();
  }

  async getTypes() {
    try {
      const result = await API.getTypes();
      this.setState({
        types: result.data,
      });
    } catch (error) {
      throw error;
    }
  }

  async getArchive() {
    try {
      const result = await API.getArchive();
      this.setState({
        archive: result.data,
      });
    } catch (error) {
      throw error;
    }
  }

  handleToggle() {
    this.setState((preState) => {
      const state = preState.open;
      return { open: !state };
    });
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          label="Toggle Drawer"
          mini
          onClick={this.handleToggle}
        >
          <MenuIcon />
        </FloatingActionButton>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <div className="menuTop" style={style.menuTop} >
            <div className="avatarWapper" style={style.avatarWapper}>
              <Avatar size={50} src={feather} />
              <IconButton
                label="Toggle Drawer"
                onClick={this.handleToggle}
                style={style.menuButton}
              >
                <ClearAllIcon color={style.iconColor} />
              </IconButton>
            </div>
            <List>
              <ListItem
                primaryText="www.jiangfeather.com"
                primaryTogglesNestedList
                nestedItems={[
                  <a href="https://github.com/jiangfeather" target="blank" key="github">
                    <ListItem
                      primaryText="GitHub"
                      leftIcon={<LinkIcon color={style.iconColor} />}
                      style={style.listItem}
                    />
                  </a>,
                  <a href="mailto:jiangfeathers@gmail.com" key="email">
                    <ListItem
                      primaryText="Email Me"
                      leftIcon={<EmailIcon color={style.iconColor} />}
                      style={style.listItem}
                    />
                  </a>,
              ]}
                rightToggle={
                  <IconButton style={style.iconButton}>
                    <KeyboardArrowDownIcon color={style.iconColor} />
                  </IconButton>
                }
                style={style.listItem}
              />
            </List>
          </div>
          <List>
            <Link to="/" href="/" onClick={this.handleToggle}>
              <ListItem
                primaryText="Home"
                leftIcon={<HomeIcon />}
              />
            </Link>
            <ListItem
              primaryText="Types"
              leftIcon={<BookmarkIcon />}
              primaryTogglesNestedList
              nestedItems={this.state.types.map(type => (
                <ListItem
                  key={type.tid}
                  primaryText={type.name}
                  rightIcon={<Badge badgeContent={type.articleCount} primary />}
                  containerElement={<Link to={`/types/${type.name}`} href={`/types/${type.name}`} />}
                  onClick={this.handleToggle}
                />
                ))}
            />
            <ListItem
              primaryText="Archive"
              leftIcon={<InboxIcon />}
              primaryTogglesNestedList
              nestedItems={this.state.archive.map(item => (
                <ListItem
                  key={item.time}
                  primaryText={item.time}
                  rightIcon={<Badge badgeContent={item.articleCount} primary />}
                  containerElement={<Link to={`/archive/${item.time}`} href={`/types/${item.time}`} />}
                  onClick={this.handleToggle}
                />
                ))}
            />
            <Divider />
            <Link to="/tags" href="/tags" onClick={this.handleToggle}>
              <ListItem
                primaryText="Tags"
                leftIcon={<LabelIcon />}
              />
            </Link>
            <Link to="/aboutme" href="/aboutme" onClick={this.handleToggle}>
              <ListItem
                primaryText="About Me"
                leftIcon={<AccountCircleIcon />}
              />
            </Link>
          </List>
        </Drawer>
      </div>
    );
  }
}
