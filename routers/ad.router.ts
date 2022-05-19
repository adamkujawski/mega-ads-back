import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()
    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);
        res.json(ad);
    })
    //opcjonalny parametr z znakiem ?
    .get('/search/:name?', async (req, res) => {

        const ads = await AdRecord.getAll(req.params.name);

        res.json({ads})
    })
    .post('/', async (req, res) => {
        const ad = new AdRecord(req.body);
        await ad.addNewAd();
        res.json(ad);
    })
