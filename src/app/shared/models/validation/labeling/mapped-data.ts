import { LabelingDocument, LabelingRawField, LabelingRelatedParty } from './field';
import { ILabelingRule } from './rule';

export interface LabelingMappedData {
    data: LabelingRawField[];
    documents: LabelingDocument[];
    relatedParties: LabelingRelatedParty[];
    rules: ILabelingRule[];
    fireWorksTrees: LabelingRawField[];
}
