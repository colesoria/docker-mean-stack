export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export class User implements IUser {
  id: number;
  name: string;
  username: string;
  email: string;
	constructor(obj?: IUser) {
		if(!obj)
      return;

    this.id = obj.id;
    this.name = obj.name;
    this.username = obj.username;
    this.email = obj.email;
  }
}
