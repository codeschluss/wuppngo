package de.codeschluss.portal.components.blog.translations;

import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the blog translatable database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "blog_translatables")
@Relation(collectionRelation = "data")
public class BlogTranslatablesEntity extends TranslatableEntity<BlogEntity> {

  private static final long serialVersionUID = 1L;

  @Lob
  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;
  
  @Column(nullable = false)
  private String title;

  @Override
  public List<Link> createResourceLinks() {    
    List<Link> links = new ArrayList<Link>();

    return links;
  }
}