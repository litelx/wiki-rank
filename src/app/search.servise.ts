import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordRank } from './app.model';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private httpClient: HttpClient) { }

    public search(searchString: string): Observable<WordRank> {
        return this.httpClient.post<WordRank>(`${url}/api/search`, { search: searchString });
    }
}
const protocol: string = 'http';
const baseUrl: string = 'localhost';
const port: string = '3000';

const url: string = `${protocol}://${baseUrl}:${port}`;
