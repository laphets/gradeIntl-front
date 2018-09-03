import request from '@/utils/request'
import { UserInfoResponse } from '@/api/interfaces/user.interface';

export const login = () => {
    return request.post('v1/auth/login')
}

export const getUserInfo = () => {
    return request.get<UserInfoResponse>('v1/user/info')
}
