import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BaseService} from '../base.service'

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService {
    constructor(private _http: HttpClient) {
        super(_http, 'users', '')
    }

    user: any = localStorage.getItem('user')

    name() {
        return JSON.parse(this.user)?.fullname || ''
    }

    id() {
        return JSON.parse(this.user)?.id || ''
    }

    role() {
        return localStorage.getItem('role') || ''
    }

    isAdmin() {
        return localStorage.getItem('role') === null ? false : true
    }

    isStaff() {
        return localStorage.getItem('role') === 'PPOI' || this.isSuperAdmin()
            ? true
            : false
    }

    isSuperAdmin() {
        return localStorage.getItem('role') === 'Super Admin' ? true : false
    }
}
