import Loading from "@/components/Loading/Loading";
import { Box, Text } from "@/components/RestyleComponents/RestyleComponents";
import { Theme } from "@/constants/theme";
import { useGetOrdersStatus } from "@/hooks/useGetOrdersStatus";
import React from "react";

type StatusColor = keyof Theme["colors"];

export default function StatusOrders({
  integracao,
  rangeSelected,
}: {
  integracao: { id: string };
  rangeSelected: { from: string; to: string };
}) {
  const { data: ordersStatus, isLoading: isOrdersStatusLoading } =
    useGetOrdersStatus({
      integracao: integracao.id as string,
      dataInicial: rangeSelected.from,
      dataFinal: rangeSelected.to,
    });
  const statusStyle = {
    pendente: { name: "Pendente", color: "statusPendente" },
    expedir: { name: "Expedir", color: "statusExpedir" },
    emseparacao: { name: "Em Separação", color: "statusEmSeparacao" },
    completo: { name: "Completo", color: "statusCompleto" },
    cancelado: { name: "Cancelado", color: "statusCancelado" },
    aprovado: { name: "Aprovado", color: "statusAprovado" },
  };
  return (
    <Box>
      <Box>
        <Text color="mutedForeground" marginVertical="m">
          Total de pedidos por status
        </Text>
      </Box>

      {isOrdersStatusLoading ? (
        <Loading />
      ) : (
        <Box gap="s">
          {ordersStatus?.pedidos?.map((pedido: any, index: number) => {
            return (
              <Box
                backgroundColor="cardBackground"
                borderRadius="s"
                flex={1}
                padding="s"
                justifyContent="space-between"
                flexDirection="row"
                key={index}
              >
                <Text
                  color={
                    statusStyle[pedido.status as keyof typeof statusStyle]
                      ?.color as StatusColor
                  }
                >
                  {statusStyle[pedido.status as keyof typeof statusStyle]
                    ?.name || pedido.status}
                </Text>
                <Text
                  color={
                    statusStyle[pedido.status as keyof typeof statusStyle]
                      ?.color as StatusColor
                  }
                >
                  {pedido.total}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
