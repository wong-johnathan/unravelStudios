import { FETCH_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT, SET_COUNT } from "constants/actionTypes";
const initialState = {
  count: null,
  products: [
    {
      _id: '1',
      name: "Prada Bag",
      price: 9,
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
    {
      _id: '2',
      name: "Prada Shoe",
      price: 9,
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
    {
      _id: '3',
      name: "Prada Shirt",
      price: 9,
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
    {
      _id: '4',
      name: "Prada Pants",
      price: 9,
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
    {
      _id: '5',
      name: "Nike Pants",
      price: 9,
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
    {
      _id: '6',
      name: "Nike Shoes",
      price: 9,
      description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
    },
  ],
};
const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: actions.payload };
    case CREATE_PRODUCT:
    case FETCH_PRODUCT:
      return { ...state, products: [...state.products, actions.payload] };
    case UPDATE_PRODUCT:
      return { ...state, products: state.products.map((product) => (product._id !== actions.payload._id ? product : actions.payload)) };
    case DELETE_PRODUCT:
      return { ...state, products: state.products.filter((product) => product._id !== actions.payload) };
    case SET_COUNT:
      return { ...state, count: actions.payload };
    default:
      return state;
  }
};

export default reducer;
