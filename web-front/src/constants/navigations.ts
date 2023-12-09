/**
 * navigation
 *
 * @package constants
 */

type NavigationsType = {
  SIGNIN: string;
  SIGNUP: string;
  TOP: string;
  CREATE: string;
  DETAIL: string;
  EDIT: string;
};

/**
 * リンク先一覧
 * 遷移先定義の際に使用
 * @type {{SIGNIN: string, SIGNUP: string, TOP: string, CREATE: string, DETAIL: string, EDIT: string}}
 */
export const NAVIGATION_LIST: NavigationsType = {
  SIGNIN: `/`,
  SIGNUP: `/signup`,
  TOP: `/todo`,
  CREATE: `/todo/create`,
  DETAIL: `/todo/detail/:id`,
  EDIT: `/todo/edit/:id`,
};

/**
 * パス一覧
 * 画面遷移時に使用
 * @type {{SIGNIN: string, SIGNUP: string, TOP: string, CREATE: string, DETAIL: string, EDIT: string}}
 */
export const NAVIGATION_PATH: NavigationsType = {
  SIGNIN: `/`,
  SIGNUP: `/signup`,
  TOP: `/todo/`,
  CREATE: `/todo/create/`,
  DETAIL: `/todo/detail/`,
  EDIT: `/todo/edit/`,
};
