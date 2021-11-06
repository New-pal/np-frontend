import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() {
    }

    public static clear<T>(obj: T): T {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }

        return obj;
    }

    public static clearArray<T>(arr: T[]): T[] {
        arr?.forEach(val => this.clear(val));

        return arr;
    }

    public static getImgBase64(file: Blob | File): Promise<string> {
        return new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
    }

    public static declination(num: number, words: string[]): string {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
}
