package com.example.Books.repository;

import com.example.Books.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, String> {
	
	
}