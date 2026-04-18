'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { bookCamper } from '@/lib/api';
import styles from './BookingForm.module.css';

type Props = {
  camperId: string;
};

export default function BookingForm({ camperId }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await bookCamper(camperId, { name, email });
      toast.success('Booking successful! We will contact you soon.');
      setName('');
      setEmail('');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={styles.fields}>
        <input
          id="booking-name"
          type="text"
          aria-label="Name"
          placeholder={nameFocused || name ? 'Name' : 'Name*'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameFocused(true)}
          onBlur={() => setNameFocused(false)}
          required
          className={styles.input}
        />
        <input
          id="booking-email"
          type="email"
          aria-label="Email"
          placeholder={emailFocused || email ? 'Email' : 'Email*'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          required
          className={styles.input}
        />
        <button type="submit" disabled={isLoading} className={styles.btn}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
