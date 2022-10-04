import {Route} from '@angular/router'
import {AuthGuard} from 'src/app/guards/auth.guard'
import {ApprovalsComponent} from 'src/app/modules/approvals/content/approve-requests/approvals/approvals.component'

export const APPROVAL_ROUTES: Route = {
    path: 'approvals',
    component: ApprovalsComponent,
    canActivate: [AuthGuard],
    data: {animation: 'fade'},
}
