var socket = io();

var label = $('#lblNewTicket')

socket.on('connect', function() {
    console.log('Connected to Server');
});

socket.on('disconnect', function() {
    console.log('Connection Lost');
});

socket.on('currentState', function(data) {
    label.text(data.currentTicket);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});