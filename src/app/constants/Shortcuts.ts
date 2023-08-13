export function parse(data: any) {
    return JSON.parse(data)
}
export function stringify(data: any) {
    return JSON.stringify(data)
}

export function getPercent(value: number, basis: number): number {
    if (isNaN(value)) {
        return 0
    }

    const result = (value * 100) / basis

    return isNaN(result) ? 0 : result
}
