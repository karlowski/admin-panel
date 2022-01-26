import { ControlType } from './control-type.interface.';
import { IFilterName } from './filter-name.interface';
import { NavigationTab } from './navigation-tab.interface';
import { IPagination } from './pagination.interface';

export const AVAILABLE_PAGE_SIZES = [10, 20, 50, 100];

export const DEFAULT_PAGINATION: IPagination = {
    size: AVAILABLE_PAGE_SIZES[0],
    sort: 'createdAt,DESC'
};

export const NAVIGATION_TABS: NavigationTab[] = [
    {text: 'start', link: '/start'},
    {text: 'tab1', link: '/workflow', searchable: true},
    {text: 'tab2', link: '/validation', searchable: true},
    {text: 'tab3', link: '/travelling', searchable: true},
    {text: 'tab4', link: '/quality'},
];

export const CONTROL_TYPES: ControlType[] = [
    {id: 'UNKNOWN_UBO_TYPE', text: 'text'},
    {id: 'UBO_BY_OWNERSHIP', text: 'text'},
    {id: 'CONTROL_BY_VOTING_RIGHTS_UBO_TYPE', text: 'text'},
    {id: 'CONTROL_UBO_TYPE', text: 'text'},
];

export const FILTER_NAMES: IFilterName = {
    createdStart: 'Start Date',
    createdEnd : 'End Date',
    dummy: 'Dummy',
    status: 'Status',
    state: 'State'
};

export const RELATED_PARTY_TYPES = {
    naturalPerson: 'Natural person',
    fireWorks: 'Fire Works',
};

export const RELATED_PARTY_TYPES_OPTIONS = [
  { name: 'Natural person', id: 'NP' },
  { name: 'Fire Works', id: 'LE' },
];

export const RELATED_PARTY_TYPES_MAPPED_DATA = {
  naturalPerson: 'NP',
  fireWorks: 'LE',
};

export const LABELING_FIELD_TYPES: string[] = [
    'Mandatory',
    'Optional',
    'Recommended'
];

export const MONTH_NAMES: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
