import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDecimal } from "@/utils/formatDecimal";
import React from "react";

export default function ProductsRankingItem({
  produto,
  index,
}: {
  produto: any;
  index: number;
}) {
  return (
    <Box
      borderRadius="s"
      key={index}
      padding="m"
      backgroundColor="card"
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
          Vendida: {formatDecimal(Number(produto.quantidadeVendida || 0))}
        </Text>
        <Text fontSize={12} color="mutedForeground">
          Cancelada: {formatDecimal(Number(produto.quantidadeCancelada || 0))}
        </Text>
      </Box>

      <Box flexDirection="row" justifyContent="space-between">
        <Text fontSize={13} fontWeight="bold" color="primary">
          Total: {formatCurrency(Number(produto.valorTotal || 0))}
        </Text>
        <Text fontSize={13} fontWeight="bold" color="primary">
          Preco medio: {formatCurrency(Number(produto.precoMedio || 0))}
        </Text>
      </Box>
    </Box>
  );
}
