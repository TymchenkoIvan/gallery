package com.gallery.exception;

public class EntityDeleteConflictException extends RuntimeException{

    public EntityDeleteConflictException(String message) {
        super(message);
    }
}
