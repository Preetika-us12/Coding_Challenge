package com.example.Books.service;

import com.example.Books.model.Book;
import com.example.Books.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepo bookRepo;

    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    public Book getBookByIsbn(String isbn) {
        return bookRepo.findById(isbn).orElse(null);
    }

    public Book addBook(Book book) {
        return bookRepo.save(book);
    }

    public Book updateBook(String isbn, Book book) {
        Optional<Book> existing = bookRepo.findById(isbn);
        if (existing.isPresent()) {
            book.setIsbn(isbn);
            return bookRepo.save(book);
        } else {
            return null;
        }
    }

    public void deleteBook(String isbn) {
        bookRepo.deleteById(isbn);
    }
}