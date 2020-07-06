export function addToCartRequest(id) {
  return {
    
    
  };
}

export function addToCartSuccess(pokemon) {
  return {
    type: 'ADD_TO_CART',
    pokemon,
   
  }
}

export function removeFromCart(id) {
  return {
    type: 'REMOVE_FROM_CART',
    id 
  };
}

export function finalizarCart(id) {
  return {
    type: 'FINALIZAR_CART',
    id ,
    
  };
}

export function updateAmount(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT', id, amount };
}

export function updateAmountSuccess(id, amount) {
  return { type: '@cart/UPDATE_AMOUNT_SUCCESS', id, amount };
}
