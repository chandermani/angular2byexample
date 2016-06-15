import {Control} from "@angular/common";

export class AlphaNumericValidator {
    static invalidAlphaNumeric(control: Control):{ [key:string]:boolean } {
        if ( control.value && control.value.length && !control.value.match(/^[a-z0-9]+$/i) ){
            return {invalidAlphaNumeric: true };
        }
        return null;
    }
}
