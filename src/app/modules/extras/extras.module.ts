import { FormsModule } from '@angular/forms'
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

const components = [
	DropdownComponent,
	AddressPickerComponent,
	ModalComponent,
	ButtonPreloaderComponent,
	ImageViewerComponent,
]

const modules = [
	CommonModule,
	NgbModule,
	BrowserAnimationsModule,
	IvyCarouselModule,
	FormsModule,
]

@NgModule({
	declarations: [...components],

	imports: [...modules],
	exports: [...components, ...modules],
})
export class ExtrasModule {}
