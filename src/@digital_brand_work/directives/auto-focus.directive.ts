import {ChangeDetectorRef, Directive, ElementRef} from '@angular/core'

@Directive({
    selector: '[autoFocus]',
})
export class AutoFocusDirective {
    constructor(
        private _cdr: ChangeDetectorRef,
        private elementRef: ElementRef<HTMLInputElement>,
    ) {}

    ngOnInit(): void {
        this.elementRef.nativeElement.focus()

        this._cdr.detectChanges()
    }

    ngOnDestroy(): void {
        this._cdr.detach()
    }
}
