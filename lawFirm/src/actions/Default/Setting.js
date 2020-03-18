import { createAction } from 'redux-actions';
import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  HORIZONTAL_MENU_POSITION,
  SWITCH_LANGUAGE,
  THEME_COLOR,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH,
  CHANGE_SETTING_VALUES,
} from 'constants/ActionTypes';

export const changeSettingValues = createAction(CHANGE_SETTING_VALUES);
export const setDarkTheme = createAction(DARK_THEME);
export const changeDirection = createAction(CHANGE_DIRECTION);
export const changeNavigationStyle = createAction(CHANGE_NAVIGATION_STYLE);
export const setHorizontalMenuPosition = createAction(HORIZONTAL_MENU_POSITION);
export const toggleCollapsedNav = createAction(TOGGLE_COLLAPSED_NAV);
export const updateWindowWidth = createAction(WINDOW_WIDTH);
export const setThemeColor = createAction(THEME_COLOR);
export const switchLanguage = createAction(SWITCH_LANGUAGE);


