import './App.css';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
  
const ClickableButton = ({text, submit, style, buttonStyle}) => {
  if (typeof(style) == undefined) {
      style = {}
  }
  if (typeof(buttonStyle) == undefined) {
      buttonStyle = {}
  }
  return (
    <div style={style} className="pt-3 ps-3">
      <button style={buttonStyle} className="btn-primary" onClick={submit}>
        {text}
      </button>
    </div>
  )
}

const Icon = ({s, text, name, size, color, block}) => {
  return <div style={{...s, display: (block === undefined ? "block": "inline-block")}}><i className={"fas fa-" + name} style={{fontSize: parseInt(size), "color": color}}></i><span style={{display: (block === undefined ? "block": "inline-block"), color: "rgba(0, 0, 0, 0.55)"}}>{text}</span></div>
}

const WrappedIcon = ({s, text, name, color, size, blockButton, update, block}) => {
  const icon = <Icon s={s} block={block} text={text} name={name} color={color} size={size} />
  const wrappedIcon = blockButton ? <div className="d-grid gap-2"><Button variant="light" size="lg">{icon}</Button></div> : icon
  return update !== undefined ? <div onClick={update} className={blockButton ? "" : "p-3"}>{wrappedIcon}</div> : wrappedIcon
}

const Header = ({key, text, color}) => {
  return (
    <div className={"divider p-3"}>
      <h3 className="">{text}</h3>
    </div>
  )
}

const Slider = ({key, text, min, max, value, update}) => {
  const [val, setVal] = useState(value)

  return (
    <div>
      <label class="form-label">{text}</label>
      <input type="range" class="form-range" min={min} max={max} value={val} onChange={(e) => {e.preventDefault(); const v = e.target.value; update(v); setVal(v)}}></input>
    </div>
  )
}

const SensitiveField = ({key, text, color, value, units, type, update, time}) => {
  
  if (typeof(type) === undefined) {
    type = "text"
  }
  const [val, setVal] = useState(value)
  const changeText = (event) => {
    event.preventDefault()
    const new_val = event.target.value
    setVal(new_val)
    update(new_val)
  }

  return (
    <div className={"p-3"}>
      <Form.Label>{text + " " + units}</Form.Label>    
      
      <div className="">
      <Form.Control onChange={changeText} type={type} placeholder={text} value={val} />
      </div>
    </div>
  )
}

const Field = ({key, text, color, value, units, type, update, time, min, max}) => {
  if (type === undefined) {
      type = "number"
  }

  if (min === undefined) {
    min = 0
  }

  if (max === undefined) {
    max = Infinity
  }
  
  const [val, setVal] = useState(value)
  const changeText = (event) => {
    event.preventDefault()
    const new_val = event.target.value
    setVal(new_val)
    update(new_val)
  }

  return (
    <div className={"p-3"}>
      <Form.Label>{text + " " + units}</Form.Label>    
    
      <div className="">
      <Form.Control onChange={changeText} type={type} placeholder={text} value={val} />
      </div>
    </div>
  )
}

const Toggle = ({header, checked, update, inblock, notext}) => {
  const [isChecked, setChecked] = useState(checked)

  return (
    <div className="m-3" style={inblock ? {display: "inline-block"} : {}}>
      <div style={{display: "inline-block"}}>
        <label className="custom-control-label me-3" style={{fontSize: 16}}>{header}</label> <br />
      </div>
      <label className="switch">
        <input type="checkbox" onClick={() => {update(!isChecked); setChecked(!isChecked)}} checked={isChecked}/>
        <span className="slider round"></span>
        
      </label>
      {(notext === undefined) ? <label className="custom-control-label mx-3" style={{fontSize: 16}}>{isChecked ? "YES" : "NO"}</label> : ""}
      
    </div>
  )
}

const Count = ({key, min, max, text, color, value, update}) => {
  const [val, setVal] = useState(value)
  const substract = (event) => {
    event.preventDefault()
    const new_val = Math.max(min, val-1)
    setVal(new_val)
    update(new_val)
  }
  const add = (event) => {
    event.preventDefault()
    const new_val = Math.min(val+1, max)
    setVal(new_val)
    update(new_val)
  }
  
  return (
    <div className={"divider col-md-12 p-3"}>
      <label className="">{text}</label>
      <div>
          <button onClick={substract} className="btn-success btn-lg">
              -
          </button>
          <label className="p-3">
          {val}
          </label>
          <button onClick={add} className="btn-success btn-lg">
              +
          </button>
      </div>
    </div>
  )
}

  export {ClickableButton, Header, Slider, Field, Count, WrappedIcon, SensitiveField, Toggle, Icon};