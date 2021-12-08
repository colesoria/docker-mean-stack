export interface IComment {
    postId: number;
    id: number;
    name: string;
    body: string;
    email: string;
  }
  
  export class Comment implements IComment {
    postId: number;
    id: number;
    name: string;
    body: string;
    email: string;
    constructor(obj?: IComment) {
        if(!obj)
           return;
      this.postId = obj.postId;
      this.id = obj.id;
      this.name = obj.name;
      this.body = obj.body;
      this.email = obj.email;
    }
  }
  