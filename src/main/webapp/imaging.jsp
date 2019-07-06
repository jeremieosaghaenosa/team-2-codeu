<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/image-analysis"); %>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="css/home.css"/>
    <meta charset="UTF-8">
    <title>Image Upload Analysis</title>
    <script src="${pageContext.request.contextPath}/js/navigation-loader.js"></script>
  </head>
  <body>
    <div>
     <!-- <a href="/"><img src="img/menulogo.png" id="logoHeader" float="left"></a> -->
      <nav>
        <ul id="navigation" class="menu">
          <li class="right"><a href="/">Home</a></li>
          <li class="right"><a href="/community.html">Our Community</a></li>
          <li class="right"><a href="/imaging.jsp">Is This a..?</a></li>
          <li class="right"><a href="/map.html">Can I Grow..?</a></li>
          <li class="right"><a href="/aboutus.html">About Us</a></li>
        </ul>
      </nav>
    </div>  

    <div id = "intro">
      <h1>IS THIS AN AVOCADO?</h1>
      <form method="POST" enctype="multipart/form-data" action="<%= uploadUrl %>">
        <p>Upload an image, and we'll give our best guess...</p>
        <input type="file" name="image">
        <br/><br/>
        <button>CLICK TO CALCULATE</button>
      </form>
    </div>
  </body>
</html>