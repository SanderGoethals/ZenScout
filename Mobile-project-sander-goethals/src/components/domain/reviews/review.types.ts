import { Timestamp } from "firebase/firestore";

export interface Review {
  id: string;
  spaId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
}

export interface AddReviewProps {
  spaId: string;
  onClose?: () => void;
};