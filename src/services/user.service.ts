import { BASE_URL } from '../constants/api.constant';
import { ApiMethod, ApiRequest } from '../models/api.model';

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  role: string;
}

export const createUser = ({
  firstName,
  lastName,
  email,
  password,
  username,
  role,
}: CreateUserRequest) => {
  const request: ApiRequest = {
    method: ApiMethod.Post,
    url: `${BASE_URL}/api/register`,
    body: { firstName, lastName, email, password, username, role },
  };
  return request;
};

export const getUsers = () => {
  const request: ApiRequest = {
    method: ApiMethod.Get,
    url: `${BASE_URL}/api/users`,
  };
  return request;
};
