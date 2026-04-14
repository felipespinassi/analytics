import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import theme from "@/constants/theme";
import { ACCESS_TOKEN, TOKEN_EXPIRE_TIME } from "@/storage/storageConfig";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { LogOut } from "lucide-react-native";
import React from "react";
import { Alert } from "react-native";

export default function Header() {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box>
        <Text paddingBottom="xs" fontSize={12}>
          Olá, Vendedor 👋
        </Text>

        <Box
          mb="m"
          justifyContent="space-between"
          flexDirection="row"
          width={"auto"}
          alignItems="center"
        >
          <Text fontSize={20} fontWeight={"bold"}>
            Painel de Vendas
          </Text>
        </Box>
      </Box>
      <TouchableOpacityBox
        marginRight="s"
        onPress={async () => {
          Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
                  await SecureStore.deleteItemAsync(TOKEN_EXPIRE_TIME);
                  router.replace("/");
                },
              },
            ],
            { cancelable: true },
          );
        }}
      >
        <LogOut size={22} color={theme.colors.primary} />
      </TouchableOpacityBox>
    </Box>
  );
}
