import {Component, OnInit} from '@angular/core'
import {LogsService} from '../../Services/Independent/logs.service'

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

    data: any = {links: []}
    getLogs() {
        this.LogsService.index().subscribe((logs: any) => {
            this.data = logs
            this.logs = logs.data
        })
    }

    onPageChange(event: any) {
        this.data = event
        this.logs = event.data
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
