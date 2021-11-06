import {Expose} from 'class-transformer';
import {BaseEntity} from '@app/core/models/base-entity';

export class User extends BaseEntity {
    @Expose() public age: number;
    @Expose() public email: string;
    @Expose() public gender: boolean; // false - female, true - male
    // eslint-disable-next-line @typescript-eslint/naming-convention
    @Expose() public last_name: string;
}
