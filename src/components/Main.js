import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Create New Idea</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.Ideaname.value
          const goal = window.web3.utils.toWei(this.Ideagoal.value.toString(), 'Ether')
          const description = this.Ideadescription.value
          this.props.createIdea(name, goal, description)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.Ideaname = input }}
              className="form-control"
              placeholder="Add Idea Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.Ideagoal = input }}
              className="form-control"
              placeholder="Add Idea Goal Amount"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="textarea"
              ref={(input) => { this.Ideadescription = input }}
              className="form-control"
              placeholder="Add Description"
              required />
          </div>
          <ProgressBar now={0} />
          <br></br>
          <button type="submit" className="btn btn-primary">Submit</button>        
        </form>
        <p>&nbsp;</p>
        <h2>Seed Ideas</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Goal</th>
              <th scope="col">Seeder</th>
              <th scope="col">Progress</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="ideaList">
            { this.props.Ideas.map((Idea, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{Idea.id.toString()}</th>
                  <td>{Idea.name}</td>
                  <td>{Idea.description}</td>
                  <td>Rs: {window.web3.utils.fromWei(Idea.goal.toString(), 'Ether')}</td>
                  <td>{Idea.owner}</td>
                  <td><ProgressBar now={50} /></td>
                  <td>
                    { !Idea.seeded
                      ? <button
                          name={Idea.id}
                          goal={Idea.goal}
                          className='btn btn-secondary'
                          onClick={(event) => {
                            this.props.seedIdea(event.target.name, event.target.goal)
                          }}
                        >
                          Seed
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
