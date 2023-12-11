/**
 * User
 *
 * @package interface
 */

/**
 * ResponseUserType
 */
export interface ResponseUserType {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * RequestUserType
 */
export interface RequestUserType {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  access_token: string;
}

export interface JwtPayload {
  user: ResponseUserType;
  accessToken: string;
}
