// import { sum } from '../common'


function sum(a, b) {
    return a + b;
}

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).toBeGreaterThanOrEqual(2.5);
});

test('array', () => {
    const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'beer',
    ];
    expect(shoppingList).toContain('beer');
});

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(234)
        }, 1000)
    })
}

// test('fetchData', () => {
//     return fetchData().then(data => {
//         expect(data).toBeGreaterThan(100)
//     })
// })

test('resolves', () => {
    return expect(fetchData()).resolves.toBeGreaterThan(100)
})


describe('Repeating Scoping', () => {
    let data = 0;
    beforeEach(async () => {
        data = await fetchData();
    });
    test('Repeating ', () => {
        expect(data).toBeGreaterThan(100);
    })
})


describe('Timer Mocks', () => {
    function timerGame(callback) {
        console.log('Ready....go!');
        setTimeout(() => {
            console.log("Time's up -- stop!");
            callback && callback();
        }, 1000);
    }
    beforeEach(() => {
        jest.useFakeTimers();
    });
    test('waits 1 second before ending the game', () => {

        timerGame();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });
})

describe('ES6 Class Mocks', () => {

})
