import React, { useState } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-dark">
      <div className="container">
        <a
          href="https://daultonb.com"
          className="navbar-brand"
          rel="noopener noreferrer"
          onClick={closeMenu}
        >
          <span className="brand-icon">DB</span>
        </a>

        <button
          className={`navbar-toggler ${isOpen ? "active" : ""}`}
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://www.linkedin.com/in/daultonbaird/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                LinkedIn
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://github.com/daultonb"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
