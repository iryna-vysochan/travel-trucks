import { useState } from 'react';
import Image from 'next/image';
import { Camper } from '@/types/camper';
import LinkButton from '@/components/LinkButton/LinkButton';
import { FaStar } from 'react-icons/fa6';
import { BsMap, BsFuelPump, BsDiagram3 } from 'react-icons/bs';
import { IoMdCar } from 'react-icons/io';
import styles from './CamperCard.module.css';

type CamperCardProps = {
  readonly camper: Camper;
};

export default function CamperCard({ camper }: CamperCardProps) {
  const [imgSrc, setImgSrc] = useState(
    camper.coverImage || '/img/default-camper.svg'
  );
  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imgSrc}
          alt={camper.name}
          fill
          sizes="290px"
          className={styles.image}
          onError={() => setImgSrc('/img/default-camper.svg')}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.name}>{camper.name}</h2>
          <p className={styles.price}>€{camper.price.toLocaleString()}</p>
        </div>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <FaStar fill="#ffc531" size={16} />
            <span>
              {camper.rating} ({camper.totalReviews} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <BsMap size={16} />
            <span>{camper.location.replace('Ukraine, ', '')}</span>
          </div>
        </div>
        <p className={styles.description}>
          {camper.description.length > 90
            ? `${camper.description.slice(0, 90).trim()}...`
            : camper.description}
        </p>
        <ul className={styles.features}>
          <li className={styles.feature}>
            <BsFuelPump size={20} />
            <span>
              {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
            </span>
          </li>
          <li className={styles.feature}>
            <BsDiagram3 size={20} />
            <span>
              {camper.transmission.charAt(0).toUpperCase() +
                camper.transmission.slice(1)}
            </span>
          </li>
          <li className={styles.feature}>
            <IoMdCar size={20} />
            <span>
              {camper.form.charAt(0).toUpperCase() + camper.form.slice(1)}
            </span>
          </li>
        </ul>
        <div className={styles.btnWrapper}>
          <LinkButton href={`/catalog/${camper.id}`} target="_blank">
            Show more
          </LinkButton>
        </div>
      </div>
    </li>
  );
}
