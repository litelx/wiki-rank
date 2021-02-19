import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumItem, ArtistAlbums } from './app.model';
import { SearchService } from './search.servise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'Albums List';
    public artistAlbums$: Observable<ArtistAlbums>;
    public album: AlbumItem;

    constructor(private searchService: SearchService) { }
    
    ngOnInit(): void {
        this.artistAlbums$ = this.searchService.getAlbumsOfArtist();
    }

    public chosenAlbum(album: AlbumItem) {
        this.album = album;
    }
}
