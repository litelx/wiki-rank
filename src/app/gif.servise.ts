import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse, MAX_GIF_PER_PAGE } from './app.model';

@Injectable({
    providedIn: 'root'
})
export class GifService {

    constructor(private httpClient: HttpClient) { }

    public search(searchString: string, page: number): Observable<apiResponse> {
        return this.httpClient.get<apiResponse>(`${gifs}${searchString}&limit=${MAX_GIF_PER_PAGE}&offset=${page}`);
    }
}

const key: string = 'JcBVaGqK8bSiH6c1oV3BsUJhCerZ40zf';
const gifs: string = `http://api.giphy.com/v1/gifs/search?api_key=${key}&q=`