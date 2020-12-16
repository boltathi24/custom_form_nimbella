
import React, { Component } from "react";
import axios from 'axios';
import t from '../t.gif';
import logo from '../logo.png';
class Custom extends Component {
   
  componentDidMount() {
    document.title = '⚡ Bolt Electrics ⚡';
  }
      state = {
        name: null,
        email: null,
        message: null,
        error:null,
        buttonstate:false,
        submissionResponse:null
      };
      constructor(props) {
        super(props);
        this.state = {name: null,
            email: null,
            message:null,
            buttonstate:false,
        error:null,submissionResponse:null}
        ;
      }
      setData() {
        console.log()
   axios.post("https://"+window.location.hostname+"/api/form/insert", {name:this.state.name,message:this.state.message,email:this.state.email},{ headers: {'content-type': 'application/json'}})
       .then(response => this.setState({ submissionResponse: response.data.message }));
   }

      handleClick = () => {
        //do something
        this.setState({submissionResponse: null});
        this.setState({error: null});
        this.state.buttonstate=true
        console.log(this.state)
        console.log(this.ValidEmail() )
        console.log((this.state.message && this.state.message.trim().length))
        console.log(this.state.name && this.state.name.trim().length)
        if(this.ValidEmail() && (this.state.message && this.state.message.trim().length) && (this.state.name && this.state.name.trim().length))
        {
          this.setData()
        }
        else
        {
          this.setState({error: "Please enter valid data"});
        }
        this.state.buttonstate=false
      }

      ValidEmail() {
    console.log(this.state.email)
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email)
    }
    setValueForEmail= (e)=> {
        this.setState({error: null});
        this.setState({submissionResponse: null});
        this.setState({email: e.target.value});
        
    }
    setValueForMessage= (e)=> {
        this.setState({error: null});
        this.setState({submissionResponse: null});
        this.setState({message: e.target.value});
        
    }
    setValueForName= (e)=> {
        this.setState({error: null});
        this.setState({submissionResponse: null});
        this.setState({name: e.target.value});
        
    }
    
  render() {
    let error
    if (this.state.error) {

      error = <label className='laberror' >Please Enter valid data</label>

    } 
    let result
    if (this.state.submissionResponse) {

        result = <label className="lab" >{this.state.submissionResponse}</label>
  
      } 
    return (
      <div> 
           
          <div className='full'><img src={logo} ></img></div>    

          <div className='split right'>
          <br></br><br></br>
          
          <textarea readOnly rows="1" cols="10"  className='contact'>Contact Us</textarea>
          
          
          <textarea className='texts' onChange={ this.setValueForName }  id='name' placeholder="Name"/><br></br>
          
          <textarea className='texts' onChange={ this.setValueForEmail }   placeholder="Email"/><br></br>
          
          <textarea className='texts' onChange={ this.setValueForMessage }  placeholder="Your Query"/><br></br>  
          {error}
          <br></br>  
          {result}        
          <br></br> 
          <br></br>  
       <input type="button" disabled={this.state.buttonstate} className="button" value="submit" onClick={this.handleClick} ></input><br></br>
       <img src={t}></img>
          </div>
          <div className='split1 left'>
              <br></br><br></br>
          <textarea readOnly rows="1" cols="10" className='about'>About Us</textarea> 
          <br></br>     
          <textarea readOnly  className='textresize'>We are a group of Electrical Consultancy enthusiasts.we provide electrical engineering knowledge and wisdom to the engineers who are new or less experienced. </textarea>      
          {/* <textarea readOnly  className='textresize'>we provide electrical engineering knowledge and wisdom to the engineers who are new or less experienced.</textarea> */}
          <div class="footer">
  <p> Bolt Electrics is a fantasy company . Copyright © 2020 Bolt Inc. All rights reserved..</p>
</div>
          </div>
         

      </div>
      
    );
  }
}
 
export default Custom;