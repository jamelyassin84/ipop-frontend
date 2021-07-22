import { Component, Input } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
	selector: 'Modal',
	templateUrl: './small.component.html',
	styleUrls: ['./small.component.scss'],
})
export class SmallComponent implements ModalComponent {
	constructor(private modalService: NgbModal) {}

	closeResult = ''
	@Input() size: any = 'lg'
	@Input() title: String = ''
	@Input() btnSize: String = ''
	@Input() btnTitle: String = ''
	@Input() btnClass: String = ''
	@Input() icon: String = ''
	@Input() template: any

	open(content: any) {
		this.modalService
			.open(content, {
				ariaLabelledBy: 'modal-basic-title',
				size: this.size,
			})
			.result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(
						reason
					)}`
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

export interface ModalComponent {
	size: String
	title: String
	btnSize: String
	btnTitle: String
	btnClass: String
	template: any
	icon: String
}
