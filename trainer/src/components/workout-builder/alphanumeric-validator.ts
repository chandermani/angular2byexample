import {Control} from "angular2/common";

export class AlphaNumericValidator {
    static invalidAlphaNumeric(control: Control):{ [key:string]:boolean } {
        if ( control.value.length && !control.value.match(/^[a-z0-9]+$/i) ){
            return {invalidAlphaNumeric: true };
        }
        return null;
    }
}
