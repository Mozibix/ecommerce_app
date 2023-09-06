"use client";

import React from "react";
import SimilarProducts from "@/app/(components)/SimilarProducts";
import MainLayout from "@/app/layout/MainLayout";
import { useCart } from "@/app/context/cart";
import { toast } from "react-toastify";

interface Product {
  id: number;
  title: string;
  description: string;
  url: string;
  price: number;
}

interface ProductProps {
  param: any;
}

export default function Product({ param }: ProductProps) {
  const cart = useCart();

  const product: Product = {
    id: 1,
    title: "Brown Leather bag",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet sequi totam quod! onsectetur adipisicing elit. Amet sequi totam quod!",
    url: "https://picsum.photos/id/7",
    price: 2500,
  };

  return (
    <>
      <MainLayout>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex px-4 py-10">
            {product?.url ? (
              <img
                className="w-[40%] rounded-lg"
                src={product?.url + "/280"}
                alt={product?.title}
              />
            ) : (
              <div className="w-[40%]"></div>
            )}

            <div className="px-4 w-full">
              <div className="font-bold text-xl">{product?.title}</div>
              <div className="text-sm text-gray-700 pt-2">
                Brand New - Full Warranty
              </div>

              <div className="border-b py-1" />

              <div className="pt-3 pb-2">
                <div className="flex items-center">
                  Condition:{" "}
                  <span className="font-bold text-[17px] ml-2">New</span>
                </div>
              </div>

              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center">
                    Price:
                    {product?.price ? (
                      <div className="font-bold text-[20px] ml-2">
                        GBP ${(product?.price / 100).toFixed(2)}
                      </div>
                    ) : null}
                  </div>
                  <button
                    onClick={() => {
                      if (cart.isItemAdded) {
                        cart.removeFromCart(product);
                        toast.info("Removed from cart", { autoClose: 3000 });
                      } else {
                        cart.addToCart(product);
                        toast.success("Added to cart", { autoClose: 3000 });
                      }
                    }}
                    className={`
                      text-white py-2 px-20 rounded-full cursor-pointer 
                      ${
                        cart.isItemAdded
                          ? "bg-[#e9a321] hover:bg-[#bf851a]"
                          : "bg-[#3498C9] hover:bg-[#0054A0]"
                      }
                    `}
                  >
                    {cart.isItemAdded ? "Remove From Cart" : "Add To Cart"}
                  </button>
                </div>
              </div>

              <div className="border-b py-1" />

              <div className="pt-3">
                <div className="font-semibold pb-1">Description:</div>
                <div className="text-sm">{product?.description}</div>
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts />
      </MainLayout>
    </>
  );
}
