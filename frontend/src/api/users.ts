import { get, handleAPIError, post } from "src/api/requests";

import type { APIResult } from "src/api/requests";

export interface User {
    _id: string;
    name: string;
    profilePictureURL?: string;
  }

  export interface CreateUserRequest {
    name: string;
    profilePictureURL?: string;
  }

  export interface UpdateUserRequest {
    _id: string;
    name: string;
    profilePictureURL?: string;
  }

  export async function createUser(user: CreateUserRequest): Promise<APIResult<User>> {
    try {
      const response = await post("/api/user", user);
      const json = (await response.json()) as User;
      return { success: true, data: json };
    } catch (error) {
      return handleAPIError(error);
    }
  }
  
  export async function getUser(id: string): Promise<APIResult<User>> {
    try {
      const response = await get(`/api/user/${id}`);
      const json = (await response.json()) as User;
      return { success: true, data: json };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  export async function getAllUsers(): Promise<APIResult<User[]>> {
    try {
      const response = await get("http://127.0.0.1:3001/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const json: User[] = (await response.json()) as User[];
  
      return { success: true, data: json };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  export async function updateUser(user: UpdateUserRequest): Promise<APIResult<User>> {
    try {
        const response = await fetch(`http://127.0.0.1:3001/api/task/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
    
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
    
        const json = (await response.json()) as User;
        return { success: true, data: json };
    } catch (error) {
      return handleAPIError(error);
    }
  }
