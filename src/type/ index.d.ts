export {

}
declare global {
    interface list<T = any> {
        countId:number,
        current:number,
        maxLimit:string,
        optimizeCountSql:Boolean,
        orders:Object,
        pages:number,
        records:T,
        searchCount:Boolean,
        size:number,
        total:number,
    }
}
