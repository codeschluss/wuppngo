package de.codeschluss.portal.integration.topic;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.topic.TopicController;
import de.codeschluss.portal.components.topic.TopicEntity;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TopicControllerReadOneTest {

  @Autowired
  private TopicController controller;

  @Test
  public void findOneOk() {
    String topicId = "00000000-0000-0000-0014-100000000000";

    Resource<TopicEntity> result = (Resource<TopicEntity>) controller.readOne(topicId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findTopicNotFound() {
    String topicId = "00000000-0000-0000-0014-XX0000000000";

    controller.readOne(topicId);
  }
}
