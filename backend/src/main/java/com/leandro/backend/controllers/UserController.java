package com.leandro.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.leandro.backend.models.User;
import com.leandro.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "api/user", method = RequestMethod.GET)
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping(value = "api/user/{id}", method = RequestMethod.GET)
    public Optional<User> getSingleUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @RequestMapping(value = "api/user/nameAndAge/{id}", method = RequestMethod.POST)
    public Optional<User> updateNameAndAge(@PathVariable String id, @RequestBody User user) {
        return userService.modifyPersonalDataUser(id, user.getName(), user.getAge());
    }

    @RequestMapping(value = "api/user/emailAndPassword/{id}", method = RequestMethod.POST)
    public Optional<User> updateEmailAndPassword(@PathVariable String id, @RequestBody User user) {
        return userService.modifyEmailAndPasswordUser(id, user.getEmail(), user.getPassword());

    }
}
