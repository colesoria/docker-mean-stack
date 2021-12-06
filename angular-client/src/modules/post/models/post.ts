export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export class Post implements IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
	constructor(obj?: IPost) {
		if(!obj)
      return;

    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.userId = obj.userId;
  }
}
