import { trim, tabStyle, toFixed, toDou, isSubjectExercise } from '../mixin.js'

it('trim', () => {
    expect(trim('  11  ')).toBe('11')
})

describe('tabStyle', () => {
    let a = { a: 1 };
    let b = { b: 2 };
    it('tabStyle when condition false', () => {
        expect(tabStyle(false, a, b)).toEqual(a)
    })
    it('tabStyle when condition true', () => {
        expect(tabStyle(true, a, b)).toEqual([a, b])
    })
})

describe('toFixed', () => {
    it('when less 0', () => {
        let num = 100;
        expect(toFixed(num, 2)).toEqual('100.00')
    })
    it('when more 0', () => {
        let num = 100.000;
        expect(toFixed(num, 2)).toEqual('100.00')
    })
    it('when number is undefined', () => {
        let num = undefined;
        expect(toFixed(num, 2)).not.toBeTruthy()
    })
})

describe('toDou', () => {
    it('when number less than 10', () => {
        expect(toDou(2)).toEqual('02')
    })
    it('when number more than 10', () => {
        expect(toDou(111)).toEqual('111')
    })
})

describe('isSubjectExercise', () => {
    it('when exerciseType less than 3', () => {
        expect(isSubjectExercise(2)).toBeFalsy()
    })
    it('when exerciseType more than 3', () => {
        expect(isSubjectExercise(4)).toBeTruthy()
    })
})