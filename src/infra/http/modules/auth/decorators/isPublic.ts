import { SetMetadata } from '@nestjs/common';
// code from docs https://docs.nestjs.com/recipes/passport#enable-authentication-globally
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
