import request from '../../utils/request'

const api = {
    up: 'hcm/up',
    down: 'hcm/down',
}

/**
 * 手动签到
 */
export function up(): Promise<Boolean> {
    return request.get(api.up)
}

/**
 * 手动签退
 */
export function down(): Promise<Boolean> {
    return request.get(api.down)
}
