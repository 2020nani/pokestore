import produce from 'immer';

export default function cart(state = [],action) {
 
  switch (action.type) {
    case 'ADD_TO_CART':
     return produce(state, draft => {
        const pokIndex  = draft.findIndex(p => p.id === action.pokemon.id);
          if(pokIndex >=0){
            draft[pokIndex].amount += 1;
          }else{
            draft.push({
              ...action.pokemon,
               amount:1
            })
          }

      });

    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const pokIndex = draft.findIndex(p => p.id === action.id);
        if (pokIndex >= 0) {
          draft.splice(pokIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT': {
      if(action.amount<=0){
        return state
      }
      return produce(state, draft => {
        const pokIndex = draft.findIndex(p => p.id === action.id);
        if (pokIndex >= 0) {
          draft[pokIndex].amount = Number(action.amount);
        }
      });
    }
    default:
    return state;
  }
}
