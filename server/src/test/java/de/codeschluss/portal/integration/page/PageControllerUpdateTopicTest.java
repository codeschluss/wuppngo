package de.codeschluss.portal.integration.page;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.page.PageController;
import de.codeschluss.portal.components.topic.TopicEntity;
import de.codeschluss.portal.core.api.dto.StringPrimitive;
import de.codeschluss.portal.core.exception.BadParamsException;

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
public class PageControllerUpdateTopicTest {

  @Autowired
  private PageController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateTopicSuperUserOk() throws URISyntaxException {
    StringPrimitive topicId = new StringPrimitive("00000000-0000-0000-0014-100000000000");
    String pageId = "00000000-0000-0000-0016-200000000000";

    controller.updateTopic(pageId, topicId);

    assertContaining(pageId, topicId);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateTopicBadPage() throws URISyntaxException {
    StringPrimitive topicId = new StringPrimitive("00000000-0000-0000-0014-200000000000");
    String pageId = "00000000-0000-0000-0016-XX0000000000";

    controller.updateTopic(pageId, topicId);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateTopicBadTopic() throws URISyntaxException {
    StringPrimitive topicId = new StringPrimitive("00000000-0000-0000-0014-XX0000000000");
    String pageId = "00000000-0000-0000-0016-200000000000";

    controller.updateTopic(pageId, topicId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    StringPrimitive topicId = new StringPrimitive("00000000-0000-0000-0014-100000000000");
    String pageId = "00000000-0000-0000-0016-100000000000";

    controller.updateTopic(pageId, topicId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    StringPrimitive topicId = new StringPrimitive("00000000-0000-0000-0014-100000000000");
    String pageId = "00000000-0000-0000-0016-100000000000";

    controller.updateTopic(pageId, topicId);
  }
  
  @SuppressWarnings("unchecked")
  private void assertContaining(String pageId, StringPrimitive topicId) {
    Resource<TopicEntity> result = (Resource<TopicEntity>) controller.readTopic(pageId)
        .getBody();
    assertThat(result.getContent().getId()).isEqualTo(topicId.getValue());
  }

}
