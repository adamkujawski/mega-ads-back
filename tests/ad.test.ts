import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

afterAll(async () => {
    await pool.end();
})

const defaultRecord = new AdRecord({
    name: 'Test',
    description: 'asd',
    price: 9,
    url: 'http://...',
    lat: 9,
    lon: 9,
});

test('AdRecord returns data form database for one entry', async () => {

    const ad = await AdRecord.getOne('123');

    console.log(ad)

    expect(ad).toBeDefined();
    expect(ad.id).toBe('123');
    expect(ad.name).toBe('Test');


});

test('AdRecord return null from database for unexisting entry.', async () => {

    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
});

test('Inset should return id', async () => {
    const id = await defaultRecord.addNewAd();
    expect(id).toBeDefined();
})

test('Method getAll should return all ads', async () => {
    const result = await AdRecord.getAll('');
    console.log(result)

    expect(result).toBeDefined()
})

test('AdRecond.getAll returns smaller amount of data', async () => {
    const result = await AdRecord.getAll('');


    expect((result[0] as AdEntity).price).toBeUndefined()
    expect((result[0] as AdEntity).description).toBeUndefined()
})