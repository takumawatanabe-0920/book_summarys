import React from 'react';

const Footer = () => {
  return (
    <footer className="l-footer">
      <div className="l-footer__logo">SHARESUMMRY</div>
      <div className="l-footer__links">
        <span className="l-footer__link">
          <a
            href="https://twitter.com/ku____maaa"
            target="_blank"
            rel="noopener"
            className="contact_link_hp"
          >
            お問い合わせ
          </a>
        </span>
        <span className="l-footer__link">
          <a href="#" className="contact_link_hp">
            サービス概要
          </a>
        </span>
        <br className="u-hidden-pc" />
        <span className="l-footer__link">
          <a href="#" className="contact_link_hp">
            プライバシーポリシー
          </a>
        </span>
        <span className="l-footer__link">
          <a href="#" className="contact_link_hp">
            sharesummaryついて
          </a>
        </span>
      </div>
      <div className="l-footer--copyright">
        <p>copyright SHARESUMMRY All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
