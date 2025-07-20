import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
  SALES_OPERATOR = 'SALES_OPERATOR',
  SALES_TECH = 'SALES_TECH',
  SALES_MANAGEMENT = 'SALES_MANAGEMENT',
  COMMERCIAL_OPERATOR = 'COMMERCIAL_OPERATOR',
  COMMERCIAL_TECH = 'COMMERCIAL_TECH',
  COMMERCIAL_MANAGEMENT = 'COMMERCIAL_MANAGEMENT',
}

export enum AppResource {
  USER = 'USER',
  POST = 'POST',
  PRODUCT = 'PRODUCT',
  COMPANY = 'COMPANY',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // AUTHOR ROLES
  .grant(AppRoles.AUTHOR)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.POST])
  .updateOwn([AppResource.POST])
  .deleteOwn([AppResource.POST])
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.AUTHOR)
  .createAny([AppResource.USER])
  .updateAny([AppResource.POST, AppResource.USER])
  .deleteAny([AppResource.POST, AppResource.USER])
  // COMMERCIAL_OPERATOR ROLES
  .grant(AppRoles.COMMERCIAL_OPERATOR)
  .createAny([AppResource.PRODUCT])
  .updateAny([AppResource.PRODUCT])
  .deleteAny([AppResource.PRODUCT])
  .readAny([AppResource.PRODUCT])
  // COMMERCIAL_TECH ROLES
  .grant(AppRoles.COMMERCIAL_TECH)
  .extend(AppRoles.COMMERCIAL_OPERATOR)
  // COMMERCIAL_MANAGEMENT ROLES
  .grant(AppRoles.COMMERCIAL_MANAGEMENT)
  .extend(AppRoles.COMMERCIAL_TECH)
  // SALES_OPERATOR ROLES
  .grant(AppRoles.SALES_OPERATOR)
  .createAny([AppResource.COMPANY])
  .updateOwn([AppResource.COMPANY])
  .deleteOwn([AppResource.COMPANY])
  .readOwn([AppResource.COMPANY])
  // SALES_TECH ROLES
  .grant(AppRoles.SALES_TECH)
  .extend(AppRoles.SALES_OPERATOR)
  // SALES_TECH ROLES
  .grant(AppRoles.SALES_MANAGEMENT)
  .extend(AppRoles.SALES_TECH);
