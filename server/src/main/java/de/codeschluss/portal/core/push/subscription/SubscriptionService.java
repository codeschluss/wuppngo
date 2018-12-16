package de.codeschluss.portal.core.push.subscription;

import de.codeschluss.portal.core.service.DataService;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * The Class SubscriptionService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class SubscriptionService extends DataService<SubscriptionEntity, SubscriptionQueryBuilder> {

  public SubscriptionService(
      SubscriptionRepository repo,
      SubscriptionQueryBuilder entities) {
    super(repo, entities);
  }

  @Override
  public SubscriptionEntity getExisting(SubscriptionEntity newSubscription) {
    return repo.findOne(entities.withAllSet(newSubscription)).orElse(null);
  }

  @Override
  public boolean validFieldConstraints(SubscriptionEntity newSubscription) {
    return newSubscription.getAuthSecret() != null && !newSubscription.getAuthSecret().isEmpty()
        && newSubscription.getPublicKey() != null && !newSubscription.getPublicKey().isEmpty()
        && newSubscription.getEndpoint() != null && !newSubscription.getEndpoint().isEmpty();
  }

  @Override
  public SubscriptionEntity update(String id, SubscriptionEntity newSubscription) {
    return repo.findById(id).map(subscription -> {
      subscription.setAuthSecret(newSubscription.getAuthSecret());
      subscription.setEndpoint(newSubscription.getEndpoint());
      subscription.setPublicKey(newSubscription.getPublicKey());
      return repo.save(subscription);
    }).orElseGet(() -> {
      newSubscription.setId(id);
      return repo.save(newSubscription);
    });
  }

  public List<SubscriptionEntity> getAll() {
    return repo.findAll();
  }
}
