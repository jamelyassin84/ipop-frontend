import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LogsComponent } from './logs.component'
import { ExtrasModule } from '../extras/extras.module'
import { PaginationComponent } from 'src/app/components/pagination/pagination.component'
import { PaginationPipePipe } from 'src/app/pipes/pagination-pipe.pipe'

@NgModule({
	declarations: [LogsComponent, PaginationComponent, PaginationPipePipe],
	imports: [CommonModule, NgbModule, ExtrasModule],
	exports: [LogsComponent, PaginationComponent, PaginationPipePipe],
})
export class LogsModule {}
