import {Route} from '@angular/router'
import {IssuesAndConcernsComponent} from 'src/app/home/ahyd/issues-and-concerns/issues-and-concerns.component'
import {TeenCentersComponent} from 'src/app/home/ahyd/teen-centers/teen-centers.component'

export const AHYD_ROUTES: Route = {
    path: 'ahyd',
    children: [
        {
            path: 'teen-centers',
            component: TeenCentersComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'issues-and-concerns',
            component: IssuesAndConcernsComponent,
            data: {animation: 'fade'},
        },
    ],
}
