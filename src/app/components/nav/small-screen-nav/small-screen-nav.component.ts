import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { homeNavs } from 'src/app/home/homeNav'

@Component({
	selector: 'SmallScreenNav',
	templateUrl: './small-screen-nav.component.html',
	styleUrls: ['./small-screen-nav.component.scss'],
})
export class SmallScreenNavComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	@Input() data: any = false
	@Output() onClose = new EventEmitter()

	navs = homeNavs

	setShowSmallNav() {
		this.data = false
		this.onClose.emit('false')
	}
}
