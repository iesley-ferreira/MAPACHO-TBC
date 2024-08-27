import React from 'react';
import { IOrder } from '../../../../interfaces/User';
import { priceFormatter } from '../../../../utils/priceFormatter';

type OrderRowProps = {
  order: IOrder;
  toggleOrderExpansion: (orderId: string) => void;
  expandedOrders: { [key: string]: boolean };
};

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  toggleOrderExpansion,
  expandedOrders,
}) => {
  return (
    <>
      <tr className="">
        <td className="p-0 w-1/5">
          <div className="flex items-center px-9 h-20 bg-blueGray-50 border-l border-t border-b border-gray-100 rounded-tl-5xl">
            <span className="text-lg font-heading font-medium">#{order.id}</span>
          </div>
        </td>
        <td className="p-0 w-1/5">
          <div className="flex items-center px-9 h-20 bg-blueGray-50 border-l border-t border-b border-gray-100 rounded-tl-5xl">
            <span className="text-lg font-heading font-medium">{order.created_at}</span>
          </div>
        </td>
        <td className="p-0 w-1/5">
          <div className="flex items-center px-9 h-20 bg-blueGray-50 border-l border-t border-b border-gray-100 rounded-tl-5xl">
            <span className="py-1 px-3 text-sm text-green-700 font-heading font-medium bg-green-200 rounded-full">
              {order.status}
            </span>
          </div>
        </td>
        <td className="p-0 w-1/5">
          <div className="flex items-center px-9 h-20 bg-blueGray-50 border-l border-t border-b border-gray-100 rounded-tl-5xl">
            <span className="text-lg font-heading font-medium">
              {priceFormatter.format(order.total)}
            </span>
          </div>
        </td>
        {/* Add other cells similar to the above format */}
        <td className="p-0 w-1/5">
          <div className="flex items-center justify-center p-5 h-20 text-center bg-blueGray-50 border-t border-b border-r border-gray-100 rounded-tr-5xl rounded-br-5xl">
            <button onClick={() => toggleOrderExpansion(order.id.toString())}>
              {expandedOrders[order.id] ? (
                <i className="ri-arrow-up-s-fill text-2xl"></i>
              ) : (
                <i className="ri-arrow-down-s-fill text-2xl"></i>
              )}
            </button>
          </div>
        </td>
      </tr>
      {expandedOrders[order.id] && (
        <tr>
          <td colSpan={5} className="p-0">
            <div className="bg-gray-100 p-3 md:p-5">
              {/* Add expanded content here */}
              {order.products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-row md:items-center md:justify-between mb-4 gap-3 border-b-2 border-dotted"
                >
                  {/* Product details */}
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default OrderRow;
