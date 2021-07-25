import React from 'react';

class Card extends React.Component{
    state = {
        invis: false
    }
setInvis = () => {
this.setState({invis:true})

}

    render(){return (
        this.state.invis? "":<div> {/*This ternary operator allows the entire card to go away if it is deleted*/}
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
/>
        <div className="card" style={{width: '18rem'}}>
        
        <div className="card-body">
          {/*<img src = {this.props.src} alt = "title" />*/}
          <h5 style={{color: 'black'}}>{this.props.title}</h5>
          <p style={{color: 'black'}}>{this.props.text}</p>
          {/*<a href={this.props.link} target="_blank" className="btn btn-primary">Go somewhere fine</a>*/}
          <button className="btn btn-danger" onClick = {() => {this.props.deleteThis(this);
            this.setInvis()
        }}>Delete</button>
        </div>
      </div>
      </div>
    );
  }}

  export default Card;