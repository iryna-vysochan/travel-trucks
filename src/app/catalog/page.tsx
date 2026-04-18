import { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse all available campers and filter by location, body type, engine and transmission.',
  keywords: [
    'camper catalog',
    'rent camper',
    'filter campers',
    'motorhome catalog',
  ],
  openGraph: {
    title: 'Camper Catalog — TravelTrucks',
    description:
      'Browse all available campers and filter by location, body type, engine and transmission.',
    type: 'website',
  },
  twitter: {
    title: 'Camper Catalog — TravelTrucks',
    description:
      'Browse all available campers and filter by location, body type, engine and transmission.',
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
