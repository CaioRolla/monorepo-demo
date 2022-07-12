export abstract class AuthAppConfig { 
  applicationLogoUrl?: string;
  googleAuthUrl?: string;
  signInMerchUrl?: string;

  signInSuccessRoute?: string;

  termsOfServiceUrl?: string;

  baseApi!: string;
}
