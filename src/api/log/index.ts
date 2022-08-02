import request from '../../utils/request'

const api = {
    getList: 'log/getLog',
}

export function getLogList(page:number = 1,pageSize:number = 10): Promise<list<logList>> {
    return request.get(api.getList + "?page=" + page + "&pageSize=" + pageSize)
}
