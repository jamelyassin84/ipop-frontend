import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApprovalsIndexComponent } from './approvals-index/approvals-index.component'
import { ExtrasModule } from '../extras/extras.module'

@NgModule({
	declarations: [ApprovalsIndexComponent],
	imports: [CommonModule, ExtrasModule],
})
export class ApprovalModule {}
