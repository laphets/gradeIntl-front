export interface DBFuction<T> {
    set: (val: T) => any,
    get: () => T,
    remove: () => void,
}

export interface DBExport<T> {
    [propName: string]: DBFuction<T>
}
