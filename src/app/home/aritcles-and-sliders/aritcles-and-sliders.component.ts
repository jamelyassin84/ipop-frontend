import { Component, OnInit } from '@angular/core'
import { pop } from 'src/app/components/Alert'
import { SliderService } from 'src/app/Services/home/news/slider.service'
import { ReloadService } from 'src/app/Services/reload.service'

@Component({
	selector: 'app-aritcles-and-sliders',
	templateUrl: './aritcles-and-sliders.component.html',
	styleUrls: ['./aritcles-and-sliders.component.scss'],
})
export class AritclesAndSlidersComponent implements OnInit {
	constructor(private slideService: SliderService, private component: ReloadService) {
		this.component.shouldReload().subscribe(() => {
			this.ngOnInit()
		})
	}
	ngOnInit(): void {
		this.getSliders()
	}

	images: any[] = []

	getSliders() {
		this.slideService.index().subscribe((sliders: []) => {
			sliders.forEach((slide: any) => {
				this.images.push(slide.photo.uri)
			})
			sliders.length !== 0 ? pop() : ''
		})
	}
}
