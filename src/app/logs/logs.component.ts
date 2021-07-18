import { LogType } from './../Types/Logs.types'
import { Component, OnInit } from '@angular/core'
import { LogsService } from '../Services/Independent/logs.service'

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
	constructor(private LogsService: LogsService) {}

	logs: any = []
	ngOnInit(): void {
		this.getLogs()
	}

	getLogs() {
		this.LogsService.index().subscribe((logs: any) => {
			console.log(logs.data)
			this.logs = logs.data
		})
	}
}
