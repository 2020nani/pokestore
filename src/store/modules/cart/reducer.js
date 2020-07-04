import produce from 'immer';

export default function cart(state = [], action) {
 
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.pokemon,action.urlImagens,action.amount
    ]
   // (action.urlImagens/*,action.urlImagens,action.amount*/),
  //    (action.amount/*,action.urlImagens,action.amount*/)
    /*  return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }*/
    default:
      return state;
  }
}
