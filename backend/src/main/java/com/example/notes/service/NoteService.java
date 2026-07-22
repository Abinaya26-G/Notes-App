package com.example.notes.service;

import com.example.notes.dto.*;
import com.example.notes.entity.Note;
import com.example.notes.entity.NoteStatus;
import com.example.notes.entity.User;
import com.example.notes.exception.ApiException;
import com.example.notes.repository.NoteRepository;
import com.example.notes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    public List<NoteResponse> getAllNotes() {
        User user = getCurrentUser();
        return noteRepository.findByUser(user).stream()
                .sorted(Comparator.comparing(Note::isPinned).reversed()
                        .thenComparing(Note::getUpdatedAt).reversed())
                .map(this::mapToResponse)
                .toList();
    }

    public List<NoteResponse> getNotesByStatus(NoteStatus status) {
        User user = getCurrentUser();
        return noteRepository.findByUserAndStatus(user, status).stream()
                .sorted(Comparator.comparing(Note::isPinned).reversed()
                        .thenComparing(Note::getUpdatedAt).reversed())
                .map(this::mapToResponse)
                .toList();
    }

    public NoteResponse getNoteById(Long id) {
        User user = getCurrentUser();
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ApiException("Note not found", HttpStatus.NOT_FOUND));
        return mapToResponse(note);
    }

    public NoteResponse createNote(NoteRequest request) {
        User user = getCurrentUser();
        Note note = Note.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .status(NoteStatus.PENDING)
                .pinned(false)
                .user(user)
                .build();
        noteRepository.save(note);
        return mapToResponse(note);
    }

    public NoteResponse createDraft(NoteRequest request) {
        User user = getCurrentUser();
        Note note = Note.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .status(NoteStatus.DRAFT)
                .pinned(false)
                .user(user)
                .build();
        noteRepository.save(note);
        return mapToResponse(note);
    }

    public NoteResponse updateNote(Long id, NoteRequest request) {
        User user = getCurrentUser();
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ApiException("Note not found", HttpStatus.NOT_FOUND));
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        if (request.getStatus() != null) {
            note.setStatus(NoteStatus.valueOf(request.getStatus()));
        }
        noteRepository.save(note);
        return mapToResponse(note);
    }

    public NoteResponse togglePin(Long id) {
        User user = getCurrentUser();
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ApiException("Note not found", HttpStatus.NOT_FOUND));
        note.setPinned(!note.isPinned());
        noteRepository.save(note);
        return mapToResponse(note);
    }

    public NoteResponse markComplete(Long id) {
        User user = getCurrentUser();
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ApiException("Note not found", HttpStatus.NOT_FOUND));
        note.setStatus(NoteStatus.COMPLETED);
        noteRepository.save(note);
        return mapToResponse(note);
    }

    public void deleteNote(Long id) {
        User user = getCurrentUser();
        Note note = noteRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ApiException("Note not found", HttpStatus.NOT_FOUND));
        noteRepository.delete(note);
    }

    public StatsResponse getStats() {
        User user = getCurrentUser();
        return StatsResponse.builder()
                .total(noteRepository.countByUser(user))
                .draft(noteRepository.countByUserAndStatus(user, NoteStatus.DRAFT))
                .pending(noteRepository.countByUserAndStatus(user, NoteStatus.PENDING))
                .completed(noteRepository.countByUserAndStatus(user, NoteStatus.COMPLETED))
                .pinned(noteRepository.countByUserAndPinnedTrue(user))
                .build();
    }

    private NoteResponse mapToResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .status(note.getStatus())
                .pinned(note.isPinned())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build();
    }
}
