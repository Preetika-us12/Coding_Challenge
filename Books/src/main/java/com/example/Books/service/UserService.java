package com.example.Books.service;

import com.example.Books.model.User;
import com.example.Books.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public boolean validateCredentials(String username, String password) {
        User user = userRepo.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
