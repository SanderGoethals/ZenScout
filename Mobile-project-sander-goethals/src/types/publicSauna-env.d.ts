interface PublicSauna {
  id: string;
  name: string;
  location: string;
  city: string;
  province: string;
  category: string;
  price: string;
  offerTitle: string;
  description: string;
  url: string;
  images: {
    src: string;
    alt: string;
  }[];
  offerType: string;
  offerDuration: string;
  address: string;
  facilities: string[];
  arrangements: string[];
  contact: {
    site: string | null;
    socials: {
      facebook: string | null;
      instagram: string | null;
    };
  };
  score: string;
  reviewScores: {
    label: string;
    score: string;
  }[];
  detailImages: {
    src: string;
    alt: string;
  }[];
}