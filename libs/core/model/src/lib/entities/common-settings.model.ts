import { InjectionToken } from '@angular/core';

export interface CommonSettings {
  enableAddToFavorite: boolean;
}


export const COMMON_SETTINGS_TOKEN: InjectionToken<CommonSettings> = new InjectionToken<CommonSettings>('COMMON_SETTINGS');
