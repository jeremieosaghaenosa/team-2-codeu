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
    like(message.timestamp, message.text)
  };

  buttonDiv.appendChild(btn);

  var btn = document.createElement("BUTTON");
  btn.innerHTML = "Dislike";
  btn.onclick = function() {
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
      buttonDiv.appendChild(form);
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
        }
      }



    }


  };
  buttonDiv.appendChild(btn);



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
  imageDiv.appendChild(document.createTextNode(message.like));


  var pic = document.createElement("IMG");
  pic.setAttribute("src", "img/sad_avocado.png");
  pic.setAttribute("width", "150");
  pic.setAttribute("height", "128");
  pic.setAttribute("alt", "Sad Avocado");
  imageDiv.appendChild(pic);
  imageDiv.appendChild(document.createTextNode(message.dislike));



  const messageDiv = document.createElement('div');
  messageDiv.classList.add("message-div");
  messageDiv.appendChild(headerDiv);
  messageDiv.appendChild(bodyDiv);
  messageDiv.appendChild(buttonDiv);
  messageDiv.appendChild(imageDiv);




  return messageDiv;
}

function like(time, msgtext) {

  var url = "/like";
  url = url + "?date=" + time.toString() + "&text=" + msgtext;
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

function dislike(time, msgtext) {
  var url = "/dislike";
  url = url + "?date=" + time.toString() + "&text=" + msgtext;
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








// Fetch data and populate the UI of the page.
function buildUI() {
  addLoginOrLogoutLinkToNavigation();
  fetchMessages();


  document.getElementById("message-container").addEventListener("click", function(e) {
    // e.target will be the item that was clicked on
    // e.target.style.color = "#F00";
    // console.log(e.path);

    // If they click username or date then e.path.length=9
    // Message-div is e.path[3]
    // Get innerhtml

    if (e.path.length == 9) {

      Object.keys(e.path).forEach(function(key) {
        if (key == 2) {
          var x = e.path[key].getElementsByClassName("left-align");
          var y = e.path[key].getElementsByClassName("right-align");
          var z = e.path[key].getElementsByClassName("message-body");

          var user = x[0].innerHTML;
          var time = y[0].innerHTML;
          var message = z[0].innerHTML;

          // console.log(user);
          // console.log(time);
          // console.log(message);
        }
      });

    }


    // If they click mssg then e.path.length=8
    // Message-div is e.path[2]
    // Get innerhtml
    if (e.path.length == 8) {
      Object.keys(e.path).forEach(function(key) {
        if (key == 1) {
          var x = e.path[key].getElementsByClassName("left-align");
          var y = e.path[key].getElementsByClassName("right-align");
          var z = e.path[key].getElementsByClassName("message-body");

          var user = x[0].innerHTML;
          var time = y[0].innerHTML;
          var message = z[0].innerHTML;

          // console.log(user);
          // console.log(time);
          // console.log(message);
        }
      });
    }


  })

}
