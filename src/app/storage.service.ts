import { Injectable } from '@angular/core';
import { GifUser } from './app.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public initStorage() {
        const storage: Storage = this.getStorage();
        if (!storage) {
            localStorage.setItem('callvu',JSON.stringify([]));
        }
    }

    public getStorage() {
        return JSON.parse(localStorage.getItem('callvu'));
    }

    public setStorage(storage: Storage | GifUser[]) {
        localStorage.setItem('callvu', JSON.stringify(storage));
    }
}
