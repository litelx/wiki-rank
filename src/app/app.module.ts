import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialsModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HistoryComponent } from './history/history.component';
import { ImageLazyLoadModule } from './lazy/image-lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
    
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        HistoryComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
        ImageLazyLoadModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
        HttpClientModule,
    ],
})
export class AppModule { }
