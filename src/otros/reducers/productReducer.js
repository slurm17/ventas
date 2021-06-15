import types from "../types";

const initialProducts = { 
  products: [
    { id: 1, title: "product 1" },
    { id: 2, title: "product 2" },
  ],
  cart: [{ id: 1, title: "product 1", quality: 1 }],
  active: { id: 2, title: "product 2" },
};

const ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case types.productShow:
      return {
        ...state,
        active: payload,
      };
    case types.productAddToCart: {
      const hayProductos = state.cart.find((carro) => carro.id === payload.id);
      return hayProductos
        ? {
            ...state,
            cart: state.cart.map((carro) =>
              carro.id === payload.id
                ? { ...carro, quality: carro.quality + 1 }
                : carro
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...payload, quality: 1 }],
          };
    }
    case types.productRemoveFromCart:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== payload),
      };
    case types.productRemoveOne:
      const hayMasDeUno = state.cart.find(
        (carro) => carro.quality > 1 && carro.id == payload
      );
      // console.log(hayMasDeUno);
      return hayMasDeUno
        ? {
            ...state,
            cart: state.cart.map((carro) =>
              carro.id === payload
                ? { ...carro, quality: carro.quality - 1 }
                : carro
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((prod) => prod.id !== payload),
          };

    default:
      return state;
  }
};

export { initialProducts };
export default ProductReducer;
