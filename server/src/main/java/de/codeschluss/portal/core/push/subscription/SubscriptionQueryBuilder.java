package de.codeschluss.portal.core.push.subscription;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.QueryBuilder;

import org.springframework.stereotype.Service;

/**
 * The Class SubscriptionQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class SubscriptionQueryBuilder extends QueryBuilder<QSubscriptionEntity> {

  public SubscriptionQueryBuilder() {
    super(QSubscriptionEntity.subscriptionEntity);
  }

  @Override
  public <P extends FilterSortPaginate> Predicate search(P params) {
    return query.authSecret.eq(params.getFilter())
        .or(query.publicKey.eq(params.getFilter()))
        .or(query.endpoint.eq(params.getFilter()));
  }

  /**
   * With all set.
   *
   * @param subscription the subscription
   * @return the predicate
   */
  public Predicate withAllSet(SubscriptionEntity subscription) {
    return query.authSecret.eq(subscription.getAuthSecret())
        .and(query.publicKey.eq(subscription.getPublicKey()))
        .and(query.endpoint.eq(subscription.getEndpoint()));
  }

}
