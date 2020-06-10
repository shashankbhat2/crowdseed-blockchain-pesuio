import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Crowdseed from '../abis/Crowdseed.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Crowdseed.networks[networkId]
    if(networkData) {
      const crowdseed = web3.eth.Contract(Crowdseed.abi, networkData.address)
      this.setState({ crowdseed })
      const ideaCount = await crowdseed.methods.ideaCount().call()
      this.setState({ ideaCount })
      // Load products
      for (var i = 1; i <= ideaCount; i++) {
        const Idea = await crowdseed.methods.Ideas(i).call()
        this.setState({
          Ideas: [...this.state.Ideas, Idea]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Crowdseed contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      ideaCount: 0,
      Ideas: [],
      loading: true
    }

    this.createIdea = this.createIdea.bind(this)
    this.seedIdea = this.seedIdea.bind(this)
  }

  createIdea(name, goal, description) {
    this.setState({ loading: true })
    this.state.crowdseed.methods.createIdea(name, goal, description).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  seedIdea(id, goal) {
    this.setState({ loading: true })
    this.state.crowdseed.methods.seedIdea(id).send({ from: this.state.account, value: goal })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
     <Navbar account={this.state.account} createIdea={this.createIdea}  /> 
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main 
                Ideas={this.state.Ideas}
                createIdea={this.createIdea}
                seedIdea={this.seedIdea}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
