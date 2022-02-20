


function investors() {


  return (
    <div className="App">
      <header className="App-header">
        
      <form>
    <div class="form-group">
    <label for="exampleFormControlInput1">Investor name</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="investor name"/>

    <label for="exampleFormControlInput1">Number of Investments</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Number of Investments"/>

    <label for="exampleFormControlInput1">Location</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Location"/>

   
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Funding Type</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>seed</option>
      <option>serieA</option>
      <option>serieB</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Full Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">Description</textarea>
  </div>
</form>

      
      </header>
    </div>

    
  );
}

export default investors;
