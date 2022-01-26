import { MONTH_NAMES } from '../appConstants';

export function toCapitalizedWords(name): string {
    const words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(capitalize).join(' ');
}

export function capitalize(word): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
}

export function getFullName(firstName: string, lastName: string): string {
    return  `${firstName} ${lastName}`;
}

export function getMonthDayString(date: Date): string {
    return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
}

export function formatIfDateType(value: any): any {
    if (value instanceof Date){
        return value.getFullYear() + '-'
        + ('0' + (value.getMonth() + 1)).slice(-2) + '-'
        + ('0' + value.getDate()).slice(-2);
    }
    return value;
}
