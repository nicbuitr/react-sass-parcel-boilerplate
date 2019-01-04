import React, { Component } from 'react';

class Header extends Component {
  render () {
    return (
      <section className="header">
        <h1>{__dirname.split('\\').reverse()[2].split('-').join(', ').toLocaleUpperCase()}</h1>
      </section>
    );
  }
}
export default Header;