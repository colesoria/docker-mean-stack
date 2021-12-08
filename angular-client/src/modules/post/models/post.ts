import { User } from './user';
import { Comment } from './comment';

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
  comments?: Comment[];
}

export class Post implements IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
  comments?: Comment[];
	constructor(obj?: IPost) {
		if(!obj)
      return;

    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.userId = obj.userId;
    this.user = obj.user;
    this.comments = obj.comments
  }
}
