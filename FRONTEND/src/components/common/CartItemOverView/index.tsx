import { priceFormatter } from '../../../utils/priceFormatter';

const CartItemOverView: React.FC<{ item: any }> = ({ item }) => (
  <div key={item.id} className="py-2.5 border-b border-dashed">
    <div className="flex flex-wrap items-center -m-2">
      <div className="w-auto p-2">
        <img
          className="w-24 h-24 object-cover rounded-lg"
          src={item.imagemURL || '/public/assets/noImageAvailable.png'}
          alt={item.nome}
        />
      </div>
      <div className="flex-1 p-2">
        <p className="mb-3">{item.nome}</p>
        <div className="flex justify-between items-center">
          <p>x {item.quantidade}</p>
          <p className="font-semibold pr-4">{priceFormatter.format(item.preco)}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CartItemOverView;
