package de.codeschluss.portal.components.blogger;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.entity.BaseResource;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the bloggers database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "bloggers")
@Relation(collectionRelation = "data")
public class BloggerEntity extends BaseResource {

  private static final long serialVersionUID = 1L;
  
  @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
  @JsonProperty(access = Access.READ_ONLY)
  private boolean approved;
  
  @OneToOne
  @JsonIgnore
  @ToString.Exclude
  @JoinColumn(nullable = false)
  private UserEntity user;
  
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "blogger", cascade = CascadeType.REMOVE)
  @ToString.Exclude
  @JsonIgnore
  private List<BlogEntity> blogs;

  @Override
  public List<Link> createResourceLinks() {
    return new ArrayList<Link>();
  }

}
