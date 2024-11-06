import { ValidateBy } from 'class-validator';
import type { ValidationArguments, ValidationOptions } from 'class-validator';

export const IsMatch = (
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return ValidateBy(
    {
      name: 'IsMatch',
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = args.object[relatedPropertyName];

          return value === relatedValue;
        },
      },
    },
    validationOptions,
  );
};
