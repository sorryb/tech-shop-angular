import { ProductOrder } from './product.model';

export interface Order {
  id?: string;
  userId?: string;
  orderedProducts: ProductOrder[];
  name: string;
  table: string;
  comment: string;
  orderStatus: OrderStatus;
  orderDateUnix: number;
  orderPaymentSummaryExtraFee: OrderPaymentSummaryExtraFee;
  paymentType?: 'card' | 'cash';
}

export enum OrderStatus {
  ORDER_NEW = 'ORDER_NEW',
  ORDER_ACCEPTED = 'ORDER_ACCEPTED',
  ORDER_PROCESSING = 'ORDER_PROCESSING',
  ORDER_CANCELED = 'ORDER_CANCELED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
}

export interface OrderPaymentSummary {
  subtotal: number;
  serviceCharge: number;
  serviceChargePercentage: number;
  vatRate: number;
  vatRatePercentage: number;
  total: number;
}

export interface OrderPaymentSummaryExtraFee extends OrderPaymentSummary {
  paymentFee: number;
}
