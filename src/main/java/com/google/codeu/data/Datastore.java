/*
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.codeu.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.codeu.data.Datastore;
import java.util.*;

/** Provides access to the data stored in Datastore. */
public class Datastore {

  private DatastoreService datastore;

  public Datastore() {
    datastore = DatastoreServiceFactory.getDatastoreService();
  }

  /** Stores the Message in Datastore. */
  public void storeMessage(Message message) {

    /*
    Need to check if it is a reply or not, if a reply then it is not a brand new entitiy
    but an entity with parentId
    */


    Entity messageEntity = new Entity("Message", message.getId().toString());
    messageEntity.setProperty("user", message.getUser());
    messageEntity.setProperty("text", message.getText());
    messageEntity.setProperty("timestamp", message.getTimestamp());
    messageEntity.setProperty("like", message.getLike());
    messageEntity.setProperty("dislike", message.getDislike());


    datastore.put(messageEntity);
  }

  /** CX: returns message from entity */
  Message getMessage(Entity entity) {
    try {
      String idString = entity.getKey().getName();
      UUID id = UUID.fromString(idString);
      String user = (String) entity.getProperty("user");
      String text = (String) entity.getProperty("text");
      long timestamp = (long) entity.getProperty("timestamp");
      long like = (long) entity.getProperty("like");
      long dislike = (long) entity.getProperty("dislike");



      Message message = new Message(id, user, text, timestamp, like, dislike);
      return message;
    } catch (Exception e) {
      System.err.println("Error reading message.");
      System.err.println(entity.toString());
      e.printStackTrace();
    }

    return null;
  }

  /**
   * Gets messages posted by a specific user.
   *
   * @return a list of messages posted by the user, or empty list if user has never posted a
   *     message. List is sorted by time descending.
   */
  public List<Message> getMessages(String user) {
    List<Message> messages = new ArrayList<>();

    Query query =
        new Query("Message")
            .setFilter(new Query.FilterPredicate("user", FilterOperator.EQUAL, user))
            .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      Message m = getMessage(entity);
      messages.add(m);
    }

    return messages;
  }

  /* CX: fetches all messages */
  public List<Message> getAllMessages(){
    List<Message> messages = new ArrayList<>();

    Query query = new Query("Message")
      .addSort("timestamp", SortDirection.DESCENDING);
    PreparedQuery results = datastore.prepare(query);

   for (Entity entity : results.asIterable()) {
      Message m = getMessage(entity);
      messages.add(m);
    }

    return messages;
 }

// Update like of a message
 public List<Message> updateLike(long time, String msgtext){
   List<Message> messages = new ArrayList<>();

   Query query =
       new Query("Message")
           .setFilter(new Query.FilterPredicate("timestamp", FilterOperator.EQUAL, time));

   PreparedQuery results = datastore.prepare(query);

  for (Entity entity : results.asIterable()) {
     Message m = getMessage(entity);
     // System.out.println("Entity: " + entity);
     // System.out.println("Entity: " + entity.getProperty("text"));
     // System.out.println("Entity: " + entity.getProperty("like"));


     String check = m.getText();
     if(check.equals(msgtext)) {
       entity.setProperty("like", Long.valueOf(Integer.parseInt(entity.getProperty("like").toString())+1));
       datastore.put(entity);
       // System.out.println("Entity: " + entity.getProperty("like"));
     }
     // System.out.println("Text: " + m.getText());
     // System.out.println("Likes: " + m.getLike());
   }

   return messages;
 }

 // Update like of a message
  public List<Message> updateDislike(long time, String msgtext){
    List<Message> messages = new ArrayList<>();

    Query query =
        new Query("Message")
            .setFilter(new Query.FilterPredicate("timestamp", FilterOperator.EQUAL, time));

    PreparedQuery results = datastore.prepare(query);

   for (Entity entity : results.asIterable()) {
      Message m = getMessage(entity);
      // System.out.println("Entity: " + entity);
      // System.out.println("Entity: " + entity.getProperty("text"));
      // System.out.println("Entity: " + entity.getProperty("like"));


      String check = m.getText();
      if(check.equals(msgtext)) {
        entity.setProperty("dislike", Long.valueOf(Integer.parseInt(entity.getProperty("dislike").toString())+1));
        datastore.put(entity);
        // System.out.println("Entity: " + entity.getProperty("like"));
      }
      // System.out.println("Text: " + m.getText());
      // System.out.println("Likes: " + m.getLike());
    }

    return messages;
  }







 // This code below fetches all of the message stored in Datastore, and adds all of the users to a Set.

 public Set<String> getUsers(){
   Set<String> users = new HashSet<>();
   Query query = new Query("Message");
   PreparedQuery results = datastore.prepare(query);
   for(Entity entity : results.asIterable()) {
     users.add((String) entity.getProperty("user"));
   }
   return users;
 }

/** Stores the User in Datastore. */
 public void storeUser(User user) {
  Entity userEntity = new Entity("User", user.getEmail());
  userEntity.setProperty("email", user.getEmail());
  userEntity.setProperty("aboutMe", user.getAboutMe());
  datastore.put(userEntity);
 }

 /**
  * Returns the User owned by the email address, or
  * null if no matching User was found.
  */
 public User getUser(String email) {

  Query query = new Query("User")
    .setFilter(new Query.FilterPredicate("email", FilterOperator.EQUAL, email));
  PreparedQuery results = datastore.prepare(query);
  Entity userEntity = results.asSingleEntity();
  if(userEntity == null) {
   return null;
  }

  String aboutMe = (String) userEntity.getProperty("aboutMe");
  User user = new User(email, aboutMe);

  return user;
 }

}
