import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlbumItem } from '../app.model';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input() label: string
    @Input() options: AlbumItem[];
    @Output() chosenOption: EventEmitter<AlbumItem> = new EventEmitter<AlbumItem>();

    public currentOption: AlbumItem;
    
    constructor() { }

    public add(currentOption: string){
        const chosen = this.options.find(option => {
            return option.id === currentOption
        })
        this.chosenOption.emit(chosen);
    }
}
