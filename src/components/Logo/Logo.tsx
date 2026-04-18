import styles from './Logo.module.css';
import Link from 'next/link';
import Image from 'next/image';

const LogoIcon = () => {
  return (
    <Link href="/" className={styles.link} aria-label="Home page">
      <Image
        src="/Logo.svg"
        alt="TravelTrucks"
        width={136}
        height={16}
        priority
      />
    </Link>
  );
};

export default LogoIcon;
