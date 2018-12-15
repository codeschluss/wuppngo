package de.codeschluss.portal.components.blog;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.blog.translations.BlogTranslatablesEntity;
import de.codeschluss.portal.components.blogger.BloggerEntity;
import de.codeschluss.portal.core.entity.BaseResource;
import de.codeschluss.portal.core.i18n.annotations.Localized;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the blogs database table.
 * 
 * @author Valmir Etemi
 *
 */
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Data
@Localized
@Entity
@Table(name = "blogs")
@Relation(collectionRelation = "data")
  
public class BlogEntity extends BaseResource {
  private static final long serialVersionUID = 1L;
  
  @ManyToOne
  @JsonIgnore
  @JoinColumn(nullable = true)
  private ActivityEntity activity;
  
  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String author;
  
  @ManyToOne
  @JsonIgnore
  @JoinColumn(nullable = false)
  private BloggerEntity blogger;
  
  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String content;
  
  @JsonProperty(access = Access.READ_ONLY)
  private int likes;
  
  @JsonSerialize
  @JsonDeserialize
  @Transient
  private String title;
  
  @OneToMany(fetch = FetchType.EAGER, mappedBy = "parent", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  protected Set<BlogTranslatablesEntity> translatables;
  
  public String getAuthor() {
    return this.getBlogger().getUser().getName();
  }

  @Override
  public List<Link> createResourceLinks() {
    List<Link> links = new ArrayList<Link>();

    links.add(linkTo(methodOn(BlogController.class)
        .readOne(id)).withSelfRel());
    
    return links;
  }
}
