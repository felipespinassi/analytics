import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN } from "./storageConfig";

export async function createAccess_token(access_token: string) {
  try {
    await SecureStore.setItemAsync(ACCESS_TOKEN, access_token);
    const currentTime = new Date().getTime();
    // await SecureStore.setItemAsync(TOKEN_EXPIRE_TIME, currentTime.toString());
  } catch (error) {
    throw error;
  }
}
