import { Component, OnInit } from '@angular/core'
import { OthersService } from 'src/app/Services/Independent/other.service'

@Component({
	selector: 'app-others',
	templateUrl: './others.component.html',
	styleUrls: ['./others.component.scss'],
})
export class OthersComponent implements OnInit {
	constructor(private service: OthersService) {}

	ngOnInit(): void {}
}
