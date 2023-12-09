/**
 * User
 *
 * @package interface
 */

/**
 * UserType
 */
export interface UserType {
  id: number;
  name: string;
  email: string;
}

/**
 * AuthResponseType
 */
export interface AuthResponseType {
  user: UserType;
  accessToken: string;
}
