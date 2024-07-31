package com.services.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PublicationApplicationStatus {
    WAITING("Ожидание"),
    DONE("Одобрено"),
    REJECT("Отказано"),
    ;

    private final String name;

}

