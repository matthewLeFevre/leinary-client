import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/leinary-logo-white.svg";
import { useUserCTX } from "../../services/contexts";

export default function AppHeader() {
  const { user } = useUserCTX();
  return (
    <header className='app-header'>
      <Link to='/' className='logo'>
        <img src={Logo} />
      </Link>
      <nav className='app-header-nav'>
        <Link to='/'>Dashboard</Link>
        <Link to='/settings'>Settings</Link>
      </nav>
    </header>
  );
}
