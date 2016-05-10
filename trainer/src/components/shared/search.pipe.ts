import {Pipe} from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe {
  transform(value: Array<any>, field:string, searchTerm:string): any {
    if (!field) return [];
    if (searchTerm == null) return [...value];
    return value.filter((item) => item[field] === searchTerm);
  }
}