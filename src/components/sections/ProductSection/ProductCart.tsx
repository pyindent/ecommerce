"use client";

import { useContext, useState } from "react";
import { FullProductClient } from "../../../types/types";
import Button from "../../buttons/Button";
import { IoIosAddCircle } from "react-icons/io";
import { CartContext } from "../../../contextProviders/cartContextProviders";
import { toast } from "react-hot-toast";
import cn from "../../../helpers/cn";

interface ProductCartProps {
  product: FullProductClient;
}

/**
 * Temporary used only
 * Haven't fully migrated the sizes yet
 */
const DEFAULT_SIZES = ["9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5"];

const ProductCart = ({ product }: ProductCartProps) => {
  const { id, name, image, sizes } = product;
  const [size, setSize] = useState<string | undefined>();

  const { cartItems, setCartItems } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!size) return;
    setCartItems([
      ...cartItems,
      {
        id,
        name,
        image,
        size,
      },
    ]);
    setSize(undefined);
    toast.success("Successfully added to cart!");
  };

  return (
    <div className="pt-3">
      <p className="text-[16px]">Select Size:</p>
      <div className="flex flex-row flex-wrap gap-1 pt-2 pb-5">
        {(sizes.length ? sizes : DEFAULT_SIZES).map((currSize, idx) => (
          <div
            onClick={() => setSize(currSize)}
            key={id + idx}
            className={cn(
              "cursor-pointer border border-zinc-300 hover:border-zinc-800 hover:text-zinc-800 p-2 ease-in duration-75",
              size === currSize && "bg-zinc-800 text-white"
            )}
          >
            US M {currSize}
          </div>
        ))}
      </div>

      <Button
        onClick={() => handleAddToCart()}
        loaderOnClick={false}
        color="primary"
        className="py-2 px-4 mb-5"
        disabled={!size}
      >
        <IoIosAddCircle className="text-xl mr-1" />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCart;