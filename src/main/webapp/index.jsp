 <%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>


<!DOCTYPE html>

<html>

<head>
  <title>AvoAvo</title>
  <!-- Imports Jquery -->
  <link rel="stylesheet" href="css/landing.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="js/landing.js"></script>

  <!-- Imports Fonts -->
  <style>
    @import url('https://fonts.googleapis.com/css?family=Dosis|Open+Sans');
  </style>
</head>


<body>

  <!-- Header that contains logo at the top of the page -->
  <div>
    <div>
      <a href="/"><img src="img/menulogo.png" id="logoHeader"></a>
      <ul class="menu">
      <%
                UserService userService = UserServiceFactory.getUserService();
                if (userService.isUserLoggedIn()) {
                  String username = userService.getCurrentUser().getEmail();
              %>
              <li id ="right"><a href="/user-page.html?user=<%= username %>">Your Page</a></li>
                  <li id ="right"><a href="/logout">Logout</a></li>
              <% } else {   %>
                 <li id ="right"><a href="/login">Login</a></li>
              <% } %>

      </ul>
    </div>
  </div>


  <div id="grabSlice" class="button">
      <ul id="links">
        <li id ="center"><a href="/community.html">OUR COMMUNITY</a></li>
        <li id = "center"><a href="/feed.html">FORUM</a></li>
        <li id ="center"><a href="/imaging.jsp">IS THIS AN AVOCADO?</a></li>
        <li id ="center"><a href="/map.html" >CAN I GROW AVOCADOS?</a></li>
        <li id ="center"><a href="/aboutus.html">BEHIND THE SITE</a></li>
      </ul>
  </div>
  <!-- <h2>*FUN FACTS PLACE HOLDER*</h2> -->


  <!-- powered by yam logo (just to look cool ;) ) -->
  <img src="img/rightlogo.png" class="hideWithSize" id="avoLoveR">

  <img src="img/leftlogo.png" class="hideWithSize" id="avoLoveL">



</body>

</html>
