package de.codeschluss.portal.components.news;

import static org.springframework.http.ResponseEntity.noContent;

import de.codeschluss.portal.core.push.PortalPushService;
import de.codeschluss.portal.core.push.subscription.SubscriptionEntity;

import org.springframework.http.ResponseEntity;
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
  private final PortalPushService portalPushService;
  
  public NewsController(PortalPushService portalPushService) {
    this.portalPushService = portalPushService;
  }
  
  @PostMapping("/news/subscribe")
  public ResponseEntity<?> subscribe(@RequestBody SubscriptionEntity newSubscription) {
    portalPushService.subscribe(newSubscription);
    return noContent().build();
  }
  
  @PostMapping("/news/unscubscribe")
  public ResponseEntity<?> unsubscribe(@RequestBody SubscriptionEntity newSubscription) {
    portalPushService.unsubscribe(newSubscription);
    return noContent().build();
  }
  
  @PostMapping("/news/push")
  public ResponseEntity<?> pushNews(@RequestBody News news) {
    portalPushService.push(news.getContent());
    return noContent().build();
  }
}
