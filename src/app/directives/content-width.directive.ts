import { Directive, ElementRef, Input, OnInit } from '@angular/core'

@Directive({
	selector: '[appContentWidth]',
})
export class ContentWidthDirective implements OnInit {
	@Input() isUser: boolean = false

	constructor(private element: ElementRef) {
		this.element.nativeElement.display = 'none'
	}

	ngOnInit() {}
}
