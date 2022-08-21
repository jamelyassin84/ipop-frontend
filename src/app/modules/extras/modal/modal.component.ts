import {Component, Input, OnInit} from '@angular/core'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'Modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
    constructor(private modalService: NgbModal) {}

    closeResult = ''
    @Input() size: any = 'lg'
    @Input() title: string = ''
    @Input() btnSize: string = ''
    @Input() btnTitle: string = ''
    @Input() btnClass: string = ''
    @Input() icon: string = ''
    @Input() template: any

    ngOnInit(): void {}

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
                        reason,
                    )}`
                },
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
