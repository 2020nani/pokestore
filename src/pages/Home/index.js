import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format'
import api from '../../services/api';
import stock from '../../services/apiProdutos'
import { ProductList } from './styles';
import * as Cartactions from '../../store/modules/cart/actions'
class Home extends Component {
  state = {
    x:0,
    pokemons: [],
    offset: 0,
    limit: 964
  };
    TakeApi= async () => {
      const {limit,offset} = this.state
      const poks = []
     
      for (let i = 1; i <= limit; i++) {
        const response = await api.get(`pokemon?offset=${parseInt(offset)}&limit=${parseInt(limit)}`);
        console.log(response.data.results[0].name)
       
        poks.push(response.data)
       
      }
      
      const data = poks.map(stock =>({
        ...stock,
         priceFormatted: formatPrice(stock.order),
         
       }))  
  
    
      this.setState({ pokemons: data })
    }
    
  /*async componentDidMount() {
    const {limit} = this.state
    const poks = []
   
    for (let i = 1; i <= this.state.limit; i++) {
      const response = await api.get(`pokemon/${i}?offset=${parseInt(this.state.offset)}&limit=${parseInt(limit)}`);
     
     
      poks.push(response.data)
     
    }
    
    const data = poks.map(stock =>({
      ...stock,
       priceFormatted: formatPrice(stock.order),
       
     }))  

  
    this.setState({ pokemons: data })
    
  }*/
  
  nextPage = ( ) => {
    this.setState({
      limit:40,
      offset:20
      
    })
    console.log(this.state.limit)
  }
 
 
  handleAddProduct = (
    pokemon
    
  ) => {
    const { addToCartSuccess } = this.props;

    addToCartSuccess(pokemon)
  }
  render() {
    //chamando funcao de renderiza api
    this.TakeApi()
    const { pokemons } = this.state;
    const {amount} =this.props
    
    return (
      
      <ProductList>
        
        {pokemons.map(pokemon => (
          
          <li key={pokemon.id} >
            <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            <strong>{pokemon.name}</strong>
            <p>Habilidade:{pokemon.abilities[0].ability.name}</p>
            
            <span>{pokemon.priceFormatted}</span>
            <button type="button" onClick={() => this.handleAddProduct(
             pokemon
              
            )}>
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> 
                {amount[pokemon.id] ||0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>

          </li>
          
        ))}
       <div>
        <button type="button" onClick={() => this.nextPage()
        }>next</button>
       
       </div>

      </ProductList>
      
    );
  }

}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount,pokemon)=>{
     amount[pokemon.id] = pokemon.amount;
     return amount;
  },{})
})

const mapDispatchToProps = dispatch =>
bindActionCreators(Cartactions,dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Home);