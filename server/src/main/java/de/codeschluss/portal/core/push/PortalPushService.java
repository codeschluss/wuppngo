package de.codeschluss.portal.core.push;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.codeschluss.portal.core.exception.ThirdPartyServiceException;
import de.codeschluss.portal.core.push.subscription.SubscriptionEntity;
import de.codeschluss.portal.core.push.subscription.SubscriptionService;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.concurrent.ExecutionException;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;

import org.apache.http.client.HttpResponseException;
import org.apache.http.impl.client.BasicResponseHandler;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.stereotype.Service;

/**
 * The Class PortalPushService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class PortalPushService {

  /** The subscription entity. */
  private final SubscriptionService subscriptionService;

  /** The push service. */
  private PushService pushService;

  /** The response handler. */
  private BasicResponseHandler responseHandler;

  /**
   * Instantiates a new portal push service.
   *
   * @param subscriptionService the subscription service
   * @param config the config
   * @throws NoSuchProviderException the no such provider exception
   * @throws NoSuchAlgorithmException the no such algorithm exception
   * @throws InvalidKeySpecException the invalid key spec exception
   */
  public PortalPushService(
      SubscriptionService subscriptionService,
      PortalPushConfig config) throws 
        NoSuchProviderException, NoSuchAlgorithmException, InvalidKeySpecException {
    this.subscriptionService = subscriptionService;
    this.responseHandler = new BasicResponseHandler();
    initializePushService(config);
  }

  /**
   * Initialize push service.
   *
   * @param config the config
   * @throws NoSuchProviderException the no such provider exception
   * @throws NoSuchAlgorithmException the no such algorithm exception
   * @throws InvalidKeySpecException the invalid key spec exception
   */
  private void initializePushService(PortalPushConfig config) 
      throws NoSuchProviderException, NoSuchAlgorithmException, InvalidKeySpecException {
    this.pushService = new PushService();
    Security.addProvider(new BouncyCastleProvider());
    pushService.setSubject(config.getSubject());
    pushService.setPublicKey(Utils.loadPublicKey(config.getPublicKey()));
    pushService.setPrivateKey(Utils.loadPrivateKey(config.getPrivateKey()));
  }

  /**
   * Subscribe.
   *
   * @param newSubscription
   *          the new subscription
   */
  public SubscriptionEntity subscribe(SubscriptionEntity newSubscription) {
    if (subscriptionService.validCreateFieldConstraints(newSubscription)) {
      return subscriptionService.add(newSubscription);
    }
    return null;
  }

  /**
   * Unsubscribe.
   *
   * @param subscriptionId
   *          the subscription
   */
  public void unsubscribe(String subscriptionId) {
    subscriptionService.delete(subscriptionId);
  }

  /**
   * Push.
   *
   * @param object the object
   */
  public void push(Object object) {
    List<SubscriptionEntity> subscriptions = subscriptionService.getAll();
    if (subscriptions != null && !subscriptions.isEmpty()) {
      for (SubscriptionEntity subscription : subscriptions) {
        try {
          sendPush(subscription, object);
        } catch (HttpResponseException e) {
          subscriptionService.delete(subscription.getId());
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException
            | InterruptedException e) {
          throw new ThirdPartyServiceException(e.getMessage());
        }
      }
    }
  }

  /**
   * Send push.
   *
   * @param subscription the subscription
   * @param object the object
   * @throws GeneralSecurityException the general security exception
   * @throws IOException Signals that an I/O exception has occurred.
   * @throws JoseException the jose exception
   * @throws ExecutionException the execution exception
   * @throws InterruptedException the interrupted exception
   */
  private void sendPush(SubscriptionEntity subscription, Object object) 
      throws GeneralSecurityException, IOException, JoseException, ExecutionException,
      InterruptedException {
    ObjectMapper mapper = new ObjectMapper();
    
    Notification notification = new Notification(
        subscription.getEndpoint(), 
        subscription.getPublicKey(), 
        subscription.getAuthSecret(), 
        mapper.writeValueAsString(object));

    responseHandler.handleResponse(pushService.send(notification));
  }
}
