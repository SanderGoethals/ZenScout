export interface CreateReviewInput {
  spaId: string;
  rating: number;
  comment: string;
}

export type RegisterUserInput = {
  email: string;
  password: string;
};