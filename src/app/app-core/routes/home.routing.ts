import {Route} from '@angular/router'
import {AuthGuard} from 'src/app/guards/auth.guard'
import {UpdateAccountComponent} from 'src/app/modules/admin/pages/update-account/update-account.component'
import {LogsComponent} from 'src/app/modules/logs/logs.component'
import {HomeComponent} from 'src/app/pages/home/home.component'
import {ADMIN_ROUTES} from './admin.routing'
import {APPROVAL_ROUTES} from './approval.routing'
import {BULK_RECORDS_ROUTES} from './bulk-records.routing'
import {HOME_INDEX_ROUTES} from './home-index.routing'

export const HOME_ROUTES: Route = {
    path: 'home',
    children: [
        {
            path: '',
            component: HomeComponent,
            data: {animation: 'fade'},

            children: [
                {...HOME_INDEX_ROUTES},

                {...BULK_RECORDS_ROUTES},

                {...ADMIN_ROUTES},

                {...APPROVAL_ROUTES},

                {
                    path: 'logs',
                    component: LogsComponent,
                    canActivate: [AuthGuard],
                    data: {animation: 'fade'},
                },

                {
                    path: 'account/:id',
                    component: UpdateAccountComponent,
                    data: {animation: 'fade'},
                },
            ],
        },
    ],
}
