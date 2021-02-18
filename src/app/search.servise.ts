import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistAlbums } from './app.model';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private httpClient: HttpClient) { }

    public getAlbumsOfArtist(artistId?: string): Observable<ArtistAlbums> {
        return this.httpClient.post<ArtistAlbums>(`${url}/api/search`, {});   
    }
}

const protocol: string = 'http';
const baseUrl: string = 'localhost';
const port: string = '3000';

const url: string = `${protocol}://${baseUrl}:${port}`;
