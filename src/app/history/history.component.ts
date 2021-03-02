import { Component, OnInit } from '@angular/core';
import { GifUser } from '../app.model';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
    public user: GifUser;
    constructor() { }

    ngOnInit(): void {
        const storage: Storage = JSON.parse(localStorage.getItem('callvu'));
        const user: GifUser = storage.find((user: GifUser) => { return user.isLoggedin === true });
        if (user) {
            this.user = user;
        }
    }

}
