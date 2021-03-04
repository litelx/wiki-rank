import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiResponse, GifUser, MAX_HISTORY_LENGHT } from '../app.model';
import { GifService } from '../gif.servise';
import { StorageService } from '../storage.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public searchForm: FormGroup;
    public searchedItem: string;
    public page: number;
    public user: GifUser;
    public gifs$: Observable<apiResponse>;

    constructor(private formBuilder: FormBuilder,
        private gif: GifService,
        private storage: StorageService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.searchForm = this.formBuilder.group({
            querySearch: ['']
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.searchedItem = params['searchedItem'];
            this.searchForm.setValue({ 'querySearch': this.searchedItem })
            this.gifs$ = this.gif.search(this.searchedItem, this.page);
        });
        const storage: Storage = this.storage.getStorage();
        this.user = storage.find((user: GifUser) => { return user.isLoggedin === true });

        if (!this.user) {
            this.router.navigate(['']);
        }
        this.page = 0;
    }

    getMoreGifs(page: number): void {
        this.page += page;
        this.gifs$ = this.gif.search(this.querySearch.value, this.page);
    }

    searchGifs(): void {
        const storage: Storage = this.storage.getStorage();
        const user = storage.find((user: GifUser) => { return user.isLoggedin === true });
        this.user = user;
        if (user?.searchHistory.length === MAX_HISTORY_LENGHT) {
            user.searchHistory.shift();
        }
        user.searchHistory.push(this.querySearch.value);
        this.storage.setStorage(storage);

        this.router.navigate(['/main', { searchedItem: this.querySearch.value }]).then(page => { window.location.reload(); });
    }

    goToHistory(): void {
        this.router.navigate(['history']);
    }

    get querySearch() {
        return this.searchForm.get('querySearch');
    }
}
