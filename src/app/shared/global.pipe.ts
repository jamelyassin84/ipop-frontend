import {AppendCountryCodePipe} from 'src/@digital_brand_work/pipes/append-country-code.pipe'
import {DayIntervalPipe} from 'src/@digital_brand_work/pipes/day-interval.count.pipe'
import {EntitiesPipe} from 'src/@digital_brand_work/pipes/entity.pipe'
import {FilterByDatePipe} from 'src/@digital_brand_work/pipes/filterBy.pipe'
import {ToTimeIntervalPipe} from 'src/@digital_brand_work/pipes/get-times.pipe'
import {HasDataPipe} from 'src/@digital_brand_work/pipes/has-data.pipe'
import {HasDecimalPipe} from 'src/@digital_brand_work/pipes/has.decimal.pipe'
import {InitialsPipe} from 'src/@digital_brand_work/pipes/initials.pipe'
import {IsEmptyPipe} from 'src/@digital_brand_work/pipes/is-empty.pipe'
import {ItemLengthPipe} from 'src/@digital_brand_work/pipes/item.length.pipe'
import {KeywordFilterPipe} from 'src/@digital_brand_work/pipes/keyword.filter.pipe'
import {LimitByPipe} from 'src/@digital_brand_work/pipes/limit-by.pipe'
import {NumberToArrayPipe} from 'src/@digital_brand_work/pipes/number-to-array.pipe'
import {RemoveWhiteSpaceAndDashPipe} from 'src/@digital_brand_work/pipes/remove-white-space-and-dash.pipe'
import {ShortenPipe} from 'src/@digital_brand_work/pipes/shorten.day.pipe'
import {SingleEntityPipe} from 'src/@digital_brand_work/pipes/single-entity.pipe'
import {SlugToSentencePipe} from 'src/@digital_brand_work/pipes/slug-to-sentence.pipe'
import {SortByPipe} from 'src/@digital_brand_work/pipes/sort-by.pipe'
import {TableFilterPipe} from 'src/@digital_brand_work/pipes/table.filter.pipe'
import {TimePipe} from 'src/@digital_brand_work/pipes/time.pipe'
import {ToAlphaThreePipe} from 'src/@digital_brand_work/pipes/to-alpha-three.pipe'
import {ToCardImagePIpe} from 'src/@digital_brand_work/pipes/to-card-image.pipe'
import {ToFixedTwoPipe} from 'src/@digital_brand_work/pipes/to-fixed-two.pipe'
import {ToFlagPipe} from 'src/@digital_brand_work/pipes/to-flag.pipe'
import {ToSlugPipe} from 'src/@digital_brand_work/pipes/to-slug.pipe'
import {TwentyFourToTwelveHoursPipe} from 'src/@digital_brand_work/pipes/twenty-four-to-twelve.hours.pipe'
import {AgePipe} from 'src/@digital_brand_work/pipes/age.pipe'
import {SortByMunicipalityPipe} from '../pipes/sort-by-municipality.pipe'
import {GetPercentagePipe} from '../pipes/get-percentage.pipe'
import {ResolveBarangayPurokPipe} from '../pipes/resolve-barangay-purok.pipe'
import {ToPercentPipe} from '../pipes/to-percent-pipe'
import {SortAgeGroupPipe} from '../pipes/sort-age-group.pipe'
import {ToTRDSubstitutePipe} from '../pipes/trd.pipe'
import {isNumberPipe} from '../pipes/to-number-or-string.pipe'

export const globalPipes = [
    AgePipe,
    TimePipe,
    SortByPipe,
    ToFlagPipe,
    ToSlugPipe,
    ShortenPipe,
    LimitByPipe,
    IsEmptyPipe,
    HasDataPipe,
    EntitiesPipe,
    InitialsPipe,
    HasDecimalPipe,
    ItemLengthPipe,
    ToFixedTwoPipe,
    ToCardImagePIpe,
    DayIntervalPipe,
    TableFilterPipe,
    ToAlphaThreePipe,
    FilterByDatePipe,
    SingleEntityPipe,
    NumberToArrayPipe,
    KeywordFilterPipe,
    ToTimeIntervalPipe,
    SlugToSentencePipe,
    AppendCountryCodePipe,
    RemoveWhiteSpaceAndDashPipe,
    TwentyFourToTwelveHoursPipe,
]

export const appPipes = [
    GetPercentagePipe,
    SortByMunicipalityPipe,
    ResolveBarangayPurokPipe,
    ToPercentPipe,
    SortAgeGroupPipe,
    ToTRDSubstitutePipe,
    isNumberPipe,
]
