import {Expose} from 'class-transformer';
import {BaseEntity} from '@app/core/models/base-entity';

export class User extends BaseEntity {
    @Expose() public birthday: string;
    @Expose() public email: string;
    @Expose() public gender: boolean; // false - female, true - male
    /* eslint-disable @typescript-eslint/naming-convention */
    @Expose() public last_name: string;
    @Expose() public first_name: string;
}
