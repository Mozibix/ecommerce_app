import CarouselComp from "./(components)/CarouselComps";
import Product from "./(components)/Products";
import MainLayout from "./layout/MainLayout";

const Home = () => {
  const products = [
    {
      id: 1,
      title: "Brown Leather bag",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi totam quod! onsectetur adipisicing elit. Amet sequi totam quod!",
      url: "https://picsum.photos/id/7",
      price: 2500,
    },
    {
      id: 2,
      title: "school books",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi totam quod! onsectetur adipisicing elit. Amet sequi totam quod!",
      url: "https://picsum.photos/id/20",
      price: 2500,
    },
  ];

  return (
    <MainLayout>
      <CarouselComp />

      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>

        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
