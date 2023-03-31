
import { useEffect, useState, useRef } from "react";
const PropUpload = () =>{
    const [drop,setdrop] = useState("neutral")
    const handlesub = ()=>{
        setdrop("neutral")
        
        console.log(drop);
    }
    const chand = e =>{
        setdrop(e.target.value)
    }
    return (
       <>
        <select onChange={chand} value={drop}>
            <option value="boy1">boy1</option>
            <option value="boy2">boy2</option>
            <option value="neutral">neutral</option>
            <option value="boy3">boy3</option>
            <option value="boy4">boy4</option>
        </select>
        <p>we do {drop}</p>
        <button type="button" onClick={handlesub}>submit</button>
       </>
    )
}

export default PropUpload;