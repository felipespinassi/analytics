import ArrowBack from "@/components/ArrowBack/ArrowBack";
import Loading from "@/components/Loading/Loading";
import RangeSelect from "@/components/RangeSelect/RangeSelect";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { marketplaces } from "@/constants/marketplaces";
import { DateRangeContext } from "@/context/DateRangeContext";
import { useGetIntegrations } from "@/hooks/useGetIntegrations";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Image, ScrollView } from "react-native";
import Cards from "./components/Cards/Cards";
import IntegrationItem from "./components/IntegrationItem/IntegrationItem";

export default function MarketplaceDetails() {
  const params = useLocalSearchParams();

  const { rangeSelected, setRangeSelected } = useContext(DateRangeContext);
  const { data, isLoading: isIntegrationsLoading } = useGetIntegrations(
    params.marketplace as string,
  );

  return (
    <Box bg="background" flex={1} padding="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box mb="m" flexDirection="row" alignItems="center" gap="m">
          <ArrowBack />
          <Image
            resizeMode="contain"
            source={
              marketplaces?.[params.marketplace as keyof typeof marketplaces]
                .logo
            }
            style={{ width: 100, height: 30 }}
          />

          {/* <Text fontSize={12}>{data?.integracoes?.length} Lojas</Text> */}
        </Box>

        <Box mb="m">
          <RangeSelect
            rangeSelected={rangeSelected}
            setRangeSelected={setRangeSelected}
          />
        </Box>

        <Cards params={params} rangeSelected={rangeSelected} />

        <Box mt="l">
          <Text color="mutedForeground" fontSize={14} fontWeight={"bold"}>
            INTEGRAÇÕES
          </Text>

          {isIntegrationsLoading ? (
            <Loading />
          ) : (
            <>
              {data?.integracoes?.map((integracao: any, index: number) => {
                return (
                  <IntegrationItem
                    rangeSelected={rangeSelected}
                    key={index}
                    integracao={integracao}
                    marketplace={params.marketplace as string}
                  />
                );
              })}
            </>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
