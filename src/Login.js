import { useRef, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Axios from "./api/axios";
const LOGIN_URL = "/login";

// const PROPERTY_URL = "/uploadprop"



const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // const [loginStatus,setLoginStatus] = useState("");
  // const [propType,setPropType] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
//   useEffect(()=>{
//     console.log(propType);
// },[propType])
// const handleSubmitt = async(e)=>{
//     e.preventDefault()
//     try {
//         const response = await Axios.post(PROPERTY_URL,{propType})
//         console.log(response);
//     } catch (error) {
        
//     }
// }

  const handleSubmitForLogin = async (e) => {
    e.preventDefault();
    // console.log(user, pwd);
   
    try {
      const response = await Axios.post(LOGIN_URL,
        JSON.stringify({user,pwd}),
        {
          headers:{'Content-Type':'application/json',
          withCredentials:true
        }
        }
        )
        console.log(response.status);
        if (response.data.name) {
          setSuccess(true);
          // setLoginStatus(response.data.name)
        } 
    //   setUser("");
    // setPwd("");
    // setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response")
        errTimeOut()
      }else if(err.response?.status === 400){
        setErrMsg('Email not found')
        errTimeOut()
      }else if(err.response?.status === 401){
        setErrMsg('Unauthoorized')
        errTimeOut()
      }else if(err.response?.status === 500){
        setErrMsg('Internal server error')
      }
      
     
      errRef.current.focus();
    }
  };

  const errTimeOut = ()=>{
    setTimeout(() => {
      setErrMsg("")
    }, 4000);
  }
  const navigate= useNavigate();

  const navigateToSginUp = ()=>{
    navigate('/')
  }
  const navigateToProp = ()=>{
    navigate('/PropertyUpload')
  }
// const logOut = () =>{
//   setSuccess(false)
//   setUser("");
//   setPwd("")
// }

// const navi = useNavigate();
// const navigateToProp=()=>{
//   navi('/propertyUpload')
// }
  return (
    <>
      {success ? (
          navigateToProp()
      ) : (
        <section id="login">
         
          
          <form onSubmit={handleSubmitForLogin}>
          <h1>Sign In</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            arial-live="assertive"
          >
            {errMsg}
          </p>
            <div className="names">
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              placeholder="Username/Email"
            />
            </div><br/>
          <div className="names">
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
              placeholder="Password"
            />
            </div>
            <button className="signInBtn">Sign In</button>
            <p>
            Need an Account?
            <br />
            <span className="line">
              {}
              <button className="signUpBtn" onClick={navigateToSginUp}>Sign Up</button>
            </span>
          </p>
          </form>
         
        </section>
      )}
    </>
  );
};
export default Login;

