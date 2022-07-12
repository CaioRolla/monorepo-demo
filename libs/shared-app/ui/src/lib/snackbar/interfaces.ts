import { HeroIconName } from "ng-heroicons";
import { NuiColorScheme } from "../interfaces";

export type SnackbarPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface SnackbarConfig {

    message: string;
    icon?: HeroIconName;
    duration?: number;
    position?: SnackbarPosition;
    color?: NuiColorScheme;
}