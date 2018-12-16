package de.codeschluss.portal.components.page.translations;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.components.category.CategoryController;
import de.codeschluss.portal.components.page.PageEntity;
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
 * The persistent class for the category translatables database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "page_translatables")
@Relation(collectionRelation = "data")
public class PageTranslatablesEntity extends TranslatableEntity<PageEntity> {

  private static final long serialVersionUID = 1L;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String content;
  
  @Column(nullable = false)
  private String title;
  
  @Override
  public List<Link> createResourceLinks() {    
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(CategoryController.class)
        .readTranslations(getId())).withSelfRel());

    return links;
  }

}