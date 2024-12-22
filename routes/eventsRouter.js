const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


const Event = require("../models/eventSchema")
const Registrations = require("../models/registrationSchema")

router.get("/", (req, res)=>{
    console.log("/");
})

router.post("/create", async (req, res) => {
    try{
        const {title, description, date,time, venue, capacity,organizer, tags} = req.body
        const event = new Event({title, description, date,time, venue, capacity,organizer, tags})
        await event.save()
        res.status(201).json({message: `Event created with id ${event._id}`})
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
});

router.post("/register/:eventId", async (req, res) => {
    try{
        const {studentId, name, email, department, year} = req.body;
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId)
        if(!event){
            res.status(404).json({message: "URL not Found"})
        }
        const registrations = await Registrations.countDocuments({eventId})
        console.log(registrations)

        if(registrations>= event.capacity){
            return res.status(400).json({error: "Event Capacity reached"})
        }
        const registration = new Registrations({studentId, name, email, department, year, eventId})
        await registration.save()
        res.status(201).json({message: "Registration Successfull"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});


router.put("/update/:eventId", async (req, res) => {
    try{
        const eventId = req.params.eventId;
        console.log(req.body)
        const update = await Event.findByIdAndUpdate(eventId, req.body)

        if(!update){
            return res.status(404).json({message: "Event not Found"})
        }
        res.status(201).json({message: "Event updated Sucessfully"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.delete("/:eventId", async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const event = await Event.findByIdAndDelete(eventId)

        if(!event){
            return res.status(404).json({message: "Event not Found"})
        }
        await Registrations.deleteMany({eventId})
        res.status(200).json({message: "Event Successfully deleted"})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.get("/all", async (req, res) => {
    try{
        const events = await Event.find().lean()
        console.log(events)
        res.status(200).json(events)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});

router.get("/:eventId", async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const event =  await Event.findById(eventId).lean()
        if(!event){
            return res.status(404).json({message: "Event not Found"})
        }
        res.status(200).json(event)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
});


module.exports = router

