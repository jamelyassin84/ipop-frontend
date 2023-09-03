import {Validators} from '@angular/forms'

export const POPULATION_PYRAMID_AGE_GROUPS = [
    {
        label: '80 and above',
        formControlName: 'eighty_and_above',
        validators: [Validators.required],
    },

    {
        label: '75-79',
        formControlName: '75-79',
        validators: [Validators.required],
    },

    {
        label: '70-74',
        formControlName: '70-74',
        validators: [Validators.required],
    },

    {
        label: '65-69',
        formControlName: '65-69',
        validators: [Validators.required],
    },

    {
        label: '60-64',
        formControlName: '60-64',
        validators: [Validators.required],
    },

    {
        label: '55-59',
        formControlName: '55-59',
        validators: [Validators.required],
    },

    {
        label: '50-54',
        formControlName: '50-54',
        validators: [Validators.required],
    },

    {
        label: '45-49',
        formControlName: '45-49',
        validators: [Validators.required],
    },

    {
        label: '40-44',
        formControlName: '40-44',
        validators: [Validators.required],
    },

    {
        label: '35-39',
        formControlName: '35-39',
        validators: [Validators.required],
    },

    {
        label: '30-34',
        formControlName: '30-34',
        validators: [Validators.required],
    },

    {
        label: '25-29',
        formControlName: '25-29',
        validators: [Validators.required],
    },

    {
        label: '20-24',
        formControlName: '20-24',
        validators: [Validators.required],
    },

    {
        label: '15-19',
        formControlName: '15-19',
        validators: [Validators.required],
    },

    {
        label: '10-14',
        formControlName: '10-14',
        validators: [Validators.required],
    },

    {
        label: '5-9',
        formControlName: '5-9',
        validators: [Validators.required],
    },

    {
        label: '1-4',
        formControlName: '1-4',
        validators: [Validators.required],
    },

    {
        label: 'Below 1 yr old',
        formControlName: 'below_1_year_old',
        validators: [Validators.required],
    },
]
