package com.btp.user.exception;

/**
 * Lancée quand l'email est déjà utilisé par un autre compte (409 Conflict).
 */
public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
