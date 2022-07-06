package com.leandro.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.leandro.backend.models.User;
import com.leandro.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "api/user/create", method = RequestMethod.POST)
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @RequestMapping(value = "api/user", method = RequestMethod.GET)
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @RequestMapping(value = "api/user/{id}", method = RequestMethod.GET)
    public Optional<User> getSingleUser(@PathVariable String id){
        return userService.getUser(id);
    }

    @RequestMapping(value = "api/user/usernameAndDob/{id}", method = RequestMethod.POST)
    public Optional<User> updateUsernameAndDob(@PathVariable String id, @RequestBody User user){
        return userService.modifyPersonalDataUser(id, user.getUsername(), user.getDob());
    }

    @RequestMapping(value = "api/user/emailAndPassword/{id}", method = RequestMethod.POST)
    public Optional<User> updateEmailAndPassword(@PathVariable String id, @RequestBody User user){
        return userService.modifyEmailAndPasswordUser(id, user.getEmail(), user.getPassword());
    }

    @RequestMapping(value = "api/user/deleteUser/{idUser}", method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable String idUser){
        return userService.deleteUserAndAllHisInformation(idUser);
    }

}
