import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MaterialsModule,
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
