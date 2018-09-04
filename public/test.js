/*
function sendMessage(message, itsMe){
    var messageList = document.getElementById("message-list")
    var newMessage = document.createElement("span");

    console.log(messageList)

    newMessage.innerHTML = messsage;
    var className;

    if(itsMe){
        className = "me";
        scrollToButtom = true;
    }
    else {
        className = "not-me";
    }

    var message = document.getElementById("message-input");
    message.addEventListener("keypress", function(event) {
        var key = event.which || event.keyCode;
        if(key === 13 && this.value.trim() !== "")
        {
            sendMessage(this.value, true);
            this.value = "";
        }
});
}

sendMessage("le mando mis avejas pa que lo piquen", true);
*/

function sendMessage(message){
    var message = document.getElementById("message-input");
    message.addEventListener('keypress', function(event){
        var key = event.which || event.keyCode;
        if (key === 13){
            console.log(message.value);
        }
    });
}
