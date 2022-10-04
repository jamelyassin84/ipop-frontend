import {Route} from '@angular/router'
import {BulkDataGuardGuard} from 'src/app/guards/bulk-data-guard.guard'
import {ForApprovalRecordsComponent} from 'src/app/modules/records/pages/for-approval-records/for-approval-records.component'
import {RecordIndexComponent} from 'src/app/modules/records/pages/record-index/record-index.component'
import {RecordUploadComponent} from 'src/app/modules/records/pages/record-upload/record-upload.component'
import {UploadedRecordsComponent} from 'src/app/modules/records/pages/uploaded-records/uploaded-records.component'

export const BULK_RECORDS_ROUTES: Route = {
    path: 'bulk-records',
    component: RecordIndexComponent,
    canActivate: [BulkDataGuardGuard],
    data: {animation: 'fade'},
    children: [
        {
            path: '',
            component: RecordUploadComponent,
            canActivate: [BulkDataGuardGuard],
            data: {animation: 'fade'},
        },
        {
            path: 'upload',
            component: RecordUploadComponent,
            canActivate: [BulkDataGuardGuard],
            data: {animation: 'fade'},
        },
        {
            path: 'cloud-files',
            component: UploadedRecordsComponent,
            canActivate: [BulkDataGuardGuard],
            data: {animation: 'fade'},
        },
        {
            path: 'for-approvals',
            component: ForApprovalRecordsComponent,
            canActivate: [BulkDataGuardGuard],
            data: {animation: 'fade'},
        },
    ],
}
