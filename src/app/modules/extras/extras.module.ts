import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { IvyCarouselModule } from 'angular-responsive-carousel'

import { DropdownComponent } from './dropdown/dropdown.component'
import { AddressPickerComponent } from './address-picker/address-picker.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ModalComponent } from './modal/modal.component'
import { ButtonPreloaderComponent } from './button-preloader/button-preloader.component'
import { ImageViewerComponent } from './image-viewer/image-viewer.component'

@NgModule({
	declarations: [
		DropdownComponent,
		AddressPickerComponent,
		ModalComponent,
		ButtonPreloaderComponent,
		ImageViewerComponent,
	],

	imports: [
		CommonModule,
		NgbModule,
		BrowserAnimationsModule,
		IvyCarouselModule,
	],
	exports: [
		DropdownComponent,
		AddressPickerComponent,
		ModalComponent,
		ButtonPreloaderComponent,
		ImageViewerComponent,
	],
})
export class ExtrasModule {}
