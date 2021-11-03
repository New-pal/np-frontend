import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'main',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
