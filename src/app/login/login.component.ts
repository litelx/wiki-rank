import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GifUser, Storage } from '../app.model';
import { GifService } from '../gif.servise';
import { StorageService } from '../storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private storage: StorageService,
        private route: Router,
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern('^[\\w]+$')]]
        });
    }
    ngOnInit(): void {
        this.storage.initStorage();
        this.logOutUsers();
    }

    public logOutUsers() {
        let storage: Storage = this.storage.getStorage();
        storage.forEach((user: GifUser) => { user.isLoggedin = false });
        this.storage.setStorage(storage);
    }

    public addUser() {
        let storage: Storage = JSON.parse(localStorage.getItem('callvu'));

        const userExists = storage.find((user: GifUser) => user.username === this.username.value);
        if (!userExists) {
            const newUser: GifUser = {
                username: this.username.value,
                isLoggedin: true,
                searchHistory: [],
                gifs: {}
            }
            storage.push(newUser);
            console.log('User added successfully');

        } else {
            userExists.isLoggedin = true;
        }
        localStorage.setItem('callvu', JSON.stringify(storage));

        this.route.navigate(['main', { searchedItem: '' }]);
    }

    get username() {
        return this.loginForm.get('username');
    }

}
