import {BehaviorSubject} from 'rxjs'
import {Inject, Injectable, Optional} from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class NavService {
    hide$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
