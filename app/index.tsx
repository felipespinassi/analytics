import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { createAccess_token } from "@/storage/createAccessToken";
import { ACCESS_TOKEN } from "@/storage/storageConfig";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ChartColumn } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

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
        body: JSON.stringify({
          companyCode: values.companyCode,
          login: values.login,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      await createAccess_token(data.access_token);

      router.push("/(stack)");
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
      router.push("/(stack)");
    }
  }

  useEffect(() => {
    checkToken();

    register("companyCode");
    register("login");
    register("password");
  }, []);
  return (
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
          placeholder="Informe o código de acesso"
          value=""
          onChangeText={(text) => setValue("companyCode", text)}
        />
        <Input
          label="E-mail"
          placeholder="Informe seu e-mail"
          value=""
          onChangeText={(text) => setValue("login", text)}
        />
        <Input
          label="Senha"
          placeholder="Informe sua senha"
          value=""
          onChangeText={(text) => setValue("password", text)}
        />
      </Box>
      <Button onPress={handleSubmit(onSubmit)} loading={loading}>
        Entrar
      </Button>
    </Box>
  );
}
