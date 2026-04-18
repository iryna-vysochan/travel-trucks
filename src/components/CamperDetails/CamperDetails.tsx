'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Camper, Review } from '@/types/camper';
import { getCamperReviews } from '@/lib/api';
import { FaStar } from 'react-icons/fa6';
import { BsMap } from 'react-icons/bs';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';
import styles from './CamperDetails.module.css';

type Props = {
  camper: Camper;
};

export default function CamperDetails({ camper }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  const handleImgError = (url: string) =>
    setFailedUrls((prev) => new Set(prev).add(url));

  const getSrc = (url: string) =>
    failedUrls.has(url) ? '/img/default-camper.svg' : url;

  useEffect(() => {
    getCamperReviews(camper.id)
      .then((data) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false));
  }, [camper.id]);

  const formatAmenity = (amenity: string) => {
    if (amenity === 'ac') return 'AC';
    if (amenity === 'tv') return 'TV';
    return amenity.charAt(0).toUpperCase() + amenity.slice(1);
  };

  const displayAmenities = [
    camper.transmission,
    ...camper.amenities.filter((a) => ['ac', 'kitchen', 'radio'].includes(a)),
    camper.engine,
    camper.form,
  ];

  return (
    <main className={styles.page}>
      <div className="container">
        <section className={styles.hero}>
          <div className={styles.gallery}>
            <Swiper
              modules={[FreeMode, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              loop
              className={styles.mainSwiper}
            >
              {camper.gallery.map((img, idx) => (
                <SwiperSlide key={img.id}>
                  <div className={styles.mainImageSlide}>
                    <Image
                      src={getSrc(img.original)}
                      alt={`${camper.name} ${idx + 1}`}
                      fill
                      sizes="638px"
                      className={styles.image}
                      priority={idx === 0}
                      onError={() => handleImgError(img.original)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[FreeMode, Thumbs]}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={16}
              freeMode
              watchSlidesProgress
              className={styles.thumbsSwiper}
            >
              {camper.gallery.map((img, idx) => (
                <SwiperSlide key={img.id} className={styles.thumbSlide}>
                  <div className={styles.thumbInner}>
                    <Image
                      src={getSrc(img.thumb)}
                      alt={`${camper.name} ${idx + 1}`}
                      fill
                      sizes="147px"
                      className={styles.thumbImage}
                      onError={() => handleImgError(img.thumb)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className={styles.info}>
            <div className={styles.card}>
              <h1 className={styles.name}>{camper.name}</h1>
              <div className={styles.meta}>
                <div className={styles.rating}>
                  <FaStar fill="#ffc531" size={16} />
                  <span>
                    {camper.rating} ({camper.totalReviews} Reviews)
                  </span>
                </div>
                <div className={styles.location}>
                  <BsMap size={16} />
                  <span>{camper.location}</span>
                </div>
              </div>
              <p className={styles.price}>€{camper.price}</p>
              <p className={styles.description}>{camper.description}</p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.detailsTitle}>Vehicle details</h2>
              <ul className={styles.amenities}>
                {displayAmenities.map((amenity) => (
                  <li key={amenity} className={styles.amenity}>
                    {formatAmenity(amenity)}
                  </li>
                ))}
              </ul>
              <hr className={styles.divider} />
              <table className={styles.table}>
                <tbody>
                  <tr>
                    <th scope="row" className={styles.tableKey}>Form</th>
                    <td className={styles.tableValue}>{camper.form}</td>
                  </tr>
                  <tr>
                    <th scope="row" className={styles.tableKey}>Length</th>
                    <td className={styles.tableValue}>{camper.length}</td>
                  </tr>
                  <tr>
                    <th scope="row" className={styles.tableKey}>Width</th>
                    <td className={styles.tableValue}>{camper.width}</td>
                  </tr>
                  <tr>
                    <th scope="row" className={styles.tableKey}>Height</th>
                    <td className={styles.tableValue}>{camper.height}</td>
                  </tr>
                  <tr>
                    <th scope="row" className={styles.tableKey}>Tank</th>
                    <td className={styles.tableValue}>{camper.tank}</td>
                  </tr>
                  <tr>
                    <th scope="row" className={styles.tableKey}>Consumption</th>
                    <td className={styles.tableValue}>{camper.consumption}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.bottom}>
          <div className={styles.reviews}>
            <h2 className={styles.reviewsTitle}>Reviews</h2>
            {reviewsLoading ? (
              <Loader />
            ) : (
              <ul className={styles.reviewsList}>
                {reviews.map((review) => (
                  <li key={review.id} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>
                        {review.reviewer_name.charAt(0)}
                      </div>
                      <div>
                        <p className={styles.reviewerName}>
                          {review.reviewer_name}
                        </p>
                        <div className={styles.reviewRating}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                              key={i}
                              size={16}
                              fill={
                                i < review.reviewer_rating
                                  ? '#ffc531'
                                  : '#e0e0e0'
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.booking}>
            <BookingForm camperId={camper.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
