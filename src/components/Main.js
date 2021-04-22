import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'buy',
      items: [],
      isLoaded: false,
      last30days: []
    }
  }


  // Stores the call to the component
  componentDidMount(){
    //get the prices
    fetch('https://api.nomics.com/v1/prices?key=18a2f6f33809e2e1ff88718af33a436f')
      .then(res => res.json())
      .then(json =>{
        this.setState({
          isLoaded: true,
          items: json,
        })
    });



  }

  render() {

    var { isLoaded, items, last30days} = this.state
    let bitCoin, ether, bat
    if(!isLoaded){
      return <div>data is returning</div>
    }
    else{
      console.log(last30days)
      for (let i = 0; i < items.length; i++) {
        if(items[i].currency === "BTC"){
          bitCoin = items[i].price
        }
        else if(items[i].currency === "ETH"){
          ether = items[i].price
        }
        else if(items[i].currency === "BAT"){
          bat = items[i].price
        }
        
      }
      console.log(`${bitCoin} ${ether} ${bat}`)
    }


    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
      />
    } else {
      content = <SellForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        sellTokens={this.props.sellTokens}
      />
    }

    return (
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'buy' })
              }}
            >
            Buy
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'sell' })
              }}
            >
            Sell
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}

          </div>
        </div>

        <div className="tokenPrices">

           <span> <button>BitCoin</button>   {bitCoin}</span> 
           <br></br>
           <span> <button>Ether</button>    {ether}</span> 
           <br></br>
           <span> <button>BAT</button>    {bat}</span> 

        </div>

      </div>
    );
  }
}

export default Main;
