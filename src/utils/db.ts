import { DBFuction } from '@/utils/interfaces/db.interface';

export default {
    token: {
        set: (val) => {
            return window.localStorage.setItem('token', val)
        },
        get: () => {
            return window.localStorage.getItem('token')
        },
        remove: () => {
            return window.localStorage.removeItem('token')
        },
    } as DBFuction<string>,
}
