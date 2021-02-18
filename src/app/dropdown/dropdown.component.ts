import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import * as EventEmitter from 'events';
import { AlbumItem } from '../app.model';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
    @Input() label: string
    @Input() options: AlbumItem[];
    @Output() chosenOption: EventEmitter<AlbumItem> = new EventEmitter<AlbumItem>();

    public currentOption: AlbumItem;
    constructor() { }

    ngOnInit(): void {
    }

    add(currentOption){
        const chosen = this.options.find(option => {
            return option.id === currentOption
        })
        this.chosenOption.emit(chosen);
    }
}
