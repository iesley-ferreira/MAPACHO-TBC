import React from 'react'
// import { fetchProducts } from '../../services/ProductService'
import products from '../../assets/products.json'

const Products: React.FC = () => {
  // const [products, setProducts] = useState<IProduct[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     try {
  //       const productsData = await fetchProducts()
  //       setProducts(productsData)
  //       setLoading(false)
  //     } catch (error) {
  //       console.error('Error fetching products:', error)
  //       setError('Failed to fetch products')
  //     }
  //   }

  //   loadProducts()
  // }, [])

  // if (loading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto mt-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="max-w-sm rounded overflow-hidden shadow-lg grid grid-rows-[auto_1fr_auto] h-96 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={product.imageUrl}
              alt={product.nome}
              className="w-full px-6 py-6 h-48 object-cover"
            />
            <div className="px-6 py-4">
              <div className="font-semibold text-xl text-gray-800">
                {product.nome}
              </div>
              <div className="text-md text-gray-600 mt-2">
                R${product.preco}
              </div>
            </div>
            <div className="px-6 py-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products
