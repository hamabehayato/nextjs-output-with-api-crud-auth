/**
 * navigation
 *
 * @package constants
 */

type NavigationsType = {
  TOP: string
  CREATE: string
  DETAIL: string
  EDIT: string
}

/**
 * リンク先一覧
 * 遷移先定義の際に使用
 * @type {{TOP: string, CREATE: string, DETAIL: string, EDIT: string}}
 */
export const NAVIGATION_LIST: NavigationsType = {
  TOP: `/`,
  CREATE: `/todo/create`,
  DETAIL: `/todo/detail/:id`,
  EDIT: `/todo/edit/:id`,
}

/**
 * パス一覧
 * 画面遷移時に使用
 * @type {{TOP: string, CREATE: string, DETAIL: string, EDIT: string}}
 */
export const NAVIGATION_PATH: NavigationsType = {
  TOP: `/`,
  CREATE: `/todo/create/`,
  DETAIL: `/todo/detail/`,
  EDIT: `/todo/edit/`,
}
