package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blogger.BloggerService;
import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.api.dto.BooleanPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UserControllerGrantBloggerRightTest {

  @Autowired
  private UserController controller;
  
  @Autowired
  private BloggerService bloggerService;
  
  @Test
  @WithUserDetails("super@user")
  public void grantBloggerOk() {
    String userId = "00000006-0000-0000-0004-000000000000";
    BooleanPrimitive value = new BooleanPrimitive(true);

    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantBloggerRight(userId, value);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertThat(bloggerService.getByUser(userId).isApproved()).isTrue();
  }

  @Test
  @WithUserDetails("super@user")
  public void takeBloggerOk() {
    String userId = "00000008-0000-0000-0004-000000000000";
    BooleanPrimitive value = new BooleanPrimitive(false);

    ResponseEntity<?> result = (ResponseEntity<?>) controller.grantBloggerRight(userId, value);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    assertNotContaining(userId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void takeBloggerBadRequest() {
    String notExistingUserId = "12345678-0000-0000-0004-XX0000000000";
    BooleanPrimitive value = new BooleanPrimitive(false);

    controller.grantBloggerRight(notExistingUserId, value);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("blogNotApproved@user")
  public void grantSuperuserDenied() {
    String userId = "00000006-0000-0000-0004-000000000000";
    BooleanPrimitive value = new BooleanPrimitive(true);

    controller.grantBloggerRight(userId, value);
  }
  
  private void assertNotContaining(String userId) {
    try {
      controller.readBlogger(userId);
      assertThat(true).isFalse();
    } catch (NotFoundException e) {
      assertThat(true).isTrue();
    }
  }
  
}
