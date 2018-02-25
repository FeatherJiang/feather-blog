import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'normalize.css';
import Route from './router';
import registerServiceWorker from './registerServiceWorker';
import './styles/base.css';

const muiTheme = getMuiTheme({
  fontFamily: '"Microsoft YaHei", "微软雅黑", San-serif',
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter><Route /></BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
