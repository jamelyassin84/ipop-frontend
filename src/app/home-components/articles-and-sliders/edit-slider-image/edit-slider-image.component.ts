import {Component, OnInit} from '@angular/core'
import {Alert, Fire, HasApprovals, pop} from 'src/app/modules/extras/Alert'
import {SliderService} from 'src/app/Services/home/news/slider.service'
import {UserService} from 'src/app/Services/Independent/user.service'

@Component({
    selector: 'EditSliderImage',
    templateUrl: './edit-slider-image.component.html',
    styleUrls: ['./edit-slider-image.component.scss'],
})
export class EditSliderImageComponent implements OnInit {
    constructor(
        private slideService: SliderService,
        private user: UserService,
    ) {}

    readonly isSuperAdmin = this.user.isSuperAdmin()

    sliders: any[] = []
    photos: any[] = []
    isLoading: boolean = false

    ngOnInit(): void {
        this.getSliders()
    }

    getSliders() {
        this.slideService.index().subscribe((sliders: []) => {
            this.sliders = sliders
            sliders.length !== 0 ? pop() : ''
        })
    }

    trigger() {
        document.getElementById('file')?.click()
    }

    readURL(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.photos = []
            Object.keys(event.target.files).forEach((i: any) => {
                // this.sliders.push(event.target.files[i])
                const reader = new FileReader()
                reader.readAsDataURL(event.target.files[i])
                reader.onload = (event: any) => {
                    this.photos.push((<FileReader>event.target).result)
                }
            })
        }
    }

    deleteTemporaryImage(index: number) {
        this.photos.splice(index, 1)
    }

    deleteImage(id: number) {
        Fire(
            'Delete Image?',
            'Are you sure you want to delete this image? The image will be permanently deleted',
            'info',
            () => {
                this.isLoading = true
                this.slideService.destroy(id).subscribe(() => {
                    this.isLoading = false
                    this.ngOnInit()
                })
            },
        )
    }

    saveImages() {
        Fire(
            'Save Changes?',
            'This will save all added images. Continue?',
            'info',
            () => {
                this.isLoading = true
                this.slideService
                    .create({photos: this.photos})
                    .subscribe(() => {
                        HasApprovals('Created')
                        this.isLoading = false
                    })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
