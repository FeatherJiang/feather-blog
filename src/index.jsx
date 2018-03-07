import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700 } from 'material-ui/styles/colors';
import 'normalize.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './styles/base.css';

const muiTheme = getMuiTheme({
  fontFamily: '"Microsoft YaHei", "微软雅黑", San-serif',
  palette: {
    primary1Color: blue500,
    primary2Color: blue700,
    pickerHeaderColor: blue500,
  },
});

ReactDOM.render(

  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root'),
);
registerServiceWorker();
