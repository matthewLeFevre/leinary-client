import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../services/hooks";
import Logo from "../../assets/leinary-logo-white.svg";

export default function AppHeader() {
  const { user } = useUser();
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
