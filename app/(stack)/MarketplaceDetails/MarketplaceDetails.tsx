import CardGeneric from "@/components/CardGeneric/CardGeneric";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { TouchableOpacityBox } from "@/components/TouchableOpacityBox/TouchableOpacityBox";
import { marketplaces } from "@/constants/marketplaces";
import theme from "@/constants/theme";
import { useGetIntegrations } from "@/hooks/useGetIntegrations";
import { useLocalSearchParams } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Image, ScrollView } from "react-native";

export default function MarketplaceDetails() {
  const params = useLocalSearchParams();

  const { data } = useGetIntegrations(params.marketplace as string);

  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView>
        <Box mb="m">
          <Image
            resizeMode="contain"
            source={
              marketplaces?.[params.marketplace as keyof typeof marketplaces]
                .logo
            }
            style={{ width: 100, height: 30 }}
          />

          <Text fontSize={12}>{data?.integracoes?.length} Lojas</Text>
        </Box>

        <Box gap="m">
          <Box flexDirection="row" gap="m">
            <CardGeneric label="FATURAMENTO" value="R$ 1.000,00" />
            <CardGeneric label="PEDIDOS" value="R$ 500,00" />
          </Box>

          <Box flexDirection="row" gap="m">
            <CardGeneric label="TICKET MÉDIO" value="R$ 1.000,00" />
            <CardGeneric label="LOJAS" value="R$ 500,00" />
          </Box>
        </Box>

        <Box mt="l">
          <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
            MARKETPLACES
          </Text>

          {data?.integracoes?.map((integracoes: any, index: number) => {
            return (
              <TouchableOpacityBox
                key={index}
                gap="m"
                flex={1}
                borderWidth={0.3}
                borderRadius="m"
                borderColor="mutedForeground"
                padding="m"
                marginTop="s"
                flexDirection="row"
                bg="card"
              >
                <Box
                  bg="container"
                  borderRadius="s"
                  padding="s"
                  justifyContent="center"
                >
                  <Image
                    resizeMode="contain"
                    source={
                      marketplaces?.[
                        params.marketplace as keyof typeof marketplaces
                      ].logo
                    }
                    style={{ width: 50, height: 20 }}
                  />
                </Box>

                <Box flex={1}>
                  <Text>{integracoes?.nome}</Text>
                  <Text fontSize={12}>2 lojas</Text>
                </Box>

                <Box justifyContent="flex-end">
                  <Text fontWeight={"bold"} fontSize={12}>
                    R$ 1.000,00
                  </Text>
                  <Text fontSize={10}>121 Pedidos</Text>
                </Box>
                <Box justifyContent="center">
                  <ChevronRight
                    size={18}
                    color={theme.colors.mutedForeground}
                  />
                </Box>
              </TouchableOpacityBox>
            );
          })}
        </Box>
      </ScrollView>
    </Box>
  );
}
