package com.example.Books.controller;

import com.example.Books.model.User;
import com.example.Books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/api/login")
    public String login(@RequestBody User user) {
        boolean valid = userService.validateCredentials(user.getUsername(), user.getPassword());
        return valid ? "Login successful" : "Invalid username or password";
    }
} 