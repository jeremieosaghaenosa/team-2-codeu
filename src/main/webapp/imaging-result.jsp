<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.HashMap" %>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/home.css"/>
    <meta charset="UTF-8">
    <title>Image Upload Analysis</title>
    <script src="${pageContext.request.contextPath}/js/navigation-loader.js"></script>
  </head>

  <body>
      <!--<a href="/"><img src="img/menulogo.png" id="logoHeader"></a>-->
      <nav>
        <ul id="navigation" class="menu">
            <li class="right"><a href="/">Home</a></li>
            <li class="right"><a href="/community.html">Our Community</a></li>
            <li class="right"><a href="/imaging.jsp">Is This a..?</a></li>
            <li class="right"><a href="/map.html">Can I Grow..?</a></li>
            <li class="right"><a href="/aboutus.html">About Us</a></li>
        </ul>
      </nav>

    <div id="intro">
          <div id="yes"  style="display: none;">
            <h1> YEAH, THIS LOOKS LIKE AN AVOCADO </h1>
            <iframe width="420" height="315" src="https://www.youtube.com/embed/k-cavEKkirc" frameborder="0" 
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      
          <div id="maybe"  style="display: none;">
            <h1> HAD TO GLANCE TWICE... </h1>
          </div>
      
          <div id="no"  style="display: none;">
            <h1> I DON'T SEE IT. </h1>
          </div>
      <h1>
          <%
            String result = (String) request.getAttribute("result");
            out.println("RESULT: "+ result);
          %>
          <script type="text/javascript">
              unhide();
              function unhide() {
                  var res = "<%=result%>";
                  document.getElementById(res).style.display = "block";
              }
          </script>
      </h1>
    </div>

  </body>

</html>