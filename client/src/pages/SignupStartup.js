 
import React from 'react';
import { Link } from 'react-router-dom';
class SignupStartup extends React.Component{

  

  constructor(props){
    
    super(props);
    this.state={
        fullname:'',
        password:'',
        email:'',
        company_name:'',
        Full_Description:'',
        nombre_invt:0,
        Numbercolab:'',
        value:20,
        setValue:37,
        Date_create:'',
        MontantSecurise:0,
        Date_leve:'',
        FundingType:'',
        code_postal:'',
        FinanceType:'',
        MontantRecherche:0,
        errorMsg:''

    }
  }

  createAccount(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"Full_name":this.state.fullname,"email":this.state.email,"password":this.state.password,"company_name":this.state.company_name,"FinanceType":this.state.FinanceType,
  
    "Funding_Type":this.state.FundingType,"nombre_de_collaborateurs":this.state.Numbercolab,"Montant_recherche":this.state.MontantRecherche,"Montant_Sécurise":this.state.MontantSecurise,"Date_creation":this.state.Date_create,"Location":this.state.Location,"Full_Description":this.state.Full_Description,"Secteur":this.state.Secteur,"code_postal":this.state.code_postal,"Date_levee":this.state.Date_leve});
    console.log(raw);


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/create_new_startup", requestOptions)
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
      this.props.history.push('/startup/auth')
  }

    
  
  })
  .catch(error => console.log('error', error));



 
  }

  render(){
    let FinanceType =this.state.FinanceType
    return(
      <div className="container mt-5">
          <div className="card">
            <div className="card-body">
                <h1>Création de votre profil startup</h1>
              <hr/>

              <div className="form-group">
                <label>Fullname</label>
                <input className="form-control" type="text" value={this.state.fullname} onChange={ (e)=>{this.setState({fullname:e.target.value})} } placeholder={'username please' }/> <br/>
                
              </div>

              <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="email" value={this.state.email} onChange={ (e)=>{this.setState({email:e.target.value})} } placeholder={'email please' }/> <br/>
                
              </div>
             

              <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" value={this.state.password} onChange={ (e)=>{this.setState({password:e.target.value})} } placeholder={'password please' }/> <br/>
             
             <br/>
             <h3> Profil du startup</h3>
              </div>
              
              <div className="mb-3">
               <label>Nom de la structure *</label>
               <input className="form-control" type="text" value={this.state.company_name} onChange={ (e)=>{this.setState({company_name:e.target.value})} } placeholder={'nom du startup' }/> <br/>
             </div>
              <br/>

              <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.Full_Description} onChange={ (e)=>{this.setState({Full_Description:e.target.value})} }></textarea>
        </div>


           <div>   
             <div className="form-group">

               <h4> Information</h4>

               <div className="mb-3">
               <label>Date de Création*</label>
               <input className="form-control" type="date" value={this.state.Date_create} onChange={ (e)=>{this.setState({Date_create:e.target.value})} } min="1900-01-01" max="2024-12-10"/> <br/>
             </div>

             {this.state.Date_create}
             
             <div className="mb-3">
               <label>Code Postal du siège social *</label>
               <input className="form-control" type="number" value={this.state.code_postal} onChange={ (e)=>{this.setState({code_postal:e.target.value})} } /> 
             </div>
            
                <label >nombre de collaborateurs</label>
                <select className="form-control" id="exampleFormControlSelect1" onChange={ (e)=>{this.setState({Numbercolab:e.target.value})} }>
                   <option></option>
                   <option>1-5</option>
                   <option>6-9</option>
                   <option>10-49</option>
                   <option>50-250</option>
                   <option>250 et plus</option>
                   <option></option>
                </select>
              </div>
              <br/>
         </div>
                

            <div>
            <label> Type de financement souhaité.</label>
            <fieldset onChange={(e)=>{this.setState({FinanceType: e.target.value})}}> 
            <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"value='Public' checked={FinanceType === 'Public'}/>
         <label className="form-check-label" htmlFor="flexRadioDefault1">
              Public 
          </label>
        </div>

          <div className="form-check">
           <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value='Privée' checked={FinanceType === 'Privée'}/>
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Privée
          </label>  
         <br/>
         </div>
         </fieldset>  

        </div>

        <br/>
        <div>
          <h6>Montant</h6>
         
          <div className="form-group">
                <label htmFor="exampleFormControlSelect1"> Votre tour de table </label>
                <select className="form-control" id="exampleFormControlSelect1" onChange={ (e)=>{this.setState({FundingType:e.target.value})} }>
                   <option value='Pre-Seed'>pre-seed</option>
                   <option value='Seed'>seed</option>
                   <option value='Series A'>serieA</option>
                   <option value='Series B'>serieB</option>
                </select>
              </div>

       <br/>

       
       <div className="mb-3">
               <label>Date de levée souhaitée *</label>
               <input className="form-control" type="date" value={this.state.Date_leve} onChange={ (e)=>{this.setState({Date_leve:e.target.value})} } min="1900-01-01" max="2024-12-10"/> <br/>
        </div>

        
        <div className="mb-3">
               <label>Montant recherché *</label>
               <input className="form-control" type="number" value={this.state.MontantRecherche} onChange={ (e)=>{this.setState({MontantRecherche:e.target.value})} } placeholder={'Montant recherché £' }/> <br/>
        </div>

        <div className="mb-3">
               <label>Montants déjà sécurisés *</label>
               <input className="form-control" type="number" value={this.state.MontantSecurise} onChange={ (e)=>{this.setState({MontantSecurise:e.target.value})} } placeholder={'Montants déjà sécurisés £' } /> <br/>
        </div>

        </div>

  
        <br></br>

        <label htmlFor="exampleDataList" className="form-label">Secteur de financement </label>
       <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."  onChange={ (e)=>{this.setState({Secteur:e.target.value})}}/>
       

      <datalist id="datalistOptions">


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

export default SignupStartup;
