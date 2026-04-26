import { IUser } from "@/database/user.model";
import { fetchHandler } from "./handlers/fetch";
import { IAccount } from "@/database/account.model";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
const API_USERS_URL = `${API_BASE_URL}/users`
const API_ACCOUNTS_URL = `${API_BASE_URL}/accounts`;

export const api = {
  users: {
    getAll: () => fetchHandler<IUser[]>(`${API_USERS_URL}`),
    getById: (id: string) => fetchHandler<IUser>(`${API_USERS_URL}/${id}`),
    getByEmail: (email: string) =>
      fetchHandler<IUser>(`${API_USERS_URL}/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandler<IUser>(`${API_USERS_URL}`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler<IUser>(`${API_USERS_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    delete: (id: string) =>
      fetchHandler<IUser>(`${API_USERS_URL}/${id}`, {
        method: "DELETE",
      }),
  },
  accounts: {
    getAll: () => fetchHandler<IAccount[]>(`${API_ACCOUNTS_URL}`),
    getById: (id: string) => fetchHandler<IAccount>(`${API_ACCOUNTS_URL}/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandler<IAccount>(`${API_ACCOUNTS_URL}/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler<IAccount>(`${API_ACCOUNTS_URL}`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler<IAccount>(`${API_ACCOUNTS_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandler<IAccount>(`${API_ACCOUNTS_URL}/${id}`, {
        method: "DELETE",
      }),
  },
};
