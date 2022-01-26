export interface IPaymentSourceType {
    [name: string]: string;
}

export const PAYMENT_SOURCE_TYPES: IPaymentSourceType = {
    CARD: 'Credit/Debit Card',
    INVOICE: 'Registry Invoice',
    CREDIT: 'Purchased Credits'
};
