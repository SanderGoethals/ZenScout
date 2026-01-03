import { Timestamp } from "firebase/firestore";

export interface Review {
  id: string;
  spaId: string;
  nickname: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}

export interface AddReviewProps {
  spaId: string;
  onClose?: () => void;
};

export interface ShowReviewsProps {
  spaId?: string;
  userId?: string;
  onHasReviews?: (hasReviews: boolean) => void;
}