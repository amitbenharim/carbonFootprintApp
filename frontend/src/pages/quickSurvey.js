import React from 'react'
import {Header, Field, Count, WrappedIcon} from '../Elements'
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button'

const QuickSurvey = ({survey, setSurveyState}) => {
    return (
        <div>
          <Header text="Profile" color="blue"/>
          
          <Header text="Energy emissions" color="blue"/>
          <Count min={1} max={Infinity} text="People in your home" color="green" value={survey.residents} update={setSurveyState("residents")} />
          <Field text="Monthly Electricity Consumption" color="green" value={survey.electricityConsumption} units="kWh" update={setSurveyState("electricityConsumption")}/>
          <Field text="What percentage of your energy is renewable?" min={0} max={100} color="green" value={survey.renewablePercentage} units="%" update={setSurveyState("renewablePercentage")}/>
          <Field text="What percentage of your electricity is offsetted by your energy provider?" min={0} max={100} color="green" value={survey.electricityOffset} units="%" update={setSurveyState("electricityOffset")}/>
          <Field text="Monthly gas usage" color="green" value={survey.gasUsage} units="MJ of energy" update={setSurveyState("gasUsage")}/>
          <Field text="What percentage of your gas is offsetted by your energy provider?" min={0} max={100} color="green" value={survey.gasOffset} units="%" update={setSurveyState("gasOffset")}/>
          
          <Header text="Transport" color="blue"/>
          
          <WrappedIcon update={() => {}} text="Train emissions - low emissions category" name="train" color="green" size="36" blockButton={false} />
          <Field text="Weekday Metro Train mileage" color="green" value={survey.weekdayMetroTrainMileage} units="km" update={setSurveyState("weekdayMetroTrainMileage")}/>
          <Field text="Weekend daily Metro Train mileage" color="green" value={survey.weekendMetroTrainMileage} units="km" update={setSurveyState("weekendMetroTrainMileage")}/>
          <Field text="Weekday Vline Train mileage" color="green" value={survey.weekdayVlineTrainMileage} units="km" update={setSurveyState("weekdayVlineTrainMileage")}/>
          <Field text="Weekend daily Vline Train mileage" color="green" value={survey.weekendVlineTrainMileage} units="km" update={setSurveyState("weekendVlineTrainMileage")}/>
  
          <WrappedIcon update={() => {}} text="Bus emissions - medium emissions category" name="bus" color="yellow" size="36" blockButton={false} />
          <Field text="Weekday Diesel Bus mileage" color="green" value={survey.weekdayDieselBusMileage} units="km" update={setSurveyState("weekdayDieselBusMileage")}/>
          <Field text="Weekend daily Diesel Bus mileage" color="green" value={survey.weekendDieselBusMileage} units="km" update={setSurveyState("weekendDieselBusMileage")}/>
          <Field text="Weekday Hybrid Bus mileage" color="green" value={survey.weekdayHybridBusMileage} units="km" update={setSurveyState("weekdayHybridBusMileage")}/>
          <Field text="Weekend daily Hybrid Bus mileage" color="green" value={survey.weekendHybridBusMileage} units="km" update={setSurveyState("weekendHybridBusMileage")}/>
  
  
          <WrappedIcon update={() => {}} text="Car emissions - high emissions category" name="car" color="red" size="36" blockButton={false} />
          <div class="p-3">
            <label class="">Car size</label>
            <div class="">
              <select value={survey.carSize} onChange={(event) => setSurveyState("carSize")(event.target.value)}>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </div>
          </div>
          <Field text="Weekday Car mileage" color="green" value={survey.weekdayCarMileage} units="km" update={setSurveyState("weekdayCarMileage")}/>
          <Field text="Weekend daily Car mileage" color="green" value={survey.weekendCarMileage} units="km" update={setSurveyState("weekendCarMileage")}/>
          <Field text="Weekday Hybrid Car mileage" color="green" value={survey.weekdayHybridCarMileage} units="km" update={setSurveyState("weekdayHybridCarMileage")}/>
          <Field text="Weekend daily Hybrid Car mileage" color="green" value={survey.weekendHybridCarMileage} units="km" update={setSurveyState("weekendHybridCarMileage")}/>
          <Field text="Weekday Taxi and Uber mileage" color="green" value={survey.weekdayTaxiMileage} units="km" update={setSurveyState("weekdayTaxiMileage")}/>
          <Field text="Weekend daily Taxi and Uber mileage" color="green" value={survey.weekendTaxiMileage} units="km" update={setSurveyState("weekendTaxiMileage")}/>
  
          <WrappedIcon update={() => {}} text="Flight emissions - very high emissions category" name="plane" color="darkred" size="36" blockButton={false} />
          <Count min={0} max={Infinity} text="Yearly flights <= 3hrs long" color="green" value={survey.yearlyShortFlights} update={setSurveyState("yearlyShortFlights")} />
          <Count min={0} max={Infinity} text="Yearly flights > 3hrs long" color="green" value={survey.yearlyLongFlights} update={setSurveyState("yearlyLongFlights")} />
          
          <Header text="Diet" color="blue"/>
          
          <Count min={0} max={Infinity} text="Beef meat meals per week" color="green" value={survey.beef} update={setSurveyState("beef")} />
          <Count min={0} max={Infinity} text="Lamb meat meals per week" color="green" value={survey.lamb} update={setSurveyState("lamb")} />
          <Count min={0} max={Infinity} text="Pork meals per week" color="green" value={survey.pork} update={setSurveyState("pork")} />
          <Count min={0} max={Infinity} text="Chicken meals per week" color="green" value={survey.chicken} update={setSurveyState("chicken")} />
          
          <Link to="/">
            <Button variant="primary" size="md" style={{width: "100%"}}>
              See my emissions
            </Button>
          </Link>
          <Header text="" color="" />
        </div>
      )
}

export default QuickSurvey