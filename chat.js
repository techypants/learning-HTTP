window.onload = function() {
    var textView = document.getElementById("text-view");
    var buttonSend = document.getElementById("send-button");
    var buttonStop = document.getElementById("stop-button");
    var label = document.getElementById("status-label");
    
    // Corrected WebSocket URL
    var socket = new WebSocket("ws://localhost:8080");

    
    socket.onopen = function(event) {
        label.innerHTML = "Connection open";
    };
    
    socket.onmessage = function(event) {
        if (typeof event.data === "string") {
            label.innerHTML = label.innerHTML + "<br/>" + event.data;
        }
    };
    
    socket.onclose = function(event) {
        var code = event.code;
        var reason = event.reason;
        var wasClean = event.wasClean;
        if (wasClean) {
            label.innerHTML = "Connection closed normally";
        } else {
            label.innerHTML = "Connection closed with message: " +
                reason + " (Code: " + code + ")";
        }
    };
    
    socket.onerror = function(event) {
        label.innerHTML = "Error: " + event;
    };
    
    buttonSend.onclick = function() { // Corrected property name
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(textView.value);
        }
    };
    
    buttonStop.onclick = function() {
        if (socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    };
};
