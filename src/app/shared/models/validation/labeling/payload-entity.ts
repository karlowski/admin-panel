import { LabelingDocument, LabelingRawField } from './field';

export interface ILabelingPayloadEntity {
    fields: LabelingRawField[];
    documents: LabelingDocument[];
}
