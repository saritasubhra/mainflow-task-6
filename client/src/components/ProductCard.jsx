import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { setCart } = useCart();
  async function handleAddToCart() {
    try {
      const res = await axios.post("/cart", { productId: product._id });
      toast.success(res.data.message);
      setCart(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="flex w-full relative flex-col overflow-hidden border border-black shadow-lg">
      <div className="relative  flex h-60 overflow-hidden">
        <img
          className="object-cover w-full z-10"
          src={product.image}
          alt={product.prodname}
        />
      </div>

      <div className="p-4 flex flex-col gap-4 justify-center items-center">
        <p className="font-semibold uppercase text-sm">{product.prodname}</p>
        <p className="text-2xl font-bold ">${product.price}</p>

        <button
          className="w-full flex items-center justify-center rounded-lg bg-yellow-400 py-2 text-center text-sm font-medium
           hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 duration-200"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
