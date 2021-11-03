import * as onceFn from 'lodash.once';

export const once = (target: any, propertyKey: string, descriptor: PropertyDescriptor): any => {
    const originalMethod = descriptor.value;
    descriptor.value = onceFn(originalMethod);

    return descriptor;
};
