import { CamperFilters } from '@/types/filters';
import { CampersResponse, Camper } from '@/types/camper';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCampers(
  page: number = 1,
  filters: CamperFilters = {}
): Promise<CampersResponse> {
  const params = new URLSearchParams();

  params.set('page', String(page));
  params.set('perPage', '4');

  if (filters.location) params.set('location', filters.location);
  if (filters.form) params.set('form', filters.form);
  if (filters.transmission) params.set('transmission', filters.transmission);
  if (filters.engine) params.set('engine', filters.engine);

  const res = await fetch(`${BASE_URL}/campers?${params.toString()}`);

  if (!res.ok) throw new Error('Failed to fetch campers');

  const data = await res.json();

  return {
    items: data.campers,
    total: data.total,
    page: data.page,
    perPage: data.perPage,
    totalPages: data.totalPages,
  };
}

export async function getCamperById(id: string): Promise<Camper> {
  const res = await fetch(`${BASE_URL}/campers/${id}`);

  if (!res.ok) throw new Error('Failed to fetch camper');

  return res.json();
}

export async function getCamperReviews(id: string) {
  const res = await fetch(`${BASE_URL}/campers/${id}/reviews`);

  if (!res.ok) throw new Error('Failed to fetch reviews');

  return res.json();
}

export async function bookCamper(
  camperId: string,
  data: { name: string; email: string }
): Promise<void> {
  const res = await fetch(`${BASE_URL}/campers/${camperId}/booking-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: data.name, email: data.email }),
  });

  if (!res.ok) throw new Error('Failed to book camper');
}
