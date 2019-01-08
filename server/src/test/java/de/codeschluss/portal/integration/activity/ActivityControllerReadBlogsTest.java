package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerReadBlogsTest {
  
  @Autowired
  private ActivityController controller;

  @Test
  @SuppressWarnings("unchecked")
  public void findBlogsOk() {
    String activityId = "00000000-0000-0000-0010-100000000000";

    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) controller
        .readBlogs(activityId, null).getBody();

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findBlogNotFound() {
    String activityId = "00000000-0000-0000-0010-XX0000000000";

    controller.readBlogs(activityId, null);
  }

}
