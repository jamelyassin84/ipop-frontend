import {Route} from '@angular/router'
import {AuthGuard} from 'src/app/guards/auth.guard'
import {AddAdminComponent} from 'src/app/modules/admin/pages/add-admin/add-admin.component'
import {AdminIndexComponent} from 'src/app/modules/admin/pages/admin-index/admin-index.component'
import {ViewAdminsComponent} from 'src/app/modules/admin/pages/view-admins/view-admins.component'

export const ADMIN_ROUTES: Route = {
    path: 'admins',
    component: AdminIndexComponent,
    canActivate: [AuthGuard],
    data: {animation: 'fade'},
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'view',
        },
        {
            path: 'view',
            component: ViewAdminsComponent,
            data: {animation: 'fade'},
        },
        {
            path: 'add',
            component: AddAdminComponent,
            data: {animation: 'fade'},
        },
    ],
}
