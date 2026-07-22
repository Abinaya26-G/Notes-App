package com.example.notes.controller;

import com.example.notes.dto.*;
import com.example.notes.entity.NoteStatus;
import com.example.notes.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<List<NoteResponse>> getAllNotes() {
        return ResponseEntity.ok(noteService.getAllNotes());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<NoteResponse>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(noteService.getNotesByStatus(NoteStatus.valueOf(status.toUpperCase())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getNote(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@Valid @RequestBody NoteRequest request) {
        return ResponseEntity.ok(noteService.createNote(request));
    }

    @PostMapping("/draft")
    public ResponseEntity<NoteResponse> createDraft(@Valid @RequestBody NoteRequest request) {
        return ResponseEntity.ok(noteService.createDraft(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest request) {
        return ResponseEntity.ok(noteService.updateNote(id, request));
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<NoteResponse> togglePin(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.togglePin(id));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<NoteResponse> markComplete(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.markComplete(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<StatsResponse> getStats() {
        return ResponseEntity.ok(noteService.getStats());
    }
}
