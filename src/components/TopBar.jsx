import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation();
  const onHome = location.pathname === "/";
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="brand">
          <span className="brand__mark">RS</span>
          <span className="brand__text">Sundari • Treasure Hunt</span>
        </div>
        <nav className="nav">
          <Link className={"nav__link" + (onHome ? " is-active" : "")} to="/">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
