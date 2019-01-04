package de.codeschluss.portal.integration.topic;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.page.PageEntity;
import de.codeschluss.portal.components.topic.TopicController;
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
public class TopicControllerReadPagesTest {

  @Autowired
  private TopicController controller;

  @Test
  @SuppressWarnings("unchecked")
  public void readPagesOk() {
    String topicId = "00000000-0000-0000-0014-100000000000";

    Resources<Resource<PageEntity>> result = (Resources<Resource<PageEntity>>) controller
        .readPages(topicId, null).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = NotFoundException.class)
  public void readPagesNotFound() {
    String topicId = "00000000-0000-0000-0014-XX0000000000";

    controller.readPages(topicId, null);
  }
}
