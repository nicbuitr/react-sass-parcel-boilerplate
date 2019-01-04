import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import App from './components/App';
import Footer from './components/Footer';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
