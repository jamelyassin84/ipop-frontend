import { AppRoutingModule } from './../../app-routing.module'
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddAdminComponent } from './pages/add-admin/add-admin.component'
import { ExtrasModule } from '../extras/extras.module'
import { ViewAdminModalComponent } from './modal/view-admin/view-admin.component'
import { AdminIndexComponent } from './pages/admin-index/admin-index.component'

@NgModule({
	declarations: [
		AddAdminComponent,
		ViewAdminModalComponent,
		AdminIndexComponent,
	],
	imports: [CommonModule, FormsModule, AppRoutingModule, ExtrasModule],
	exports: [AddAdminComponent, ViewAdminModalComponent, AdminIndexComponent],
})
export class AdminModule {}
