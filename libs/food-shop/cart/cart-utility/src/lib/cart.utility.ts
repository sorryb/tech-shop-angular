import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderPaymentSummary, OrderPaymentSummaryExtraFee, ProductOrder } from '@food-shop-architecture-workshop/core/model';

export const mapPaymentFeeFromCardData = (
  cardData: Array<{ selected: boolean; value: number }>
): number => {
  const selected = cardData.find((c) => c.selected);
  return selected ? selected.value : 0;
};

export const calculateCartSubtotal = (productOrder: ProductOrder[]): number => {
  return productOrder.length > 0
    ? roundTo2Decimals(
      productOrder
        .map((prod) => prod.quantity * prod.product.price)
        .reduce((a, b) => a + b)
    )
    : 0;
};

export const calculateServiceCharge = (
  subTotal: number,
  serviceChargeValue: number
): number => {
  return roundTo2Decimals((subTotal * serviceChargeValue) / 100);
};

export const calculateVatRate = (
  subtotalIncludingTaxes: number,
  vatRate: number
): number => {
  return roundTo2Decimals((subtotalIncludingTaxes * vatRate) / 100);
};

export const calculateTotal = (
  subTotal: number,
  serviceChargeValue: number,
  paymentMethodValue: number,
  vatRage: number
) => {
  return roundTo2Decimals(
    subTotal + serviceChargeValue + paymentMethodValue + vatRage
  );
};

export const roundTo2Decimals = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const getCartPriceModel = (
  productOrders: ProductOrder[],
  vatRatePercentage: number,
  serviceChargePercentage: number
): OrderPaymentSummary => {
  const subtotal = calculateCartSubtotal(productOrders);
  const serviceCharge = calculateServiceCharge(
    subtotal,
    serviceChargePercentage
  );
  const vatRate = calculateVatRate(subtotal + serviceCharge, vatRatePercentage);
  return {
    subtotal,
    serviceChargePercentage,
    vatRatePercentage,
    vatRate,
    serviceCharge,
    total: roundTo2Decimals(subtotal + serviceCharge + vatRate)
  };
};

export const getCartPriceFeeModel = (
  cartCheckoutModel: OrderPaymentSummary,
  paymentFee: number
): OrderPaymentSummaryExtraFee => {
  return {
    ...cartCheckoutModel,
    paymentFee,
    total: roundTo2Decimals(cartCheckoutModel.total + paymentFee)
  };
};

export const buildCheckoutForm = () => {
  const formBuilder: FormBuilder = inject(FormBuilder);
  return formBuilder.group({
    name: ['', Validators.required],
    table: ['', Validators.required],
    comment: ['']
  });
};
