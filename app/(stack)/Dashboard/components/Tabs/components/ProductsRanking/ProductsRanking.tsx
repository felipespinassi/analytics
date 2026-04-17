import Loading from "@/components/Loading/Loading";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { useGetProductsRanking } from "@/hooks/useGetProductsRanking";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import { FlashList } from "@shopify/flash-list";
import dayjs from "dayjs";
import React from "react";

export default function ProductsRankingItem({
  rangeSelected,
}: {
  rangeSelected: { label: string; from: string; to: string };
}) {
  const { data: productsRanking, isLoading: isProductsRankingLoading } =
    useGetProductsRanking({
      dataInicial: dayjs(rangeSelected.from).format("YYYY-MM-DD"),
      dataFinal: dayjs(rangeSelected.to).format("YYYY-MM-DD"),
    });
  return (
    <>
      {isProductsRankingLoading ? (
        <Loading />
      ) : (
        <FlashList
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item: produto }) => {
            return (
              <Box
                borderRadius="s"
                padding="m"
                backgroundColor="card"
                marginBottom="s"
                gap="s"
              >
                <Box>
                  <Text fontSize={14} fontWeight="bold">
                    {produto.productName}
                  </Text>
                  <Text fontSize={12} color="mutedForeground">
                    SKU: {produto.sku}
                  </Text>
                </Box>

                <Box flexDirection="row" justifyContent="space-between">
                  <Text fontSize={12} color="mutedForeground">
                    Vendida:{" "}
                    {formatDecimal(Number(produto.quantidadeVendida || 0))}
                  </Text>
                  <Text fontSize={12} color="mutedForeground">
                    Cancelada:{" "}
                    {formatDecimal(Number(produto.quantidadeCancelada || 0))}
                  </Text>
                </Box>

                <Box flexDirection="row" justifyContent="space-between">
                  <Text fontSize={13} fontWeight="bold" color="primary">
                    Total: {formatCurrency(Number(produto.valorTotal || 0))}
                  </Text>
                  <Text fontSize={13} fontWeight="bold" color="primary">
                    Preco medio:{" "}
                    {formatCurrency(Number(produto.precoMedio || 0))}
                  </Text>
                </Box>
              </Box>
            );
          }}
          data={productsRanking?.companies?.[0]?.produtos || []}
        />
      )}
    </>
  );
}
