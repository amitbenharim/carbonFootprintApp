import React, { useState} from 'react'
import {Field, WrappedIcon, Toggle} from './Elements'



const EnergyBillTemplate = ({k, autoOpen, deleteItem, updateState, start, end, type, consumption, offset}) => {
  const makeIcon = {
    'electricity': {name: 'charging-station', color: "yellow", size: 24},
    'gas': {name: 'burn', color: "red", size: 24}
  }

  const caps = {
    "gas": "Gas",
    "electricity": "Electricity"
  }
  const [edit, setEdit] = useState(autoOpen)
  const [startDate, updateStartDate] = useState(start)
  const [endDate, updateEndDate] = useState(end)
  const [energyType, updateEnergyType] = useState(type)
  const [energyConsumption, updateEnergyConsumption] = useState(consumption)
  const [energyOffset, updateEnergyOffset] = useState(offset)
  const toggle = () => {
    const newEdit = !edit
    setEdit(newEdit)
    if (!newEdit) {
      updateState({
        start: startDate,
        end: endDate,
        type: energyType,
        consumption: energyConsumption,
        offset: energyOffset
      })
    }
  }
        
        
  return ( 
    <div className="p-3">
      <WrappedIcon text={"| "+energyType} {...makeIcon[energyType]} block="inline-block"/>
      <div onClick={toggle} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 36, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
      <WrappedIcon text="" name={edit ? "save" : "edit"} color="black" size="24" block="inline-block" />
      </div>
      <div onClick={deleteItem} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 0, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
      <WrappedIcon text="" name="times" color="black" size="24" block="inline-block"/>
      </div>
      

      {edit ? <div>
        <Field text="Start date" type="date" color="green" value={startDate} units="" update={updateStartDate}/>
        <Field text="End date" type="date" color="green" value={endDate} units="" update={updateEndDate}/>
        <label>Energy type</label><br />
        {Object.keys(makeIcon).map(key => 
          <button className="btn btn-light" style={{margin: 5}} onClick={() => updateEnergyType(key)}>
          <WrappedIcon text={" " + key} {...makeIcon[key]} block="inline-block"/>
          </button>)}
          <br/><label>Selected: </label> <WrappedIcon text={energyType} {...makeIcon[energyType]} block="inline-block"/>
        <Field text={caps[energyType] + " consumption"} type="number" color="green" value={energyConsumption} units={energyType==="gas" ? "MJ" : "kWh"} update={updateEnergyConsumption}/>
        <Field text={caps[energyType] + " Carbon Offsetting percentage"} type="number" color="green" value={energyOffset} units="%" update={updateEnergyOffset}/>
      </div> : ""}
    </div>

  )
}

const EnergyTemplate = ({energy, energyBools, setState, setStateBools, date, setDate, summary}) => {
  return <SectorTemplate 
  sectorHistory={energy}
  sectorBools={energyBools}
  setState={setState}
  setStateBools={setStateBools}
  date={date}
  setDate={setDate}
  summary={summary}
  entryfunc={EnergyBillTemplate}
  defaultValues={{type: "electricity", consumption: 0, offset: 0}}
  sectorVerbName="energy"
  range={true} />
  }

    const MealTemplate = ({k, autoOpen, deleteItem, updateState, date, dict}) => {
      const makeIcon = {
        'carrot': {name: 'carrot', color: "orange", size: 24},
        'onion': {name: 'carrot', color: "white", size: 24},
        'potato': {name: 'carrot', color: "yellow", size: 24},
        'tomato': {name: 'carrot', color: "darksalmon", size: 24},
        'cucumber': {name: 'carrot', color: "green", size: 24},
        'capsicum': {name: 'carrot', color: "red", size: 24},
        'fruit': {name: 'apple-alt', color: "red", size: 24},
        'cheese': {name: 'cheese', color: "yellow", size: 24},
        "fish": {name: 'fish', color: "lightblue", size: 24},
        "pork": {name: "bacon", color: "brown", size: 24},
        "poultry": {name: 'drumstick-bite', color: "brown", size: 24},
        "egg": {name: 'egg', color: "lightgrey", size: 24},
        "sweets": {name: 'cookie', color: "brown", size: 24},
        "beef": {name: 'hamburger', color: "brown", size: 24},
        "lamb": {name: 'bone', color: "grey", size: 24},
        "bread": {name: 'bread-slice', color: "brown", size: 24},
        "pasta": {name: 'bread-slice', color: "orange", size: 24},
        "rice": {name: 'bread-slice', color: "white", size: 24},
        "barley": {name: 'bread-slice', color: "grey", size: 24},
        "oat": {name: 'bread-slice', color: "beige", size: 24},
      }
      //<WrappedIcon text={"| "+foodType} {...makeIcon[foodType]} block="inline-block"/>
      //<span>&nbsp;x{foodQuantity}</span>

      let emptyDict = {}
      for (var i in Object.keys(makeIcon)) {
        emptyDict[Object.keys(makeIcon)[i]] = 0
      }

      const [edit, setEdit] = useState(autoOpen)
      const [foodDate, updateFoodDate] = useState(date)
      const [foodDict, updateFoodDict] = useState((typeof(dict) === "undefined"  || typeof(dict) === "string") ? 
                                      emptyDict : dict)
      const toggle = () => {
        const newEdit = !edit
        setEdit(newEdit)
        console.log(foodDict)
        if (!newEdit) {
          updateState({
            date: foodDate,
            dict: foodDict,
          })
        }
      }

      const updateDict = (key) => (event) => {
        event.preventDefault()
        const val = parseInt(event.target.value)
        updateFoodDict({...foodDict, [key]: val})
      }
  
      return ( 
        <div className="p-3">
          
          <div style={{width: "90%"}}>{Object.keys(foodDict).filter(k => foodDict[k] !== 0).map(
            k => [<WrappedIcon text={" "+k } {...makeIcon[k]} block="inline-block"/>,
            <span>&nbsp;&nbsp;x{foodDict[k]}&nbsp;&nbsp;&nbsp;</span>]
          )}</div>
          <div onClick={toggle} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 36, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
          <WrappedIcon text="" name={edit ? "save" : "edit"} color="black" size="24" block="inline-block" />
          </div>
          <div onClick={deleteItem} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 0, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
          <WrappedIcon text="" name="times" color="black" size="24" block="inline-block"/>
          </div>
          
          {edit ? <div>
          <Field text="Consumption date" type="date" color="green" value={foodDate} units="" update={updateFoodDate}/>
      
          <label>Food summary (in servings)</label><br />
          {Object.keys(makeIcon).map(key =>
          <div style={{display: "inline-block", width: 150, border: "1px solid black"}}> 
            <WrappedIcon style={{padding: 1}} text={" " + key} {...makeIcon[key]} block="inline-block"/>
            <input type="number" min={0} step={1} value={foodDict[key]} 
            style={{width: 50, float: "right"}} onChange={updateDict(key)}></input>
          </div>)}
          </div> : ""}
        </div>
  
      )
    }
  
  
    const DietTemplate = ({mealHistory, dietBools, setStateBools, setState, date, setDate, summary, icons, stats}) => {
      return (
        <div>
        <SectorTemplate sectorHistory={mealHistory} sectorBools={dietBools} setState={setState} setStateBools={setStateBools} date={date} setDate={setDate} summary={summary} entryfunc={MealTemplate} defaultValues={{type: "fruit", quantity: 1}} sectorVerbName={"food"}/>
        {summary === undefined ? 
        <div style={{marginTop: 50}}>
          <h3>Emissions Reference</h3>
          <ul class="list-group">
            {
            Object.keys(icons).map(key => <li class="list-group-item list-group-item-info">
              <WrappedIcon text={"| " + key} {...icons[key]} block="inline-block"/> bogus servings <br/>
              = {" "}
              {Array(parseInt(parseInt((stats[key] / stats["bread"])))).fill(WrappedIcon({text: " | ", name: "bread-slice", size: 24, color: "brown", block:"inline-block"}))}
              {" "} bogus bread servings<br/>
              = {stats[key]} kg CO2
            </li>)
            
            }
          </ul>
        </div> : ""}
      </div>
        
      )
  }
  const TransportJourneyTemplate = ({k, autoOpen, deleteItem, updateState, date, type, length}) => {
    const makeIcon = {
      'small car': {name: 'car', color: "purple", size: 24},
      'medium car': {name: 'car', color: "orange", size: 24},
      'large car': {name: 'car', color: "red", size: 24},
      "hybrid bus": {name: 'bus', color: "violet", size: 24},
      "diesel bus": {name: 'bus', color: "purple", size: 24},
      "bus": {name: 'bus', color: "purple", size: 24},
      "metro train": {name: 'train', color: "green", size: 24},
      "vline train": {name: 'train', color: "blue", size: 24},
      "taxi": {name: 'car', color: "orange", size: 24},
      "uber": {name: 'car', color: "orange", size: 24},
      "car pool": {name: 'car', color: "violet", size: 24}
    }
    
    const [edit, setEdit] = useState(autoOpen)
    const [journeyDate, updateJourneyDate] = useState(date)
    const [vehicleType, updateVehicleType] = useState(typeof(type) === "string" ? type : "medium car")
    const [journeyLength, updateJourneyLength] = useState(length)
    const toggle = () => {
      const newEdit = !edit
      setEdit(newEdit)
      if (!newEdit) {
        updateState({
          date: journeyDate,
          type: vehicleType,
          length: journeyLength
        })
      }
    }

    return ( 
      <div className="p-3">
        
        <WrappedIcon text={"| "+vehicleType} {...makeIcon[vehicleType]} block="inline-block"/>
        <span style={{fontSize: 24}}>{" |" + "-".repeat(Math.min(journeyLength, 100)) +  "|" }</span>
        <div onClick={toggle} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 36, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
        <WrappedIcon text="" name={edit ? "save" : "edit"} color="black" size="24" block="inline-block" />
        </div>
        <div onClick={deleteItem} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 0, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
        <WrappedIcon text="" name="times" color="black" size="24" block="inline-block"/>
        </div>
        

        {edit ? <div>
        <Field text="Journey date" type="date" color="green" value={journeyDate} units="" update={updateJourneyDate}/>
        <label>Vehicle type</label><br />
        {Object.keys(makeIcon).map(key => 
          <button className="btn btn-light" style={{margin: 5}} onClick={() => updateVehicleType(key)}>
          <WrappedIcon text={" " + key} {...makeIcon[key]} block="inline-block"/>
          </button>)}
          <br/><label>Selected: </label> <WrappedIcon text={vehicleType} {...makeIcon[vehicleType]} block="inline-block"/>
        <Field text="Journey length" type="number" color="green" value={journeyLength} units="km" update={updateJourneyLength}/>
        </div> : ""}
      </div>

    )
  }


  const SectorTemplate = ({sectorHistory, sectorBools, setState, setStateBools, date, setDate, summary, entryfunc, defaultValues, sectorVerbName, range, isGoal}) => {
    const [history, setHistory] = useState(sectorHistory === undefined ? [] : sectorHistory)
    const [bools, setBools] = useState(sectorBools)
    const [key, setKey] = useState(history.length)
    const update = (index) => (update) => {
      const newHistory = history.slice(0, index).concat([update]).concat(history.slice(index+1))
      updateHistory(newHistory)
    }
    const deleteEntry = (index) => () =>  {
      const newHistory = history.slice(0, index).concat(history.slice(index+1))
      updateHistory(newHistory)
    }

    const updateShowing = (val) => {
      setBools(val)
      setStateBools(val)
    }

    const updateHistory = (val) => {
      setHistory(val)
      setState(val)
    }

    const [message, setMessage] = useState("")
    
    const pad2 = str => str.length === 2 ? str : "0" + str
    const getDate = (date) => {
      const month = (parseInt(date.getMonth())+1).toString()
      const day = date.getDate().toString()
      const year = date.getFullYear().toString()
      return year + "-" + pad2(month) + "-" + pad2(day)
    }

    const arr = (summary || range) ?  [0] : [0,1,2,3,4,5,6]
    const jump = range ? 1 : 7
    const dates = arr.map(i => {const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()-i); return [getDate(d), d.getDay()]})
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const prev = () => {
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-jump)
      setDate(newDate)
    }
    const tomorrow = () => {
      const today = new Date()
      if (getDate(today) > getDate(date)) {
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+jump)
        setDate(newDate)
      }
      else {
        setMessage("That's it, you are all caught up!")
        setTimeout(() => {setMessage("")}, 4000)
      }
    }

    const toggle = day => () => {
      if (bools.includes(day)) {
        updateShowing(bools.filter(d => d !== day))
      }
      else {
        updateShowing(bools.concat([day]))
      }
    }

    const filterFunction = (k) => (i) => {
      if (range) {
        return i[0].start <= k[0] && i[0].end >= k[0]
      }
      return i[0].date === k[0]
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return ( 
      <div className="p-3">
        <div>
        { summary ? "" : [typeof(isGoal) === "undefined" ? <h2>{capitalizeFirstLetter(sectorVerbName)} Emissions</h2> : <h2>Goals</h2>,
        range ? <h4>{date.toDateString()}</h4> : <h4>{(new Date(date.getFullYear(), date.getMonth(), date.getDate()-6)).toDateString()} - 
        {" " + date.toDateString()}</h4>,
        <button className="btn-primary btn-lg mb-2" onClick={prev} style={{marginRight: 10}}>{"<<"}</button>,
        <button className="btn-primary btn-lg mb-2" onClick={() => {setDate(new Date())}} style={{marginRight: 10}}>{"Today"}</button>,
        <button className="btn-primary btn-lg mb-2" onClick={tomorrow} style={{marginRight: 10}}>{">>"}</button>]}
         {<ul class="list-group">
         {message !== undefined && message !== "" ? <li class="list-group-item list-group-item-info">{message}</li>: ""}
         
                                      {dates
                                      .map(k => ([
                                      <li class="list-group-item list-group-item-info" style={{backgroundColor: "#f8f9fa"}}>
                                      {!bools.includes(k[0]) ? <button className="btn-primary btn-lg m-2" onClick={() => {
          const otherDefaults = (range) ? {start: k[0], end: k[0]} : {date: k[0]}
          updateHistory(history.concat([{...otherDefaults, ...defaultValues}]));;
          setKey(key+1);}
          } style={{marginRight: 10}}>+</button> : ""}
          {<div style={{width: 180, display: "inline-block"}}>{summary ? "" : (days[k[1]] + " " + k[0])}</div>}
          {typeof(isGoal) === "undefined" ?
          <Toggle header={"No " + sectorVerbName + " day"} checked={bools.includes(k[0])} inblock={true} notext={true} update={toggle(k[0])} />
          : ""}
          </li>]
                                        .concat(!bools.includes(k[0]) ? history.map((i, j) => [i, j]).filter(filterFunction(k))
                                      .map(i => <li class="list-group-item list-group-item-info">{entryfunc(
                                        {...i[0], autoOpen: false, k: i[1], deleteItem: deleteEntry(i[1]), updateState: update(i[1])}
                                        )}</li>).reverse(): "")))}
                                        </ul>}
        </div>
      </div>
  
      )
    }

  const TransportTemplate = ({transportHistory, transportBools, setState, setStateBools, date, setDate, summary, stats}) => {
    const makeIcon = {
      'small car': {name: 'car', color: "purple", size: 24},
      'medium car': {name: 'car', color: "orange", size: 24},
      'large car': {name: 'car', color: "red", size: 24},
      "hybrid bus": {name: 'bus', color: "violet", size: 24},
      "diesel bus": {name: 'bus', color: "purple", size: 24},
      "bus": {name: 'bus', color: "purple", size: 24},
      "metro train": {name: 'train', color: "green", size: 24},
      "vline train": {name: 'train', color: "blue", size: 24},
      "taxi": {name: 'car', color: "orange", size: 24},
      "uber": {name: 'car', color: "orange", size: 24},
      "car pool": {name: 'car', color: "violet", size: 24}
    }

    return (
      <div>
        <SectorTemplate sectorHistory={transportHistory} sectorBools={transportBools} setState={setState} setStateBools={setStateBools} date={date} setDate={setDate} summary={summary} entryfunc={TransportJourneyTemplate} defaultValues={{length: 0, type: "medium car"}} sectorVerbName="travel"/>
        {summary === undefined ? 
        <div style={{marginTop: 50}}>
          <h3>Emissions Reference</h3>
          <ul class="list-group">
            {
            Object.keys(makeIcon).map(key => <li class="list-group-item list-group-item-info">
              <WrappedIcon text={"| " + key} {...makeIcon[key]} block="inline-block"/> km <br/>
              = {" "}
              {Array(parseInt(stats[key] / 0.02)).fill(WrappedIcon({text: " | ", name: "train", size: 24, color: "gold", block:"inline-block"}))}
              {" "} train km<br/>
              = {stats[key]} kg CO2
            </li>)
            
            }
          </ul>
        </div> : ""}
      </div>
    )
    }
  
  const GoalSettingTemplate = ({goals, setState, date, setDate, summary}) => {
      return <SectorTemplate 
      sectorHistory={goals}
      sectorBools={[]}
      setState={setState}
      setStateBools={()=>{}}
      date={date}
      setDate={setDate}
      summary={summary}
      entryfunc={GoalTemplate}
      defaultValues={{status: "in progress", goal: ""}}
      sectorVerbName=""
      range={true}
      isGoal={true} />
  }

  const GoalTemplate = ({k, autoOpen, deleteItem, updateState, goal, status, start, end}) => {
      const makeIcon = {
        'completed': {name: 'check', color: "green", size: 24},
        'cancelled': {name: 'times', color: "red", size: 24},
        "in progress": {name: 'crosshairs', color: "brown", size: 24},
        'delayed': {name: 'clock', color: "orange", size: 24},
      }
      
      const [edit, setEdit] = useState(autoOpen)
      const [internalGoal, updateGoal] = useState(goal)
      const [internalStatus, updateStatus] = useState(status)
      const [internalCompleteDate, updateCompleteDate] = useState(end)
      const [internalStartDate, updateStartDate] = useState(start)
      const toggle = () => {
        const newEdit = !edit
        setEdit(newEdit)
        if (!newEdit) {
          updateState({
            end: internalCompleteDate,
            start: internalStartDate,
            status: internalStatus,
            goal: internalGoal
          })
        }
      }
  
      return ( 
        <div className="p-3">
          <WrappedIcon text={status} {...makeIcon[status]} block="inline-block"/>
          <div onClick={toggle} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 36, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
          <WrappedIcon text="" name={edit ? "save" : "edit"} color="black" size="24" block="inline-block" />
          </div>
          <div onClick={deleteItem} className="p-1 m-1" style={{background: "grey", position: "absolute", right: 0, top: 0, border: "3px solid black", backgroundColor: "lightgrey", display: "inline-block", align: "right"}}>
          <WrappedIcon text="" name="times" color="black" size="24" block="inline-block"/>
          </div>
          
  
          {edit ? <div>
          <Field text="Goal" type="text" color="green" value={internalGoal} units="" update={updateGoal}/>
          <label>Goal Status</label><br />
          {Object.keys(makeIcon).map(key => 
            <button className="btn btn-light" style={{margin: 5}} onClick={() => updateStatus(key)}>
            <WrappedIcon text={" " + key} {...makeIcon[key]} block="inline-block"/>
            </button>)}
            <br/><label>Selected: </label> <WrappedIcon text={internalStatus} {...makeIcon[internalStatus]} block="inline-block"/>
          <Field text="Start date" type="date" color="green" value={internalStartDate} units="" update={updateStartDate}/>
          <Field text="Completion date" type="date" color="green" value={internalCompleteDate} units="" update={updateCompleteDate}/>
          </div> : ""}
        </div>
  
      )
  }
  
  export {DietTemplate, EnergyTemplate, TransportTemplate, SectorTemplate, TransportJourneyTemplate, GoalSettingTemplate}