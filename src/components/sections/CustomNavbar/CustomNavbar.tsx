import { NavbarSection, getOverriddenSection } from "@faststore/core"

import styles from "./custom-navbar.module.scss"

const CustomNavbarLinks = () => (
  <nav className={styles.navLinks} data-fs-navbar-links>
    <div className={styles.navLinksInner}>
      <div className={styles.navItem}>
        <a href="#" className={styles.navLinkAll}>
          <span className={styles.hamburgerIcon}>
            <span />
            <span />
            <span />
          </span>
          Todos los productos
        </a>
        <div className={styles.dropdown}>
          <a href="#" className={styles.dropdownItem}>
            Alimentos
          </a>
          <a href="#" className={styles.dropdownItem}>
            Bebidas
          </a>
          <a href="#" className={styles.dropdownItem}>
            Carnes
          </a>
          <a href="#" className={styles.dropdownItem}>
            Lácteos
          </a>
          <a href="#" className={styles.dropdownItem}>
            Panadería
          </a>
        </div>
      </div>
      <a href="#" className={styles.navLink}>
        Destacados
      </a>
      <a href="#" className={styles.navLink}>
        Ofertas
      </a>
    </div>
  </nav>
)

const CustomNavbar = getOverriddenSection({
  Section: NavbarSection,
  components: {
    NavbarLinks: { Component: CustomNavbarLinks },
  },
})

export default CustomNavbar
