import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core'
import {Personnel} from 'src/app/app-core/models/personnel.model'
import {UserService} from 'src/app/Services/Independent/user.service'

@Component({
    selector: 'personnel-directory-table-row',
    templateUrl: './personnel-directory-table-row.component.html',
    styleUrls: ['./personnel-directory-table-row.component.scss'],
})
export class PersonnelDirectoryTableRowComponent implements OnInit {
    constructor(private _userService: UserService) {}

    @Output()
    onRemove = new EventEmitter<any>()

    @Input()
    user?: Personnel

    readonly isUser = !this._userService.isAdmin()

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
