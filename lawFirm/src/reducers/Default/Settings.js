import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  FIXED_DRAWER,
  HORIZONTAL_MENU_POSITION,
  BELOW_THE_HEADER,
  SWITCH_LANGUAGE,
  TOGGLE_COLLAPSED_NAV,
  VERTICAL_NAVIGATION,
  WINDOW_WIDTH,
  THEME_COLOR,
  CHANGE_SETTING_VALUES,
} from 'constants/ActionTypes';
import { DARK_INDIGO } from 'constants/ThemeColors';
import { produce } from 'immer';
import { RU } from 'helpers/ramda';

const { isEng } = RU;
const isEngMode = isEng();
const localThemeColor = localStorage.getItem('themeColor');
const localDarkTheme = localStorage.getItem('darkTheme') === 'true';
const localSettingIconHide = localStorage.getItem('settingIconHide') === 'true';

// 주의 ! 아래 형태가 아닌 reducerSelector & prod 공통 func 형태로 개발.
const initialSettings = {
  navCollapsed: false,
  drawerType: FIXED_DRAWER,
  themeColor: localThemeColor || DARK_INDIGO,
  darkTheme: localDarkTheme || false,
  width: window.innerWidth,
  isDirectionRTL: false,
  navigationStyle: VERTICAL_NAVIGATION,
  horizontalNavPosition: BELOW_THE_HEADER,
  locale: {
    languageId: isEngMode ? 'english' : 'korean',
    locale: isEngMode ? 'en' : 'ko',
    name: isEngMode ? 'English' : 'Korean',
    icon: isEngMode ? 'us' : 'kr',
  },
  settingIconHide: localSettingIconHide || true,
  listUItype: 'material', // material desktop
  appDialogMode: 'auto', // auto, popup, default
  drawerStatus: false, // Theme 등 개인설정부분 (open 여부)
};

const settings = (state = initialSettings, action) => {
  const { payload } = action;
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        navCollapsed: false,
      };
    case CHANGE_SETTING_VALUES:
      return produce(state, draft => {
        draft[payload.name] = payload.value;

        if (payload.name === 'settingIconHide') {
          localStorage.setItem('settingIconHide', payload.value);
        }
      });
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: payload,
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: payload,
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: payload.locale,
        isDirectionRTL: ['ar'].includes(payload.locale.locale),
      };
    case THEME_COLOR:
      localStorage.setItem('themeColor', payload);
      return {
        ...state,
        darkTheme: false,
        themeColor: payload,
      };
    case DARK_THEME:
      localStorage.setItem('darkTheme', !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    case CHANGE_DIRECTION:
      return {
        ...state,
        isDirectionRTL: !state.isDirectionRTL,
      };
    case CHANGE_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: payload,
      };
    case HORIZONTAL_MENU_POSITION:
      return {
        ...state,
        horizontalNavPosition: payload,
      };
    default:
      return state;
  }
};

export default settings;
