import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    exports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatTableModule,
        MatToolbarModule
    ]
})
export class MaterialsModule { }
