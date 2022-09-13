import React from "react";
import imageMesto from '../images/Mesto.svg';

function Header () {
  return (
    <header className="header">
      <img className="header__logo" src={imageMesto} alt="Место" />
    </header>
  );
}

export default Header;