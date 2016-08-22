import {it, describe, expect, beforeEach} from 'angular2/testing'
import {SecondsToTime} from './pipes';
describe('SecondsToTime pipe', () => {
    let pipe:SecondsToTime;
    beforeEach(() => {
        pipe = new SecondsToTime();
    });
    it('should convert integer to time format', () => {
        expect(pipe.transform(5, [])).toEqual('00:00:05');
        expect(pipe.transform(65, [])).toEqual('00:01:05');
        expect(pipe.transform(3610, [])).toEqual('01:00:10');
    });
});
