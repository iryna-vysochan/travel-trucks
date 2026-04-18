import styles from './page.module.css';
import { Metadata } from 'next';
import LinkButton from '@/components/LinkButton/LinkButton';

export const metadata: Metadata = {
  title: 'TravelTrucks — Rent a Camper for Your Adventure',
  description:
    'Browse our wide selection of campers and motorhomes. Comfortable, affordable and ready for your next road trip across Ukraine and Europe.',
  keywords: [
    'camper rental',
    'motorhome hire',
    'road trip',
    'travel camper',
    'camping van',
  ],
  openGraph: {
    title: 'TravelTrucks — Rent a Camper for Your Adventure',
    description:
      'Browse our wide selection of campers and motorhomes for your next road trip.',
    type: 'website',
  },
  twitter: {
    title: 'TravelTrucks — Rent a Camper for Your Adventure',
    description:
      'Browse our wide selection of campers and motorhomes for your next road trip.',
  },
};

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.description}>
          You can find everything you want in our catalog
        </p>
        <LinkButton href="/catalog">View now</LinkButton>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="/img/hero-baner@2x.webp 2x, /img/hero-baner@1x.webp 1x "
          />
          <img
            className={styles.image}
            width="1440"
            height="696"
            srcSet="/img/hero-baner@2x.webp 2x, /img/hero-baner@1x.webp 1x"
            src="/img/hero-baner@1x.webp"
            alt="Camper at sunset"
            fetchPriority="high"
          />
        </picture>
      </div>
    </section>
  );
}
