import { CommentModel } from "./comment";

export interface PostModel {
  id?: number;
  body: string;
  comments?: CommentModel[];
}
