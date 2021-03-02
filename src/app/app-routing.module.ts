import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [{
    path: '',
    component: LoginComponent
}, {
    path: 'main',
    component: MainComponent,
    children: [
        {
            path: 'main/:searchedItem',
            component: MainComponent,
            pathMatch: 'full'
        }
    ]
}, {
    path: 'history',
    component: HistoryComponent,
    data: { user: {} }
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
