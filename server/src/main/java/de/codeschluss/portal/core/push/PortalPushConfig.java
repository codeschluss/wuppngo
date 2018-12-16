package de.codeschluss.portal.core.push;

import lombok.Data;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * The Class PortalPushConfig.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "push")
public class PortalPushConfig {
  
  private String subject;
  private String privateKey;
  private String publicKey;
}
