import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './CSS/Home.css'
import Hero from '../Components/Hero.jsx'
import Products from '../Components/Products.jsx'
import Footer from '../Components/Footer.jsx'
import ProductCard from '../Components/ProductCard.jsx'
import ProductSkelton from '../Components/ProductSkelton.jsx'
const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([]);



  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    fetch('/Products/products-category.json')
      .then((res) => res.json())
      .then((data) => { setCategory(data) })
    fetch('/Products/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // const grouped = data.reduce((acc, product) => {
        //   acc[product.category] = acc[product.category] || [];
        //   acc[product.category].push(product);
        //   return acc;
        // }, {});
        // setGroupedProducts(grouped);
      });
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, [])

  useEffect(() => {
    if (search.trim() === "") { setFilteredProducts([]); return; }
    const filtered = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredProducts(filtered);
  }, [search, products]);
  return (
    <>
      <Header search={search} setSearch={setSearch} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      {!isSearchOpen && (
        <>
          <Hero />
          <Products category={category} products={products} groupedProducts={groupedProducts} setGroupedProducts={setGroupedProducts} loading={loading} />
          <Footer />

        </>
      )}


      {/* for Searcing */}
      {isSearchOpen && search !== "" && (
        <>
          <div className="search-page">
            {filteredProducts.length === 0 ?
              <h3>No Item Found</h3>
              :
              filteredProducts.map((item) =>
                <div className="search-card">
                  {loading ? Array(6).fill().map((_, i) => <ProductSkelton key={i} />) :
                    <ProductCard key={item._id} product={item} />
                  }
                </div>
              )
            }
          </div>
        </>
      )}
    </>
  )
}

export default Home