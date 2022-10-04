import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'

import {NotFoundComponent} from './pages/not-found/not-found.component'
import {NoInternetComponent} from './pages/no-internet/no-internet.component'

import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component'

import {HOME_ROUTES} from './app-core/routes/home.routing'

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home/index/news',
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./pages/login/login.module').then(
                (module) => module.LoginModule,
            ),
        data: {animation: 'fade'},
    },

    {...HOME_ROUTES},

    {path: 'no-internet', component: NoInternetComponent},

    {path: 'unauthorized', component: UnauthorizedComponent},

    {path: '**', component: NotFoundComponent},
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'top',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
