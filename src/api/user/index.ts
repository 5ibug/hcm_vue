import request from '../../utils/request'

const api = {
    getUserInfo: 'hcm/me',
}

export function getUserInfo(): Promise<userInfo> {
    return request.get(api.getUserInfo)
}

