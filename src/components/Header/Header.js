import React, { Component } from 'react';

import './Header.scss';
import SiteLogo from '../../assets/logos/BrainFlix-logo.svg';
import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import Upload from '../../assets/icons/upload.svg';

import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';
import Box from '../Box/Box';

export default class Header extends Component {
  state = {
    input: '',
  };
  formSubmitEvent(e) {
    e.preventDefault();
    if (!e.target.searchInput.value)
      return e.target.classList.add('search__input--error');
    e.target.searchInput.value = '';
    e.target.classList.remove('search__input--success');
    e.target.classList.remove('search__input--error');
  }
  formInputChange(e) {
    if (e.target.value)
      e.target.closest('form').classList.add('search__input--success');

    if (!e.target.value) {
      e.target.closest('form').classList.remove('search__input--error');
      e.target.closest('form').classList.remove('search__input--success');
    }
    this.setState({
      input: e.target.value,
    });
  }
  render() {
    return (
      <header className="header">
        <nav className="nav">
          <a className="nav__link" href="/">
            <img src={SiteLogo} alt="site logo" className="nav__logo" />
          </a>
          <Box className="nav__right" element="section">
            <form
              className="search"
              id="searchForm"
              onSubmit={this.formSubmitEvent}
            >
              <button className="search__submit"></button>
              <input
                type="text"
                className="search__input"
                placeholder="Search"
                name="searchInput"
                onChange={(e) => this.formInputChange(e)}
              />
            </form>
            <Button
              className="nav__btn"
              text="Upload"
              img={Upload}
              imgAlt={'Upload icon'}
            />
            <Avatar
              linkURL={DefaultAvatar}
              alt="Navbar avatar"
              className={'nav__avatar'}
            />
          </Box>
        </nav>
      </header>
    );
  }
}
