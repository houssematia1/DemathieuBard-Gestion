package com.btp.user.exception;

/**
 * Lancée quand une entité demandée n'existe pas en base (404).
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
