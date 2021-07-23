import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LogsComponent } from './logs.component'
import { ExtrasModule } from '../extras/extras.module'

@NgModule({
	declarations: [LogsComponent],
	imports: [CommonModule, NgbModule, ExtrasModule],
	exports: [LogsComponent],
})
export class LogsModule {}
