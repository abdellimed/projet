import React, { Component } from 'react';
import { useParams } from "react-router-dom";

class InvestorProfile extends Component {

    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            Recmd_starup:null,
            invest_profil:null,
            isLoading:true
            
        }
       
      
      }
      componentDidMount(){
        this.getinvest();
    }
    getinvest(){
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'GET',
       
        redirect: 'follow'
      };
      
      fetch("http://localhost:8080/api/"+this.state.id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.bestcompanys)
            this.setState({
                invest_profil:result.invest,
                Recmd_starup:result.bestcompanys,
                isLoading: false

            })


        
        })
        .catch(error => console.log('error', error));
 }


    
    render() {
        return (
            <div className="container mt-5">



               {
                    this.state.isLoading === true ?
                    <div className="container mt-5 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div className="col-sm-5">
                        <h3> Nom d'investisseur: </h3>
                        {console.log(this.state.invest_profil[0]) }
                        <p>{this.state.invest_profil[0].investor_name}</p>

                        <h3> Type d'investisseur: </h3>
                        {console.log(this.state.invest_profil[0]) }
                        <p>{this.state.invest_profil[0].InvestorType}</p>

                        <h3>Description:</h3>
                        <p>{this.state.invest_profil[0].Full_Description}</p>
                        <br/>

                        <h3>Funding Type:</h3>
                        <p>{this.state.invest_profil[0].FundingType}</p>
                        <br/>

                        <h3>Contact:</h3>
                        <p>{this.state.invest_profil[0].email}</p>
                        <br/>

                        <h3>Tour table max:</h3>
                        <p>{this.state.invest_profil[0].max} £</p>
                        <br/>
                       
                        <h3>Tour table max:</h3>
                        <p>{this.state.invest_profil[0].Min} £</p>
                        <br/>

                       <h2> Startups recommandés</h2>
                       <table className="table"> 
                       <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Location</th>
      <th scope="col">Fynding type</th>
    </tr>
  </thead>
                       {
                            this.state.Recmd_starup.map((m,index)=>{

                                return (

                                  
                                    <tbody>
    <tr key={index}>
     
      <td>{m.startup.company_name}</td>
      <td>{m.startup.Contact_Email}</td>
      <td>{m.startup.Organization_Location}</td>
      <td>{m.startup["Funding Type"]}</td>

    </tr>
    </tbody>
  
                                    
                                    

                                );

                                
                            })

                       }
                              </table>  
               
                            



                    </div>

               }







            <br/>
            


             
            
            
            </div>
        );
    }
}

export default InvestorProfile;