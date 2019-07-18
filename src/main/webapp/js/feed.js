// Fetch messages and add them to the page.
function fetchMessages() {
  const url = '/feed';
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if (messages.length == 0) {
      messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    } else {
      messageContainer.innerHTML = '';
    }
    messages.forEach((message) => {
      const messageDiv = buildMessageDiv(message);
      messageContainer.appendChild(messageDiv);
    });
  });
}

function buildMessageDiv(message) {
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add("left-align");
  usernameDiv.appendChild(document.createTextNode(message.user));

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('right-align');
  timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-headedr');
  headerDiv.appendChild(usernameDiv);
  headerDiv.appendChild(timeDiv);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.appendChild(document.createTextNode(message.text));



  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add("button-div");

  var br = document.createElement("br");
  buttonDiv.appendChild(br);

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Like";
  btn.onclick = function() {
    var id = message.id + "good";
    document.getElementById(id).textContent = parseInt(document.getElementById(id).textContent) + 1;
    like(message.timestamp, message.text)
  };

  buttonDiv.appendChild(btn);

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Dislike";
  btn.onclick = function() {
    var id = message.id + "bad";
    document.getElementById(id).textContent = parseInt(document.getElementById(id).textContent) + 1;
    dislike(message.timestamp, message.text)
  };
  buttonDiv.appendChild(btn);

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Reply";
  var hasClicked = false;

  btn.onclick = function() {
    // Create textbox to answer
    if (!hasClicked) {


      var submit = document.createElement("BUTTON");
      submit.innerHTML = "Submit";
      buttonDiv.append(submit);

      hasClicked = true;

      var form = document.createElement("FORM");
      form.method = "POST";
      form.action = "/reply";
      var area = document.createElement('TEXTAREA');
      area.id = "text";
      form.appendChild(area);
      replyDiv.appendChild(form);
      CKEDITOR.replace('text');

      for (var i in CKEDITOR.instances) {

        CKEDITOR.instances[i].on('change', function() {
          CKEDITOR.instances[i].updateElement();
        });

      }

      submit.onclick = function() {
        if (!document.getElementById("text").value == '') {
          var msg = CKEDITOR.instances["text"].document.getBody().getText();
          reply(message.id, msg);
          hasClicked = false;
        }
      }



    }


  };
  buttonDiv.appendChild(btn);


  const replyDiv = document.createElement('div');
  replyDiv.classList.add("button-div");

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Close Replies";
  btn.onclick = function() {
    fetchMessages();
  };
  replyDiv.appendChild(btn);


  var btn = document.createElement("BUTTON");
  btn.innerHTML = "See Replies";
  var hasClick = false;
  btn.onclick = function() {
    if (!hasClick) {
      hasClick = true;
      children(message.id, imageDiv);
    }
  };
  replyDiv.appendChild(btn);


  const imageDiv = document.createElement('div');
  imageDiv.classList.add("image-div");

  var br = document.createElement("br");
  imageDiv.appendChild(br);

  var pic = document.createElement("IMG");
  pic.setAttribute("src", "img/happy_avocado.png");
  pic.setAttribute("width", "150");
  pic.setAttribute("height", "128");
  pic.setAttribute("alt", "Happy Avocado");
  imageDiv.appendChild(pic);
  var likecounter = document.createElement("span");
  likecounter.setAttribute("id", message.id + "good");
  likecounter.textContent = message.like;
  imageDiv.appendChild(likecounter);


  var pic = document.createElement("IMG");
  pic.setAttribute("src", "img/sad_avocado.png");
  pic.setAttribute("width", "150");
  pic.setAttribute("height", "128");
  pic.setAttribute("alt", "Sad Avocado");
  imageDiv.appendChild(pic);
  var dislikecounter = document.createElement("span");
  dislikecounter.setAttribute("id", message.id + "bad");
  dislikecounter.textContent = message.dislike;
  imageDiv.appendChild(dislikecounter);



  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);
  messageDiv.appendChild(buttonDiv);
  messageDiv.appendChild(replyDiv);
  messageDiv.appendChild(imageDiv);


  return messageDiv;
}


function buildReply(message) {
  const usernameDiv = document.createElement('div');
  usernameDiv.classList.add("left-align");
  usernameDiv.appendChild(document.createTextNode(message.user));

  const timeDiv = document.createElement('div');
  timeDiv.classList.add('right-align');
  timeDiv.appendChild(document.createTextNode(new Date(message.timestamp)));

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('message-headedr');
  headerDiv.appendChild(usernameDiv);
  headerDiv.appendChild(timeDiv);

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('message-body');
  bodyDiv.appendChild(document.createTextNode(message.text));

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add("button-div");

  var br = document.createElement("br");
  buttonDiv.appendChild(br);

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Like";
  btn.onclick = function() {
    var id = message.id + "good";
    document.getElementById(id).textContent = parseInt(document.getElementById(id).textContent) + 1;
    like(message.timestamp, message.text)
  };

  buttonDiv.appendChild(btn);

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Dislike";
  btn.onclick = function() {
    var id = message.id + "bad";
    document.getElementById(id).textContent = parseInt(document.getElementById(id).textContent) + 1;
    dislike(message.timestamp, message.text)
  };
  buttonDiv.appendChild(btn);


  const imageDiv = document.createElement('div');
  imageDiv.classList.add("image-div");

  var pic = document.createElement("IMG");
  pic.setAttribute("src", "img/happy_avocado.png");
  pic.setAttribute("width", "50");
  pic.setAttribute("height", "28");
  pic.setAttribute("alt", "Happy Avocado");
  imageDiv.appendChild(pic);
  var likecounter = document.createElement("span");
  likecounter.setAttribute("id", message.id + "good");
  likecounter.textContent = message.like;
  imageDiv.appendChild(likecounter);


  var pic = document.createElement("IMG");
  pic.setAttribute("src", "img/sad_avocado.png");
  pic.setAttribute("width", "50");
  pic.setAttribute("height", "28");
  pic.setAttribute("alt", "Sad Avocado");
  imageDiv.appendChild(pic);
  var dislikecounter = document.createElement("span");
  dislikecounter.setAttribute("id", message.id + "bad");
  dislikecounter.textContent = message.dislike;
  imageDiv.appendChild(dislikecounter);


  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);
  messageDiv.appendChild(buttonDiv);
  messageDiv.appendChild(imageDiv);

  messageDiv.style.paddingLeft = "50px";

  return messageDiv;
}






function like(time, msgtext) {

  var url = "/like";
  url = url + "?date=" + time.toString() + "&text=" + msgtext;
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {});

}

function dislike(time, msgtext) {
  var url = "/dislike";
  url = url + "?date=" + time.toString() + "&text=" + msgtext;
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {});

}

function reply(parentId, reply) {
  var url = '/reply';
  url = url + "?parent=" + parentId + "&text=" + reply;
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    const messageContainer = document.getElementById('message-container');
    if (messages.length == 0) {
      messageContainer.innerHTML = '<p>There are no posts yet.</p>';
    } else {
      messageContainer.innerHTML = '';
    }
    messages.forEach((message) => {
      const messageDiv = buildMessageDiv(message);
      messageContainer.appendChild(messageDiv);
    });
  });
}


function children(parentId, childrenDiv) {
  var url = '/child';
  url = url + "?parent=" + parentId;
  fetch(url).then((response) => {
    return response.json();
  }).then((messages) => {
    messages.forEach((message) => {
      const messageDiv = buildReply(message);
      childrenDiv.appendChild(messageDiv)
    });
  });
}





// Fetch data and populate the UI of the page.
function buildUI() {
  addLoginOrLogoutLinkToNavigation();
  fetchMessages();


}
