import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <ProductCard product={{
          image: "/dinosaur.jpg",
          name: "lottery ，if you have approved, do not approve again",
          price: 100
        }} 
      />
    </>
  )
}
