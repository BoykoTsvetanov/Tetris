// interface Cells {
//         cell: any[],
//         color: String,
//         isChecked: Boolean
    
// }



// export default  Cells

export type Cell = {
    color: string
    isChecked: boolean
}

export type Entitlement = {
    productCode: string
    startDate: string
    endDate: string
}