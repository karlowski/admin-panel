export interface IDummy {
    [name: string]: string;
}

export interface IDummyDTO {
    code: string;
    name: string;
}

export const DUMMY_NAMES: IDummy = {
    be: 'Belgium',
    fr: 'France',
    de: 'Germany',
    it: 'Italy',
    lu: 'Luxembourg',
    pt: 'Portugal',
    es: 'Spain',
    ch: 'Switzerland',
    nl: 'Netherlands',
    gb: 'United Kingdom',
};

export const DUMMY_ISO_CODES: IDummy = {
    be: 'BEL',
    fr: 'FRA',
    de: 'DEU',
    it: 'ITA',
    lu: 'LUX',
    pt: 'PRT',
    es: 'ESP',
    ch: 'CHE',
    nl: 'NLD',
    gb: 'GBR',
};
