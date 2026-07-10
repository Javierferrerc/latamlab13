"use client"

import { useRef, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

// Carrito nativo: contador real + abre/cierra el CartDrawer (CartSidebar).
import { useCartToggleButton } from "src/sdk/cart/useCartToggleButton"

import type { PulseNavBarProps, PulseNavPromo } from "./PulseNavBar.types"
import { DEFAULTS, DEFAULT_NAV_LINKS } from "./PulseNavBar.constants"
import styles from "./pulse-nav-bar.module.scss"

const promoBackground = (p: PulseNavPromo): React.CSSProperties => {
  if (p.image?.src) {
    return {
      backgroundImage: `url(${p.image.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }
  const angle = p.gradientAngle ?? 135
  return {
    background: `linear-gradient(${angle}deg, ${p.gradientStart ?? "#15131B"}, ${p.gradientEnd ?? "#3a2870"})`,
  }
}

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4-4" />
  </svg>
)
const AccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
  </svg>
)
const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

const PulseNavBar = ({
  showComponent = true,
  logoText = DEFAULTS.logoText,
  logoImage,
  logoUrl = DEFAULTS.logoUrl,
  navLinks,
  showSearch = true,
  searchUrl = DEFAULTS.searchUrl,
  showAccount = true,
  accountUrl = DEFAULTS.accountUrl,
  showCart = true,
  highlightActiveLink = false,
  background = DEFAULTS.background,
  enableBlur = true,
  blurAmount = DEFAULTS.blurAmount,
  linkColor = DEFAULTS.linkColor,
  brandColor = DEFAULTS.brandColor,
  logoColor = DEFAULTS.logoColor,
  iconColor = DEFAULTS.iconColor,
  borderColor = DEFAULTS.borderColor,
  badgeTextColor = DEFAULTS.badgeTextColor,
  sticky = true,
  logoFontFamily = DEFAULTS.logoFontFamily,
  linkFontFamily = DEFAULTS.linkFontFamily,
  logoFontSize = DEFAULTS.logoFontSize,
  logoLetterSpacing = DEFAULTS.logoLetterSpacing,
  linkFontSize = DEFAULTS.linkFontSize,
}: PulseNavBarProps) => {
  const router = useRouter()
  const cartBtn = useCartToggleButton()
  const cartCount = Number(cartBtn["data-items"]) || 0
  const [menuOpen, setMenuOpen] = useState(false)
  const [openCat, setOpenCat] = useState<number | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchPinned, setSearchPinned] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  if (showComponent === false) return null

  const links = navLinks?.length ? navLinks : DEFAULT_NAV_LINKS
  const currentPath = (router.asPath || "/").split("?")[0].split("#")[0]
  const isActive = (url?: string) => {
    if (!highlightActiveLink || !url || url === "#" || url === "/") return false
    const target = url.split("?")[0].split("#")[0]
    return currentPath === target || currentPath.startsWith(`${target}/`)
  }

  const cssVars = {
    "--pulse-nav-bg": background,
    "--pulse-nav-blur": enableBlur ? `blur(${blurAmount}px)` : "none",
    "--pulse-nav-link": linkColor,
    "--pulse-nav-brand": brandColor,
    "--pulse-nav-logo": logoColor,
    "--pulse-nav-icon": iconColor,
    "--pulse-nav-border": borderColor,
    "--pulse-nav-badge-text": badgeTextColor,
    "--pulse-nav-logo-font": logoFontFamily,
    "--pulse-nav-link-font": linkFontFamily,
    "--pulse-nav-logo-size": logoFontSize,
    "--pulse-nav-logo-spacing": logoLetterSpacing,
    "--pulse-nav-link-size": linkFontSize,
  } as React.CSSProperties

  const activeLink = openCat != null ? links[openCat] : null
  const panelSubs = activeLink?.subcategories ?? []
  const panelPromos = activeLink?.promos ?? []
  const showPanel = activeLink != null && (panelSubs.length > 0 || panelPromos.length > 0)
  const hasPanel = (link: (typeof links)[number]) =>
    (link.subcategories?.length ?? 0) > 0 || (link.promos?.length ?? 0) > 0

  const searchActive = searchOpen || searchPinned
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchTerm.trim()
    if (!q) {
      searchInputRef.current?.focus()
      return
    }
    router.push(`${searchUrl}?q=${encodeURIComponent(q)}`)
  }

  const Logo = (
    <a href={logoUrl} className={styles.logo} aria-label={logoText}>
      {logoImage?.src ? (
        <img src={logoImage.src} alt={logoImage.alt ?? logoText} className={styles.logoImg} />
      ) : (
        logoText
      )}
    </a>
  )

  const Cart = showCart ? (
    <button type="button" className={styles.iconBtn} onClick={cartBtn.onClick} aria-label="Carrito" data-testid="pulse-cart-toggle">
      <CartIcon />
      {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
    </button>
  ) : null

  return (
    <header
      className={styles.header}
      style={cssVars}
      data-sticky={sticky ? "true" : "false"}
      onMouseLeave={() => setOpenCat(null)}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.inner}>
        {/* Mobile: hamburger */}
        <button
          type="button"
          className={`${styles.iconBtn} ${styles.mobileOnly}`}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>

        {Logo}

        {/* Desktop: category nav */}
        <nav className={`${styles.nav} ${styles.desktopOnly}`} aria-label="Categorías">
          {links.map((link, i) => (
            <a
              key={`${link.url ?? link.label ?? i}`}
              href={link.url ?? "#"}
              className={styles.navLink}
              data-active={isActive(link.url) ? "true" : "false"}
              data-open={openCat === i ? "true" : "false"}
              onMouseEnter={() => setOpenCat(hasPanel(link) ? i : null)}
              aria-haspopup={hasPanel(link) ? "true" : undefined}
              aria-expanded={openCat === i ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.utilities}>
          {showSearch && (
            <>
              <div
                className={`${styles.search} ${styles.desktopOnly}`}
                data-open={searchActive ? "true" : "false"}
                onMouseEnter={() => setSearchOpen(true)}
                onMouseLeave={() => setSearchOpen(false)}
                onClick={() => searchInputRef.current?.focus()}
              >
                <form className={styles.searchPill} onSubmit={onSearchSubmit} role="search">
                  <input
                    ref={searchInputRef}
                    type="search"
                    className={styles.searchInput}
                    placeholder="¿Qué buscas?"
                    aria-label="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setSearchPinned(true)}
                    onBlur={() => setSearchPinned(false)}
                    tabIndex={searchActive ? 0 : -1}
                  />
                  <button type="submit" className={styles.searchBtn} aria-label="Buscar">
                    <SearchIcon />
                  </button>
                </form>
              </div>
              <a
                href={searchUrl}
                className={`${styles.iconBtn} ${styles.mobileOnly}`}
                aria-label="Buscar"
              >
                <SearchIcon />
              </a>
            </>
          )}
          {showAccount && (
            <a href={accountUrl} className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Mi cuenta">
              <AccountIcon />
            </a>
          )}
          {Cart}
        </div>
      </div>

      {/* Desktop mega-menu panel (hover) */}
      {showPanel && (
        <div className={styles.megaPanel}>
          <div
            className={styles.megaInner}
            data-cols={panelPromos.length > 0 ? "two" : "one"}
          >
            {panelSubs.length > 0 && (
              <div className={styles.megaCol}>
                <div className={styles.megaTitle}>{activeLink?.label}</div>
                <div className={styles.megaLinks}>
                  {panelSubs.map((s, si) => (
                    <a
                      key={`${s.url ?? s.label ?? si}`}
                      href={s.url ?? "#"}
                      className={styles.megaLink}
                      data-bold={s.bold ? "true" : "false"}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {panelPromos.length > 0 && (
              <div className={styles.megaPromos}>
                {panelPromos.map((p, pi) => (
                  <a
                    key={`${p.url ?? p.title ?? pi}`}
                    href={p.url ?? "#"}
                    className={styles.megaPromo}
                    style={promoBackground(p)}
                  >
                    <div>
                      {p.eyebrow && (
                        <div className={styles.promoEyebrow} style={{ color: p.accentColor }}>
                          {p.eyebrow}
                        </div>
                      )}
                      {p.title && (
                        <div className={styles.promoTitle} style={{ color: p.inkColor }}>
                          {p.title}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile slide-in menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menú de navegación">
          <div className={styles.mobileMenuHeader}>
            <span className={styles.logo}>{logoText}</span>
            <button type="button" className={styles.iconBtn} onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
              <CloseIcon />
            </button>
          </div>
          <nav className={styles.mobileNav} aria-label="Categorías">
            {links.map((link, i) => (
              <div key={`m-${link.url ?? link.label ?? i}`} className={styles.mobileGroup}>
                <a
                  href={link.url ?? "#"}
                  className={styles.mobileNavLink}
                  data-active={isActive(link.url) ? "true" : "false"}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
                {(link.subcategories?.length ?? 0) > 0 && (
                  <div className={styles.mobileSubs}>
                    {link.subcategories!.map((s, si) => (
                      <a
                        key={`ms-${s.url ?? s.label ?? si}`}
                        href={s.url ?? "#"}
                        className={styles.mobileSubLink}
                        onClick={() => setMenuOpen(false)}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {showAccount && (
              <a href={accountUrl} className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                Mi cuenta
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default PulseNavBar
