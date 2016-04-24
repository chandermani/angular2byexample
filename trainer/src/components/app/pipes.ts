import {Pipe} from 'angular2/core';

@Pipe({
  name: 'search'
})
export class SearchPipe {
  transform(value: Array<any>, args: any[]): any {
    const field: string = args[0];
    const searchTerm: any = args[1];
    if (!field) return [];
    if ((!searchTerm && searchTerm !== false) || 0 === searchTerm.length) return value;
    if (typeof (searchTerm) === "boolean") {
      return value.filter((item) => item[field] == searchTerm);
    }
    return value.filter((item) => item[field].startsWith(searchTerm));
  }
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe {
  transform(value: Array<any>, args: any[]): any {
    let field: string = args[0];
    if (value == null) {
      return null;
    }
    if (field.startsWith("-")) {
      field = field.substring(1);
      if (typeof value[field] === 'string' || value[field] instanceof String) {
        return [...value].sort((a, b) => b[field].localeCompare(a[field]));
      }
      return [...value].sort((a, b) => b[field] - a[field]);
    }
    else {
      if (typeof value[field] === 'string' || value[field] instanceof String) {
        return [...value].sort((a, b) => -b[field].localeCompare(a[field]));
      }
      return [...value].sort((a, b) => a[field] - b[field]);
    }
  }
}
