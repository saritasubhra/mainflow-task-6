import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useProduct } from "../contexts/ProductContext";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

function Category() {
  const { category } = useParams();
  const { products, setProducts } = useProduct();
  useEffect(() => {
    async function fetchProductByCategory() {
      try {
        const res = await axios.get(`/products?category=${category}`);
        setProducts(res.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchProductByCategory();
  }, [category]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          )}

          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Category;
