import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '',
    database: 'megak_ads',
    namedPlaceholders: true, // pozwala na bezpieczne wysylanie danych
    decimalNumbers: true, // aby liczby byly liczbami
})