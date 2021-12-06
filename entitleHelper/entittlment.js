   // Entitlement = {
    //productCode: string
    //startDate: string
    //endDate: string
//}



//priema dva masiva,sravnqva i kato rezultat vrushta razlikite mejdy tqh , stari i novi dobaveni,premahnati , promeneni

import { generateCode } from "./generateCode"


const oldEntitlement = [{
    productCode: 'dasdsadada0',
    startDate: '',
    endDate: '17.04.2021'
}, {
    productCode: 'dasdsadada1',
    startDate: '',
    endDate: '17.04.2021'
}, {
    productCode: 'dadsadada-1',
    startDate: '12.05.2020',
    endDate: '15.03.2020'
}]

const newEntitlement = [{
    productCode: 'dasdsadada0',
    startDate: '',
    endDate: '17.04.2021'
}, {
    productCode: 'dadsadada1',
    startDate: '12.05.2020',
    endDate: '15.03.2020'
}, {
    productCode: 'dadsadada2',
    startDate: '12.05.2020',
    endDate: '15.03.2020'
}, {
    productCode: 'dadsadada3',
    startDate: '12.05.2020',
    endDate: '15.03.2020'
}]


function solve (oldEntitlement,newEntitlement) {
    /// old ako e prazen
    /// ako new e prazen
    ///
  const difference = [];
        oldEntitlement.forEach((entOld) => {
            
        newEntitlement.forEach((entNew) => {
            debugger
            if(entOld.productCode !== entNew.productCode && entOld.productCode !== '') {

                difference.push(`productCode has changed with new code ${entNew.productCode}`)
               
            } else if (entNew.productCode === '') {
                difference.push('ProductCode was removed')
               
            } else {
                difference.push('No changes on productCode')
               
                
            }

            if(entOld.productCode === '' && entNew.productCode !== '') {
                    difference.push(`ProductCode was emtpy i he has new code ${entNew.productCode}`);
                   
                   
            };
            if(entOld.startDate === '' && entNew.startDate !== '') {
                difference.push(`Entitlement  was emtpy i he has a new data ${entNew.startDate}`);
                
               
            }

            if(entOld.endDate === '' && entNew.endDate !== '') {
                difference.push('Entitlement was empty i he has a new end data');
               
            }

            if(entOld.startDate !== entNew.startDate && entNew.startDate !== '' && entOld.startDate !== '') {
                difference.push(`Entitlement has a new starting date ${entNew.startDate}`)
               
            
            }else if (entNew.startDate === '') {
                difference.push('Start Date is removed');
               
                
            } else {
                difference.push('No change on startDate')
               
               
            }

            if(entOld.endDate !== entNew.endDate && entNew.endDate !== '' && entOld.endDate !== '') {
                difference.push(`Entitlement has a new ending date ${entNew.endDate}`);
               ;
               
            }else if (!entNew.endDate === '') {
                difference.push('End Date is removed');
               ;
                
            } else {
                difference.push('No changes on endDate');
               
               
            }
        })

  })

  console.log(difference)
}

solve(oldEntitlement,newEntitlement);




export {solve}
