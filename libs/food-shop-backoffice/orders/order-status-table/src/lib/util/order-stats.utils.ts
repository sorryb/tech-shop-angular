import { Order, OrderStatus } from '@food-shop-architecture-workshop/core/model';
import { StatsRow } from '@food-shop-architecture-workshop/food-shop-backoffice/orders/stats';
import { roundTo2Decimals } from '@food-shop-architecture-workshop/food-shop/cart/cart-utility';

export const getAllOrdersStats = (orders: Order[]): StatsRow => {
  const allExceptCanceled = orders.filter((ord) => ord.orderStatus !== OrderStatus.ORDER_CANCELED);
  return {
    statsTitle: `All orders (${allExceptCanceled.length})`,
    fromStats: getNumberOfOrderedProducts(allExceptCanceled).toFixed(0),
    toStats: 'products',
    rightSummary: {
      data: getTotalPriceOfOrderedProducts(allExceptCanceled),
      dataSuffix: '$'
    }
  };
};

export const getDeliveredOrdersStats = (orders: Order[]): StatsRow => {
  const deliveredOrders = orders.filter((ord) => ord.orderStatus === OrderStatus.ORDER_DELIVERED);
  return {
    statsTitle: `Delivered orders (${deliveredOrders.length})`,
    fromStats: getNumberOfOrderedProducts(deliveredOrders).toFixed(0),
    toStats: 'products',
    rightSummary: {
      data: getTotalPriceOfOrderedProducts(deliveredOrders),
      dataSuffix: '$'
    }
  };
};
export const getCanceledOrdersStats = (orders: Order[]): StatsRow => {
  const cancledOrders = orders.filter((ord) => ord.orderStatus === OrderStatus.ORDER_CANCELED);
  return {
    statsTitle: `Canceled orders (${cancledOrders.length})`,
    fromStats: getNumberOfOrderedProducts(cancledOrders).toFixed(0),
    toStats: 'products',
    rightSummary: {
      data: -getTotalPriceOfOrderedProducts(cancledOrders),
      dataSuffix: '$'
    }
  };
};

export const getNewOrdersStats = (orders: Order[]): StatsRow => {
  const newOrders = orders.filter(
    (ord) => ord.orderStatus === OrderStatus.ORDER_NEW
  );
  return {
    statsTitle: `New orders (${newOrders.length})`,
    fromStats: getNumberOfOrderedProducts(newOrders).toFixed(0),
    toStats: 'products',
    rightSummary: {
      data: getTotalPriceOfOrderedProducts(newOrders),
      dataSuffix: '$'
    }
  };
};

export const getAcceptedOrdersStats = (orders: Order[]): StatsRow => {
  const acceptedOrders = orders.filter(
    (ord) => ord.orderStatus === OrderStatus.ORDER_ACCEPTED
  );
  return {
    statsTitle: `Accepted orders (${acceptedOrders.length})`,
    fromStats: getNumberOfOrderedProducts(acceptedOrders).toFixed(0),
    toStats: 'products',
    rightSummary: {
      data: getTotalPriceOfOrderedProducts(acceptedOrders),
      dataSuffix: '$'
    }
  };
};

export const getProcessingOrdersStats = (orders: Order[]): StatsRow => {
  const processingOrders = orders.filter(
    (ord) => ord.orderStatus === OrderStatus.ORDER_PROCESSING
  );
  return {
    statsTitle: `Processing orders (${processingOrders.length})`,
    fromStats: getNumberOfOrderedProducts(processingOrders).toFixed(0),
    toStats: 'products',
    rightSummary: {
      data: getTotalPriceOfOrderedProducts(processingOrders),
      dataSuffix: '$'
    }
  };
};

export const getNumberOfOrderedProducts = (orders: Order[]) => {
  return orders.length === 0
    ? 0
    : orders
      .map((ord) =>
        ord.orderedProducts.map((v) => v.quantity).reduce((q1, q2) => q1 + q2)
      )
      .reduce((o1, o2) => o1 + o2);
};

export const getTotalPriceOfOrderedProducts = (orders: Order[]) => {
  return orders.length === 0
    ? 0
    : roundTo2Decimals(
      orders
        .map((ord) => ord.orderPaymentSummaryExtraFee.total)
        .reduce((o1, o2) => o1 + o2)
    );
};

export const getAllDeliveredCanceledOrdersStats = (orders: Order[]): Array<StatsRow> => {
  return [
    getAllOrdersStats(orders),
    getDeliveredOrdersStats(orders),
    getCanceledOrdersStats(orders)
  ];
};

export const getNewProcessingAcceptedOrdersStats = (orders: Order[]): Array<StatsRow> => {
  return [
    getNewOrdersStats(orders),
    getProcessingOrdersStats(orders),
    getAcceptedOrdersStats(orders)
  ];
};
