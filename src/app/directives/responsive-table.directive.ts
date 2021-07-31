import { Directive, HostListener, ElementRef } from '@angular/core'

@Directive({
	selector: '[responsiveTable]',
})
export class ResponsiveTableDirective {
	public innerWidth: any = window.innerWidth

	constructor(private element: ElementRef) {
		if (this.innerWidth < 1139) {
			this.element.nativeElement.class =
				'table table-striped  table-responsive'
		} else {
			this.element.nativeElement.removeClass = 'table table-striped  '
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		if (this.innerWidth < 1139) {
			this.element.nativeElement.class =
				'table table-striped  table-responsive'
		} else {
			this.element.nativeElement.removeClass = 'table table-striped  '
		}
	}
}
