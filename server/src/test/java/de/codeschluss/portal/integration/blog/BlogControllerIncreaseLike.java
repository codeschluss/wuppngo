package de.codeschluss.portal.integration.blog;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blog.BlogController;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BlogControllerIncreaseLike {
  
  @Autowired
  private BlogController controller;

  @Test
  public void findOneOk() {
    String blogId = "00000000-0000-0000-0016-100000000000";
    int likesCount = controller.readOne(blogId).getContent().getLikes();
    
    controller.increaseLike(blogId);
    
    assertThat(controller.readOne(blogId).getContent().getLikes()).isEqualTo(likesCount + 1); 
  }

  @Test(expected = BadParamsException.class)
  public void findOneNotFound() {
    String blogId = "00000000-0000-0000-0016-XX0000000000";

    controller.increaseLike(blogId);
  }

}
