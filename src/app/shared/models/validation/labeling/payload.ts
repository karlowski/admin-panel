import { LabelingRelatedParty } from './field';
import { ILabelingPayloadEntity } from './payload-entity';

export interface ILabelingPayload {
    entity: ILabelingPayloadEntity;
    relatedparties: LabelingRelatedParty[];
}
