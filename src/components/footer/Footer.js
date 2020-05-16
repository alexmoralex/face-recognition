import React from 'react';
import Github from './github.png';
import Linkedin from './linkedin.png';
import Codepen from './codepen.png';
import Email from './email.png';
import './footer.css';

const Footer = () => {
  return(
    <div className="footer">
      <p className="mr2">Alejandro Morales</p>
      <div className="footer-icons ml2">
        <a href="https://github.com/alexmoralex" target="_blank" rel="noopener noreferrer" className="dim">
          <img src={Github} alt="github" />
        </a>
        <a href="https://codepen.io/alexmoralex" target="_blank" rel="noopener noreferrer" className="dim">
          <img src={Codepen} alt="codepen" />
        </a>
        <a href="https://www.linkedin.com/in/alejandromorales95/" target="_blank" rel="noopener noreferrer" className="dim">
          <img src={Linkedin} alt="linkedin" />
        </a>
        <a href="mailto:alejandromo1995@gmail.com" className="dim">
          <img src={Email} alt="email" />
        </a>
      </div>
    </div>
  );
}

export default Footer;