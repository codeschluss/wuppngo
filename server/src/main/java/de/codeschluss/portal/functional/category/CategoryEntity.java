package de.codeschluss.portal.functional.category;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.core.common.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import org.springframework.hateoas.core.Relation;

/**
 * The persistent class for the categories database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "categories")
@Relation(collectionRelation = "data")
public class CategoryEntity extends BaseEntity implements Serializable {

  private static final long serialVersionUID = 1L;

  private String color;

  @Lob
  @Column(columnDefinition = "TEXT")
  private String description;

  private String name;

  @OneToMany(mappedBy = "category")
  @JsonIgnore
  private List<ActivityEntity> activities;

}
