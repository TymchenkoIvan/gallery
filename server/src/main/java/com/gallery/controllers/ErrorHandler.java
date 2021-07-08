package com.gallery.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.gallery.exception.EntityDeleteConflictException;

@ControllerAdvice
public class ErrorHandler {

    @ExceptionHandler(EntityDeleteConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    String onDeleteConflictException(EntityDeleteConflictException e) {
        return e.getMessage();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    String onDefaultException(Exception e) {
        return e.getMessage();
    }
}
