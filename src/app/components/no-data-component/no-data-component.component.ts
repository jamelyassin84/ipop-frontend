import {Component, Input, OnInit} from '@angular/core'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {ReloadService} from 'src/app/Services/reload.service'

@Component({
    selector: 'NoDataComponent',
    templateUrl: './no-data-component.component.html',
    animations: [...dbwAnimations],
})
export class NoDataComponentComponent implements OnInit {
    @Input() data: any[] = []
    constructor(private component: ReloadService) {
        this.component.isLoading().subscribe((value: boolean) => {
            if (value === true) {
                this.isLoading = value
                return
            }
            setTimeout(() => {
                this.isLoading = value
            }, 4500)
        })
    }

    isLoading: boolean = true

    ngOnInit() {}
}
