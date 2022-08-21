import {isPlatformBrowser} from '@angular/common'
import {
    Directive,
    HostBinding,
    Input,
    HostListener,
    PLATFORM_ID,
    Inject,
} from '@angular/core'
import {take} from 'rxjs/operators'
import {MediaService} from '../utilities/media.service'

@Directive({
    selector: '[parallax]',
})
export class ParallaxDirective {
    constructor(
        @Inject(PLATFORM_ID) private _platformID: Object,
        private _mediaService: MediaService,
    ) {}

    breakpoint$ = this._mediaService.breakpoints$

    @Input('factor') set parallaxFactor(val: any) {
        this.factor = val ? val : 1
    }

    @HostBinding('style.transform')
    scroll: string = ''

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        this.breakpoint$.pipe(take(1)).subscribe((media) => {
            if (media === 'tablet' || media === 'phone') {
                return
            }

            this.scroll = ` translateY(${this.getTranslation()}px) !important`
        })
    }

    private factor!: number

    getTranslation() {
        if (isPlatformBrowser(this._platformID)) {
            return (window.scrollY * this.factor) / 10
        }

        return 0
    }
}
