import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'megaads',
    namedPlaceholders: true, // pozwala na bezpieczne wysylanie danych
    decimalNumbers: true // aby liczby byly liczbami
})