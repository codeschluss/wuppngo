package de.codeschluss.portal.components.topic.translations;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import de.codeschluss.portal.components.topic.TopicController;
import de.codeschluss.portal.components.topic.TopicEntity;
import de.codeschluss.portal.core.i18n.entities.TranslatableEntity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the topic translatables database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "topic_translatables")
@Relation(collectionRelation = "data")
public class TopicTranslatablesEntity extends TranslatableEntity<TopicEntity> {

  private static final long serialVersionUID = 1L;

  @Column(nullable = false)
  private String name;
  
  @Override
  public List<Link> createResourceLinks() {    
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(TopicController.class)
        .readTranslations(getId())).withSelfRel());

    return links;
  }

}