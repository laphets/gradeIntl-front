import { Message } from 'element-ui'

export const errorMessage = (errmsg: string | any): void => {
    Message({
        message: errmsg,
        type: 'error',
        duration: 5 * 1000,
    })
}
