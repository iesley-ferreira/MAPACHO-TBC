import React from 'react'
// import { fetchProducts } from '../../services/ProductService'
import products from '../../assets/products.json'
import ProductCard from '../../components/UI/ProductCard'

const Home: React.FC = () => {
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
          <ProductCard productData={product} />
        ))}
      </ul>
    </div>
  )
}

export default Home
