package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
@Rollback
public class UserControllerDeleteBloggerTest {

  @Autowired
  private UserController controller;
  
  @Test(expected = NotFoundException.class)
  @WithUserDetails("super@user")
  public void deleteBloggerOtherSuperUserOk() throws URISyntaxException {
    String userId = "00000009-0000-0000-0004-000000000000";
    assertThat(controller.readBlogger(userId)).isNotNull();

    controller.deleteBlogger(userId);

    controller.readBlogger(userId);
  }

  @Test(expected = NotFoundException.class)
  @WithUserDetails("blogdelete2@user")
  public void deleteBloggerOwnUserOk() throws URISyntaxException {
    String userId = "00000011-0000-0000-0004-000000000000";
    assertThat(controller.readOne(userId)).isNotNull();

    controller.deleteBlogger(userId);

    controller.readBlogger(userId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("blog2@user")
  public void deleteBloggerOtherUserDenied() throws URISyntaxException {
    String userId = "00000004-0000-0000-0004-000000000000";

    controller.deleteBlogger(userId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteBloggerOtherNotRegisteredDenied() {
    String otherUserId = "00000004-0000-0000-0004-000000000000";

    controller.deleteBlogger(otherUserId);
  }
}
