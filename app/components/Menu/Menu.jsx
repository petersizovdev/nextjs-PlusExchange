"use client";
import React, { useState, useEffect, useRef } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import styles from './menu.module.css';
import Link from 'next/link';
import Button from '../Button/Button';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div ref={menuRef} className={styles.burger}>
      <div className={styles.burgerLogo}>
        <IoMenuOutline onClick={toggleMenu} />
      </div>
      {isMenuOpen && (
        <div className={styles.nav}>
          <Link href="/swap">
            <Button className={'stock'} onClick={handleLinkClick}>
              Обмен
            </Button>
          </Link>
          <Link href="/screener">
            <Button className={'stock'} onClick={handleLinkClick}>
              Скринер
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
