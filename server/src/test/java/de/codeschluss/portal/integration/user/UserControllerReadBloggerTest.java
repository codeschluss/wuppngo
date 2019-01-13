package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blogger.BloggerEntity;
import de.codeschluss.portal.components.user.UserController;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerReadBloggerTest {

  @Autowired
  private UserController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void findOneOtherSuperUserOk() {
    String otherUserId = "00000004-0000-0000-0004-000000000000";
    String bloggerId = "00000000-0000-0000-0015-100000000000";

    Resource<BloggerEntity> result = (Resource<BloggerEntity>) 
        controller.readBlogger(otherUserId).getBody();

    assertThat(result.getContent().getId()).isEqualTo(bloggerId);
  }

  @Test
  @WithUserDetails("blog1@user")
  @SuppressWarnings("unchecked")
  public void findOneOwnUserOk() {
    String otherUserId = "00000004-0000-0000-0004-000000000000";
    String bloggerId = "00000000-0000-0000-0015-100000000000";

    Resource<BloggerEntity> result = (Resource<BloggerEntity>) 
        controller.readBlogger(otherUserId).getBody();

    assertThat(result.getContent().getId()).isEqualTo(bloggerId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("blog2@user")
  public void findOneOtherUserDenied() {
    String otherUserId = "00000004-0000-0000-0004-000000000000";

    controller.readOne(otherUserId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void findOneNotRegisteredDenied() {
    String otherUserId = "00000004-0000-0000-0004-000000000000";

    controller.readOne(otherUserId);
  }
}
