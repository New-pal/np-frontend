import {Expose} from 'class-transformer';

export class BaseEntity {
    @Expose() public id: number;
    @Expose() public createdAt: string;
    @Expose() public deletedAt: {
        time: string;
        valid: boolean;
    };
    @Expose() public updatedAt: string;
}
