import {Component, OnInit} from '@angular/core'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'
import {BarangayOfficialType} from 'src/app/Types/officials/BarangayOfficials.types'
import {LocationService} from 'src/app/Services/locations/province.service'
import {Created, Fire, ValidationError} from 'src/app/modules/extras/Alert'
import {districts} from 'src/app/constants/AppConstants'
import {AuthService} from 'src/app/Services/Independent/auth.service'
import {Admindata, invalidAdminData} from './AdminData'

@Component({
    selector: 'app-add-admin',
    templateUrl: './add-admin.component.html',
    styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
    randomImages = [window.location.origin + '/assets/avatars/face-7.jpg']
    districts: String[] = districts
    isSubmitting: Boolean = false
    municipalities: MunicipalityType[] = []
    barangays: BarangayOfficialType[] = []
    image: any
    invalidData: any = invalidAdminData
    data: any = Admindata
    file: any
    isLoading = false

    constructor(private location: LocationService, private auth: AuthService) {}

    ngOnInit(): void {
        this.setRandomImage()
        this.getMuncipalities()
    }

    getMuncipalities() {
        this.location.municipalities().subscribe((data: any) => {
            this.municipalities = data
        })
    }

    getBarangays(event: any) {
        this.data.municipality =
            event.target.options[event.target.options.selectedIndex].text
        this.location.barangays(event.target.value).subscribe((data: any) => {
            this.barangays = data
        })
    }

    setRandomImage() {
        this.image =
            this.randomImages[
                Math.floor(Math.random() * this.randomImages.length)
            ]
        this.data.profile_picture = this.image
    }

    readURL(event: any) {
        this.file = event.target.files.item(0)
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = (event: any) => {
                this.data.profile_picture = this.image
                this.image = event.target.result
            }
        }
    }

    handleRoleChange() {
        this.data.assigned_barangay = undefined
        this.data.assigned_municipality = undefined
    }

    register() {
        for (let key in this.data) {
            if (this.data[key] === '') {
                ValidationError()
                return
            }
        }
        Fire(
            'Add as Administrator?',
            `Are you sure want as administrator`,
            'info',
            () => {
                this.isLoading = true
                const formData = new FormData()
                if (this.file != null) {
                    formData.append(
                        'profile_picture',
                        this.file,
                        this.file.name,
                    )
                }
                for (let key in this.data) {
                    formData.append(key, this.data[key])
                }
                this.auth.cache = ''
                this.auth.register(formData)?.subscribe(() => {
                    this.isLoading = false
                    Created()
                    for (let key in this.data) {
                        this.data[key] = ''
                    }
                    this.setRandomImage()
                })
            },
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
