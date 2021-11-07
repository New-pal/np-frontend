import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/core/guards/auth-guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main'
    },
    {
        path: 'main',
        loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
        canActivate: [AuthGuard]
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
