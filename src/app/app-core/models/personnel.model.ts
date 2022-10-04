import {PHPBaseModel} from './../../../@digital_brand_work/models/core.model'

export interface Personnel extends PHPBaseModel {
    name: string
    type: string
    position: string
    phone: string
    email: string
}
