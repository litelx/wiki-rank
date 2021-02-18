import { Component, Input, OnInit } from '@angular/core';
import { AlbumItem } from '../app.model';

@Component({
    selector: 'album-details',
    templateUrl: './album-details.component.html',
    styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
    @Input() album: AlbumItem;

    constructor() { }

    ngOnInit(): void {
    }

}
