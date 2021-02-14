import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WordRank } from './app.model';
import { SearchService } from './search.servise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ebay Test';
    public loginForm: FormGroup;
    public commonWords$: Observable<WordRank>;

    constructor(private formBuilder: FormBuilder,
        private searchService: SearchService,
    ) {
        this.loginForm = this.formBuilder.group({
            word: ['', [Validators.required, Validators.pattern('^[\\w]+$')]]
        });
    }
    
    public search() {
        this.commonWords$ = this.searchService.search(this.word.value);
    }
    
    get word() {
        return this.loginForm.get('word');
    }
}
