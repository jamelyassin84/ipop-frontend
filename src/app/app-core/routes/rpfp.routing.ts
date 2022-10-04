import {Route} from '@angular/router'
import {MpcFdcComponent} from './../../home/rpfp/mpc-fdc/mpc-fdc.component'
import {PmocComponent} from './../../home/rpfp/pmoc/pmoc.component'

export const RPFP_ROUTES: Route = {
    path: 'rpfp',
    children: [
        {
            path: 'pmoc',
            component: PmocComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'mpcfdc',
            component: MpcFdcComponent,
            data: {animation: 'fade'},
        },
    ],
}
