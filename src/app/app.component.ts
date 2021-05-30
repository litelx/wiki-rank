import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

<<<<<<< HEAD
    constructor() {
    }
    ngOnInit(): void {
=======
    constructor(private formBuilder: FormBuilder,
        private searchService: SearchService,
        private router: Router
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern('^[\\w]+$')]]
        });
    }
    
    public search() {
        this.commonWords$ = this.searchService.search(this.username.value);
    }
    
    get username() {
        return this.loginForm.get('username');
>>>>>>> parent of 2e8fe8f... wiki-rank
    }

}
