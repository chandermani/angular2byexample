import {Pipe} from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe {
  transform(value: Array<any>, field:string, searchTerm:string): any {
    if (!field) return [];
    if (searchTerm == null || searchTerm.length === 0) return [...value];
    let results = value.filter((item) => item[field] === searchTerm);
    return results.length === 0 ?  null : results;
  }
}