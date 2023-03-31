import { useEffect, useState, useRef } from "react";
import Axios from "./api/axios";
import { useNavigate } from "react-router-dom";


const PROPERTY_URL = "/uploadprop"

const PropUpload = () => {

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

    const[inspection,setInspection] = useState("")
    const[timeFrom,setTimeFrom] = useState("");
    const [timeTo,setTimeTo] = useState("");

    const[radioBtnYes,setRadioBtnYes] = useState("Yes")
    const[radioBtnNo, setRadioBtnNo] = useState("No")
 
    const [errMsg, setErrMsg] = useState("");
    
    console.log(radioBtnYes);
    console.log(radioBtnNo);
    useEffect(() => {
        console.log(propertyPurpose);
    }, [propertyPurpose])
    useEffect(() => {
        console.log(propertyType);
    }, [propertyType])
    useEffect(() => {
        console.log(landTypeInput);
    }, [landTypeInput])
    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            const response = await Axios.post(PROPERTY_URL, { availableFor, propertyPurpose, propertyType, noOfBedroom, suites, story, landType, landTypeInput, noOfFuelPumps, warehouseInput, hotelBlahBlah, state, LGA, nearestBusStop, streetName, buildingNumber, price, budgetFrom, budgetTo,inspection,timeFrom,timeTo })
            // console.log(propertyPurpose);
            console.log(response);
            console.log(response.data.message);
            setErrMsg(response.data.message)
        } catch (error) {

            if (error.response?.status === 411) {
                console.log("hello");
                setAvailableFor("Available For?")
                setPropertyPurpose("Property Purpose")
                setPropertyType("Property Type")
                setNoOfBedroom("Number of Bedroom")
                setSuites("Number of suites")
                setStory("Number of story")
                setLandType("Land type")
                setLandTypeInput("")
                setNumberOfFuelPumps("")
                setWarehouseInput("")
                setHotelBlahBlah("")
                setState("")
                setLGA("")
                setNearestBusStop("")
                setStreetName("")
                setBuildingNumber("")
                setPrice("")
                setBudgetFrom("")
                setBudgetTo("")
                setErrMsg("Please Fill")
                setInspection("")
                setTimeFrom("")
                setTimeTo("")
                setTimeout(() => {
                    setErrMsg("")
                }, 2000);
            }
        }

    }

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
    const handleChangesForRadioBtnNo = e => {
        setRadioBtnNo(e.target.value)
    }
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/Login");
    };

    return (
        <section className="uploadprop">
            <p>{errMsg}</p>
            <h2>Hi Emmanuel, welcome to your dashboard</h2>
            <div>
                <h1>Upload a Property</h1>
                <form onSubmit={handleSubmit}>

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
                                <input onChange={handleChangesForTimeFrom} value={timeFrom} type="time" placeholder="From"/>
                                <p>To</p>
                                <input onChange={handleChangesForTimeTo} value={timeTo} type="time" placeholder="" />
                            </div>
                        </div>
                        <div className="extras-container">
                            <h1>Extras</h1>
                            <div className="pets-container">
                                <p className="">Pets Allowed:</p>
                                <div className="yes-no-container">
                                    <p>Yes</p>
                                    <input onClick={handleChangesForRadioBtnYes} type="radio" value="yes" name="petQuerry"/>
                                </div>
                                <div className="yes-no-container">
                                    <p>No</p>
                                    <input onClick={handleChangesForRadioBtnNo}  type="radio" value="no" name="petQuerry"/>
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
                    <button onClick={navigateToLogin}>log out</button>
                </form>
            </div>
        </section>
    )
}

export default PropUpload;
