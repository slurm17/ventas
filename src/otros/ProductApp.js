import React, { useReducer } from "react";
import ProductReducer, { initialProducts } from "./reducers/productReducer";
import types from "./types";

const ProductApp = () => {
  //2 cosas fundamentales para el reducer
  const [productState, dispatch] = useReducer(ProductReducer, initialProducts);
  const { products, cart, active } = productState;
  return (
    <div>
      <h2>Product</h2> 
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            {prod.title}
            <button
              onClick={() =>
                dispatch({
                  type: types.productShow,
                  payload: prod,
                })
              }
            >
              Show
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: types.productAddToCart,
                  payload: prod,
                })
              }
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      <ul>
        {cart.map((carro) => (
          <li key={carro.id}>
            {carro.title} - quality {carro.quality}
            <button onClick={()=>dispatch({
              type : types.productRemoveFromCart,
              payload : carro.id
            })}>Remover todo</button>
              <button onClick={()=>dispatch({
              type : types.productRemoveOne,
              payload : carro.id
            })}>Remover uno</button>
          </li>
        ))}
      </ul>
      <h2>Preview</h2>
      {active.title}
    </div>
  );
};

export default ProductApp;