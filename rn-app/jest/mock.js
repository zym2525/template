
const asyncFn = (response) => () => jest.fn(() => Promise.resolve(response));
const syncFn = (response) => () => jest.fn(() => response);
const makeFns = (response) => [asyncFn(response), syncFn(response)];

const [stringFnAsync, stringFnSync] = makeFns('unknown');
const [numberFnAsync, numberFnSync] = makeFns(-1);
const [arrayFnAsync, arrayFnSync] = makeFns([]);
const [booleanFnAsync, booleanFnSync] = makeFns(false);
const [objectFnAsync, objectFnSync] = makeFns({});

export default {
    stringFnAsync, stringFnSync,
    numberFnAsync, numberFnSync,
    arrayFnAsync, arrayFnSync,
    booleanFnAsync, booleanFnSync,
    objectFnAsync, objectFnSync,
}