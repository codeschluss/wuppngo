package de.codeschluss.portal.components.news;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.push.PortalPushService;
import de.codeschluss.portal.core.push.subscription.SubscriptionEntity;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class NewsController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class NewsController {

  /** The push service. */
  private final PortalPushService pushService;
  
  public NewsController(PortalPushService portalPushService) {
    this.pushService = portalPushService;
  }
  
  /**
   * Subscribe.
   *
   * @param newSubscription the new subscription
   * @return the response entity
   */
  @PostMapping("/news/subscribe")
  public ResponseEntity<?> subscribe(@RequestBody SubscriptionEntity newSubscription) {
    SubscriptionEntity savedSubscription = pushService.subscribe(newSubscription);
    if (savedSubscription == null) {
      throw new BadParamsException("Subscription is not valid. All field must be set");
    }
    return ok(savedSubscription);
  }
  
  @DeleteMapping("/news/unsubscribe/{subscriptionId}")
  public ResponseEntity<?> unsubscribe(@PathVariable String subscriptionId) {
    pushService.unsubscribe(subscriptionId);
    return noContent().build();
  }
  
  @PostMapping("/news/push")
  @SuperUserPermission
  public ResponseEntity<?> pushNews(@RequestBody News news) {
    pushService.push(news);
    return noContent().build();
  }
}
