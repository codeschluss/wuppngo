package de.codeschluss.portal.core.push.subscription;

import de.codeschluss.portal.core.entity.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the subscription database table.
 * 
 * @author Valmir Etemi
 *
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "subscriptions")
public class SubscriptionEntity extends BaseEntity {
  
  private static final long serialVersionUID = 1L;

  @Column(name = "auth_secret", nullable = false)
  private String authSecret;
  
  @Column(nullable = false)
  private String endpoint;
  
  @Column(nullable = false)
  private String publicKey;

}
