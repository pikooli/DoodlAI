import { mobileTabletCheck } from '../utils.js'

export const IS_MOBILE = mobileTabletCheck();
export const DEFAULT_MODEL = "quickdraw-mobilevit-small";
export const BRUSH_SIZE = IS_MOBILE ? 12 : 16;

