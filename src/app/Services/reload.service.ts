import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ReloadService {
	private reload = new Subject()

	willReload() {
		this.reload.next()
	}

	shouldReload() {
		return this.reload.asObservable()
	}
}
