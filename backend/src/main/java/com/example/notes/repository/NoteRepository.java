package com.example.notes.repository;

import com.example.notes.entity.Note;
import com.example.notes.entity.NoteStatus;
import com.example.notes.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUser(User user);
    List<Note> findByUserAndStatus(User user, NoteStatus status);
    Optional<Note> findByIdAndUser(Long id, User user);
    long countByUser(User user);
    long countByUserAndStatus(User user, NoteStatus status);
    long countByUserAndPinnedTrue(User user);
}
