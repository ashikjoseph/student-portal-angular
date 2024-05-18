import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allStudentsData: any, searchKey: any): any[] {
    const result: any = []
    if (!allStudentsData || searchKey === "") {
      return allStudentsData
    }
    else {
      allStudentsData.forEach((item: any) => {
        if (item.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())) {
          result.push(item)
        }
      });
      return result
    }
  }

}
