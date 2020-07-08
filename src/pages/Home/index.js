import React, { Component,PureComponent } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format'

import api from '../../services/api';
import { ProductList,Container } from './styles';
import * as Cartactions from '../../store/modules/cart/actions'
class Home extends PureComponent {
  state = {
    pokemons: [],
    offset: 1,
    limit : 300
  };
  async componentDidMount() {
    await this.takeApi()
    
   }
  async takeApi() {
  //async componentDidMount() { 
   const {offset,limit} = this.state
       
      const poks = []
     
      for (let i=offset; i <=limit; i++) {
        const response =await api.get(`pokemon/${i}`);
        
        
        poks.push(response.data)
       
     }
      
      const data = poks.map(stock =>({
        ...stock,
         priceFormatted: formatPrice(stock.order),
         
       }))  
       
    console.log(data)
      this.setState({ pokemons: data })
      
    }
   
  /*next=()=>{
    const {offset,limit} = this.state
  if(offset<=2&&limit<=21){
    this.setState({
      offset: offset+20,
      limit: limit+20
    })
  }
  }*/
 
 
  handleAddProduct = (
    pokemon
    
  ) => {
    const { addToCartSuccess } = this.props;

    addToCartSuccess(pokemon)
  }
  
   next= ()=>{
    const {offset,limit} = this.state
  if(offset<=2&&limit<=21){
    this.setState({
      
      limit: 600
    })
  }
   this.takeApi()
  }
  
  render() {
    //chamando funcao de renderiza 
    
    const { pokemons } = this.state;
    const {amount} =this.props
    
    return (
      <Container>
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
      </ProductList>
      </Container>
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