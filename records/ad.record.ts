import {AdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

// Tworzymy specjalny typ do rzeczy jakie zwraca baza danych, po to aby nie czepial sie TypeScript
type AdRecordResult = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {

    public id?: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {

        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia ogłoszenia nie moze być pusta ani przekraczać 100 znakow!');
        }

        if (obj.description.length > 1024) {
            throw new ValidationError('Ogłoszenie nie moze przekraczać 1024 znaków')
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie moze być mniejsza niż 0, lub wieksza niż 9 999 999')
        }

        //@TODO: check if URL is valid!
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może byc pusty, ani przekraczać 100 znakow')
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;

    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id ", {
            id,
        }) as AdRecordResult;

        return results.length === 0 ? null : new AdRecord(results[0]);

    }

    static async getAll(name: string): Promise<SimpleAdEntity[]> {

        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`
        }) as AdRecordResult;

        return results.map(record => {
            const {id, lat, lon} = record;
            return {
                id, lat, lon
            };
        })
    }

    async addNewAd(): Promise<string> {

        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something what still exist')
        }

        await pool.execute("INSERT INTO `ads` VALUES(:id, :name, :description, :price, :url, :lat, :lon)", {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lat: this.lat,
            lon: this.lon,
        });

        return this.id;
    }


}
