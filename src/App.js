import './App.css';
import { Component } from 'react';

class App extends Component {

  state={
    img:"",
    name:"",
    bio:""
  }

eventsubmitted=(event)=>{
event.preventDefault()
this.postapirequest()
}

postapirequest= async()=>{
  const url="https://apitesting-qcys.onrender.com/api/items"
  const {img,name,bio}=this.state
  const options={
    method:'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body:JSON.stringify({img,name,bio})
  }
  const data= await fetch(url,options)
  const response= await data.json()
  console.log(response)
}

inpchanged=(event)=>{
  this.setState({img:event.target.value})
}
namechanged=(event)=>{
  this.setState({name:event.target.value})
}
biochanged=(event)=>{
  this.setState({bio:event.target.value})
}

  render() {
    return (
      <div className="app-container">
        <h1 className="form-title">Make An API Request</h1>
        <form className="form-container" onSubmit={this.eventsubmitted}>
          <label htmlFor="imgUrl">Image URL</label>
          <input id="imgUrl" type="text" placeholder="Enter image URL" onChange={this.inpchanged}/>

          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Enter name" onChange={this.namechanged}/>

          <label htmlFor="desc">Description</label>
          <input id="desc" type="text" placeholder="Enter description" onChange={this.biochanged}/>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
