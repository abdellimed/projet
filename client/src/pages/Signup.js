 
import React from 'react';
import { Link } from 'react-router-dom';
class Signup extends React.Component{

  

  constructor(props){
    
    super(props);
    this.state={
        fullname:'',
        password:'',
        email:'',
        InvestorType:'',
        FundingType:'',
        NumberInvestments:0,
        Location:'',
        Full_Description:'',
        Secteur:'',
        Max_invest_euro:0,
        Min_invest_euro:1,
       
        errorMsg:''

    }
  }

  createAccount(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"investor_name":this.state.fullname,"email":this.state.email,"password":this.state.password,"InvestorType":this.state.InvestorType,
  
    "FundingType":this.state.FundingType,"NumberInvestments":this.state.NumberInvestments,"Location":this.state.Location,"Full_Description":this.state.Full_Description,"Secteur":this.state.Secteur,"max":this.state.Max_invest_euro,"Min":this.state.Min_invest_euro});
    console.log(raw);
/*
var raw = JSON.stringify({
  "investor_name": "Abdelli",
  "email": "mohamedammar@gmail.com",
  "password": "123456",
  "InvestorType": "une société d investissement",
  "FundingType": "serieA",
  "NumberInvestments": 0,
  "Location": "Afrique",
  "Full_Description": "La SEULE plateforme qui révèle le vrai potentiel de votre PROPRIÉTÉ ou TERRAIN",
  "Secteur": "Services informatiques",
  "max": "20000",
  "Min": "2000"
});*/

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("/create_new_investissor", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result)

    if (result.success === false) {
      this.setState({
          errorMsg:result.message
      })
  } else {
      // save token
      // go to home page
      console.log(result.message);
      this.props.history.push('/investor/auth')
  }

    
  
  })
  .catch(error => console.log('error', error));



  


   /* var raw = JSON.stringify({"investor_name":this.state.fullname,"email":this.state.email,"password":this.state.password,"InvestorType":this.state.InvestorType,
  
    "FundingType":this.state.FundingType,"NumberInvestments":this.state.NumberInvestments,"Location":this.state.Location,"Full_Description":this.state.Full_Description,"Secteur":this.state.Secteur,"max":this.state.Max_invest_euro,"Min":this.state.Min_invest_euro});
    console.log(raw);*/
 
  }

 


  render(){
    let InvestorType =this.state.InvestorType
    return(
      <div className="container mt-5">
          <div className="card">
            <div className="card-body">
                <h1>Création de votre profil d'investisseur</h1>
              <hr/>

              <div className="form-group">
                <label>Fullname</label>
                <input className="form-control" type="text" value={this.state.fullname} onChange={ (e)=>{this.setState({fullname:e.target.value})} } placeholder={'username please' }/> <br/>
                
              </div>

              <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="email" value={this.state.email} onChange={ (e)=>{this.setState({email:e.target.value})} } placeholder={'email' }/> <br/>
                
              </div>
             

              <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" value={this.state.password} onChange={ (e)=>{this.setState({password:e.target.value})} } placeholder={'password please' }/> <br/>
             
             <br/>
             <h3> Profil d'investisseur</h3>
             <p>Type d'investisseur</p>

              </div>
              <fieldset onChange={(e)=>{this.setState({InvestorType: e.target.value})}}>  
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='Business Angel' checked={InvestorType === 'Business Angel'}  />
         <label className="form-check-label" htmlFor="flexRadioDefault1">
              Business Angel 
          </label>
        </div>
      <div className="form-check">
         <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='une société d investissement' checked={InvestorType === 'une société d investissement'}/>
       <label className="form-check-label" htmlFor="flexRadioDefault2">
         une société d’investissement
          </label>
      
      </div>

      </fieldset>  

{this.state.InvestorType}


      <br></br>
        <br></br>
              <div className="form-group" >
                <label htmFor="exampleFormControlSelect1">Type de levée</label>

                <select className="form-control" id="exampleFormControlSelect1" onChange={ (e)=>{this.setState({FundingType:e.target.value})} }>
                   <option value='Pre-Seed'>pre-seed</option>
                   <option value='Seed'>seed</option>
                   <option value='Series A'>serieA</option>
                   <option value='Series B'>serieB</option>
                </select>
              </div>

              {this.state.FundingType}
              <br></br>
         <h4>Thése d'investissement</h4>


         <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.Full_Description} onChange={ (e)=>{this.setState({Full_Description:e.target.value})} }></textarea>
        </div>
        <br></br>

        <label htmlFor="exampleDataList" className="form-label">Secteur d'investissement </label>
       <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."  onChange={ (e)=>{this.setState({Secteur:e.target.value})}}/>
       

      <datalist id="datalistOptions"  >


         <option value="Les industries manufacturières" />
         <option value="Services informatiques" />
         <option value="Les communications Explorer" />
         <option value="Transport" />
         <option value="Education et enseignement" />
         <option value="Formation professionnelle" />  
         <option value="Santé" /> 
         <option value="Activités de production et d’industries culturelles" />  
         <option value="Animation des jeunes, les loisirs l'encadrement de l'enfance et la protection des personnes âgées" />  
          <option value="Protection de l'environnement" />  
          <option value="Travaux publics" />  
          <option value="Promotion immobilière" />  
          <option value="Services d'études, de conseils, d'expertises et d'assistance" />  
          <option value="Services de recherche- développement" />  
          <option value="Autres services" />  
      </datalist>

     
      <br></br>

        <label  className="form-label">Location d'investissement </label>
       <input className="form-control" list="datalistOptions1" id="exampleDataList2" placeholder="Type to search..." onChange={ (e)=>{this.setState({Location:e.target.value})}}/>
       

      <datalist id="datalistOptions1">
         <option value="Afrique" />
         <option value="Europe" />
         <option value="USA" />
         
      </datalist>

    <br></br>

    
    <div className="form-group">
        <label>En moyenne, combien d’investissements faites-vous par an ?</label>
        <input className="form-control" type="number" value={this.state.nombre_invt} onChange={ (e)=>{this.setState({nombre_invt:e.target.value})} } placeholder={"nombre d'investissement" }/> <br/>
                
    </div>

    <div className="form-group">
        <label>Min(£) </label>
        <input className="form-control" type="number"  onChange={ (e)=>{this.setState({Min_invest_euro:e.target.value})} } placeholder={"montant min d'investissement" }/> <br/>
                
    </div>

    <div className="form-group">
        <label>Max(£) </label>
        <input className="form-control" type="number"  onChange={ (e)=>{this.setState({Max_invest_euro:e.target.value})} } placeholder={"montant max d'investissement" }/> <br/>
                
    </div>

   

<br></br>
        <br></br>
               
              <button  className="mt-3 btn btn-primary" onClick={ ()=>{
                  this.createAccount();
              } }  >Create account</button>

              {
                  this.state.errorMsg !== '' ?
                  <div className="alert alert-danger">{this.state.errorMsg}</div>:
                  <div></div>
              }
            </div>
          </div>
      </div>
    );
  }
}

export default Signup;
