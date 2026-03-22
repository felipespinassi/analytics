import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import theme from "@/constants/theme";
import { createAccess_token } from "@/storage/createAccessToken";
import { ACCESS_TOKEN } from "@/storage/storageConfig";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ChartColumn } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

interface Dataprops {
  companyCode: string;
  login: string;
  password: string;
}

export default function index() {
  const [loading, setLoading] = useState(false);
  const { register, setValue, handleSubmit } = useForm<Dataprops>();
  const router = useRouter();

  async function onSubmit(values: Dataprops) {
    setLoading(true);
    try {
      const response = await fetch("https://api.expedy.com.br/auth", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      await createAccess_token(data.access_token);

      router.push("/(stack)/Dashboard");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao tentar fazer login. Tente novamente.",
      );
    }
    setLoading(false);
  }

  async function checkToken() {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN);
    if (token) {
      router.push("/(stack)/Dashboard");
    }
  }

  useEffect(() => {
    checkToken();

    register("companyCode");
    register("login");
    register("password");
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={40}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Box bg="background" flex={1} padding="l" gap="xxxl">
          <Box alignItems="center" gap="m" mt="xxxl">
            <Box bg="primary" padding="m" borderRadius="s">
              <ChartColumn size={30} />
            </Box>

            <Text fontSize={24} fontWeight={"bold"}>
              Dashboard Analytics
            </Text>
          </Box>

          <Box gap="l">
            <Input
              label="Código"
              value=""
              placeholder="Informe o código de acesso"
              onChangeText={(text) => setValue("companyCode", text)}
            />
            <Input
              value=""
              label="E-mail"
              placeholder="Informe seu e-mail"
              onChangeText={(text) => setValue("login", text)}
            />
            <Input
              value=""
              label="Senha"
              placeholder="Informe sua senha"
              onChangeText={(text) => setValue("password", text)}
            />
          </Box>

          <Button
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          >
            Entrar
          </Button>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
