var socket = io();

socket.on('connect', function() {
    console.log('Connected to Server');
});

socket.on('disconnect', function() {
    console.log('Connection Lost');
});


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('Desk')) {
    window.location = 'index.html';
    throw new Error('Desk is needed');
}

var desk = searchParams.get('Desk');
var label = $('small');

$('h1').text('Desk ' + desk);

$('button').on('click', function() {
    socket.emit('answerTicket', { desk: desk }, function(resp) {
        if (resp.ok === false) {
            label.text(resp.message);
            alert(resp.message);
            return;
        } else {
            label.text(resp.ticket.number);
        }

    });
});