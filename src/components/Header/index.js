import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector, connect } from 'react-redux';
import api from '../../services/api'
import { Container, Cart } from './styles';
import { FaSearch } from "react-icons/fa"
import logo from '../../assets/images/logo.svg';

function Header({cartSize,pokemonName}) {
  console.log(pokemonName)
  
  
  return (
    <Container>
      <Link to="/">
        <img src= "" alt= "logo" />
      </Link>
      

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
          
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}


export default connect(state=>({
  cartSize:state.cart.length,
  pokemonName:''
}))(Header);