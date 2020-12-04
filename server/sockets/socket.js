const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('currentState', {
        currentTicket: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    });

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.nextTicket();
        callback(next);
    });

    client.on('answerTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk is needed'
            });
        }
        let answerTicket = ticketControl.answerTicket(data.desk);
        callback(answerTicket);

        client.broadcast.emit('currentState', {
            currentTicket: ticketControl.getLastTicket(),
            last4: ticketControl.getLast4()
        });

        //Update / Notify public screen
    });

});