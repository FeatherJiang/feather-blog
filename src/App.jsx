import React from 'react';
import { StyleRoot } from 'radium';
import { BrowserRouter } from 'react-router-dom';
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
};

function App() {
  return (
    <StyleRoot className="App" style={style.app}>
      <BrowserRouter>
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
    </StyleRoot>
  );
}

export default App;
