import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Loader from "./components/Loader";

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
}
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    axios("https://fakestoreapi.com/products")
      .then(({ data }: { data: Product[] }) => {
        setProducts(
          data.map(({ id, title, image, category, price }) => ({
            id,
            title,
            image,
            category,
            price,
          }))
        );
      })
      .catch((err) => setErrorMessage(err))
      .finally(() => setLoading(false));

    return () => {
      setProducts([]);
    };
  }, []);

  // show loader once page component loads
  // Hide loader once axios is no more fetching
  // show "No result" if nothing comes back    if i off my data
  // Show "Error occured" if error occurs   condition
  // Else Show products

  return (
    <main>
      <h1>Product Store</h1>
      <div className="products">
        {errorMessage && "Error occured"}
        {loading ? (
          <Loader />
        ) : !loading && !errorMessage && products.length < 1 ? (
          "No result"
        ) : (
          products.map(({ id, title, image, category, price }) => (
            <div className="product" key={id}>
              <img src={image} />
              <p>{title}</p>
              <h1>${price}</h1>
              <sub>{category}</sub>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default App;
