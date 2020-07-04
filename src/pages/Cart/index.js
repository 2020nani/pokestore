import React from 'react';
import {connect} from 'react-redux'
import {MdRemoveCircleOutline,MdAddCircleOutline,MdDelete} from 'react-icons/md'
import { Container,ProductTable,Total} from './styles';

function Cart({cart})  {
  
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
        console.log(pokemon),
        <tr>
        <td>
          <img src="" alt="pok"/>
        </td>
        <td>
          <strong>{pokemon.name}</strong>
          <span>999</span>
        </td>
        <td>
         <button type="button">
           <MdRemoveCircleOutline size={20} color='#7159c1' />
         </button>
         <input type="number" readOnly value={1}/>
         <button type="button">
           <MdAddCircleOutline size={20} color='#7159c1' />
         </button>
        </td>
        <td>
          <strong>66564</strong>
        </td>
        <td>
          <button type="button">
            <MdDelete size={20} color="#7159c1"/>
          </button>
        </td>
      </tr>
      ))}
    </tbody>
    </ProductTable>
    <footer>
      <button type="button">Finalizar pedido</button>
      <Total>
        <span>TOTAL</span>
        <strong>456</strong>
      </Total>
    </footer>
  </Container>
  );
}
const mapStateToProps = state => ({
cart:state.cart,
});

export default connect(mapStateToProps)(Cart)