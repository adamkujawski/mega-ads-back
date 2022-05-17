import {AdRecord} from "../records/ad.record";

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

})
