<%@ page import = "java.util.Map" %>
<%@ page import = "java.util.HashMap" %>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/imaging.css"/>
    <meta charset="UTF-8">
    <title>Image Upload Analysis</title>
  </head>

  <body>
    <div id="intro">
      <h1>
          <%
            String result = (String) request.getAttribute("result");
            out.println("RESULT: "+ result);
          %>
          <script type="text/javascript">
              unhide();
              function unhide() {
                  var res = "<%=result%>";
                  document.getElementById(res).display = "block";
              }
          </script>
      </h1>
    </div>

    <div id="yes"  style="display: none;">
      <h1> YES THIS IS AN AVOCADO? </h1>
    </div>

    <div id="maybe"  style="display: none;">
      <h1> MAYBE? </h1>
    </div>

    <div id="no"  style="display: none;">
      <h1> NO? </h1>
    </div>

  </body>

</html>