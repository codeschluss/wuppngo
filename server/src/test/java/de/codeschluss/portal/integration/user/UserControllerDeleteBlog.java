package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.components.user.UserController;

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
public class UserControllerDeleteBlog {
  
  @Autowired
  private UserController controller;
  
  @Test
  @WithUserDetails("super@user")
  public void deleteForOtherUserSuperUserOk() {
    String userId = "00000000-0000-0000-0004-900000000000";
    String blogId = "00000000-0000-0000-0008-800000000000";

    assertContaining(userId, blogId);

    controller.deleteBlog(userId, blogId);

    assertNotContaining(userId, blogId);
  }

  @Test
  @WithUserDetails("provider3@user")
  public void deleteBlogForOwnUserOk() {
    String userId = "00000000-0000-0000-0004-800000000000";
    String blogId = "00000000-0000-0000-0008-200000000000";

    assertContaining(userId, blogId);

    controller.deleteBlog(userId, blogId);

    assertNotContaining(userId, blogId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteBlogForOtherUserDenied() {
    String userId = "00000000-0000-0000-0004-800000000000";
    String providerId = "00000000-0000-0000-0008-300000000000";

    controller.deleteBlog(userId, providerId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteBlogForOtherUserNotRegisteredDenied() {
    String userId = "00000000-0000-0000-0004-800000000000";
    String providerId = "00000000-0000-0000-0008-300000000000";

    controller.deleteBlog(userId, providerId);
  }
  
  @SuppressWarnings("unchecked")
  private void assertContaining(String userId, String blogId) {
    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) 
        controller.readBlogs(userId, null).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getId().equals(blogId), "blognisation exists"));
  }

  @SuppressWarnings("unchecked")
  private void assertNotContaining(String userId, String blogId) {
    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) 
        controller.readBlogs(userId, null).getBody();
    assertThat(result.getContent()).noneMatch(p -> p.getContent().getId().equals(blogId));
  }

}
