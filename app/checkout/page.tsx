"use client";

import Link from "next/link";
import { useUser } from "@/app/context/user";
import { useCart } from "../context/cart";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import UseIsLoading from "../hooks/UseIsLoading";
import UseUserAddress from "../hooks/UseUserAddress";
import ClientOnly from "../(components)/ClientOnly";
import MainLayout from "../layout/MainLayout";
import CheckOutItem from "../(components)/CheckOutItem";

interface AddressDetails {
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

export default function Checkout() {
  const user = useUser();
  const cart = useCart();
  const router = useRouter();

  const stripe = useRef<Stripe | null>(null);
  const elements = useRef<Stripe | null>(null);
  const card = useRef<Stripe | null>(null);
  const clientSecret = useRef<string | null>(null);

  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    name: "",
    address: "",
    zipcode: "",
    city: "",
    country: "",
  });
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);

  useEffect(() => {
    if (cart?.cartTotal() <= 0) {
      toast.error("Your cart is empty!", { autoClose: 3000 });
      return router.push("/");
    }

    UseIsLoading(true);

    const getAdddress = async () => {
      if (user?.id == null || user?.id == undefined) {
        UseIsLoading(false);
        return;
      }

      setIsLoadingAddress(true);
      const response = await UseUserAddress();
      if (response) setAddressDetails(response);
      setIsLoadingAddress(false);
    };

    getAdddress();
    setTimeout(() => stripeInit(), 300);
  }, [user, cart, router]);

  const stripeInit = async () => {
    stripe.current = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PK_KEY || ""
    );

    const response = await fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({ amount: cart.cartTotal() }),
    });
    const result = await response.json();

    clientSecret.current = result.client_secret;
    elements.current = stripe.current.elements();
    var style = {
      base: { fontSize: "18px" },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#EE4B2B",
        iconColor: "#EE4B2B",
      },
    };
    card.current = elements.current.create("card", {
      hidePostalCode: true,
      style: style,
    });

    card.current.mount("#card-element");
    card.current.on("change", function (event) {
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error
        ? event.error.message
        : "";
    });

    UseIsLoading(false);
  };

  const pay = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.entries(addressDetails).length === 0) {
      showError("Please add a shipping address!");
      return;
    }

    let result: PaymentItem | { error: { message: string } } =
      await stripe.current.confirmCardPayment(clientSecret.current, {
        payment_method: { card: card.current },
      });

    if ("error" in result) {
      showError(result.error.message);
    } else {
      UseIsLoading(true);

      try {
        let response = await fetch("/api/orders/create", {
          method: "POST",
          body: JSON.stringify({
            stripe_id: result.paymentIntent.id,
            name: addressDetails.name,
            address: addressDetails.address,
            zipcode: addressDetails.zipcode,
            city: addressDetails.city,
            country: addressDetails.country,
            products: cart.getCart(),
            total: cart.cartTotal(),
          }),
        });

        if (response.status == 200) {
          toast.success("Order Complete!", { autoClose: 3000 });
          cart.clearCart();
          return router.push("/success");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong?", { autoClose: 3000 });
      }

      UseIsLoading(false);
    }
  };

  const showError = (errorMsgText: string) => {
    let errorMsg = document.querySelector("#card-error");
    toast.error(errorMsgText, { autoClose: 3000 });
    if (errorMsg) {
      errorMsg.textContent = errorMsgText;
      setTimeout(() => {
        if (errorMsg) errorMsg.textContent = "";
      }, 3000);
    }
  };

  return (
    <>
      <MainLayout>
        <div id="CheckoutPage" className="mt-4 max-w-[1100px] mx-auto">
          <div className="text-2xl font-bold mt-4 mb-4">Checkout</div>
          <div className="relative flex items-baseline gap-4 justify-between mx-auto w-full">
            <div className="w-[65%]">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-xl font-semibold mb-2">
                  Shipping Address
                </div>
                <div>
                  {!isLoadingAddress ? (
                    <>
                      <Link
                        href="/address"
                        className="text-blue-500 text-sm underline"
                      >
                        {addressDetails.name ? "Update Address" : "Add Address"}
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                  {!isLoadingAddress && addressDetails.name ? (
                    <>
                      <ul className="text-sm mt-2">
                        <li>Name: {addressDetails.name}</li>
                        <li>Address: {addressDetails.address}</li>
                        <li>Zip: {addressDetails.zipcode}</li>
                        <li>City: {addressDetails.city}</li>
                        <li>Country: {addressDetails.country}</li>
                      </ul>
                    </>
                  ) : (
                    <></>
                  )}
                  {isLoadingAddress ? (
                    <div className="flex items-center mt-1 gap-2">
                      <AiOutlineLoading3Quarters className="animate-spin" />
                      Getting Address...
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <ClientOnly>
                <div id="Items" className="bg-white rounded-lg mt-4">
                  {cart.getCart().map((product) => (
                    <CheckOutItem key={product.id} product={product} />
                  ))}
                </div>
              </ClientOnly>
            </div>
            <div
              id="PlaceOrder"
              className="relative -top-[6px] w-[35%] border rounded-lg"
            >
              <ClientOnly>
                <div className="p-4">
                  <div className="flex items-baseline justify-between text-sm mb-1">
                    <div>Items ({cart.getCart().length})</div>
                    <div>£{(cart.cartTotal() / 100).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div>Shipping:</div>
                    <div>Free</div>
                  </div>
                  <div className="border-t" />
                  <div className="flex items-center justify-between my-4">
                    <div className="font-semibold">Order total</div>
                    <div className="text-2xl font-semibold">
                      ${(cart.cartTotal() / 100).toFixed(2)}
                    </div>
                  </div>
                  <form onSubmit={pay}>
                    <div
                      className="border border-gray-500 p-2 rounded-sm"
                      id="card-element"
                    />
                    <p
                      id="card-error"
                      role="alert"
                      className="text-red-700 text-center font-semibold relative top-2"
                    />
                    <button
                      type="submit"
                      className="mt-4 bg-blue-600 text-lg w-full text-white font-semibold p-3 rounded-full"
                    >
                      <div>Confirm and pay</div>
                    </button>
                  </form>
                </div>
              </ClientOnly>
              <div className="flex items-center p-4 justify-center gap-2 border-t">
                <img width={50} src="/images/logo.svg" alt="Logo" />
                <div className="font-light mb-2 mt-2">MONEY BACK GUARANTEE</div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
