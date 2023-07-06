import Base from "../components/Base";

const Contact=()=>{
    return (
       <Base
       title="StationeryStore / Contact Us" description={null}
       >
        
             <h1 className="text-center mt-5">Contact Form Here</h1>
            {/* <p className="text-center">Working of Contact Us page is under construction.</p> */}
            <form style={{marginLeft:"460px",  width:"30%", marginTop:"30px"}}>
    
  <div className="form-outline mb-4">
    <input type="email" id="form1Example1" className="form-control" />
    <label className="form-label" for="form1Example1">Email address</label>
  </div>


  <div className="form-outline mb-4">
    <input type="password" id="form1Example2" className="form-control" />
    <label className="form-label" for="form1Example2">Password</label>
  </div>

 
  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
     
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
        <label className="form-check-label" for="form1Example3"> Remember me </label>
      </div>
    </div>

    <div className="col">
  
      <a href="#!">Forgot password?</a>
    </div>
  </div>


  <button type="submit" className="btn btn-primary btn-block">Sign in</button>

</form>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            
       </Base>
    );
};

export default Contact;