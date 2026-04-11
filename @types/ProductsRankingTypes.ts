export interface ProductsSalesTypes {
  periodo: string;
  companies: {
    companie: number;
    total_faturamento_produtos: string;
    total_faturamento_produtos_cancelados: string;
    total_produtos_cancelados: string;
    total_produtos_vendidos: string;
    produtos: {
      company: number;
      position: number;
      precoMedio: string;
      productId: string;
      productName: string;
      quantidadeCancelada: string;
      quantidadeVendida: string;
      sku: string;
      valorTotal: string;
    }[];
  }[];
}
