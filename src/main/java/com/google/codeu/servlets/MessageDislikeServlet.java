package com.google.codeu.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.codeu.data.Datastore;
import com.google.codeu.data.Message;
import com.google.gson.Gson;
import java.io.*;

/**
 * Handles fetching all messages for the public feed.
 */
@WebServlet("/dislike")
public class MessageDislikeServlet extends HttpServlet{

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

  String num = request.getParameter("date");
  long time = Long.valueOf(num).longValue();
	String msgtext = request.getParameter("text");
  List<Message> messages = datastore.updateDislike(time,msgtext);

  messages = datastore.getParentMessages();
  Gson gson = new Gson();
  String json = gson.toJson(messages);
  response.getOutputStream().println(json);
 }
}
