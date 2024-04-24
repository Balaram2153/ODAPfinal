import React from "react";
import './Landpage.css'
import FooterPage from "./FooterPage";
import LandNav from "./LandNav";
import { Link } from "react-router-dom";



export default function Landpage() {
  return (
    <>
    

    <LandNav/>

    <div style={{ display: 'flex', justifyContent: 'center'}}>
        <a href="/login">
        <img style={{ maxWidth: '100%', width: '1200px', height: '350px', borderRadius: '50px', padding: '10px' }} src="bannerlandpage.jpg" alt="dbanner" /> 
        </a>
        <a href="/register" style={{paddingLeft:'20px',fontSize:'20px',backgroundColor:'white',color:"blue"}}>Register</a>

      </div>
      

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>       
        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', height:'300px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="/login">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="d7.jpeg" alt="Card 1" />
          </a>
          <p style={{textDecoration:'none',fontSize:'15px'}}> <b> Lab Test </b></p>
          <p style={{textDecoration:'none',fontSize:'15px'}}>Skilled Lab Technician with experience in wet chemical and instrumental techniques.</p>
        </div>

        
        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="/login">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="d9.jpeg" alt="Card 2" />
          </a>
          <p style={{textDecoration:'none',fontSize:'15px'}}> <b>Worlds Best Doctors</b> </p>
          <p style={{textDecoration:'none',fontSize:'15px'}}>If your doctor suggests a treatment </p>
        </div>

     
        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="/login">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="surgery.webp" alt="Card 3" />
          </a>
          <p style={{textDecoration:'none',fontSize:'15px'}}><b>Surgeries</b></p>
          <p style={{textDecoration:'none',fontSize:'15px'}}>Surgery is a medical specialty that uses manual </p>
        </div>

        
        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="/login">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="d10.jpeg" alt="Card 4" />
          </a>
          <p style={{textDecoration:'none',fontSize:'15px'}}> <b>Dentiest</b></p>
          <p style={{textDecoration:'none',fontSize:'15px'}}>A dentist is a healthcare provider who diagnoses </p>
        </div>

     
        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="/login">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="video.jpg" alt="Card 5" />
          </a>
          <p style={{textDecoration:'none',fontSize:'15px'}}> <b> Video Conference</b> </p>
          <p style={{textDecoration:'none',fontSize:'15px'}}>Connect Within 60sec</p>
        </div>
      </div>
      
      <br /><br />
      
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily:'sans-serif' }}>Consult top doctors online for any health concern</h1>
        <p style={{ fontFamily:'sans-serif' }}>Private online consultations with verified doctors in all specialists</p>
        <a href="/login">
         
        </a>
      </div><br />
      
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="d12.jpeg" alt="Specialist 1" />
      <p style={{ textDecoration:'none', marginTop: '5px', color: 'black', width: '130px' }}>Period doubts or<br />Pregnancy</p>
      <a href="/login" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="d4.jpeg" alt="Specialist 2" />
      <p style={{ textDecoration:'none', marginTop: '5px', color: 'black', width: '130px' }}>Acne, pimple or<br />Skin issues</p>
      <a href="/login" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="d3.jpeg" alt="Specialist 3" />
      <p style={{ textDecoration:'none', marginTop: '5px', color: 'black', width: '130px' }}>Performance <br />
       issues in bed</p>
      <a href="/login" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="d2.jpeg" alt="Specialist 4" />
      <p style={{ textDecoration:'none', marginTop: '5px', color: 'black', width: '130px' }}>Cold, cough or<br />Fever</p>
      <a href="/login" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="d1.jpeg" alt="Specialist 5" />
      <p style={{ textDecoration:'none', marginTop: '5px', color: 'black', width: '130px' }}>Child not feeling<br />well</p>
      <a href="/login" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="/login" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="d10.jpeg" alt="Specialist 6" />
      <p style={{ textDecoration:'none', marginTop: '5px', color: 'black', width: '130px' }}>Depression or<br />Anxiety</p>
      <a href="/login" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>
</div> <br /> <br />

<div className="bottom" style={{display:'flex',marginLeft:'250px', marginRight:'250px', justifyContent:'space-between', borderTop: '2px solid grey', borderBottom: '2px solid grey' }}>
  <div>
  <h1>Read top articles from <br /> health experts</h1>
  <p>Health articles that keep you informed about good <br /> health practices and achieve your goals.</p>
  <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer'}}>See all articles</button>
  </div>

  <dir>
    <a style={{textDecoration:'none'}} href="https://www.practo.com/healthfeed/12-coronavirus-myths-and-facts-that-you-should-be-aware-of-40556/post">
      <img style={{width:'280px',height:'200px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',borderRadius:'5px'}} src="link1.jpeg" alt="nurseing" />
      <h5 style={{color:'royalblue'}}>CORONAVIRUS</h5>
      <p style={{color:'black'}}>12 Coronavirus Myths and Facts That <br /> You Should Be Aware Of</p>
    </a>
  </dir>

  <div>
    <a style={{textDecoration:'none'}} href="https://www.practo.com/healthfeed/eating-right-to-build-immunity-against-cold-and-viral-infections-40908/post">
    <img style={{width:'280px',height:'200px',marginTop:'18px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',borderRadius:'5px' }} src="link2.jpeg" alt="vita" />
    <h5 style={{color:'royalblue'}}>VITAMINS AND SUPPLEMENTS</h5>
    <p style={{color:'black'}}>Eating Right to Build Immunity Against <br /> Cold and Viral Infections</p>
    </a>
  </div>
</div>
    
{/* 
    <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href="#">
        <img style={{ maxWidth: '100%', width: '1200px', height: '350px', borderRadius: '50px', padding: '10px' }} src="5896548.jpg" alt="dbanner" />
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', height:'300px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="#">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="Doctor Cards/d1.jpg" alt="Card 1" />
          </a>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Lab Test</p>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Skilled Lab Technician with experience in wet chemical and instrumental techniques.</p>
        </div>

        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="#">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="Doctor Cards/d2.jpg" alt="Card 2" />
          </a>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Worlds Best Doctors</p>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>If your doctor suggests a treatment </p>
        </div>

        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="#">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="Doctor Cards/d3.jpg" alt="Card 3" />
          </a>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Surgeries</p>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Surgery is a medical specialty that uses manual </p>
        </div>

        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="#">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="Doctor Cards/d4.jpg" alt="Card 4" />
          </a>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Dentiest</p>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>A dentist is a healthcare provider who diagnoses </p>
        </div>

        <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
          <a href="#">
            <img style={{ width: '150px', height: '150px', borderRadius: '50%' }} src="Doctor Cards/d5.jpg" alt="Card 5" />
          </a>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}> Video Conference</p>
          <p style={{fontFamily:'sans-serif',fontSize:'15px'}}>Connect Within 60sec</p>
        </div>
      </div>
      
      <br /><br />
      
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily:'sans-serif' }}>Consult top doctors online for any health concern</h1>
        <p style={{ fontFamily:'sans-serif' }}>Private online consultations with verified doctors in all specialists</p>
        <a href="#">
          <button style={{ color:'skyblue', backgroundColor:'white', height:"35px", borderColor:'skyblue' }}>
            View All Specialists
          </button>
        </a>
      </div><br />
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="#" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="Doctor Cards/logo1.webp" alt="Specialist 1" />
      <p style={{ fontFamily: 'sans-serif', marginTop: '5px', color: 'black', width: '130px' }}>Period doubts or<br />Pregnancy</p>
      <a href="#" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="#" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="Doctor Cards/logo2.webp" alt="Specialist 2" />
      <p style={{ fontFamily: 'sans-serif', marginTop: '5px', color: 'black', width: '130px' }}>Acne, pimple or<br />Skin issues</p>
      <a href="#" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="#" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="Doctor Cards/logo3.svg" alt="Specialist 3" />
      <p style={{ fontFamily: 'sans-serif', marginTop: '5px', color: 'black', width: '130px' }}>Performance <br />
       issues in bed</p>
      <a href="#" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="#" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="Doctor Cards/logo4.webp" alt="Specialist 4" />
      <p style={{ fontFamily: 'sans-serif', marginTop: '5px', color: 'black', width: '130px' }}>Cold, cough or<br />Fever</p>
      <a href="#" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="#" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="Doctor Cards/logo5.svg" alt="Specialist 5" />
      <p style={{ fontFamily: 'sans-serif', marginTop: '5px', color: 'black', width: '130px' }}>Child not feeling<br />well</p>
      <a href="#" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>

  <div style={{ textAlign: 'center', margin: '20px' }}>
    <a href="#" style={{ textDecoration: 'none' }}>
      <img style={{ width: '130px', height: '130px', borderRadius: '50%' }} src="Doctor Cards/logo6.webp" alt="Specialist 6" />
      <p style={{ fontFamily: 'sans-serif', marginTop: '5px', color: 'black', width: '130px' }}>Depression or<br />Anxiety</p>
      <a href="#" style={{ textDecoration: 'none', fontFamily: 'sans-serif', color: 'skyblue' }}>CONSULT NOW</a>
    </a>
  </div>
</div>
 
  <h2 style={{ fontFamily: 'sans-serif', marginTop: '20px', textAlign: 'center' }}>Patients Review</h2>
 
<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
  <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', height: '300px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
    <img src="Doctor Cards/dr1.jpg" alt="Doctor 1" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
    <p style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>Specialized Doctor 1</p>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9734;</span>
    </div>
    <button style={{ backgroundColor: 'skyblue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit Rating</button>
  </div>

  <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', height: '300px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
    <img src="Doctor Cards/dr2.jpg" alt="Doctor 2" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
    <p style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>Specialized Doctor 2</p>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9734;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9734;</span>
    </div>
    <button style={{ backgroundColor: 'skyblue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit Rating</button>
  </div>

  <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', height: '300px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
    <img src="Doctor Cards/dr3.jpg" alt="Doctor 3" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
    <p style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>Specialized Doctor 3</p>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
    </div>
    <button style={{ backgroundColor: 'skyblue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit Rating</button>
  </div>

 
  <div style={{ margin: '10px', border: '1px solid #ccc', borderRadius: '10px', width: '200px', height: '300px', padding: '10px', textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
    <img src="Doctor Cards/dr4.jpg" alt="Doctor 4" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
    <p style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>Specialized Doctor 4</p>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9733;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9734;</span>
      <span style={{ fontSize: '24px', color: 'gold' }}>&#9734;</span>
    </div>
    <button style={{ backgroundColor: 'skyblue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit Rating</button>
  </div>
</div> */}





    
 
    {/* <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
   <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png" style={{height:'500px'}} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
            <img src="https://www.semiosissoftware.com/wp-content/uploads/2020/02/Doctor-Appointment-System-1536x840.jpg" style={{height:'500px'}} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
            <img src="https://static.vecteezy.com/system/resources/previews/000/470/930/original/vector-online-medical-services-flat-design.jpg"  style={{height:'500px'}} class="d-block w-100" alt="..."/>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" style={{color:'white'}}>
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" style={{color:'white'}} data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

    
      
      <div className="container-fluid">
        <div className="row p-3 ">
          
          <div className="col-md-6 col-xl-3"><Link to="/login"><img className="landimage" src="doctorimage.jpg" alt=""></img></Link>
            <p>Consultation services</p>
          </div>

          <div className="col-md-6 col-xl-3"><Link to="/login"><img className="landimage" src="therapy.jpg" alt=""></img></Link>
            <p>Medical Services</p>
          </div>

          <div className="col-md-6 col-xl-3"><Link to="/login"><img className="landimage" src="ambulance.jpg" alt=""></img></Link>
            <p>Ambulance Services</p>
          </div>
          <div className="col-md-6 col-xl-3"><Link to="/login"><img className="landimage" src="diagnostic.jpg" alt=""></img></Link>
            <p>Diagnostic services</p>
          </div>
        </div>
      </div>
      

    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-md-4">
          <h3 style={{textAlign:'center'}}>Diagnostic Tests</h3>
          <ul class="list-unstyled">
            <li className="landli">Complete Blood Count (CBC) Rs.200/-</li>
            <li className="landli">Blood Chemistry Panel RS.250/-</li>
            <li className="landli">Liver Function Tests (LFTs) Rs.300/-</li>
            <li className="landli">Kidney Function Tests (KFTs) Rs.400/-</li>
            <li className="landli">X-rays Rs.500/-</li>
            <li className="landli">Computed Tomography (CT) Scan Rs.600/-</li>
            <li className="landli">Magnetic Resonance Imaging (MRI) Rs.600/-</li>
            <li className="landli">Ultrasound Rs.800/-</li>
            <li className="landli">Electrocardiogram Rs.500/- (ECG or EKG)</li>
            <li className="landli">Biopsy Rs.1000/-</li>
            <li className="landli">Endoscopy Rs.1500/-</li>
            <li className="landli">Genetic Tests Rs.2000/-</li>
            <li className="landli">Pulmonary Function Tests Rs.1500/-</li>
            <li className="landli">Urinalysis  Rs.1000/-</li>
            <li className="landli">Colonoscopy Rs.1200/- </li>
            <li className="landli">Lumbar Puncture (Spinal Tap) Rs.3000/-</li>
          </ul>
      
       
      </div>

        <div className="col-md-4">
          <h3 style={{textAlign:'center'}}>Consultation sevices</h3>
          <ul class="list-unstyled">
            <li className="landli">Complete Blood Count (CBC) Rs.200/-</li>
            <li className="landli">Blood Chemistry Panel RS.250/-</li>
            <li className="landli">Liver Function Tests (LFTs) Rs.300/-</li>
            <li className="landli">Kidney Function Tests (KFTs) Rs.400/-</li>
            <li className="landli">X-rays Rs.500/-</li>
            <li className="landli">Computed Tomography (CT) Scan Rs.600/-</li>
            <li className="landli">Magnetic Resonance Imaging (MRI) Rs.600/-</li>
            <li className="landli">Ultrasound Rs.800/-</li>
            <li className="landli">Electrocardiogram Rs.500/- (ECG or EKG)</li>
            <li className="landli">Biopsy Rs.1000/-</li>
            <li className="landli">Endoscopy Rs.1500/-</li>
            <li className="landli">Genetic Tests Rs.2000/-</li>
            <li className="landli">Pulmonary Function Tests Rs.1500/-</li>
            <li className="landli">Urinalysis  Rs.1000/-</li>
            <li className="landli">Colonoscopy Rs.1200/- </li>
            <li className="landli">Lumbar Puncture (Spinal Tap) Rs.3000/-</li>
          </ul>
        
        </div>
   

      
        <div className="col-md-4">
          <h3 style={{textAlign:'center'}}>Medical sercives</h3>
          <ul class="list-unstyled">
            <li className="landli">Complete Blood Count (CBC) Rs.200/-</li>
            <li className="landli">Blood Chemistry Panel RS.250/-</li>
            <li className="landli">Liver Function Tests (LFTs) Rs.300/-</li>
            <li className="landli">Kidney Function Tests (KFTs) Rs.400/-</li>
            <li className="landli">X-rays Rs.500/-</li>
            <li className="landli">Computed Tomography (CT) Scan Rs.600/-</li>
            <li className="landli">Magnetic Resonance Imaging (MRI) Rs.600/-</li>
            <li className="landli">Ultrasound Rs.800/-</li>
            <li className="landli">Electrocardiogram Rs.500/- (ECG or EKG)</li>
            <li className="landli">Biopsy Rs.1000/-</li>
            <li className="landli">Endoscopy Rs.1500/-</li>
            <li className="landli">Genetic Tests Rs.2000/-</li>
            <li className="landli">Pulmonary Function Tests Rs.1500/-</li>
            <li className="landli">Urinalysis  Rs.1000/-</li>
            <li className="landli">Colonoscopy Rs.1200/- </li>
            <li className="landli">Lumbar Puncture (Spinal Tap) Rs.3000/-</li>
          </ul>
          
        </div>
      </div>
      </div>  */}
    
      <FooterPage></FooterPage>
    </>
  );
}