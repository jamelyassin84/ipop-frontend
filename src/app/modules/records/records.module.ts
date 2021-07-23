import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExtrasModule } from '../extras/extras.module'
import { CommentsComponent } from './modals/comments/comments.component'
import { ForApprovalRecordsComponent } from './pages/for-approval-records/for-approval-records.component'
import { RecordIndexComponent } from './pages/record-index/record-index.component'
import { RecordUploadComponent } from './pages/record-upload/record-upload.component'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { AppRoutingModule } from 'src/app/app-routing.module'
import { UploadedRecordsComponent } from './pages/uploaded-records/uploaded-records.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
	declarations: [
		CommentsComponent,
		ForApprovalRecordsComponent,
		RecordIndexComponent,
		RecordUploadComponent,
		UploadedRecordsComponent,
	],
	imports: [
		CommonModule,
		ExtrasModule,
		NgxDropzoneModule,
		AppRoutingModule,
		NgbModule,
	],
	exports: [
		CommentsComponent,
		ForApprovalRecordsComponent,
		RecordIndexComponent,
		RecordUploadComponent,
		UploadedRecordsComponent,
	],
})
export class RecordsModule {}
