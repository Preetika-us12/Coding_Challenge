package com.example.Books.repository;

import com.example.Books.model.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class BookRepoTest {

    @Autowired
    private BookRepo bookRepo;

    @Test
    public void testSaveAndFindById() {
        Book book = new Book();
        book.setIsbn("B123");
        book.setTitle("Java in Action");
        book.setAuthor("Preetika U S");
        book.setPublicationYear(2023);

        Book saved = bookRepo.save(book);
        assertThat(saved.getIsbn()).isNotNull();

        Optional<Book> found = bookRepo.findById("B123");
        assertThat(found).isPresent();
        assertThat(found.get().getTitle()).isEqualTo("Java in Action");
    }

    @Test
    public void testFindAll() {
        Book book1 = new Book();
        book1.setIsbn("B101");
        book1.setTitle("Spring Boot Mastery");
        book1.setAuthor("Geetika Sharma");
        book1.setPublicationYear(2022);

        Book book2 = new Book();
        book2.setIsbn("B102");
        book2.setTitle("Cloud for Beginners");
        book2.setAuthor("Dev U S");
        book2.setPublicationYear(2024);

        bookRepo.save(book1);
        bookRepo.save(book2);

        List<Book> books = bookRepo.findAll();
        assertThat(books.size()).isGreaterThanOrEqualTo(2);
    }

    @Test
    public void testDeleteBook() {
        Book book = new Book();
        book.setIsbn("B404");
        book.setTitle("Delete Me");
        book.setAuthor("Ghost Writer");
        book.setPublicationYear(2021);

        bookRepo.save(book);
        assertThat(bookRepo.findById("B404")).isPresent();

        bookRepo.deleteById("B404");

        assertThat(bookRepo.findById("B404")).isNotPresent();
    }

    @Test
    public void testFindByIsbnAndCheckDetails() {
        Optional<Book> bookOpt = bookRepo.findById("2");
        assertThat(bookOpt).isPresent();

        Book book = bookOpt.get();
        assertThat(book.getTitle()).isEqualTo("Harry Potter and the Sorcerer's Stone");
        assertThat(book.getAuthor()).isEqualTo("J.K. Rowling");
        assertThat(book.getPublicationYear()).isEqualTo(1997);
    }

    @Test
    public void testBookListContainsExpectedBooks() {
        List<Book> books = bookRepo.findAll();

        assertThat(books).extracting(Book::getTitle)
                .contains(
                        "Mastering Spring Boot",
                        "Harry Potter and the Sorcerer's Stone",
                        "The Tale of Peter Rabbit",
                        "The Gruffalo"
                );
    }

    @Test
    public void testBookNotFound() {
        Optional<Book> missing = bookRepo.findById("999");
        assertThat(missing).isNotPresent();
    }
}
