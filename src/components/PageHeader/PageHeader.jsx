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
          <Link className="nav__link" to="/">
            <img src={SiteLogo} alt="site logo" className="nav__logo" />
          </Link>
          <div className="nav__right">
            <form
              className="search"
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
                value={this.state.input}
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
