import React from 'react';
import axios from 'axios';
import './App.css';
import Card from "./Card.js";
class App extends React.Component {
  state = {
    title: "",
    body:  "",
    posts: [],
    receivedData:false
  };
  deleteThis = (t) => {
    console.log(t)
    console.log(t.props)
    const data = t.props
    const payload = {
      date: data.date,
      body: data.text,
      title: data.title
    }
    axios.delete("/api/del",{data:payload})
    .then(()=>{
      console.log("delete went through")
      const newPosts = this.state.posts.filter(post => post.date !== data.date)
      this.setState({posts:newPosts})
    })
  }
  componentDidMount = () => {
    this.getPosts();
  }

  handleChange = (event) =>{
    const target = event.target;
    const name   = target.name;
    const value  = target.value;

    this.setState({
      [name]:value
    })
  }
  getPosts = () => {
    axios.get("/api")
    .then((response)=>{
      const {data} = response;
      this.setState({posts:data})
      console.log("Data has been received")
      console.log(this.state)
      this.setState({receivedData:true})
    })
    .catch(()=>{
      console.log("Data has not been received")
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      text: this.state.body
    }
    this.setState({receivedData:false})
    axios({
      url: 'http://localhost:3000/api/save',
      method: 'POST',
      data:payload
    })
    .then(()=>{
      this.setState({receivedData:true})
      console.log("data sent to server")
      this.getPosts()
      this.resetUserInputs()
    })
     
    .catch(()=>{console.log("internal server error")})
  }

  displayPosts = (posts) => {
    if(!posts.length) {
      console.log("no posts to display")
    }

    return posts.slice(0).reverse().map((post,index)=>( // note the parens for map, implicit return
     <Card title={post.title} index = {index} text={post.text} date={post.date} deleteThis = {this.deleteThis}/>
      // reverse might be deleting wrong item
    ))
  }

  resetUserInputs = () => {
    this.setState({title:'',body:''})
  }


  render(){return (
    <div>
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        <p>
          Basic Posting App 
        </p>
        <form onSubmit = {this.handleSubmit}>
          <div className="form-input">
          <input type = "text" 
          name = "title"
          value = {this.state.title}
          onChange = {this.handleChange} 
          placeholder = "Title"
          />

          </div>
          
          <div className="form-input" onSubmit = {this.handleSubmit}>
            <textarea placeholder="Post your text here"
            name="body" cols="30" rows="10" value={this.state.body} onChange={this.handleChange}
            >

            </textarea>

          </div>
        </form>

      <div className="posts">
        {/*this.state.posts.slice(0).reverse().map((post,index)=>(
          <Card title={post.title} index = {index} text={post.text} date={post.date} deleteThis = {this.deleteThis}/>
        ))*/}
      {/*this.state.receivedData ? "Loading..." :*/this.displayPosts(this.state.posts)}
      </div>
        
      </header>
    </div>
    </div>
  );
}
}

export default App;