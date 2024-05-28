import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[],searchKey:any){
    const result:any=[]
    // console.log(value);
    // console.log(searchKey);
    if(!value || !searchKey) return value
      
    value.forEach((item:any)=>{
      
      if((item.username && item.username.trim().toLowerCase().includes(searchKey)) ||
      (item.email && item.email.trim().toLowerCase().includes(searchKey)) ||
      (item.title && item.title.trim().toLowerCase().includes(searchKey)) ||
      (item.price && item.price.toString().toLowerCase().includes(searchKey))
      ){
        result.push(item)
      }
      
    })
    return result;
  }

}
