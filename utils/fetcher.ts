import { ACCESS_TOKEN } from "@/storage/storageConfig";
import * as SecureStore from "expo-secure-store";

export const fetcher = async (...args) => {
  const token = await SecureStore.getItemAsync(ACCESS_TOKEN);

  return fetch(...args, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
};
