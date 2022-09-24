import {Component, OnInit} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {LogsService} from '../../Services/Independent/logs.service'

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
    animations: [...dbwAnimations],
})
export class LogsComponent implements OnInit {
    constructor(private LogsService: LogsService) {}

    logs: any = []
    data: any = {links: []}

    ngOnInit(): void {
        this.getLogs()
    }

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
