package de.codeschluss.portal.integration.blog;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.blog.BlogController;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BlogControllerUpdateActivityTest {

  @Autowired
  private BlogController controller;

  @Test
  @WithUserDetails("blog1@user")
  public void updateActivityBloggerOk() throws URISyntaxException {
    String blogId = "00000000-0000-0000-0016-200000000000";
    String activityId = "00000000-0000-0000-0010-200000000000";
    
    controller.updateActivity(blogId, activityId);
    
    assertContaining(blogId, activityId);
  }

  @Test
  @WithUserDetails("super@user")
  public void updateActivitySuperUserOk() throws URISyntaxException {
    String blogId = "00000000-0000-0000-0016-200000000000";
    String activityId = "00000000-0000-0000-0010-300000000000";
    
    controller.updateActivity(blogId, activityId);
    
    assertContaining(blogId, activityId);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("blog1@user")
  public void updateActivityOtherDenied() throws URISyntaxException {
    String blogId = "00000000-0000-0000-0016-300000000000";
    String activityId = "00000000-0000-0000-0010-400000000000";
    
    controller.updateActivity(blogId, activityId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateActivityNoUserDenied() throws URISyntaxException {
    String blogId = "00000000-0000-0000-0016-300000000000";
    String activityId = "00000000-0000-0000-0010-400000000000";
    
    controller.updateActivity(blogId, activityId);
  }
  
  @SuppressWarnings("unchecked")
  private void assertContaining(String blogId, String activityId) {
    Resource<ActivityEntity> result = (Resource<ActivityEntity>) controller
        .readActivity(blogId).getBody();
    assertThat(result.getContent().getId()).isEqualTo(activityId);
  }

}
