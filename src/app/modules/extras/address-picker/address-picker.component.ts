import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {map, take, tap} from 'rxjs/operators'
import {years} from 'src/app/constants/AppConstants'
import {LocationService} from 'src/app/Services/locations/province.service'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'
import {BarangayOfficialType} from 'src/app/Types/officials/BarangayOfficials.types'

@Component({
    selector: 'AddressPicker',
    templateUrl: './address-picker.component.html',
    styleUrls: ['./address-picker.component.scss'],
})
export class AddressPickerComponent implements OnInit {
    constructor(private location: LocationService, private _router: Router) {
        this._router.events
            .pipe(
                take(1),
                map((e) => e instanceof NavigationEnd),
                tap(() => {
                    for (let route of this.excludes) {
                        if (
                            this._router.url.toLocaleLowerCase().includes(route)
                        ) {
                            this.showBarangayTab = false
                        }
                    }
                }),
            )
            .subscribe()
    }
    @Input() showBarangay = true

    @Output() onEmit = new EventEmitter()

    showBarangayTab: boolean = true

    excludes = ['pmoc']

    years: number[] = years()

    tabItems: AddressPickerEnum[] = Object.values(AddressPickerEnum)

    ngOnInit(): void {
        this.getMuncipalities()
    }

    setYear(event: any) {
        this.currentData.year = event.target.value
    }

    ngAfterViewInit(): void {
        this.onEmit.emit({
            municipality: null,
            barangay: null,
            year: new Date().getFullYear(),
        })
    }

    municipalities: MunicipalityType[] = []
    getMuncipalities() {
        this.location
            .municipalities()
            .subscribe((municipalities: MunicipalityType[]) => {
                this.municipalities = municipalities
            })
    }

    barangays: BarangayOfficialType[] = []
    getBarangays(event: any) {
        this.currentData.municipality =
            event.target.options[event.target.options.selectedIndex].text
        this.location
            .barangays(event.target.value)
            .subscribe((barangays: BarangayOfficialType[]) => {
                this.barangays = barangays
            })
    }

    emit() {
        this.onEmit.emit(this.currentData)
    }

    setBarangay(event: any) {
        this.currentData.barangay = event.target.value
    }

    tabs: any = {
        province: true,
        municipality: false,
        barangay: false,
    }

    currentData: any = {
        municipality: null,
        barangay: null,
        year: new Date().getFullYear(),
    }
    changeTab(tab: string) {
        this.currentData = {municipality: null, barangay: null}
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.ngOnInit()
        this.tabs[tab] = true
    }
}

export enum AddressPickerEnum {
    PROVINCE = 'province',
    MUNICIPALITY = 'municipality',
    BARANGAY = 'barangay',
}
