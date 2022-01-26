export interface ICurrency {
    [name: string]: string;
}

export const CURRENCIES: ICurrency = {
    EUR: 'EURO',
    USD: 'US Dollar',
    GBP: 'Pound Sterling',
    CHF: 'Swiss Franc'
};
