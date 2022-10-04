import {Route} from '@angular/router'
import {AritclesAndSlidersComponent} from 'src/app/home/aritcles-and-sliders/aritcles-and-sliders.component'
import {HomePageComponent} from 'src/app/home/home-page/home-page.component'
import {OthersComponent} from 'src/app/home/others/others.component'
import {PopulationComponent} from 'src/app/home/population/population.component'
import {ProgramsComponent} from 'src/app/home/programs/programs.component'
import {ServicesComponent} from 'src/app/home/services/services.component'
import {ABOUT_ROUTING} from './about.routing'
import {AHYD_ROUTES} from './ahyd.routing'
import {DEMOGRAPHIC_ROUTES} from './demographic.routing'
import {RPFP_ROUTES} from './rpfp.routing'

export const HOME_INDEX_ROUTES: Route = {
    path: 'index',
    component: HomePageComponent,
    children: [
        {
            path: 'news',
            component: AritclesAndSlidersComponent,
            data: {animation: 'fade'},
        },

        {...ABOUT_ROUTING},

        {
            path: 'population',
            component: PopulationComponent,
            data: {animation: 'fade'},
        },

        {
            path: 'programs/:id',
            component: ProgramsComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'services/:id',
            component: ServicesComponent,
            data: {animation: 'fade'},
        },

        {...DEMOGRAPHIC_ROUTES},

        {...RPFP_ROUTES},

        {...AHYD_ROUTES},

        {
            path: 'others',
            component: OthersComponent,
            data: {animation: 'fade'},
        },
    ],
}
