import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import Avatar from '../Avatar/Avatar.jsx';
import SiteLogo from '../../assets/logos/BrainFlix-logo.svg';
import DefaultAvatar from '../../assets/images/Mohan-muruge.jpg';
import Upload from '../../assets/icons/upload.svg';
import './PageHeader.scss';

export default class PageHeader extends Component {
  state = {
    searchInput: '',
    searchInputError: false,
  };
  formRef = React.createRef();

  formSubmitEvent = (e) => {
    e.preventDefault();
    //If form has no valid values in it
    if (!this.state.searchInput.trim()) {
      return this.setState({ searchInputError: true });
    }
    //if form value passed validation
    this.formRef.current.classList.remove('search--valid');
    this.setState({ searchInput: '' });
  };
  formInputChange = (e) => {
    //Add the active class and styles, and also remove the error class
    this.formRef.current.classList.add('search--valid');
    if (this.state.searchInputError) {
      this.setState({ searchInputError: false });
    }
    this.setState({
      searchInput: e.target.value,
    });
  };

  render() {
    return (
      <header className="header">
        <nav className="nav">
          <Link className="nav__link" to="/">
            <img src={SiteLogo} alt="site logo" className="nav__logo" />
          </Link>
          <div className="nav__right">
            <form
              className={`search ${
                this.state.searchInputError ? 'search--error' : ''
              }`}
              onSubmit={this.formSubmitEvent}
              ref={this.formRef}
            >
              <button className="search__submit"></button>
              <input
                type="text"
                className="search__input"
                placeholder="Search"
                name="search-input"
                onChange={(e) => this.formInputChange(e)}
                onFocus={() =>
                  this.formRef.current.classList.add('search--valid')
                }
                onBlur={() => {
                  this.formRef.current.classList.remove('search--valid');
                  this.formRef.current.classList.remove('search--error');
                }}
                value={this.state.searchInput}
              />
            </form>
            <Button
              className="nav__upload-btn"
              text="Upload"
              img={Upload}
              imgAlt="Upload icon"
              isLink
              to="/upload"
            />
            <Avatar
              className="nav__avatar"
              alt="user avatar"
              src={DefaultAvatar}
            />
          </div>
        </nav>
      </header>
    );
  }
}
