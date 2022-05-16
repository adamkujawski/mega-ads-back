import {AdRecord} from "../records/ad.record";

const defaultRecord = new AdRecord({
    name: 'Test',
    description: 'asd',
    price: 9,
    url: 'http://...',
    lat: 9,
    lon: 9,
});

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultRecord);

    expect(ad.name).toBe('Test');
    expect(ad.description).toBe('asd');

});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultRecord,
        price: -9,
    })).toThrow('Cena nie moze być mniejsza niż 0, lub wieksza niż 9 999 999');
})

// @TODO: Check all the validations