import request from '../../utils/request'

const api = {
    getQrcode: 'hcm/login/qrcode',
    isScanQrcode: 'hcm/login/isScanQrcode/',
    login: 'hcm/login/',
}

export function getQrcodeInfo(): Promise<qrcode> {
    return request.get(api.getQrcode)
}

export function isScanQrcode(code:string): Promise<string> {
    return request.get(api.isScanQrcode + code)
}

export function login(code:string): Promise<any> {
    return request.get(api.login + code)
}

