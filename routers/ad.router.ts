import {Router} from "express";
import {AdRecord} from "../records/ad.record";

export const adRouter = Router()

    //opcjonalny parametr z znakiem ?
    //Bardzo ważne aby ten endpoint był przez .get('/id'), poniewaz kiedy nie bedzie podanego parametru, /search zostanie odebrany jako ID w kolejnym endpoincie
    .get('/search/:name?', async (req, res) => {

        console.log(req.params.name);
        const ads = await AdRecord.getAll(req.params.name ?? '');
        res.json(ads)
    })

    .get('/:id', async (req, res) => {
        const ad = await AdRecord.getOne(req.params.id);
        res.json(ad);
    })

    .post('/', async (req, res) => {
        console.log('1');
        console.log(req.body);
        const ad = new AdRecord(req.body);
        await ad.addNewAd();
        res.json(ad);
    })
