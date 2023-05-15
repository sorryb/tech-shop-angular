import { Sort } from '@angular/material/sort';
import { Order } from '@food-shop-architecture-workshop/core/model';

export const sortOrders = (orders: Order[], sort: Sort) => {
  if (sort.active !== '' && sort.direction !== '') {
    switch (sort.active) {
      case 'id': {
        if (sort.direction === 'asc') {
          return [...orders].sort((a, b) => (a === b ? 0 : (a.id as string).localeCompare(b.id as string) ? -1 : 1));
        } else {
          return [...orders].sort((a, b) => (a === b ? 0 : (a.id as string).localeCompare(b.id as string) ? 1 : -1));
        }
      }
      case 'orderPaymentSummaryExtraFee.total': {
        if (sort.direction === 'asc') {
          return [...orders].sort((a, b) =>
            a.orderPaymentSummaryExtraFee.total > b.orderPaymentSummaryExtraFee.total
              ? 1
              : a.orderPaymentSummaryExtraFee.total < b.orderPaymentSummaryExtraFee.total
                ? -1
                : 0
          );
        } else {
          return [...orders].sort((a, b) =>
            a.orderPaymentSummaryExtraFee.total > b.orderPaymentSummaryExtraFee.total
              ? -1
              : a.orderPaymentSummaryExtraFee.total < b.orderPaymentSummaryExtraFee.total
                ? 1
                : 0
          );
        }
      }
      case 'orderDate': {
        if (sort.direction === 'asc') {
          return [...orders].sort((a, b) =>
            a.orderDateUnix > b.orderDateUnix ? 1 : a.orderDateUnix < b.orderDateUnix ? -1 : 0
          );
        } else {
          return [...orders].sort((a, b) =>
            a.orderDateUnix > b.orderDateUnix ? -1 : a.orderDateUnix < b.orderDateUnix ? 1 : 0
          );
        }
      }
      default: {
        return [...orders];
      }
    }
  } else {
    return [...orders];
  }
};
