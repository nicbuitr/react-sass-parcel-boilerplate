import React, { Component } from 'react';
import fs from 'fs';

class Footer extends Component {
  render() {
    let copy = fs.readFileSync('./src/api/copyright.txt', 'utf8');
    return (
      <section className="footer">
        <p className="footer__copy">&copy; {new Date().getFullYear()} {copy}</p>
      </section>
    );
  }
}

export default Footer;