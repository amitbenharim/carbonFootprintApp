import React, {PureComponent} from 'react'
import {WrappedIcon} from './Elements'
import { PieChart, Pie, Cell } from 'recharts';



class PieGraph extends PureComponent {
  constructor({data, colors, width, height, icon}) {
    super()
    this.data = data
    this.colors = colors
    this.width = width
    this.height = height
    this.icon = icon
    this.total = this.data.map(p=>p.value).reduce((a, b) => a + b, 0)
  }

  render() {

    const text = this.icon === undefined ? 
    [<text key={1} x={this.width/1.92} y={this.width/2.29} textAnchor="middle" dominantBaseline="middle" style={{fontSize: this.width/15.62}}>
      {this.total} kg of
    </text>,
    <text key={2} x={this.width/1.92} y={this.width/1.92} textAnchor="middle" dominantBaseline="middle" style={{fontSize: this.width/15.62}}>
      CO2 emitted
    </text>,
    <text key={3} x={this.width/1.92} y={this.width/1.66} textAnchor="middle" dominantBaseline="middle" style={{fontSize: this.width/15.62}}>
      Today
    </text>]
    :
    <foreignObject width="100" height="50" x="5" y="20" onClick={this.icon.update}>
      <WrappedIcon update={this.icon.update} color={this.icon.color} text={this.icon.text} name={this.icon.name} size={this.icon.size} />
    </foreignObject>

    return (
      <PieChart style={{display: "contents", textAlign: "center"}} width={this.width} height={this.width} onMouseEnter={this.onPieEnter}>
        <circle cx={this.width/2 + 5} cy={this.width/2 + 5} r={this.width/4.36} fill={this.icon ? this.colors[0] : "white"}>
        </circle>
        {text}
        <Pie
          data={this.data}
          cx={this.width/2}
          cy={this.width/2}
          innerRadius={this.width/4}
          outerRadius={this.width/2.67}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {this.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={this.colors[index % this.colors.length]} />
          ))}
        </Pie>
        
      </PieChart>
    );
  }
}

class Clock extends PureComponent {
  constructor({data, colors, width, height, icon, average}) {
    super()
    this.average = average
    this.data = data
    this.colors = colors
    this.width = width
    this.height = height
    this.icon = icon
    this.total = this.data.map(p=>p.value).reduce((a, b) => a + b, 0)
  }

  render() {

    const text = 
    <foreignObject width={this.width} height={this.width/2} x={this.width/2} y={this.width/5*4 - 2} onClick={this.icon.update}>
      <WrappedIcon update={this.icon.update} color={this.icon.color} name={this.icon.name} size={this.icon.size * (this.width/100)} />
    </foreignObject>

    let emissions = this.data[0].value;
    const name = this.data[0].name;
    let items = []
    console.log(emissions)
    const percentage = emissions / this.average;

    if (emissions === 0) {
      items = items.concat([[{name: name, value: 0}, {name: "complement", value: this.average}]])
    }

    while (emissions > 0 && items.length < 6) {
      if (emissions >= this.average) {
        items = items.concat([[{name: name, value: this.average}]])
        emissions -= this.average
      }

      else {
        items = items.concat([[
          {name: name, value: emissions},
          {name: "complement", value: this.average - emissions}
        ]])
        emissions = 0;
      }
    } 

    return (
      <div style={{display: "inline-block"}}>
        <PieChart style={{display: "contents", textAlign: "center"}} width={this.width*2} height={this.width*2} onMouseEnter={this.onPieEnter}>
          <circle cx={this.width} cy={this.width} r={this.width/4.36} fill={this.icon ? this.colors[0] : "white"}>
          </circle>
          {text}
          {
          items.map((data, i) =>
          <Pie
            data={data}
            cx={this.width-5}
            cy={this.width-5}
            innerRadius={(this.width/(4) + 0.1*(i+0.2)*this.width)}
            outerRadius={(this.width/(8/3) + 0.1*(i+0.2)*this.width)}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0? this.colors[(index + i) % this.colors.length] : "#d5d5d5"} />
            ))}
          </Pie>)
        }
        </PieChart>
        <h5 style={{textAlign: "center", fontSize: 36*(this.width/100)}}>
          {(Math.round(percentage * 100)) + "% of"} <br /> {"avg"}
        </h5>
      </div>
    );
  }
}

export {PieGraph, Clock}