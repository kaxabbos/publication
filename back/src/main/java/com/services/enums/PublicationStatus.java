package com.services.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PublicationStatus {
    WAITING("Ожидание"),
    DONE("Подтверждено"),
    CORRECTION("Правки"),
    CLOSED("Закрыто"),
    ;

    private final String name;

}

