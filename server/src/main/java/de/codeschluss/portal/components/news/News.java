package de.codeschluss.portal.components.news;

import java.io.Serializable;

import lombok.Data;

/**
 * The Class News. 
 * 
 * @author Valmir Etemi
 *
 */
@Data
public class News implements Serializable {
  
  private static final long serialVersionUID = 1L;

  private String title;
  
  private String content;
}
