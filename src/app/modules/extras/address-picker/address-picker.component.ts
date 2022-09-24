import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {map, take, tap} from 'rxjs/operators'
import {dbwAnimations} from 'src/@digital_brand_work/animations/animation.api'
import {AddressPickerEnum} from 'src/app/app-core/enums/address-picker.enum'
import {LocationFIlter} from 'src/app/app-core/models/location-filter.model'
import {StoreAction} from 'src/app/app-core/store/core/action.enum'
import {AppState} from 'src/app/app-core/store/core/app.state'
import {years} from 'src/app/constants/AppConstants'
import {LocationService} from 'src/app/Services/locations/province.service'
import {MunicipalityType} from 'src/app/Types/locations/Municipality.types'
import {BarangayOfficialType} from 'src/app/Types/officials/BarangayOfficials.types'

@Component({
    selector: 'AddressPicker',
    templateUrl: './address-picker.component.html',
    styleUrls: ['./address-picker.component.scss'],
    animations: [...dbwAnimations],
})
export class AddressPickerComponent implements OnInit {
    constructor(
        private _router: Router,
        private _store: Store<AppState>,
        private _location: LocationService,
    ) {
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
    @Input()
    showBarangay = true

    @Output()
    onEmit = new EventEmitter<LocationFIlter>()

    showBarangayTab: boolean = true

    excludes = ['pmoc']

    years: number[] = years()

    tabItems: AddressPickerEnum[] = Object.values(AddressPickerEnum)

    municipalities: MunicipalityType[] = []

    barangays: BarangayOfficialType[] = []

    tabs: any = {
        province: true,
        municipality: false,
        barangay: false,
    }

    currentLocation: any = {
        municipality: null,
        barangay: null,
        year: new Date().getFullYear(),
    }

    ngOnInit(): void {
        this.getMunicipalities()
    }

    setYear(event: any) {
        this.currentLocation.year = event.target.value
    }

    ngAfterViewInit(): void {
        this.currentLocation = {
            municipality: null,
            barangay: null,
            year: new Date().getFullYear(),
        }

        this.emit()
    }

    getMunicipalities() {
        this._location
            .municipalities()
            .subscribe((municipalities: MunicipalityType[]) => {
                this.municipalities = municipalities
            })
    }

    getBarangays(event: any) {
        this.currentLocation.municipality =
            event.target.options[event.target.options.selectedIndex].text

        this._location
            .barangays(event.target.value)
            .subscribe((barangays: BarangayOfficialType[]) => {
                this.barangays = barangays
            })
    }

    emit() {
        this.onEmit.emit(this.currentLocation)

        this._store.dispatch(
            StoreAction.LOCATION_FILTERS.upsert({
                locationFilter: {...this.currentLocation, id: 1},
            }),
        )
    }

    setBarangay(event: any) {
        this.currentLocation.barangay = event.target.value
    }

    changeTab(tab: AddressPickerEnum) {
        this.currentLocation = {municipality: null, barangay: null}
        for (let key in this.tabs) {
            this.tabs[key] = false
        }
        this.ngOnInit()
        this.tabs[tab] = true
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
