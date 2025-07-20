/** @format */

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

/**
 * Check transfer type validation
 * @param property
 * @param validationOptions
 * @constructor
 */
export function TransferTypeValidator(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'transferTypeValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          let isValid = true;
          if (typeof value === 'string' && typeof relatedValue === 'number') {
            if (validationOptions.context.maxAmount) {
              isValid = !(
                relatedValue < validationOptions.context.maxAmount &&
                value !== validationOptions.context.validValue
              );
            } else if (validationOptions.context.minAmount) {
              isValid = !(
                relatedValue >= validationOptions.context.minAmount &&
                value !== validationOptions.context.validValue
              );
            }
          }

          return isValid;
        },
      },
    });
  };
}
