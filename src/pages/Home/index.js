import React, {Component}from 'react';
import {connect} from 'react-redux'
import {MdAddShoppingCart} from 'react-icons/md';
import {formatPrice} from '../../util/format'
import api from '../../services/api';
import { ProductList} from './styles';
import {stock} from '../../services/apiProdutos'
class Home extends Component{
  state = {
    pokemons:[],
    urlImagens:[],
    amount :[]
  };
  
  async componentDidMount(){
    const poks = []
    const url = []
    
    for(let i =1;i<=42;i++){
    const response = await api.get(`pokemon/${i}?limit=42`);
    const urlimagem = `https://pokeres.bastionbot.org/images/pokemon/${i}.png`
    const data = stock.map(stock =>({
      ...stock,
       priceFormatted: formatPrice(stock.price)
     }))  
  
   this.setState({amount: data})
   poks.push(response.data)
   url.push(urlimagem)
   
    
    }
    this.setState({pokemons: poks})
    this.setState({urlImagens: url})
  }
  
  handleAddProduct = (
    pokemon,
    urlImagens,
    amount
  ) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      pokemon,
      urlImagens,
      amount
    })
  }
  render(){
    const {pokemons} = this.state;
    const {urlImagens} = this.state
    const {amount} = this.state
    
    return (
      <ProductList>
         
        {pokemons.map(pokemon => (
          <li key={pokemon.id} >
          <img src={urlImagens[`${pokemon.id-1}`]} alt={pokemon.name}/>
          <strong>{pokemon.name}</strong>
        <span>{amount[`${pokemon.id-1}`].priceFormatted}</span>
          <button type="button" onClick={() => this.handleAddProduct(
            pokemon,
            urlImagens[`${pokemon.id-1}`],
            amount[`${pokemon.id-1}`].priceFormatted
            )}>
            <div>
              <MdAddShoppingCart size={16} color="#fff"/>
            </div>
     
            <span>ADICIONAR AO CARRINHO</span>
          </button>
     
         </li>
        ))}
    
      </ProductList>
      );
  }
  
}

export default connect()(Home);
