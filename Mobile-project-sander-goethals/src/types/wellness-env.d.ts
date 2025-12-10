interface Wellness {
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
  address: string;
  contact: {
    site: string;
    socials: {
      facebook: string;
      instagram: string;
    };
  };
  score: string | null;
}