package de.codeschluss.portal.integration.topic;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.topic.TopicController;
import de.codeschluss.portal.components.topic.TopicEntity;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class TopicControllerUpdateTest {

  @Autowired
  private TopicController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    TopicEntity topic = newTopic("updateSuperUserOk");
    String topicId = "00000000-0000-0000-0015-200000000000";

    controller.update(topic, topicId);

    Resource<TopicEntity> result = (Resource<TopicEntity>) controller.readOne(topicId);
    assertThat(result.getContent().getName()).isEqualTo(topic.getName());
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidNameDenied() throws URISyntaxException {
    TopicEntity topic = newTopic(null);
    String topicId = "00000000-0000-0000-0015-100000000000";

    controller.update(topic, topicId);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedName() throws URISyntaxException {
    TopicEntity topic = newTopic("topic1");
    String topicId = "00000000-0000-0000-0015-100000000000";

    controller.update(topic, topicId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    TopicEntity topic = newTopic("updateProviderUserDenied");
    String topicId = "00000000-0000-0000-0015-100000000000";

    controller.update(topic, topicId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    TopicEntity topic = newTopic("updateNoUserDenied");
    String topicId = "00000000-0000-0000-0015-100000000000";

    controller.update(topic, topicId);
  }

  private TopicEntity newTopic(String name) {
    TopicEntity topic = new TopicEntity();
    topic.setName(name);
    return topic;
  }

}
