package de.codeschluss.portal.integration.activity;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.activity.ActivityController;
import de.codeschluss.portal.core.exception.BadParamsException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityControllerIncreaseLike {
  
  @Autowired
  private ActivityController controller;

  @Test
  public void findOneOk() {
    String activityId = "00000000-0000-0000-0010-100000000000";
    int likesCount = controller.readOne(activityId).getContent().getLikes();
    
    controller.increaseLike(activityId);
    
    assertThat(controller.readOne(activityId).getContent().getLikes()).isEqualTo(likesCount + 1); 
  }

  @Test(expected = BadParamsException.class)
  public void findOneNotFound() {
    String activityId = "00000000-0000-0000-0010-XX0000000000";

    controller.increaseLike(activityId);
  }

}
