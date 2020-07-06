import React, { Component } from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format'
import api from '../../services/api';
import pok from '../../assets/images/pokebola-aberta.png'
import stock from '../../services/apiProdutos'
import { ProductList } from './styles';
import * as Cartactions from '../../store/modules/cart/actions'
class Home extends Component {
  state = {
    pokemons: [],
    current:1,
    currentFinal:20
  };
    TakeApi= async () => {
      const {current,currentFinal} = this.state
       
      const poks = []
     
      for (let i=current ; i <= currentFinal; i++) {
        const response =await api.get(`pokemon/${i}`)///?${parseInt(offset)}=0&limit=${parseInt(limit)}`);
        
        
        poks.push(response.data)
       
     }
      
      const data = poks.map(stock =>({
        ...stock,
         priceFormatted: formatPrice(stock.order),
         
       }))  
       
    console.log(data)
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
  Page1 = ( ) => {
    this.TakeApi()
    this.setState({
      currentFinal:20,
      current:1    
    })
  }
  Page2 = ( ) => {
    this.TakeApi()
    this.setState({
      currentFinal:40,
      current:21     
    })
  }
  Page3 = ( ) => {
    this.TakeApi()
    this.setState({
      currentFinal:60,
      current:41    
    })
    console.log(this.state.limit)
  }
  Page4 = ( ) => {
    this.TakeApi()
    this.setState({
      currentFinal:80,
      current:61     
    })
  }
  Page5 = ( ) => {
    this.TakeApi()
    this.setState({
      currentFinal:100,
      current:81     
    })
  }
  Page6 = ( ) => {
    
    this.setState({
      currentFinal:120,
      current:101     
    })
    this.TakeApi()
  }
  Page7 = ( ) => {
    
    this.setState({
      currentFinal:140,
      current:121     
    })
    this.TakeApi()
  }
  Page8 = ( ) => {
    this.TakeApi()
    this.setState({
      currentFinal:160,
      current:141     
    })
  }
 
 
  handleAddProduct = (
    pokemon
    
  ) => {
    const { addToCartSuccess } = this.props;

    addToCartSuccess(pokemon)
  }
  render() {
    //chamando funcao de renderiza api
    const { pokemons } = this.state;
    const {amount} =this.props
    
    return (
      
      <ProductList>
        <div>
          <p>Jogue sua pokebola</p>
         <button type="button"  onClick={()=>this.TakeApi()}><img src={pok} width="20%" alt="pok"/></button>  
        </div>
        
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
        <button type="button" onClick={() => this.Page1()
        }>pag1</button>
        <button type="button" onClick={() => this.Page2()
        }>pag2</button>
        <button type="button" onClick={() => this.Page3()
        }>pag3</button>
        <button type="button" onClick={() => this.Page4()
        }>pag4</button>
        <button type="button" onClick={() => this.Page5()
        }>pag5</button>
        <button type="button" onClick={() => this.Page6()
        }>pag6</button>
        <button type="button" onClick={() => this.Page7()
        }>pag7</button>
        <button type="button" onClick={() => this.Page8()
        }>pag8</button>
        
       
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