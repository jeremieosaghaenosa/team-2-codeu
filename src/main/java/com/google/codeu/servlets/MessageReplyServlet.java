package com.google.codeu.servlets;

import javax.servlet.annotation.WebServlet;
import com.google.appengine.api.datastore.Key;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import java.io.*;
import java.util.*;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import java.net.URL;
import java.net.MalformedURLException;
import java.net.URISyntaxException;



/**
 * Handles fetching all messages for the public feed.
 */
@WebServlet("/reply")
public class MessageReplyServlet extends HttpServlet{

 private Datastore datastore;

 @Override
 public void init() {
  datastore = new Datastore();
 }

 /**
  * Responds with a JSON representation of Message data for all users.
  */
 @Override
 public void doGet(HttpServletRequest request, HttpServletResponse response)
   throws IOException {

  response.setContentType("application/json");

  UserService userService = UserServiceFactory.getUserService();
  if (!userService.isUserLoggedIn()) {
    response.sendRedirect("/index.jsp");
    return;
  }

  String num = request.getParameter("parent");
  UUID parent = UUID.fromString(num);
  String user = userService.getCurrentUser().getEmail();
  String msgtext = Jsoup.clean(request.getParameter("text"), Whitelist.none());
  Message message = new Message(user, msgtext);



  Key parentKey = datastore.getParentKey(parent);
  datastore.storeChild(message,parentKey);

  List<Message> messages = datastore.getParentMessages();
  Gson gson = new Gson();
  String json = gson.toJson(messages);
  response.getOutputStream().println(json);
 }
}
