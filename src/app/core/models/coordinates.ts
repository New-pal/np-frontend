import { Expose } from 'class-transformer';

export class Coordinates {
    @Expose() public lat: number;
    @Expose() public lon: number;
}
