'use client'
import { CartProvider } from "@/app/context/cartContext";
import ProductDetailPage from "./components/productDetail";

const MainProductDetail = (
    { params }: { params: { id: string } },
  ) => {
    return (
    <CartProvider>
    <ProductDetailPage params={params}></ProductDetailPage>
    </CartProvider>
    )
}
export default MainProductDetail;