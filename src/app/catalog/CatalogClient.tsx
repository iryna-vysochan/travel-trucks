'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCampers } from '@/lib/api';
import { CamperFilters } from '@/types/filters';
import CamperCard from '@/components/CamperCard/CamperCard';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import Loader from '@/components/Loader/Loader';

export default function CatalogClient() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['campers', filters],
      queryFn: ({ pageParam }) => getCampers(pageParam, filters),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  const campers = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <main className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <aside className={styles.sidebar}>
          <Filters filters={filters} onFilterChange={setFilters} />
        </aside>
        <section className={styles.content}>
          {isLoading ? (
            <Loader />
          ) : (
            <ul className={styles.list}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </ul>
          )}
          {isFetchingNextPage && <Loader />}
          {hasNextPage && !isFetchingNextPage && (
            <button onClick={() => fetchNextPage()} className={styles.loadMore}>
              Load more
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
