import request from '../../utils/request'

const api = {
    setUp: 'hcm/editAutoUp/',
    setDown: 'hcm/editAutoDown',
}

/**
 * 开/关自动签到
 */
export function setUp(state: Boolean): Promise<Boolean> {
    return request.get(api.setUp + (state ? '1' : '0'))
}

/**
 * 开/关自动签退
 */
export function setDown(state: Boolean): Promise<Boolean> {
    return request.get(api.setDown + (state ? '1' : '0'))
}
