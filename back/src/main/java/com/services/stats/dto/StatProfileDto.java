package com.services.stats.dto;

public record StatProfileDto(
        String name,
        int count,
        float percent
) {
}
