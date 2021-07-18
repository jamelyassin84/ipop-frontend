import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function fromNow(date: any) {
	return dayjs(date).fromNow()
}

export function toBool(data: any) {
	return data ? true : false
}

export function validURL(url: string) {
	let valid = false
	const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-/]))?/
	try {
		new URL(url)
		valid = true
	} catch (_) {
		valid = false
	}
	return !!pattern.test(url) && valid
}

export function ucfirst(string: string) {
	const array = string.split('')
	array[0] = array[0].toUpperCase()
	return array.join('')
}

export function ucwords(string: string) {
	return string
		.split(' ')
		.map((word) => (word === 'Id' ? 'ID' : ucfirst(word)))
		.join(' ')
}

export function except<T, K extends keyof T>(data: T, keys: Array<K>) {
	const copy = {} as T

	for (const key in data) {
		copy[key] = data[key]
	}

	for (const key of keys) {
		if (key in copy) {
			delete copy[key]
		}
	}
	return copy
}

export function exceptMany<T, K extends keyof T>(data: Array<T>, keys: Array<K>) {
	return [...data].map((item) => except(item, keys))
}

export function only<T, K extends keyof T>(data: T, keys: Array<K>) {
	const result = {} as T
	;(result as any)['id'] = (data as any)['id']
	for (const key of keys) {
		result[key] = data[key]
	}
	return result
}

const formatter = new Intl.NumberFormat('en-PH', {
	style: 'currency',
	currency: 'PHP',
})

export function formatCurrency(value: number) {
	return formatter.format(value).replace(/\D00(?=\D*$)/, '') + '.00'
}
