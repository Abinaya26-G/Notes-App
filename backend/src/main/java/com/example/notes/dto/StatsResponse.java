package com.example.notes.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatsResponse {
    private long total;
    private long draft;
    private long pending;
    private long completed;
    private long pinned;
}
