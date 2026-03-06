import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { useRouter } from "expo-router";
import { ChartColumn } from "lucide-react-native";
import React from "react";

export default function index() {
  const router = useRouter();
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
          onChangeText={() => {}}
        />
        <Input
          label="E-mail"
          placeholder="Informe seu e-mail"
          value=""
          onChangeText={() => {}}
        />
        <Input
          label="Senha"
          placeholder="Informe sua senha"
          value=""
          onChangeText={() => {}}
        />
      </Box>
      <Button onPress={() => router.push("/(stack)")}>Entrar</Button>
    </Box>
  );
}
