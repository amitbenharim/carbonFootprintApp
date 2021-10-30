const express = require('express')
const app = express()
const cors = require('cors')
const path = require("path")
const mongoose = require('mongoose')
require('dotenv').config()
const nodemailer = require('nodemailer');

/*let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });*/

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const surveySchema = new mongoose.Schema({
    residents: Number,
    homeSize: Number,
    electricityConsumption: Number,
    renewablePercentage: Number,
    electricityOffset: Number,
    gasUsage: Number,
    gasOffset: Number,
    yearlyShortFlights: Number,
    yearlyLongFlights: Number,
    weekdayMetroTrainMileage: Number,
    weekdayVlineTrainMileage: Number,
    weekdayDieselBusMileage: Number,
    weekdayHybridBusMileage: Number,
    weekdayCarMileage: Number,
    weekdayHybridCarMileage: Number,
    weekdayTaxiMileage: Number,
    weekendMetroTrainMileage: Number,
    weekendVlineTrainMileage: Number,
    weekendDieselBusMileage: Number,
    weekendHybridBusMileage: Number,
    weekendCarMileage: Number,
    weekendHybridCarMileage: Number,
    weekendTaxiMileage: Number,
    carSize: String,
    beef: Number,
    lamb: Number,
    pork: Number,
    chicken: Number
})

const challengesSchema = new mongoose.Schema({
    busCount: Number,
    trainCount: Number,
    bikeCount: Number,
    chickenCount: Number,
    vegCount: Number,
    heatingCount: Number,
    lightCount: Number
})

const energySchema = new mongoose.Schema({
    start: String,
    end: String,
    type: String,
    consumption: Number,
    offset: Number
})

const goalSchema = new mongoose.Schema({
    start: String,
    end: String,
    status: String,
    goal: Number
})

const transportSchema = new mongoose.Schema({
    date: String,
    type: String,
    length: Number,
})

const dietSchema = new mongoose.Schema({
    date: String,
    dict: {}
})

const settingsSchema = new mongoose.Schema({
    notifications: Boolean,
    tracking: Boolean,
    publicProfile: Boolean
})

const userSchema = new mongoose.Schema({
    username: String,
    token: String,
    email: String,
    challenges: challengesSchema,
    survey: surveySchema,
    energy: [energySchema],
    energyBools: [String],
    transport: [transportSchema],
    transportBools: [String],
    diet: [dietSchema],
    dietBools: [String],
    goals: [goalSchema],
    settings: settingsSchema
})

const securityQuestionSchema = new mongoose.Schema({
    username: String,
    securityQuestion: String,
    answer: String
})

const User = mongoose.model('User', userSchema)

const SecurityQuestion = mongoose.model('SecurityQuestion', securityQuestionSchema)

app.use(cors())
app.use(express.json())


// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "frontend", "build")))


app.get('/users/:username/:token', (req, res) => {
    const token = req.params.token
    const username = req.params.username
    
    User.find({"token": token, "username": username}).then(users => 
    {   
        
        if (users.length >= 1) {
            res.json(users[0])
        }
        else {
            res.json({error: "incorrect username or password"})
        }
    })
})

app.post('/users/:username/:token', (req, res) => {
    const token = req.params.token
    const username = req.params.username
    
    const body = req.body

    User.find({"username": username}).then(users => 
    {   
        
        if (users.length === 0) {
            const user = new User(body)
            user.save()
            res.json(body)
        }
        else {
            User.find({"username": username, "token": token}).then(users => {
                if (users.length === 0) {
                    res.json({error: "incorrect username or password"})
                }
                else {
                    User.replaceOne({"_id": body.id}, {"_id": body.id, ...body}, (a, b) => {})
                    res.json(body)
                }
            })
        }
    })
})

app.get('/security/:username', (req, res) => {
    console.log("security question get request arrived")
    const username = req.params.username
    
    console.log(username)
    SecurityQuestion.find({username: username}).then(questions => 
    {   
        console.log("--")
        console.log(questions)
        if (questions.length >= 1) {
            res.json(questions[0])
        }
        else {
            res.json({error: "incorrect username"})
        }
    })
})

app.post('/security/:username', (req, res) => {
    const username = req.params.username
    const body = req.body

    console.log("security question post received")
    SecurityQuestion.find({"username": username}).then(questions => 
    {   
        console.log(questions)
        
        if (questions.length >= 1) {
            res.json({error: "this username is already in use"})
        }
        else {
            const securityQuestion = new SecurityQuestion({
                username: body.username,
                securityQuestion: body.securityQuestion,
                answer: body.answer

            })
            securityQuestion.save()
        }
    })
    
})

app.post('/changepassword/:username', (req, res) => {
    const username = req.params.username
    const body = req.body

    SecurityQuestion.find({"username": username}).then(questions => 
        {   
            if (questions.length >= 1) {
                const expected = questions[0]
                if (expected.securityQuestion === body.securityQuestion && expected.answer === body.answer) {
                    User.updateOne({"username": body.username}, {"token": body.token}, (a, b) => {})
                }
                else {
                    res.json({error: "invalid answer and/or security question"})
                }
            }
            else {
                
                res.json({error: "invalid username"})
            }
        })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})