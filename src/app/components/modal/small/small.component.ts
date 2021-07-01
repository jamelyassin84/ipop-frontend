import { Component } from '@angular/core'

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
	selector: 'Modal',
	templateUrl: './small.component.html',
	styleUrls: ['./small.component.scss'],
})
export class SmallComponent {
	closeResult = ''
	title: String = ''
	constructor(private modalService: NgbModal) {}

	open(content: any, size: any, title: String) {
		this.title = title
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
			}
		)
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC'
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop'
		} else {
			return `with: ${reason}`
		}
	}
}
