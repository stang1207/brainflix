import React, { Component } from 'react';

import './Header.scss';
import SiteLogo from '../../assets/logos/BrainFlix-logo.svg';
import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import Upload from '../../assets/icons/upload.svg';
import ButtonLink from '../ButtonLink/ButtonLink';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import Box from '../Box/Box';

export default class Header extends Component {
  state = {
    input: '',
  };
  formRef = React.createRef();
  formSubmitEvent = (e) => {
    e.preventDefault();
    this.formRef.current.classList.remove('search__input--success');
    if (!this.state.input.trim()) {
      this.setState({ input: '' });
      return e.target.classList.add('search__input--error');
    }
    this.setState({ input: '' });
    this.formRef.current.classList.remove('search__input--success');
    this.formRef.current.classList.remove('search__input--error');
  };
  formInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
    if (e.target.value)
      this.formRef.current.classList.add('search__input--success');
    if (!e.target.value) {
      this.formRef.current.classList.remove('search__input--error');
      this.formRef.current.classList.remove('search__input--success');
    }
  };
  render() {
    return (
      <header className="header">
        <nav className="nav">
          <Link to="/">
            <img src={SiteLogo} alt="site logo" className="nav__logo" />
          </Link>
          <Box className="nav__right">
            <form
              className="search"
              id="searchForm"
              onSubmit={this.formSubmitEvent}
              ref={this.formRef}
            >
              <button className="search__submit"></button>
              <input
                type="text"
                className="search__input"
                placeholder="Search"
                name="searchInput"
                onChange={(e) => this.formInputChange(e)}
                value={this.state.input}
              />
            </form>
            <ButtonLink
              to="/upload"
              className="link-btn nav__btn"
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
