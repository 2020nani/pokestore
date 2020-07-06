import React from 'react';
import {connect} from 'react-redux'
import * as Cartactions from '../../store/modules/cart/actions'
import {MdRemoveCircleOutline,MdAddCircleOutline,MdDelete} from 'react-icons/md'
import { Container,ProductTable,Total} from './styles';
import {bindActionCreators} from 'redux'
import {formatPrice} from '../../util/format'

function Cart({ cart,total,limparCarrinho, finalizarCart, removeFromCart, updateAmount})  {
  
   
   
   function increment(pokemon){
    updateAmount(pokemon.id, pokemon.amount + 1)
   }

   function decrement(pokemon){
    updateAmount(pokemon.id, pokemon.amount - 1)
   }
  
  return (
  <Container>
    <ProductTable>
    <thead>
     <tr>
       <th />
       <th>PRODUTO</th>
       <th>QTD</th>
       <th>SUBTOTAL</th>
     </tr>
    </thead>
    <tbody>
      
      {cart.map(pokemon =>(
        
        <tr>
        <td>
          <img src= {pokemon.sprites.front_shiny} alt={pokemon.name}/>
        </td>
        <td>
          <strong>{pokemon.name}</strong>
      <span>{pokemon.priceFormatted}</span>
        </td>
        <td>
         <button type="button" onClick={()=> decrement(pokemon)}>
           <MdRemoveCircleOutline size={20} color='#7159c1' />
         </button>
         <input type="number" readOnly value={pokemon.amount}/>
         <button type="button" onClick={()=> increment(pokemon)}>
           <MdAddCircleOutline size={20} color='#7159c1' />
         </button>
        </td>
        <td>
      <strong>{pokemon.subtotal}</strong>
        </td>
        <td>
          <button type="button" onClick={()=>removeFromCart(pokemon.id)}>
            <MdDelete size={20} color="#7159c1"/>
          </button>
        </td>
      </tr>
      ))}
    </tbody>
    </ProductTable>
    
    <footer>
    
     <button type="button" onClick={()=>finalizarCart(limparCarrinho.length)}>Finalizar pedido</button>
      
      <Total>
        <span>TOTAL</span>
      <strong>{total}</strong>
      </Total>
      
     
    </footer>
    
  </Container>
  );
}
const mapStateToProps = state => ({
cart:state.cart.map(pokemon =>({
  ...pokemon,
  //add variavel state pokemon
  
  subtotal: formatPrice(pokemon.order *pokemon.amount),
})),
limparCarrinho:state.cart.map (pokemon =>({
  ...pokemon,
   limparCarrinho: [pokemon.id]
})),

total:formatPrice(state.cart.reduce((total, pokemon) =>{
  return total + pokemon.order * pokemon.amount;
}, 0)),
});
const mapDispatchToProps = dispatch =>
bindActionCreators(Cartactions,dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Cart)