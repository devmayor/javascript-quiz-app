const EventEmitter = require("events");
const listener = require("./listener");

class EventTracker extends EventEmitter {

    events = [
        {
            event: "newuser",
            listeners: ["senduseremail", "sendwelcomenotification"]
        },
    ];

    constructor(){
        super();
        this.subscribeAll();
    }
    
    subscribeAll() {
        this.events.forEach(event => {
            this.on(event.event, data => {
                event.listeners.forEach(listen => {
                    listener[listen](data);
                });
            });
        });
    }
}

const Event = new EventTracker();

module.exports = {Event};