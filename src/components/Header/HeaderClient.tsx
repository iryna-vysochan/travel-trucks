'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import LogoIcon from '@/components/Logo/Logo';
import styles from './Header.module.css';

export default function HeaderClient() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={`${styles.header} ${isHome ? styles.headerHome : styles.headerDark}`}
    >
      <div className="container">
        <nav className={styles.nav}>
          <LogoIcon />
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link
                href="/"
                className={clsx(
                  styles.link,
                  pathname === '/' && styles.linkActive
                )}
              >
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link
                href="/catalog"
                className={clsx(
                  styles.link,
                  pathname === '/catalog' && styles.linkActive
                )}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
