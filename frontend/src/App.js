import './App.css'
import React, { useState} from 'react'
import communicate from './services/communicate'
import {Header, Field, WrappedIcon, SensitiveField, Toggle, Icon} from './Elements'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import {PieGraph, Clock} from './PieGraph'
import QuickSurvey from './pages/quickSurvey'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import {DietTemplate, EnergyTemplate, TransportTemplate, GoalSettingTemplate} from './template'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"
import {PeriodChart} from "./AreaChart"

//const bcrypt = require('bcryptjs')
const crypto = require('crypto')

function validateEmail(mail) 
{
 if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function encryptPassword(password) { 
     
  // Creating a unique salt for a particular user 
    const salt = (100).toString(16)
   
     // Hashing user's salt and password with 1000 iterations, 
      
    const hashed = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`)

    return hashed.join('')
 };


const App = () => {
  const [validDetails, setValidDetails] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatedPassword, setRepeatedPassword] = useState("")
  const [token, setToken] = useState("")

  const [securityQuestion, setSecurityQuestion] = useState("What was the model of your first car?")
  const [securityExpectedAnswer, setSecurityExpectedAnswer] = useState("")
  const [securityGivenAnswer, setSecurityGivenAnswer] = useState("")

  const [entryDate, setEntryDate] = useState(new Date())
  const [displayDate, setDisplayDate] = useState(new Date())
  const [summaryPeriod, setSummaryPeriod] = useState(1)
  const [graphDisplay, setGraphDisplay] = useState("all")
  const [page, setPage] = useState("/login")

  const [id, setId] = useState(null)

  const [energyUsage, setEnergyUsage] = useState([])
  const [diet, setDiet] = useState([])
  const [transport, setTransport] = useState([])
  const [goals, setGoals] = useState([])

  const [energyBools, setEnergyBools] = useState([])
  const [dietBools, setDietBools] = useState([])
  const [transportBools, setTransportBools] = useState([])

  const [survey, setSurvey] = useState({
    residents: 1,
    homeSize: 0,
    electricityConsumption: 0,
    renewablePercentage: 0,
    electricityOffset: 0,
    gasUsage: 0,
    gasOffset: 0,
    yearlyShortFlights: 0,
    yearlyLongFlights: 0,
    weekdayMetroTrainMileage: 0,
    weekdayVlineTrainMileage: 0,
    weekdayDieselBusMileage: 0,
    weekdayHybridBusMileage: 0,
    weekdayCarMileage: 0,
    weekdayHybridCarMileage: 0,
    weekdayTaxiMileage: 0,
    weekendMetroTrainMileage: 0,
    weekendVlineTrainMileage: 0,
    weekendDieselBusMileage: 0,
    weekendHybridBusMileage: 0,
    weekendCarMileage: 0,
    weekendHybridCarMileage: 0,
    weekendTaxiMileage: 0,
    carSize: "M",
    beef: 0,
    lamb: 0,
    pork: 0,
    chicken: 0
  })

  const [challenges, setChallenges] = useState({
    busCount: 0,
    trainCount: 0,
    bikeCount: 0,
    chickenCount: 0,
    vegCount: 0,
    heatingCount: 0,
    lightCount: 0
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [securityQuestionValid, setSecurityQuestionValid] = useState(false)
  //const [usernameValid, setUsernameValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState(
    {
      notifications: false,
      tracking: false,
      publicProfile: false,
    }
  )

  const transportStats = {
    'small car': 0.17,
    'medium car': 0.23,
    'large car': 0.25,
    "hybrid bus": 0.12,
    "diesel bus": 0.084,
    "bus": 0.102,
    "metro train": 0.02,
    "vline train": 0.04,
    "taxi": 0.14,
    "uber": 0.14,
    "car pool": 0.11
  }

  const transportIcons = {
    'car': {name: 'car', color: "red", size: 24},
    "bus": {name: 'bus', color: "purple", size: 24},
    "train": {name: 'train', color: "green", size: 24}
  }
  const transportGroups = {
    "bus": ["bus", "hybrid bus", "diesel bus"],
    "train": ["metro train", "vline train"],
    "car": ['small car', 'medium car', 'large car', 'taxi', 'uber', 'car pool']
  }

  const dietStats = {
    "fruit": 0.8,
    'carrot': 1,
    'onion': 2,
    'potato': 2,
    'tomato': 3,
    'cucumber': 1,
    'capsicum': 2,
    "cheese": 5,
    "fish": 4,
    "poultry": 4,
    "egg": 2,
    "sweets": 1,
    "beef": 10,
    "pork": 5,
    "lamb": 9,
    "chicken": 4,
    "bread": 0.4,
    "pasta": 3,
    "rice": 4,
    "barley": 2,
    "oat": 2,
    "vegetable": 3,
  }



  const dietCompleteIcons = {
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

  const dietIcons = {
    'fruit': {name: 'apple-alt', color: "red", size: 24},
    'cheese': {name: 'cheese', color: "yellow", size: 24},
    "sweets": {name: 'cookie', color: "brown", size: 24},
    "meat": {name: 'hamburger', color: "brown", size: 24}
  }
  const dietGroups = {
    'fruit': ["fruit", 'carrot', 'onion', 'potato', 'tomato', 'cucumber', 'capsicum', "bread",
    "pasta", "rice", "barley", "oat"],
    'cheese': ["cheese"],
    "sweets": ["sweets"],
    "meat": ["fish", "poultry", "egg", "beef", "lamb", "pork"]
  }

  const energyIcons = {
    'electricity': {name: 'charging-station', color: "orange", size: 24},
    'gas': {name: 'burn', color: "red", size: 24}
  }

  let appState = {}

  const setObject = (object, setter, name) => (k) => (value) => {
    setter({...object, [k]: value})
    sendData(value, name, k)
  }

  const setSurveyState = setObject(survey, setSurvey, "survey")
  const setSettingsState = setObject(settings, setSettings, "settings")

  const updateState = () => {
    appState = {survey, challenges, settings, energy: energyUsage, energyBools, transport, goals, transportBools, diet, dietBools, id, username, token}
  }
  updateState()

  const notnull = (value, def) => (value === undefined || value === null || value.toString() === "undefined" || typeof(value) === "undefined") ? def : value

  const setGroup = (item, setter, data) => {
    if (data === undefined) {
      data = item
    }
    let newItem = {}, i
    const itemParameters = Object.keys(item)
    for (i in itemParameters) {
      let v = itemParameters[i]
      newItem[v] = notnull(data[v], item[v])
    }

    setter(newItem)
  }
  let emptyDict = {}
  for (var i in Object.keys(dietCompleteIcons)) {
    emptyDict[Object.keys(dietCompleteIcons)[i]] = 0
  }

  const setData = data => {
    console.log(data)
    setId(data["_id"])
    setGroup(survey, setSurvey, data["survey"])
    setGroup(challenges, setChallenges, data["challenges"])
    setGroup(settings, setSettings, data["settings"])
    setEnergyUsage(notnull(data["energy"], []))
    setTransport(notnull(data["transport"], []))
    setDiet(notnull(data["diet"], []).filter(i => i.dict !== undefined))
    setGoals(notnull(data["goals"], []))
    setEnergyBools(notnull(data["energyBools"], []))
    setTransportBools(notnull(data["transportBools"], []))
    setDietBools(notnull(data["dietBools"], []))
  }

  const setError = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(""), 5000)
  }
  const getData = () => {
    let encryptedPassword
    if (token === "") {
      encryptedPassword = encryptPassword(password)
      setToken(encryptedPassword)
    }
    else {
      encryptedPassword = token 
    }
    
    const success = communicate.get({username, token: encryptedPassword})
    .then((data) => {
      if (data["error"] !== undefined) {

        setError(data["error"])
      }
      else {
        setData(data)
        setValidDetails(true)
      }
    })
    .catch(() => {
      setError("This is probably a bug in my code. Please tell me what went wrong. In the meantime, try refereshing the page to see if it helps")
      setToken("")
    })
    
    updateState()
    return success
  }

  const sendData = (val, k, k2) => {
    updateState()
    if (token === "") {
      const encryptedPassword = encryptPassword(password)
      setToken(encryptedPassword)
      appState.token = encryptedPassword
    }
    
    const dict = (k2 === undefined) ? (k === undefined ? appState : {...appState, [k]: val}) : {...appState, [k]: {...appState[k], [k2]: val}}
    if (username === "" || password === "") {
      
      setError("you must fill in your username and password")
    }
    communicate.create(dict)
    .then((data) => {
        if (data["error"] !== undefined) {
          setError(data["error"])
        }
        else {
          setValidDetails(true)
          console.log(page)
          if (page === "/create_account") {
            communicate.createSecurityQuestion({username: username, securityQuestion: securityQuestion, answer: securityExpectedAnswer})
          }
        }
      } 
    )
    .catch(() => {
        setError("This is probably a bug in my code. Please tell me what went wrong. In the meantime, try refereshing the page to see if it helps")
    })
  }

  const login = () => {
    setLoading(true)
    getData()
    setTimeout(() => {setLoading(false)}, 500)
  }

  const createAccount = () => {
    setPage("/create_account")
    setLoading(true)
    if (username !== "" && password !== "" && password === repeatedPassword && validateEmail(email)) {
      setToken(encryptPassword(password))
      sendData()

      setPassword("")
      setRepeatedPassword("")
    }
    else if (password !== repeatedPassword) {
      setError("Your password must match your repeated password")
    }
    else if (!validateEmail(email)) {
      setError("Please fill in a valid email address")
    }
    else {
      setError("You must fill out all fields")
    }
    setPage("/profile")
    setTimeout(() => {setLoading(false)}, 500)
  }

  const updateDetails = (setter) => (val) => {
    setter(val)
  }

  const Login = () => {
    return ( 
      <div>
        <SensitiveField text="Username" color="green" value={username} units="" update={updateDetails(setUsername)}/>
        <SensitiveField text="Password" color="green" value={password} units="" type="password" update={updateDetails(setPassword)} oneKeyDown={e => (e.key === "Enter") ? login() : ""}/>
        <div className="d-grid gap-2">
          <Link to="/" onClick={login}>
            <Button variant="primary" size="md" style={{width: "100%"}}>
              Login
            </Button>
          </Link>
          <Link to="/create_account" onClick={() => setPage("/create_account")}>
            <Button variant="secondary" size="md" style={{width: "100%"}}>
              Create Account
            </Button>
          </Link>
        </div>
        {loading ? <Spinner animation="border" /> : ""}
        <p>{errorMessage}</p>
      </div>
    )
  }
  
  const CreateAccount = () => {
    return ( 
      <div>
        <SensitiveField text="Username" color="green" value={username} units="" update={updateDetails(setUsername)}/>
        <Field text="Email" type="email" color="green" value={email} units="" update={updateDetails(setEmail)}/>
        <label>Choose Security Question</label>
        <select class="form-select" aria-label="Default select example" value={securityQuestion} onChange={e => updateDetails(setSecurityQuestion(e.target.value))}>
          <option value="What was the model of your first car?">What was the model of your first car?</option>
          <option value="What was the name of your childhood friend?">What was the name of your childhood friend?</option>
          <option value="What was the name of your primary school?">What was the name of your primary school?</option>
          <option value="What was the name of the first street you lived in?">What was the name of the first street you lived in?</option>
          <option value="What was the name of your year one teacher?">What was the name of your year one teacher?</option>
        </select>
        <label>Response to security question</label>
        <Field text="Answer to security question" color="green" value={securityExpectedAnswer} units="" type="text" update={updateDetails(setSecurityExpectedAnswer)}/>
        <SensitiveField text="Password" color="green" value={password} units="" type="password" update={updateDetails(setPassword)}/>
        <SensitiveField text="Repeat password" color="green" value={repeatedPassword} units="" type="password" update={updateDetails(setRepeatedPassword)}/>
        <Link to="/profile" onClick={createAccount}>
            <Button variant="primary" size="md" style={{width: "100%"}}>
              Create Account
            </Button>
        </Link>
        {loading ? <Spinner animation="border" /> : ""}
        <p>{errorMessage}</p>
      </div>
    )
  }

  const Settings = () => {
    return (
      <div>
        <Header text="Settings" color="blue"/>
        <Toggle header="Allow pop up notifications" checked={settings.notifications} update={setSettingsState("notifications")}/>
        <Toggle header="Allow tracking for transportation" checked={settings.tracking} update={setSettingsState("tracking")}/>
        <Toggle header="Make your profile public" checked={settings.publicProfile} update={setSettingsState("publicProfile")}/>
        <Link to="/profile">
        <Button variant="info" size="md" className="m-2">
        <WrappedIcon text="Profile" name="user" color="green" size="36"/>
        </Button>
        </Link>
        <Header text="Credits" />
        <p>
          This app was made by the Faculty of Chemical Engineering and the Faculty of Information Technology at Monash University and sponsored by Woodside.
        </p>
      </div>
    )
  }

  const ConfirmUsername = () => {
    console.log("confirm username rendered")
    const verify = () => {
      const result = communicate.getSecurityQuestion(username)
        setTimeout(() => {
        if (result.securityQuestion !== undefined) {
          console.log(result)
          console.log(result.securityQuestion)
          console.log(result.answer)
          setSecurityExpectedAnswer(result.answer)
          setSecurityQuestion(result.securityQuestion)
          
          //setUsernameValid(true)
        }
        else {
          setError("The username is not in our database. Please try again!")
        }}, 2000)
      
    }
    return (
      <div>
        <h3>Reset your password</h3>
        <p>{errorMessage}</p>
        <SensitiveField text="Username" color="green" value={username} units="" update={updateDetails(setUsername)}/>
        <Link to="/security_question" onClick={verify}>
          <Button size="md" className="m-2">
            Next
          </Button> 
        </Link>
      </div>
    )
  }

  const SecurityQuestion = () => {
    setErrorMessage("")
    const verify = () => {
      if (securityExpectedAnswer === securityGivenAnswer) {
        setSecurityQuestionValid(true)
      }
      else {
        setError("The answer you provided to the security question did not match our records. Please try again! you gave us " 
        + securityGivenAnswer + " instead of " + securityExpectedAnswer)
      }
    }
    return (
      <div>
        <h3>Reset your password</h3>
        <p>{errorMessage + " " + securityExpectedAnswer}</p>
        <h5>Security Question</h5>
        <Field text={securityQuestion} color="green" type="text" value={securityGivenAnswer} units="" update={setSecurityGivenAnswer}/>
        <Link to="/reset_password" onClick={verify}>
          <Button size="md" className="m-2">
            Next
          </Button> 
        </Link>
      </div>
    )
  }

  const ResetPassword = () => {
    setErrorMessage("")
    setPassword("")
    setRepeatedPassword("")
    const verify = () => {
      if (password === repeatedPassword) {
        
      }
      else {
        setError("The passwords do not match. Please reenter your password!")
      }
    }
    return (
      <div>
        <h3>Reset your password</h3>
        <p>{errorMessage}</p>
        <h5>New password for {username}</h5>
        <SensitiveField text={"Enter your new password"} color="green" type="password" value={password} units="" update={updateDetails(setPassword)}/>
        <SensitiveField text={"Reenter your new password"} color="green" type="password" value={repeatedPassword} units="" update={updateDetails(setRepeatedPassword)}/>
        <Link to="/reset_password" onClick={verify}>
          <Button size="md" className="m-2">
            Next
          </Button> 
        </Link>
      </div>
    )
  }

  const prev = (setter) => (date) => (val=1) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()-val)
    setter(newDate)
  }
  const tomorrow = (setter) => (date) => (val=1) => {
    const today = new Date()
    if (date.getDate() !== today.getDate() || date.getMonth() !== today.getMonth() || date.getFullYear() !== today.getFullYear()) {
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+val)
      setter(newDate)
    }
  }

  const pad2 = str => str.length === 2 ? str : "0" + str
  const getDate = (date) => {
    const month = (parseInt(date.getMonth())+1).toString()
    const day = date.getDate().toString()
    const year = date.getFullYear().toString()
    return year + "-" + pad2(month) + "-" + pad2(day)
  }
  const filterToday = (date) => (items) => {
    return items.filter(i => {
      if (i.date === getDate(date)) {
        return true
      }
      return false
    })    
  }

  const filterTodayRange = (date) => (items) => {
    return items.filter(i => {
      if (i.start!==undefined && i.end!==undefined && i.start <= getDate(date) && i.end >= getDate(date)) {
        return true
      }
      return false
    })  
  }

  const findDistance = (date) => (type) => {
    return filterToday(date)(transport).filter(i => i.type === type).map(i => i.length).reduce((a, b) => a + b, 0)
  }

  const findQuantity = (date) => (type) => {
    return filterToday(date)(diet).map(i => {
      if (typeof(i) === "object")
        if (typeof(i["dict"]) === "object") {
          if (typeof(i["dict"][type]) === "number") {
            return i["dict"][type]
          }
          console.log(3)
          return 0
        }
        else {
          console.log(2)
          return 0
        }
      else {
        console.log(1)
        return 0
      }
      
    }
    ).reduce((a, b) => a + b, 0)
  }

  const billConsumption = (bill) => {
    return bill.consumption*(100-bill.offset)/100/(Math.abs((new Date(bill.end) - (new Date(bill.start)))) / 86400000 + 1)
    
  }
  const findConsumption = (date) => (type) => {
    const bills = filterTodayRange(date)(energyUsage).filter(i => i.type === type)
    if (bills.length >= 1) {
      return bills.map(billConsumption).reduce((a, b) => a + b, 0)
    }
    else {
      if (energyBools.includes(date)) {
        return 0
      }

      if (type === "gas") {
        return ((100 - survey["gasOffset"])/100) * survey["gasUsage"]
      }
      else if (type === "electricity") {
        return ((100 - survey.renewablePercentage)/100) * ((100 - survey["electricityOffset"])/100) * survey["electricityConsumption"]
      }
      return -1
    }
  }

  const calcTransportEmissions = (date) => {
    const isWeekday = 1<= displayDate.getDay() && displayDate.getDay()<=5
    
    const findDist = findDistance(date)
    let transportEmissions = Math.round(Object.keys(transportStats).map(k => findDist(k) * transportStats[k]).reduce((a, b) => a + b, 0))

    if (transportEmissions === 0 && !transportBools.includes(getDate(date))) {
      const period = isWeekday ? "weekday" : "weekend"
      const carFactor = (survey.carSize === "L") ? 0.25 : (survey.carSize === "M" ? 0.23 : 0.17)
      transportEmissions = carFactor * survey[period + "CarMileage"]
      transportEmissions += 0.12 * survey[period + "HybridCarMileage"]
      transportEmissions += 0.084 * survey[period + "DieselBusMileage"] + 0.12 * survey[period + "HybridBusMileage"]
      transportEmissions += 0.02 * survey[period + "MetroTrainMileage"] + 0.04 * survey[period + "VlineTrainMileage"]
      transportEmissions += 0.14 * survey[period + "TaxiMileage"]
      transportEmissions = Math.round(transportEmissions)
    }

    else if (transportBools.includes(getDate(date))) {
      transportEmissions = 0
    }
    return transportEmissions
  }

  const calcDietEmissions = (date) => {
    const findQuant = findQuantity(date)
    let dietEmissions = Math.round(Object.keys(dietStats).map(k => findQuant(k) * dietStats[k]).reduce((a, b) => a + b, 0))
    
    if (dietEmissions === 0 && !dietBools.includes(getDate(date))) {
      dietEmissions = Math.round((2.52 * survey.beef + 1.94 * survey.lamb + 0.63 * survey.pork + 0.29 * survey.chicken) / 7)
    }
    else if (dietBools.includes(getDate(date))) {
      dietEmissions = 0
    }
    return dietEmissions
  }

  const calcEnergyEmissions = (date) => {
    return Math.round(1.17 * findConsumption(date)("electricity") / survey.residents + 0.05153 * findConsumption(date)("gas") / survey.residents)
  }

  const Home = () => {
    const transportEmissions = calcTransportEmissions(displayDate)
    
    const dietEmissions = calcDietEmissions(displayDate)
  
    const energyEmissions = Math.round(calcEnergyEmissions(displayDate))
  
    const pie = <PieGraph width={180} height={180}
      data={[{ name: 'Transport', value: transportEmissions},
      { name: 'Diet', value: dietEmissions },
      { name: 'Energy', value: energyEmissions}]
        }
      colors={['#0088FE', '#00C49F', '#FFBB28', '#FF8042']}
      />
    
    const clockWidth = 50;
 
    return (
      <div>
        <Alert variant="info">
          <Alert.Heading>Welcome back {username}!</Alert.Heading>
          <p>
            Fun fact of the day (to be completed)
          </p>
          <p>
            Actual fact
          </p>
        </Alert>
        <div>
        <div className="p-4">
        <h4 style={{display: "inline-block", width: 220}}> 
        {displayDate.toString().slice(0, 15)}
        </h4>
        <button className="btn-primary btn m-2" onClick={() => {setDisplayDate(new Date())}}>{"Today"}</button><br/>
        <button onClick={() => prev(setDisplayDate)(displayDate)(1)} className="btn-success btn-lg">
              {"<<"}
        </button>
        
          <Link to="/daily_summary">
            {pie}
          </Link>
          <button onClick={() => tomorrow(setDisplayDate)(displayDate)(1)} className="btn-success btn-lg">
              {">>"}
          </button> 
          </div>
          <Link to="/transport" style={{marginLeft: 25}}>
          <Clock width={clockWidth} height={clockWidth} icon={{text:"Transport", name:"bus", color:"black", size:"36"}}
          data={
            [{ name: 'Transport', value: transportEmissions}]
          }
          average={5.508}
          colors={['#0088FE', 'rgb(79 16 255)', 'rgb(254 12 175)', 'rgb(250 0 65)']}
          
          /></Link>
          <Link to="/diet">
          <Clock width={clockWidth} height={clockWidth} icon={{text:"Diet", name:"hamburger", color:"black", size:"36"}}
          data={
            [{ name: 'Diet', value: dietEmissions }
              ]}
              average={19.15}
          colors={['#00C49F', 'rgb(0 86 69)', 'rgb(0 0 0)', 'rgb(153 0 0)']}
          /></Link>
          <Link to="/energy">
          <Clock width={clockWidth} height={clockWidth} icon={{text:"Energy", name:"charging-station", color:"black", size:"36"}} 
          data={
            [{ name: 'Energy', value: energyEmissions}]
          }
          average={9.31}
          colors={['#FFBB28', 'rgb(170 116 0)', 'rgb(153 0 0)']}
          /></Link>
          <br />
          **The brightly coloured part of the CO2 meters (blue for transport, green for diet and yellow for electricity)<br />
          represent your emissions in that sector as a percentage of the average Australian emissions for that sector.
          </div>
      </div>
    )
  }
  
  const DetailedSurvey = () => {
    const dates = Array(summaryPeriod).fill(0).map((i, index) => new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate()-index))
    let start="", end=""
    const data = dates.map(date => {
      const formattedDate = getDate(date)
      const transportEmissions = calcTransportEmissions(date)
      const dietEmissions = calcDietEmissions(date)
      const energyEmissions = calcEnergyEmissions(date)
      if (graphDisplay === "transport") {
        return {name: formattedDate, transport: transportEmissions}
      }
      else if (graphDisplay === "diet") {
        return {name: formattedDate, diet: dietEmissions}
      }
      else if (graphDisplay === "energy") {
        return {name: formattedDate, energy: energyEmissions}
      }
      return {name: formattedDate, transport: transportEmissions, diet: dietEmissions, energy: energyEmissions}
    }).reverse()
    
    const prevPeriod = (val) => {
      if (val === 1 || val === 7) {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() - val)
        setDisplayDate(newDate)
      }
      else if (val === 31) {
        const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), 0)
        setDisplayDate(newDate)
      }
      else if (val === 365) {
        const newDate = new Date(displayDate.getFullYear() - 1, displayDate.getMonth(), displayDate.getDate())
        setDisplayDate(newDate)
      }
      
    }
    const tomorrowPeriod = (val) => {
      const today = new Date()
      if (getDate(displayDate) < getDate(today)) {
        if (val === 1 || val === 7) {
          const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate()+val)
          setDisplayDate(newDate)
        }
        else if (val === 31) {
          const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth() + 2, 0)
          setDisplayDate(newDate)
        }
        else if (val === 365) {
          const newDate = new Date(displayDate.getFullYear() + 1, displayDate.getMonth(), displayDate.getDate())
          setDisplayDate(newDate)
        }
        
      }
    }

    const sum = (arr) => {
      return arr.reduce((a, b) => a + b, 0)
    }

    let colors = []
    if (graphDisplay === "transport") {
      colors = ['#0088FE', '#00C49F', '#FFBB28']
    }
    else if (graphDisplay === "diet") {
      colors = ['#00C49F', '#FFBB28']
    }
    else if (graphDisplay === "energy") {
      colors = ['#FFBB28']
    }
    else if (graphDisplay === "all") {
      colors = ['#0088FE', '#00C49F', '#FFBB28']
    }

    const days = ["Su", "M", "Tu", "W", "Th", "F", "Sa"]
    function daysInMonth (year, month) {
      return new Date(year, month+1, 0).getDate();
    }

    let underpart = "";

    if (summaryPeriod === 1) {
      start=displayDate.toDateString()
      end=""
      underpart = 
      <div>
          {["transport", "all"].includes(graphDisplay) ?
          <TransportTemplate 
          transportHistory={transport} 
          transportBools={transportBools} 
          stats={transportStats}
          setStateBools={(val) => {updateDetails(setTransportBools)(val); sendData(val, "transportBools")}}
          setState={(val) => {updateDetails(setTransport)(val); sendData(val, "transport")}}
          date={displayDate} setDate={setDisplayDate} summary={true}/> : ""}
          {["diet", "all"].includes(graphDisplay) ? 
          <DietTemplate
          mealHistory={diet}
          dietBools={dietBools}
          icons={dietCompleteIcons}
          stats={dietStats}
          setStateBools={(val) => {updateDetails(setDietBools)(val); sendData(val, "dietBools")}}
          setState={(val) => {updateDetails(setDiet)(val); sendData(val, "diet")}}
          date={displayDate} setDate={setDisplayDate}
          summary={true}/> : ""}
          {["energy", "all"].includes(graphDisplay) ? 
          <EnergyTemplate
          energy={energyUsage}
          energyBools={energyBools} 
          setStateBools={(val) => {updateDetails(setEnergyBools)(val); sendData(val, "energyBools")}}
          setState={(val) => {updateDetails(setEnergyUsage)(val); sendData(val, "energy")}}
          date={displayDate} setDate={setDisplayDate}
          summary={true}/> : ""}
      </div>
    }
    else if (summaryPeriod === 7) {
      let nums = []
      for (var i = 6; i >= 0; i--) {
        nums.push(i)
      }
      
      const ns = nums.map(i => new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() - i))
      start= (new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate()-6)).toDateString()
      end=" - " + displayDate.toDateString()

      underpart =
      <div>
      <table>

      {
        <tr style={{verticalAlign: "top"}}>
          {
              ns.map(j => 

              <td style={{border: "2px solid black"}}>
              {days[j.getDay()]}
              <br />
              {
              Object.keys(transportGroups).map( k => {
                const value = Math.round(sum(transportGroups[k].map(findDistance(j))))
                if (value !== 0)
                  return <span style={{display: "inline-block"}}><WrappedIcon {...transportIcons[k]} size={18}/> <span>{value}&nbsp;</span></span>
                return ""
              })}

              {
                Object.keys(transportGroups).map( k => Math.round(sum(transportGroups[k].map(findDistance(j))))).reduce((a, b) => a + b, 0) === 0 ?
                [<br/>] :
                ""
              }
              <br />
              
              {
                Object.keys(dietGroups).map( k => {
                  const value = Math.round(sum(dietGroups[k].map(findQuantity(j))))
                  if (value !== 0)
                    return <span style={{display: "inline-block"}}><WrappedIcon {...dietIcons[k]} size={18}/> <span>{value}&nbsp;</span> </span>
                  return ""
                })
              }
              {
                Object.keys(dietGroups).map( k => Math.round(Math.round(sum(dietGroups[k].map(findQuantity(j)))))).reduce((a, b) => a + b, 0) === 0 ?
                [<br/>] :
                ""
              }
              <br />
              {
                Object.keys(energyIcons).map( k => {
                  const value = Math.round(findConsumption(j)(k))
                  if (value !== 0)
                    return <span style={{display: "inline-block"}}><WrappedIcon {...energyIcons[k]} size={18}/> <span>{value}&nbsp;</span> </span>
                  return ""
                })
              }
              {
                Object.keys(energyIcons).map( k => Math.round(findConsumption(j)(k))).reduce((a, b) => a + b, 0) === 0 ?
                [<br/>] :
                ""
              }
              </td>)
            }
        </tr>
      }
      </table>

      ** note that the measurement for the vehicle icons are in km,
      the measurements for the food are in servings and the measurements for gas and electricity are in MJ and kWh respectively
      </div>
    }
    else if (summaryPeriod === 31) {
      start=(new Date(displayDate.getFullYear(), displayDate.getMonth(), 1)).toDateString()
      end=" - " + displayDate.toDateString()
      let today = displayDate
      console.log(getDate(today))
      let day = today.getDay()
      let dayGrid = []
      const daysInLastMonth = (new Date(today.getFullYear(), today.getMonth(), 0)).getDate()
      dayGrid.push([])
      for (i = today.getDay() - 1; i >= 0; i--) {
        dayGrid[0].push([daysInLastMonth - i, -1])
      }
      dayGrid.push([])
      
      let monthDay = 1
      
      let level = 0
      const monthDays = daysInMonth(displayDate.getFullYear(), displayDate.getMonth())
      console.log((monthDays % 7) + day === 6)
      while (monthDay <= monthDays || ((monthDay + day) % 7)  !== 1) {
        let grey = 0
        let value = monthDay
        if (value > monthDays) {
          value = value - monthDays
          grey = -1
        }
        dayGrid[level].push([value, grey])
        monthDay+=1
        if ((day + monthDay - 1)%7 === 0) {
          level += 1
          dayGrid.push([])
        }
      }
      
      underpart = 
      <table style={{border: "1px solid black"}}>
        <tr>
          {["M", "T", "W", "T", "F", "S", "S"].map(item => <td style={{border: "1px solid black", color: "black", backgroundColor: "lightblue", width: 50}}>{item}</td>)}
        </tr>
        {
          dayGrid.map(level => 
              <tr style={{border: "1px solid black"}}>
                {
                  level.map(entry => 
                  {
                    if (entry[1] === -1) {
                      return <td style={{border: "1px solid black", color: "grey", backgroundColor: "white", verticalAlign: "top"}}>{entry[0]}</td>
                    }
                    else {
                      const d = new Date(displayDate.getFullYear(), displayDate.getMonth(), entry[0])
                      return (
                      <td style={{border: "1px solid black", color: "grey", backgroundColor: "#cedff2", verticalAlign: "top"}}><span style={{color: "black"}}>{entry[0]}</span><br/>
                      
                      <span ><WrappedIcon block="inline-block" {...{text:"", name:"bus", color:"blue", size:"12"}} />{Math.round(calcTransportEmissions(d))}</span><br/>
                      
                      <span ><WrappedIcon block="inline-block" {...{text:"", name:"hamburger", color:"green", size:"12"}} />{Math.round(calcDietEmissions(d))}</span><br/>
                      
                      <span ><WrappedIcon block="inline-block" {...{text:"", name:"charging-station", color:"orange", size:"12"}}/>{Math.round(calcEnergyEmissions(d))}</span><br/>
                      </td>)
                    }
                  })
                }
              </tr>
          )
        }
      </table>
    }
    else {
      start=(new Date(displayDate.getFullYear(), 0, 1)).toDateString()
      end=" - " + displayDate.toDateString()
      let nums = []
      for (i = 11; i >= 0; i--) {
        nums.push(i)
      }
      
      const ns = nums.map(i => {
        let dict = {energy: 0, diet: 0, transport: 0}
        for (var j = 1; j <= daysInMonth(displayDate.getFullYear(), i); j++) {
          const d = new Date(displayDate.getFullYear(), i, j)
          dict["transport"] += calcTransportEmissions(d)
          dict["diet"] += calcDietEmissions(d)
          dict["energy"] += calcEnergyEmissions(d)
        }
        
        return dict
      })
      console.log(ns)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      underpart = 
      <div>
      <h3>Yearly Summary</h3>

      
      {
          ns.map((i, j) => 

          <div>
          {months[j]}&nbsp;
          <span ><WrappedIcon block="inline-block" {...{text:"", name:"bus", color:"blue", size:"24"}} /> &nbsp;
          {Math.round(i.transport)}</span>
          &nbsp;           
          <span ><WrappedIcon block="inline-block" {...{text:"", name:"hamburger", color:"green", size:"24"}} /> &nbsp;
          {Math.round(i.diet)}</span>
          &nbsp;            
          <span ><WrappedIcon block="inline-block" {...{text:"", name:"charging-station", color:"orange", size:"24"}}/> &nbsp;
          {Math.round(i.energy)}</span>
                      
          </div>)
        }
        {
          [ns.reduce((a, b) => 
          {return {energy: a.energy + b.energy, transport: a.transport + b.transport, diet: a.diet + b.diet}},
          {energy: 0, diet: 0, transport: 0})].map((i, j) => 

          <div>
          {"Total"}&nbsp;
          <span ><WrappedIcon block="inline-block" {...{text:"", name:"bus", color:"blue", size:"24"}} /> &nbsp;
          {Math.round(i.transport)}</span>
          &nbsp;           
          <span ><WrappedIcon block="inline-block" {...{text:"", name:"hamburger", color:"green", size:"24"}} /> &nbsp;
          {Math.round(i.diet)}</span>
          &nbsp;            
          <span ><WrappedIcon block="inline-block" {...{text:"", name:"charging-station", color:"orange", size:"24"}}/> &nbsp;
          {Math.round(i.energy)}</span>
                      
          </div>)
        }
      
      </div>
    }
    
    const periods = [
      {
        text: "Daily",
        name: "calendar-day",
        color: "red",
        period: 1,
        update: () => {setSummaryPeriod(1)}
      },
      {
        text: "Weekly",
        name: "calendar-week",
        color: "blue",
        period: 7,
        update: () => {setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth(), displayDate.getDate() - displayDate.getDay())) ;setSummaryPeriod(7)}
      },
      {
        text: "Monthly",
        name: "calendar",
        color: "grey",
        period: 31,
        update: () => {setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth()+1, 0)); setSummaryPeriod(31)}
      },
      {
        text: "Yearly",
        name: "calendar-alt",
        color: "green",
        period: 365,
        update: () => {setDisplayDate(new Date(displayDate.getFullYear(), 11, 31)); setSummaryPeriod(365)}
      },
    ]
    const types = [
      {
        text: "Transport",
        name: "bus",
        color: "#0088FE",
        display: "transport",
        update: () => {setGraphDisplay("transport")}
      },
      {
        text: "Diet",
        name: "hamburger",
        color: "#00C49F",
        display: "diet",
        update: () => {setGraphDisplay("diet")}
      },
      {
        text: "Energy",
        name: "charging-station",
        color: "#FFBB28",
        display: "energy",
        update: () => {setGraphDisplay("energy")}
      },
      {
        text: "All",
        name: "cubes",
        color: "black",
        display: "all",
        update: () => {setGraphDisplay("all")}
      },
    ]
   
    const toButton = i => 
      <Button variant={(i.period === summaryPeriod || i.display === graphDisplay) ? "primary" : "light"} className="m-1" onClick={i.update}>
        <WrappedIcon block="inline-block" style={{display: "inline-block"}} text={i.text} name={i.name} color={i.color} size={12}/>
      </Button>
    return (
      <div>
        <h3>Daily Summary</h3>
        <h4 style={{display: "inline-block", marginRight: "10px"}}>{start + end}</h4>
        <button className="btn-primary btn-lg m-2" onClick={() => {setDisplayDate(new Date())}} style={{marginRight: 10}}>{"Today"}</button><br/>
        <button onClick={()=>prevPeriod(summaryPeriod)} className="btn-success btn-lg m-2">
              {"<<"}
        </button>
        
          <button onClick={()=>tomorrowPeriod(summaryPeriod)} className="btn-success btn-lg">
              {">>"}
          </button> <br /><br />
          {periods.map(toButton)}
          <br/>
          {types.map(toButton)}
                    
          {(summaryPeriod !== 1) ? <PeriodChart name="main" colors={colors} data={data} /> : ""}
          {summaryPeriod !== 1 ? <p>** note that each unit on the y-axis represents 1 kg of CO2</p> : ""}
          {underpart}

      </div>
    )
  }

  const Transport = () => {
    return (
      <TransportTemplate 
      transportHistory={transport} 
      transportBools={transportBools} 
      stats={transportStats}
      setStateBools={(val) => {updateDetails(setTransportBools)(val); sendData(val, "transportBools")}}
      setState={(val) => {updateDetails(setTransport)(val); sendData(val, "transport")}}
      date={entryDate} setDate={setEntryDate}/>
    )
  }

  const Diet = () => {
    return (
      <DietTemplate
      mealHistory={diet}
      dietBools={dietBools}
      icons={dietCompleteIcons}
      stats={dietStats}
      setStateBools={(val) => {updateDetails(setDietBools)(val); sendData(val, "dietBools")}}
      setState={(val) => {updateDetails(setDiet)(val); sendData(val, "diet")}}
      date={entryDate} setDate={setEntryDate}/>
    )
  }

  const Energy = () => {
    return (
      <EnergyTemplate
      energy={energyUsage}
      energyBools={energyBools} 
      setStateBools={(val) => {updateDetails(setEnergyBools)(val); sendData(val, "energyBools")}}
      setState={(val) => {updateDetails(setEnergyUsage)(val); sendData(val, "energy")}}
      date={entryDate} setDate={setEntryDate} />
    )
  }

  const Challenges = () => {
    const tree = <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
    /*
    <div>
        <Header text="Goals" color="blue"/>
        <h3>Goal Effect - TO BE IMPLEMENTED</h3>

        <h4>Today</h4>

        
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>

        <h4>This week</h4>

        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>
        <Icon block="inline-block" text="" name="tree" color="green" size="36"/>

        <br />
        <Icon block="inline-block" text="" name="tree" color="green" size="12"/> = 5kg CO2

        <h3>Recommended Goals TO BE IMPLEMENTED</h3>
        <p>Use filter work to add goals on conditions. Entering the data can be similar to energy, diet, transport stuff with
          an additional progress function + report which is automatically updated
        </p>
        Sample conditions:
        <ul>
          <li>Usage of a personal vehicle on weekdays for the past month - try taking the train or bus to work one day a week</li>
          <li>Usage of a personal vehicle on some weekdays for the past month - add a public transport day/rideshare day</li>
          <li>Usage of buses on some weekdays for the past month - consider using trains or trams</li>
          
          <li>Meatless day challenge when the user consistently eats meat on a particular day (checks the past month)</li>
          <li>During winter if we have at least half a year of energy consumption data - if the gas consumption is significantly higher
            then add a goal of heating less this winter
          </li>
        </ul>

        <Link to="/">
          <Button variant="primary" size="md" style={{width: "100%"}}>
            See my emissions
          </Button>  
        </Link>
      </div>
    */
    return (
      <GoalSettingTemplate goals={goals}
      setState={(val) => {updateDetails(setGoals)(val); sendData(val, "goals")}}
      date={entryDate} setDate={setEntryDate} summary={false}/>
    )
  }

  const InDevelopment = () => {
    return (
      <div>
        <Header text="Oops, looks like the page you were looking for could not be found. Either this is not a valid page or this page is currently in development."/>
      </div>
    )
  }

  return (
    <Router className="d-grid gap-2 App p-3">
      <div>
        <Navbar bg="light" expand="lg" style={{textAlign: "center"}}>
          <Container>
          <Link to="/">
            <Navbar.Brand>
              <img style={{verticalAlign: "top"}} src="favicon.ico" alt="carbon footprint logo"></img>
            </Navbar.Brand>
          </Link>              
          <Link to="/challenges" style={{textDecoration: "None"}}>
            <Icon text="Goals" name="chart-line" color="green" size="36"/>
          </Link>
          <Link to="/settings" style={{textDecoration: "None"}}>
            <Icon text="Settings" name="cog" color="grey" size="36"/>
          </Link>
          </Container>
        </Navbar>

      <div className="p-3">
      <Switch>
        <Route path="/create_account">
          {!validDetails ? CreateAccount() : <Redirect to="/profile" />}
        </Route>
        <Route path="/login">
          {!validDetails ? Login() : page==="/login" ? <Redirect to="/" /> : <Redirect to="/profile" />}
        </Route>
        <Route path="/profile">
          {!validDetails ? <Redirect to={page} /> : <QuickSurvey survey={survey} setSurveyState={setSurveyState} />}
        </Route>
        <Route path="/confirm_username">
          <ConfirmUsername />
        </Route>
        <Route path="/security_question">
          <SecurityQuestion />
        </Route>
        <Route path="/reset_password">
          {!validDetails ? ( !securityQuestionValid ? <Redirect to={"/confirm_username"} /> : ResetPassword() ) : <Redirect to="/profile" />}
        </Route>
        <Route path="/daily_summary">
        {!validDetails ? <Redirect to={page} /> : <DetailedSurvey />}
        </Route>
        <Route path="/challenges">
        {!validDetails ? <Redirect to={page} /> : <Challenges />}
        </Route>
        <Route path="/settings">
        {!validDetails ? <Redirect to={page} /> :<Settings />}
        </Route>
        <Route path="/transport">
        {!validDetails ? <Redirect to={page} /> :<Transport />}
        </Route>
        <Route path="/diet">
        {!validDetails ? <Redirect to={page} /> :<Diet />}
        </Route>
        <Route path="/energy">
        {!validDetails ? <Redirect to={page} /> :<Energy />}
        </Route>
        <Route path="/in_development">
        {!validDetails ? <Redirect to={page} /> :<InDevelopment />}
        </Route>
        <Route path="/">
        {!validDetails ? <Redirect to={page} /> :<Home />}
        </Route>
      </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
