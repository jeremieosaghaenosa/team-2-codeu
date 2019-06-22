<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/image-analysis"); %>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="css/imaging.css"/>
    <meta charset="UTF-8">
    <title>Image Upload Analysis</title>
  </head>
  <body>
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