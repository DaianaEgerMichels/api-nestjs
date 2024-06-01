export const ExceptionMessage = {
  // all errors messages will be here
  IsNotEmpty: (property: string) => `${property} should not be empty`,
  IsEmail: (property: string) => `${property} is not a valid email`,
  IsString: (property: string) => `${property} should be a string`,
  MinLength: (property: string, min: number) => `${property} should be at least ${min} characters`,
};
