import { ILabelingFlag } from './flag';

export interface LabelingRawField {
    name: string;
    value?: string;
    type?: string;
    extractedAt?: string;
    flag?: ILabelingFlag;
    modified?: boolean;
    price?: number;
    currency?: string;
    url?: string;
    documentId?: string;
}

export interface LabelingRelatedParty {
    objectType: string;
    data: LabelingRawField[];
    ownerShipPercentage: number;
    modified?: boolean;
}

export interface RelatedPartyUI {
    values: LabelingRelatedPartyPair[];
    flag?: ILabelingFlag;
    modified?: boolean;
    type?: string;
    name?: string;
    role?: string;
}

export interface LabelingRelatedPartyPair{
    name: string;
    value: string;
}

export interface LabelingDocument {
    name: string;
    isProcessed?: boolean;
    flag?: ILabelingFlag;
    url?: string;
    modified?: boolean;
    effectiveAt?: Date;
}

export type LabelingField = LabelingRelatedParty | LabelingRawField | LabelingDocument;

export interface LabelingNewDocument {
    labelingId: string;
    type: string;
    name: string;
    raw: boolean;
}

export interface DocumentDialogResponse {
    type: string;
    name: string;
    file: File;
}

export enum RelatedPartyAttributes {
    registeredName = 'Registered name',
    firstName = 'First Name',
    lastName = 'Last Name',
    dateOfBirth = 'Date of birth',
    countryOfBirth = 'Country of birth',
    startDate = 'Start date',
    endDate = 'End date',
    uboType = 'UBO type',
    controlType = 'Flag Control/Ubo',
    votingRight = 'Voting Right',
    city = 'Legal address - City',
    incorporationDate = 'Incorporation date',
    role = 'Role'
}
