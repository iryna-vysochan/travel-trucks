'use client';

import { useState } from 'react';
import { CamperFilters } from '@/types/filters';
import { BsMap } from 'react-icons/bs';
import styles from './Filters.module.css';

type FiltersProps = {
  filters: CamperFilters;
  onFilterChange: (filters: CamperFilters) => void;
};

const FORMS = [
  { value: 'alcove', label: 'Alcove' },
  { value: 'panelVan', label: 'Panel Van' },
  { value: 'integrated', label: 'Integrated' },
  { value: 'semiIntegrated', label: 'Semi Integrated' },
];

const ENGINES = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
];

const TRANSMISSIONS = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState<CamperFilters>(filters);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleClear = () => {
    const empty: CamperFilters = {};
    setLocalFilters(empty);
    onFilterChange(empty);
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="location">
          Location
        </label>
        <div className={styles.inputWrapper}>
          <BsMap size={20} className={styles.inputIcon} />
          <input
            id="location"
            type="text"
            className={styles.input}
            placeholder="City"
            value={localFilters.location || ''}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, location: e.target.value })
            }
          />
        </div>
      </div>

      <p className={styles.title}>Filters</p>

      <fieldset className={styles.group}>
        <legend className={styles.subtitle}>Camper form</legend>
        <ul className={styles.options}>
          {FORMS.map(({ value, label }) => (
            <li key={value}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="form"
                  value={value}
                  checked={localFilters.form === value}
                  onChange={() =>
                    setLocalFilters({ ...localFilters, form: value })
                  }
                  className={styles.radio}
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.subtitle}>Engine</legend>
        <ul className={styles.options}>
          {ENGINES.map(({ value, label }) => (
            <li key={value}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="engine"
                  value={value}
                  checked={localFilters.engine === value}
                  onChange={() =>
                    setLocalFilters({ ...localFilters, engine: value })
                  }
                  className={styles.radio}
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.subtitle}>Transmission</legend>
        <ul className={styles.options}>
          {TRANSMISSIONS.map(({ value, label }) => (
            <li key={value}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="transmission"
                  value={value}
                  checked={localFilters.transmission === value}
                  onChange={() =>
                    setLocalFilters({ ...localFilters, transmission: value })
                  }
                  className={styles.radio}
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className={styles.actions}>
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
        <button type="button" className={styles.clearBtn} onClick={handleClear}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Clear filters
        </button>
      </div>
    </form>
  );
}
