package de.codeschluss.portal.core.exception;

/**
 * The Class ThirdPartyServiceException.
 * 
 * @author Valmir Etemi
 *
 */
public class ThirdPartyServiceException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public ThirdPartyServiceException(String message) {
    super("Service is not available: " + message);
  }
}