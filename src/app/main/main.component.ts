import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiResponse, GifUser, MAX_HISTORY_LENGHT } from '../app.model';
import { GifService } from '../gif.servise';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public searchForm: FormGroup;
    public searchedItem: string;
    public page: number;
    public gifs$: Observable<apiResponse>;

    constructor(private formBuilder: FormBuilder,
        private gif: GifService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.searchForm = this.formBuilder.group({
            querySearch: ['']
        });
    }

    ngOnInit(): void {
        this.searchedItem = this.route.snapshot.paramMap.get('searchedItem');
        this.page = 0;
        if (this.searchedItem) {
            this.searchForm.setValue({ 'querySearch': this.searchedItem })
            this.gifs$ = this.gif.search(this.searchedItem, this.page);
        }
    }

    getMoreGifs(page: number): void {
        this.page += page;
        this.gifs$ = this.gif.search(this.querySearch.value, this.page);
    }

    searchGifs(): void {
        const storage: Storage = JSON.parse(localStorage.getItem('callvu'));
        const user: GifUser = storage.find((user: GifUser) => { return user.isLoggedin === true });
        if (user?.searchHistory.length === MAX_HISTORY_LENGHT) {
            user.searchHistory.shift();
        }
        user.searchHistory.push(this.querySearch.value);
        localStorage.setItem('callvu', JSON.stringify(storage));
        this.page = 0;

        this.gifs$ = this.gif.search(this.querySearch.value, this.page);

    }

    goToHistory(): void {
        this.router.navigate(['history']);
    }

    get querySearch() {
        return this.searchForm.get('querySearch');
    }

}
