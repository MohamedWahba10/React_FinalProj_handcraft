import React from 'react';
import styles from './NavBar.module.css'; // Import the CSS file 

function NavBar() {
  return (
    <header className={styles['header-area']}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles['col-12']}>
            <nav className={styles['main-nav']}>
              <a href="/" className={styles.logo}>
                <img src="" alt="Logo" />
              </a>
              <ul className={styles.nav}>
                <li className={styles['scroll-to-section']}><a href="/" className={styles.active}>Home</a></li>
                <li className={styles['scroll-to-section']}><a href="/">Men's</a></li>
                <li className={styles['scroll-to-section']}><a href="/">Women's</a></li>
                <li className={styles['scroll-to-section']}><a href="/">Kid's</a></li>
                <li className={styles.submenu}>
                  <a href="#">Pages</a>
                  <ul>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/single-product">Single Product</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                  </ul>
                </li>
                <li className={styles.submenu}>
                  <a href="#">Features</a>
                  <ul>
                    <li><a href="">Features Page 1</a></li>
                    <li><a href="">Features Page 2</a></li>
                    <li><a href="">Features Page 3</a></li>
                    <li><a rel="" href="" target="_blank">Template Page 4</a></li>
                  </ul>
                </li>
                <li className={styles['scroll-to-section']}><a href="/">Explore</a></li>
              </ul>
              <a className={styles['menu-trigger']}>
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
