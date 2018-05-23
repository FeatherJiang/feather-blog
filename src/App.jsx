import React from 'react';
import { StyleRoot } from 'radium';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Route from './router';

const style = {
  app: {
    position: 'relative',
    minHeight: '100%',
    paddingBottom: '200px',
    boxSizing: 'border-box',
  },
  menu: {
    position: 'fixed',
    zIndex: '999',
    top: '30px',
    left: '30px',
  },
  footer: {
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
  },
  loading: {
    position: 'fixed',
    zIndex: '999',
    top: '0',
    right: '0',
    left: '0',
  },
};

const handlePageChange = () => {
  window.scrollTo(0, 0);
};

function App(props) {
  return (
    <StyleRoot className="App" style={style.app}>
      <BrowserRouter onUpdate={handlePageChange}>
        <div>
          <Route />
          <div className="menWapper" style={style.menu}>
            <Menu />
          </div>
        </div>
      </BrowserRouter>
      <div className="footWapper" style={style.footer}>
        <Footer />
      </div>
      <div className="loading" style={style.loading}>
        { props.loadingData.loading ? <LinearProgress mode="indeterminate" /> : null}
      </div>
      <Snackbar
        open={props.snackbarData.toggle}
        message={props.snackbarData.message}
        autoHideDuration={3000}
      />
    </StyleRoot>
  );
}

App.propTypes = {
  loadingData: PropTypes.objectOf(PropTypes.bool).isRequired,
  snackbarData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(state => ({
  loadingData: state.loadingData,
  snackbarData: state.snackbarData,
}))(App);
