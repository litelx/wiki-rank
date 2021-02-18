import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';

@NgModule({
    declarations: [
        AppComponent,
        DropdownComponent,
        AlbumDetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
        HttpClientModule,
    ],
})
export class AppModule { }
