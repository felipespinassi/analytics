export interface RevenueTypes {
  periodo: string;
  companies: {
    company: number;
    quantidadeCancelados: string;
    quantidadePedidos: string;
    totalCancelado: string;
    totalFaturamento: string;
    detalhes: {
      porTipo: {
        tipo: string;
        quantidadeCancelados: string;
        quantidadePedidos: string;
        totalCancelado: string;
        totalFaturamento: string;
      }[];
    };
  }[];
}
