import { PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../lib/axios";

import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProduct } from "../contexts/ProductContext";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
];

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const { setProducts } = useProduct();
  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await axios.get("/products");
        setProducts(res.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getAllProducts();
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8  text-center">
          Admin Dashboard
        </h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-yellow-400 "
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductsList />}
      </div>
    </div>
  );
}

export default AdminDashboard;
