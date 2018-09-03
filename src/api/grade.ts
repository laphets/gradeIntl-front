import request from '@/utils/request'

export const getGrade = () => {
    return request.get('v1/grade')
}
