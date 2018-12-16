package de.codeschluss.portal.core.push;

import com.sun.mail.iap.Response;

import de.codeschluss.portal.core.push.subscription.SubscriptionEntity;
import de.codeschluss.portal.core.push.subscription.SubscriptionService;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.concurrent.ExecutionException;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;

import org.apache.http.HttpResponse;
import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.jce.spec.ECPublicKeySpec;
import org.bouncycastle.math.ec.ECPoint;
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

  private final PushService pushService;

  /**
   * Instantiates a new portal push service.
   *
   * @param subscriptionService the subscription service
   */
  public PortalPushService(SubscriptionService subscriptionService) {
    this.subscriptionService = subscriptionService;
    this.pushService = new PushService();
    Security.addProvider(new BouncyCastleProvider());
//    try {
//
//      pushService.setSubject("mailto:info@codeschluss.de");
//      pushService.setPublicKey(Utils.loadPublicKey("BPr9WM2fXS2XYKPoS9SuS-NSbo8_tncYcMdD3zyPuZt7RbzwpXCID_tx55FSyPNRnreyzPdTgtReKGcO1Y2_Zjc"));
//      pushService.setPrivateKey(Utils.loadPrivateKey("jRg6BjI0_pgbZRhPmr1FYZ0Vo8ehzw9OMWteuxtazFU"));
//    } catch (NoSuchProviderException | NoSuchAlgorithmException | InvalidKeySpecException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    }
  }

  /**
   * Subscribe.
   *
   * @param newSubscription
   *          the new subscription
   */
  public void subscribe(SubscriptionEntity newSubscription) {
    if (subscriptionService.validFieldConstraints(newSubscription)) {
      subscriptionService.add(newSubscription);
    }
  }

  /**
   * Unsubscribe.
   *
   * @param subscription
   *          the subscription
   */
  public void unsubscribe(SubscriptionEntity subscription) {
  }

  /**
   * Push.
   *
   * @param message
   *          the message
   */
  public void push(String message) {
    subscriptionService.getAll().stream().forEach(subscription -> sendPush(subscription, message));
  }

  /**
   * Send push.
   *
   * @param subscription
   *          the subscription
   * @param pushObject
   *          the push object
   * @return the object
   */
  private void sendPush(SubscriptionEntity subscription, String message) {
    try {
      byte[] publicKey = Base64.getDecoder().decode(subscription.getPublicKey());
      byte[] authSecret = Base64.getDecoder().decode(subscription.getAuthSecret());
      byte[] payload = Base64.getEncoder().encode(message.getBytes());
      Notification notification = new Notification(subscription.getEndpoint(), 
          getUserPublicKey(publicKey), authSecret, payload);

      HttpResponse response = pushService.send(notification);
    } catch (GeneralSecurityException | IOException | JoseException | ExecutionException
        | InterruptedException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
  }
  
  /**
   * Gets the user public key.
   *
   * @param publicKey the public key
   * @return the user public key
   * @throws NoSuchAlgorithmException the no such algorithm exception
   * @throws InvalidKeySpecException the invalid key spec exception
   * @throws NoSuchProviderException the no such provider exception
   */
  public PublicKey getUserPublicKey(byte[] publicKey) 
      throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchProviderException {
    KeyFactory kf = KeyFactory.getInstance("ECDH", BouncyCastleProvider.PROVIDER_NAME);
    ECNamedCurveParameterSpec ecSpec = ECNamedCurveTable.getParameterSpec("secp256r1");
    ECPoint point = ecSpec.getCurve().decodePoint(publicKey);
    ECPublicKeySpec pubSpec = new ECPublicKeySpec(point, ecSpec);

    return kf.generatePublic(pubSpec);
  }
}
