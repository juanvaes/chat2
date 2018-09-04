
var socket = io.connect('http://localhost:3000')

/*
Let's emit an event when someone type enter
*/
/* Emite events */
var message = document.getElementById("message-input");
console.log(message.value);
console.log(1234);
message.addEventListener("keypress", function(event) {
  var key = event.which || event.keyCode;
  if(key === 13 && this.value.trim() !== "")
  {
    sendMessage(this.value, true);
    this.value = "";
  }
});

/* Listen for events */
//----------------------------------------------------------------
// Confirm connection message
socket.on('connect', function(data){
    socket.emit('join', 'Client connected');
});

/* Functions */
//----------------------------------------------------------------
function sendMessage(message, itsMe) { // ...Mario
    var messageList = document.getElementById("message-list");
    
    var scrollToBottom = (messageList.scrollHeight - messageList.scrollTop - messageList.clientHeight < 80);
  
    var lastMessage = messageList.children[messageList.children.length-1];
    
    var newMessage = document.createElement("span");
    newMessage.innerHTML = message;
  
    var className;
    
    if(itsMe)
    {
      className = "me";
      scrollToBottom = true;
    }
    else
    {
      className = "notme";
    }
    
    if(lastMessage && lastMessage.classList.contains(className))
    {
      lastMessage.appendChild(document.createElement("br"));
      lastMessage.appendChild(newMessage);
    }
    else
    {
      var messageBlock = document.createElement("div");
      messageBlock.classList.add(className);
      messageBlock.appendChild(newMessage);
      messageList.appendChild(messageBlock);
    }
    
    if(scrollToBottom)
      messageList.scrollTop = messageList.scrollHeight;
  }

  
