import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from 'src/modules/post/services/user.service';
import { User, IUser } from 'src/modules/post/models/user';

const STORE_KEY: string = 'user.store';
@Injectable()
export class UserStore {

    public onChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    private data: User[] = [];

    constructor(private _user: UserService) {
        let store = sessionStorage.getItem(STORE_KEY);
        if(store) {
            const posts: IUser[] = JSON.parse(store); 
            this.set(posts);
        } else 
            this.load();            
    }

    public get(): User[] {
        return this.data;
    }

    public set(users: IUser[]) {
        this.save(users);
        this.onChange.next(this.data);
    }

    public reload() {
        this.load();
    }

    private load() {
        this._user.list().subscribe((users: User[]) => {
            if(users) {
              this.set(users);
            }
        });
    }

    private save(users: IUser[]) {
        this.data = users.map(u => new User(u));
        sessionStorage.setItem(STORE_KEY, JSON.stringify(users));        
    }
}