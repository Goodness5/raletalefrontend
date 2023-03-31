import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "./api/axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.jpg";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const REGSITER_URL = "/register";
const LOGIN_URL = "/login";
const SEARCH_PROPERTY_URL = "/searchProperty"

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();



  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [MatchFocus, setMatchFocus] = useState(false);

  // const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);


  const [availableFor, setAvailableFor] = useState("Available For?");
  const [propertyPurpose, setPropertyPurpose] = useState("Property Purpose");
  const [propertyType, setPropertyType] = useState("Property Type");
  const [noOfBedroom, setNoOfBedroom] = useState("Number of Bedroom")
  const [suites, setSuites] = useState("Number of suites")
  const [story, setStory] = useState("Number of story")
  const [landType, setLandType] = useState("Land type")
  const [landTypeInput, setLandTypeInput] = useState("")
  const [noOfFuelPumps, setNumberOfFuelPumps] = useState("")
  const [warehouseInput, setWarehouseInput] = useState("")
  const [hotelBlahBlah, setHotelBlahBlah] = useState("")

  const [state, setState] = useState("")
  const [LGA, setLGA] = useState("")
  const [nearestBusStop, setNearestBusStop] = useState("")
  const [streetName, setStreetName] = useState("")
  const [buildingNumber, setBuildingNumber] = useState("")
  const [price, setPrice] = useState("")

  const [budgetFrom, setBudgetFrom] = useState("")
  const [budgetTo, setBudgetTo] = useState("")

  const [inspection, setInspection] = useState("")
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");

  const [radioBtnYes, setRadioBtnYes] = useState("Yes")
  // const [radioBtnNo, setRadioBtnNo] = useState("No")

  const [errMsg, setErrMsg] = useState("");
  const [propertyFoundMsg, setPropertyFoundMsg] = useState("")

  const [classname,setClassname] = useState(false)
  // const [classname2, setClassname2] = useState(false)

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await Axios.post(REGSITER_URL, { user, pwd });
      console.log(response);
      let userInfo = JSON.parse(response.config.data);
      console.log(userInfo.user);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server Response");
        errTimeOut();
      } else if (err.response?.status === 409) {
        setErrMsg("Username  Taken");
        errTimeOut();
      } else {
        // setErrMsg("Registration fail");
        setSuccess(true);
      }

      errRef.current.focus();
    }
  };
  const handleSubmitForSearch = async (e) => {
    e.preventDefault();
    setAvailableFor("Available For?")
    try {
      const searchformResponse = await Axios.post(SEARCH_PROPERTY_URL, { availableFor })
      const propertyFoundMsg = searchformResponse.data.message
      setPropertyFoundMsg(propertyFoundMsg)
    } catch (error) {
      console.log(error);
    }
  }

  const errTimeOut = () => {
    setTimeout(() => {
      setErrMsg("");
    }, 4000);
  };

  const handleSubmitForLogin = async (e) => {
    e.preventDefault();
    // console.log(user, pwd);

    try {
      const response = await Axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true
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
      } else if (err.response?.status === 400) {
        setErrMsg('Email not found')
        errTimeOut()
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthoorized')
        errTimeOut()
      } else if (err.response?.status === 500) {
        setErrMsg('Internal server error')
      }


      errRef.current.focus();
    }
  };


  const handleChangesForAvailableFor = e => {
    setAvailableFor(e.target.value)
  }
  const handleChangesForPropertyPurpose = e => {
    setPropertyPurpose(e.target.value)
  }

  const handleChangesForPropertyType = e => {
    setPropertyType(e.target.value)
  }

  const handleChangesForNumberOfBedroom = e => {
    setNoOfBedroom(e.target.value)
  }

  const handleChangesForNumberOfSuites = e => {
    setSuites(e.target.value);
  }

  const handleChangesForNumberOfStory = e => {
    setStory(e.target.value)
  }

  const handleChangesForLandType = e => {
    setLandType(e.target.value)
  }
  const handleChangesForLandTypeInput = e => {
    setLandTypeInput(e.target.value)
  }

  const handleChangesForNumberofFuelPumps = e => {
    setNumberOfFuelPumps(e.target.value)
  }

  const handleChangesForNumberOfWarehouse = e => {
    setWarehouseInput(e.target.value)
  }
  const handleChangesForHotelblahblah = e => {
    setHotelBlahBlah(e.target.value)
  }

  const handleChangesForState = e => {
    setState(e.target.value)
  }

  const handleChangesForLGA = e => {
    setLGA(e.target.value)
  }

  const handleChangesForNearestBusStop = e => {
    setNearestBusStop(e.target.value)
  }

  const handleChangesForStreetName = e => {
    setStreetName(e.target.value)
  }

  const handleChangesForBuildingNumber = e => {
    setBuildingNumber(e.target.value)
  }

  const handleChangesForPrice = e => {
    setPrice(e.target.value)
  }

  const handleChangesForBudgetFrom = e => {
    setBudgetFrom(e.target.value)
  }

  const handleChangesForBudgetTo = e => {
    setBudgetTo(e.target.value)
  }
  const handleChangesForInspection = e => {
    setInspection(e.target.value)
  }
  const handleChangesForTimeFrom = e => {
    setTimeFrom(e.target.value)
  }
  const handleChangesForTimeTo = e => {
    setTimeTo(e.target.value)
  }
  const handleChangesForRadioBtnYes = e => {
    setRadioBtnYes(e.target.value)
  }
  // const handleChangesForRadioBtnNo = e => {
  //   setRadioBtnNo(e.target.value)
  // }


  const navigate = useNavigate();


  const navigatingForms = ()=>{
    setClassname(current=>!current)
    console.log(classname);
  }
  const navigateToProp = () => {
    navigate('/PropertyUpload')
  }
  // console.log(success);
  if (success === true) {
    navigateToProp()
  }

  return (
    <>
     <>
        <nav>
          <img src={logo} alt="hell" />
        </nav>

        <section id="registration">
          <section className="Main">
            <div className="col1">
              <h1>Request a property</h1>
              <form className="searchform" onSubmit={handleSubmitForSearch}>

                <div className="upload-property-section">
                  <div className="column1">
                    <select onChange={handleChangesForAvailableFor} value={availableFor}>
                      <option value="Available For?">Available For?</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Lease">Lease</option>
                    </select>
                    <select className="propertyPurpose" onChange={handleChangesForPropertyPurpose} value={propertyPurpose}>
                      <option value="Property Purpose">Property Purpose</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Residential">Residential</option>
                    </select>

                    <div className={propertyPurpose === "Commercial" ? "show" : "hide"}>
                      <div>
                        <select onChange={handleChangesForPropertyType} value={propertyType}>
                          <option value="Property Type">Property Type</option>
                          <option value="Flat">Flat</option>
                          <option value="Duplex">Duplex</option>
                          <option value="Shopping Complex">Shopping Complex</option>
                          <option value="Bungalow">Bungalow</option>
                          <option value="Story Building">Story Building</option>
                          <option value="Land">Land</option>
                          <option value="Filling Station">Filling Station</option>
                          <option value="Warehouse">Warehouse</option>
                          <option value="Hotel/Motel/Guest House">Hotel/Motel/Guest House</option>
                        </select>

                        <div className={propertyType === "Flat" || propertyType === "Duplex" || propertyType === "Bungalow" ? "show" : "hide"}>
                          <select onChange={handleChangesForNumberOfBedroom} value={noOfBedroom}>
                            <option value="Number of Bedroom">Number of Bedroom</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="others">others</option>
                          </select>

                        </div>
                        <div className={propertyType === "Shopping Complex" ? "show" : "hide"}>
                          <select onChange={handleChangesForNumberOfSuites} value={suites}>
                            <option value="Number of suites">Number of suites</option>
                            <option value="1-10">1-20</option>
                            <option value="21-40">21-40</option>
                            <option value="41-60">41-60</option>
                            <option value="61-100">61-100</option>
                            <option value="100+">100+</option>
                          </select>

                        </div>
                        <div className={propertyType === "Story Building" ? "show" : "hide"}>
                          <select onChange={handleChangesForNumberOfStory} value={story}>
                            <option value="Number of story">Number of story</option>
                            <option value="1-20">1-20</option>
                            <option value="21-40">21-40</option>
                            <option value="41-60">41-60</option>
                            <option value="661-100">61-100</option>
                            <option value="100+">100+</option>
                          </select>
                        </div>
                        <div className={propertyType === "Land" ? "show landFlex" : "hide"}>
                          <select onChange={handleChangesForLandType} value={landType}>
                            <option value="Land type">Land type</option>
                            <option value="Plot">Plot</option>
                            <option value="Acres">Acres</option>
                            <option value="Hectres">Hectres</option>
                          </select>

                          <div className={landType === "Plot" || landType === "Acres" || landType === "Hectres" ? "show" : "hide"}>
                            <input onChange={handleChangesForLandTypeInput} value={landTypeInput} type="number" placeholder="No of plot/acres/hectres" />
                          </div>
                        </div>
                        <div className={propertyType === "Filling Station" ? "show landFlex" : "hide"}>
                          <label>How many fuel pumps?</label>
                          <input onChange={handleChangesForNumberofFuelPumps} value={noOfFuelPumps} type="number" placeholder="Enter number" />
                        </div>
                        <div className={propertyType === "Warehouse" ? "show landFlex" : "hide"}>
                          <input onChange={handleChangesForNumberOfWarehouse} value={warehouseInput} type="number" placeholder="Size(square metre)" />
                        </div>
                        <div className={propertyType === "Hotel/Motel/Guest House" ? "show landFlex" : "hide"}>
                          <select onChange={handleChangesForHotelblahblah} value={hotelBlahBlah}>
                            <option value="Number of rooms">Number of rooms</option>
                            <option value="1-10">1-10</option>
                            <option value="10-20">10-20</option>
                            <option value="20-30">20-30</option>
                            <option value="30-40">30-40</option>
                            <option value="40-50">40-50</option>
                            <option value="50+">50+</option>
                          </select>
                        </div>

                      </div>
                    </div>
                    <div className={propertyPurpose === "Residential" ? "show" : "hide"}>
                      <div>
                        <select onChange={handleChangesForPropertyType} value={propertyType}>
                          <option value="Property Type">Property Type</option>
                          <option value="Flat">Flat</option>
                          <option value="Duplex">Duplex</option>
                          <option value="Shopping Complex">Shopping Complex</option>
                          <option value="Bungalow">Bungalow</option>
                          <option value="Story Building">Story Building</option>
                          <option value="Land">Land</option>
                        </select>
                        <div className={propertyType === "Flat" || propertyType === "Duplex" || propertyType === "Bungalow" ? "show" : "hide"}>
                          <select onChange={handleChangesForNumberOfBedroom} value={noOfBedroom}>
                            <option value="Number of Bedroom">Number of Bedroom</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="others">others</option>
                          </select>
                        </div>
                        <div className={propertyType === "Shopping Complex" ? "show" : "hide"}>
                          <select onChange={handleChangesForNumberOfSuites} value={suites}>
                            <option value="Number of suites">Number of suites</option>
                            <option value="1-10">1-20</option>
                            <option value="21-40">21-40</option>
                            <option value="41-60">41-60</option>
                            <option value="61-100">61-100</option>
                            <option value="100+">100+</option>
                          </select>
                        </div>
                        <div className={propertyType === "Story Building" ? "show" : "hide"}>
                          <select onChange={handleChangesForNumberOfStory} value={story}>
                            <option value="Number of story">Number of story</option>
                            <option value="1-20">1-20</option>
                            <option value="21-40">21-40</option>
                            <option value="41-60">41-60</option>
                            <option value="661-100">61-100</option>
                            <option value="100+">100+</option>
                          </select>
                        </div>
                        <div className={propertyType === "Land" ? "show landFlex" : "hide"}>
                          <select onChange={handleChangesForLandType} value={landType}>
                            <option value="Land type">Land type</option>
                            <option value="Plot">Plot</option>
                            <option value="Acres">Acres</option>
                            <option value="Hectres">Hectres</option>
                          </select>

                          <div className={landType === "Plot" || landType === "Acres" || landType === "Hectres" ? "show" : "hide"}>
                            <input onChange={handleChangesForLandTypeInput} value={landTypeInput} type="number" placeholder="No of plot/acres/hectres" />
                          </div>
                        </div>
                        <div className={propertyType === "Filling Station" ? "show landFlex" : "hide"}>
                          <label>How many fuel pumps?</label><br />
                          <input onChange={handleChangesForNumberofFuelPumps} value={noOfFuelPumps} type="number" placeholder="Enter number" />
                        </div>
                        <div className={propertyType === "Warehouse" ? "show landFlex" : "hide"}>
                          <input onChange={handleChangesForNumberOfWarehouse} value={warehouseInput} type="number" placeholder="Size(square metre)" />
                        </div>
                        <div className={propertyType === "Hotel/Motel/Guest House" ? "show landFlex" : "hide"}>
                          <select onChange={handleChangesForHotelblahblah} value={hotelBlahBlah}>
                            <option value="Number of rooms">Number of rooms</option>
                            <option value="1-10">1-10</option>
                            <option value="10-20">10-20</option>
                            <option value="20-30">20-30</option>
                            <option value="30-40">30-40</option>
                            <option value="40-50">40-50</option>
                            <option value="50+">50+</option>
                          </select>
                        </div>

                      </div>

                    </div>
                    <input onChange={handleChangesForState} value={state} type="text" placeholder="State" />
                    <input onChange={handleChangesForLGA} value={LGA} type="text" placeholder="Local Government Area" />
                    <input onChange={handleChangesForNearestBusStop} value={nearestBusStop} type="text" placeholder="Land mark/Nearest Bus stop" />
                    <input onChange={handleChangesForStreetName} value={streetName} type="text" placeholder="Street name" />
                    <input onChange={handleChangesForBuildingNumber} value={buildingNumber} type="text" placeholder="Building Number/ Plot no" />
                    <input onChange={handleChangesForPrice} value={price} type="number" placeholder="Price" />
                    <div className="budget-container">
                      <label>Budget:</label>
                      <input onChange={handleChangesForBudgetFrom} value={budgetFrom} type="text" placeholder="From" />
                      <input onChange={handleChangesForBudgetTo} value={budgetTo} type="text" placeholder="To" />
                    </div>
                    <div align="left">
                      <p style={{ margin: 5 + "px" }}>Available for inspection</p>
                      <input onChange={handleChangesForInspection} value={inspection} type="" placeholder="Enter days available for inspection" />
                    </div>
                    <div className="time-container">
                      <p>Time:</p>
                      <p>From</p>
                      <input onChange={handleChangesForTimeFrom} value={timeFrom} type="time" placeholder="From" />
                      <p>To</p>
                      <input onChange={handleChangesForTimeTo} value={timeTo} type="time" placeholder="" />
                    </div>
                  </div>
                  <div className="extras-container col-d">
                    <h1>Extras</h1>
                    <div className="pets-container">
                      <p className="">Pets Allowed:</p>
                      <div className="yes-no-container">
                        <p>Yes</p>
                        <input onClick={handleChangesForRadioBtnYes} type="radio" value="yes" name="petQuerry" />
                      </div>
                      <div className="yes-no-container">
                        <p>No</p>
                        <input onClick={handleChangesForRadioBtnYes} type="radio" value="no" name="petQuerry" />
                      </div>
                    </div>
                    <div className={radioBtnYes === "Yes" ? "show petinput" : "hide"}>
                      <input type="text" placeholder="Pet types" />
                    </div>
                    <div className="garden-container">
                      <p>Garden Allowed:</p>
                      <div className="yes-no-container">
                        <p>Yes</p>
                        <input type="radio" value="Yes" name="petQuerry" onClick={(e) => {
                          // setPetsAllowed(e.target.value);
                        }} />
                      </div>
                      <div className="yes-no-container">
                        <p>No</p>
                        <input type="radio" value="no" name="petQuerry" onClick={(e) => {
                          // setPetsAllowed(e.target.value);
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <button>submit</button>
                {/* <button onClick={navigateToLogin}>log out</button> */}
                
              </form>
              <p>{propertyFoundMsg}</p>
            </div>

            <div className={classname?"col2 show":"hide"}>
            <h1 align="center">Upload Property</h1>

              <form autoComplete="new-password" onSubmit={handleSubmitForLogin}>
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
                    autoComplete="new-password"
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    value={user}
                    placeholder="Username/Email"
                  />
                </div><br />
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
                    { }
                    <button className="signUpBtn" onClick={navigatingForms}>Sign Up</button>
                  </span>
                </p>
              </form>

            </div>

            <div className={classname? "hide" :"col2 show"}>
              <h1 align="center">Upload Property</h1>
              <form id="r" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "ffscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <div className="names">
                  <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                  <br />
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => {
                      setUserFocus(true);
                    }}
                    onBlur={() => {
                      setUserFocus(false);
                    }}
                    placeholder="Username"
                  />
                </div>
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  &nbsp; 4 to 24 character.
                  <br />
                  Must begin with letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed
                </p>
                <div className="names">
                  <span className={validPwd ? "valid ptp" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>

                  <br />
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => {
                      setPwdFocus(true);
                    }}
                    onBlur={() => {
                      setPwdFocus(false);
                    }}
                    placeholder="Password"
                  />
                </div>
                <p
                  id="pwdnote"
                  className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  &nbsp;8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:(!,@,#,$,%)
                </p>
                <div className="names">
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                  <br />
                  <input
                    type="password"
                    id="confirm_pwd"
                    ref={userRef}
                    onChange={(e) => {
                      setMatchPwd(e.target.value);
                    }}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => {
                      setMatchFocus(true);
                    }}
                    onBlur={() => {
                      setMatchFocus(false);
                    }}
                    placeholder="Confirm Password"
                  />
                </div>
                <p
                  id="confirmnote"
                  className={
                    MatchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  &nbsp; Must match the first password input field.
                </p>
                <button
                  // onClick={rem/}
                  className="signUpBtn"
                  disabled={!validName || !validPwd || !validMatch ? true : false}
                >
                  Sign up
                </button>

                <span className="line">
                  <p>Already have an account?</p>
                  <button className="signInBtn" onClick={navigatingForms}>
                    Sign In
                  </button>
                </span>
              </form>
            </div>
          </section>
        </section>

      </>
    </>
  );
};

export default Register;
