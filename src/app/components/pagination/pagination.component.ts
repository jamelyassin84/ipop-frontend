import { HttpClient } from '@angular/common/http'
import { BaseService } from 'src/app/Services/base.service'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
	selector: 'Pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
	constructor(private http: HttpClient) {}
	@Input() data: any = { links: [] }
	@Output() onPageChange = new EventEmitter()

	pages: number[] = []

	ngOnInit(): void {}

	paginate(url: string) {
		new BaseService(this.http, url, '').paginate(url).subscribe((data) => {
			this.onPageChange.emit(data)
		})
	}
}
