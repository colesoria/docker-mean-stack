import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PostService } from 'src/modules/post/services/post.service';
import { Post, IPost } from 'src/modules/post/models/post';

const STORE_KEY: string = 'post.store';
@Injectable()
export class PostStore {

    public onChange: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
    private data: Post[] = [];

    constructor(private _post: PostService) {
        let store = sessionStorage.getItem(STORE_KEY);
        if(store) {
            const posts: IPost[] = JSON.parse(store); 
            this.set(posts);
        } else 
            this.load();            
    }

    public get(): Post[] {
        return this.data;
    }

    public set(posts: IPost[]) {
        this.save(posts);
        this.onChange.next(this.data);
    }

    public reload() {
        this.load();
    }

    private load() {
        this._post.list().subscribe((posts: Post[]) => {
            if(posts) {
              this.set(posts);
            }
        });
    }

    private save(posts: IPost[]) {
        this.data = posts.map(p => new Post(p));
        sessionStorage.setItem(STORE_KEY, JSON.stringify(posts));        
    }
}