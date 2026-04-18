import type { Metadata } from 'next';
import { getCamperById } from '@/lib/api';
import CamperDetails from '@/components/CamperDetails/CamperDetails';

type Props = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);

  return {
    title: camper.name,
    description: camper.description,
    keywords: [
      'camper',
      camper.form,
      camper.engine,
      camper.transmission,
      camper.location,
    ],
    openGraph: {
      title: `${camper.name} — TravelTrucks`,
      description: camper.description,
      images: camper.coverImage ? [{ url: camper.coverImage }] : [],
      type: 'website',
    },
    twitter: {
      title: `${camper.name} — TravelTrucks`,
      description: camper.description,
      images: camper.coverImage ? [camper.coverImage] : [],
    },
  };
}

export default async function CamperDetailsPage({ params }: Props) {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);
  return <CamperDetails camper={camper} />;
}
