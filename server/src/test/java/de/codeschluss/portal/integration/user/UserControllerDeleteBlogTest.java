package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.assertj.core.api.Condition;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
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
public class UserControllerDeleteBlogTest {
  
  @Autowired
  private UserController controller;
  
  @Test
  @WithUserDetails("super@user")
  public void deleteSuperUserOk() {
    String userId = "00000004-0000-0000-0004-000000000000";
    String blogId = "00000000-0000-0000-0016-400000000000";

    assertContaining(userId, blogId);

    controller.deleteBlog(userId, blogId);

    assertNotContaining(userId, blogId);
  }

  @Test
  @WithUserDetails("blog1@user")
  public void deleteOwnOk() {
    String userId = "00000004-0000-0000-0004-000000000000";
    String blogId = "00000000-0000-0000-0016-500000000000";

    assertContaining(userId, blogId);

    controller.deleteBlog(userId, blogId);

    assertNotContaining(userId, blogId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("blog1@user")
  public void deleteNotOwnDenied() {
    String userId = "00000005-0000-0000-0004-000000000000";
    String blogId = "00000000-0000-0000-0016-500000000000";

    controller.deleteBlog(userId, blogId);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("blog1@user")
  public void deleteNotOwnInvalidUserIdDenied() {
    String userId = "00000004-0000-0000-0004-000000000000";
    String blogId = "00000000-0000-0000-0016-300000000000";

    controller.deleteBlog(userId, blogId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteBlogNotRegisteredDenied() {
    String userId = "00000005-0000-0000-0004-000000000000";
    String blogId = "00000000-0000-0000-0016-500000000000";

    controller.deleteBlog(userId, blogId);
  }
  
  @SuppressWarnings("unchecked")
  private void assertContaining(String userId, String blogId) {
    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) 
        controller.readBlogs(userId, null).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getId().equals(blogId), "blog exists"));
  }

  @SuppressWarnings("unchecked")
  private void assertNotContaining(String userId, String blogId) {
    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) 
        controller.readBlogs(userId, null).getBody();
    assertThat(result.getContent()).noneMatch(p -> p.getContent().getId().equals(blogId));
  }

}
