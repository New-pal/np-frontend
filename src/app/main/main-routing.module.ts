import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainPage} from './main.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: MainPage,
        children: [
            {
                path: 'map',
                loadChildren: () => import('../map/map.module').then(m => m.MapPageModule)
            }
        ],
    },
    {
        path: '',
        redirectTo: 'tabs/map',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule {
}
