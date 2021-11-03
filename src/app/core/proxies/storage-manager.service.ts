import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

/**
 *  Ionic DataStorage service proxy
 */
@Injectable({
    providedIn: 'root'
})
export class StorageManagerService {

    constructor(private readonly storage: Storage) {}

    public get(storageKey: string): Promise<any> {
        return this.storage.get(storageKey);
    }

    public set(storageKey: string, data: any): Promise<any> {
        return this.storage.set(storageKey, data);
    }

    public remove(storageKey: string): Promise<any> {
        return this.storage.remove(storageKey);
    }
}
