import './Header.scss';
import SiteLogo from '../../assets/logos/BrainFlix-logo.svg';
import Upload from '../../assets/icons/upload.svg';
import Button from '../Button/Button';
import Avatar from '../Avatar/Avatar';

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <a className="nav__link" href="/">
          <img src={SiteLogo} alt="site logo" className="nav__logo" />
        </a>
        <div className="search">
          <form className="search__form" id="searchForm">
            <button className="search__submit"></button>
            <input type="text" className="search__input" placeholder="Search" />
          </form>
          <Button formId={'searchForm'}>
            <img src={Upload} alt="Upload icon" />
            <span>Upload</span>
          </Button>
          <Avatar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
