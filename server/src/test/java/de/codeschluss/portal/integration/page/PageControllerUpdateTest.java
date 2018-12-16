package de.codeschluss.portal.integration.page;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.page.PageController;
import de.codeschluss.portal.components.page.PageEntity;
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
public class PageControllerUpdateTest {

  @Autowired
  private PageController controller;

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    String topicId = "00000000-0000-0000-0014-200000000000";
    PageEntity page = newPage("updateSuperUserOk", "updateSuperUserOk", topicId);
    String pageId = "00000000-0000-0000-0017-200000000000";

    controller.update(page, pageId);

    Resource<PageEntity> result = (Resource<PageEntity>) controller.readOne(pageId);
    assertThat(result.getContent().getTitle()).isEqualTo(page.getTitle());
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidTitleDenied() throws URISyntaxException {
    String topicId = "00000000-0000-0000-0014-200000000000";
    PageEntity page = newPage(null, "updateNotValidTitleDenied", topicId);
    String pageId = "00000000-0000-0000-0017-200000000000";

    controller.update(page, pageId);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void updateNotValidContentDenied() throws URISyntaxException {
    String topicId = "00000000-0000-0000-0014-200000000000";
    PageEntity page = newPage("updateNotValidContentDenied", null, topicId);
    String pageId = "00000000-0000-0000-0017-200000000000";

    controller.update(page, pageId);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void updateSuperUserDuplicatedTitle() throws URISyntaxException {
    String topicId = "00000000-0000-0000-0014-200000000000";
    PageEntity page = newPage("page1", "updateSuperUserDuplicatedTitle", topicId);
    String pageId = "00000000-0000-0000-0017-200000000000";

    controller.update(page, pageId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void updateProviderUserDenied() throws URISyntaxException {
    String topicId = "00000000-0000-0000-0014-200000000000";
    PageEntity page = newPage("updateProviderUserDenied", "updateProviderUserDenied", topicId);
    String pageId = "00000000-0000-0000-0017-100000000000";

    controller.update(page, pageId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    String topicId = "00000000-0000-0000-0014-200000000000";
    PageEntity page = newPage("updateNoUserDenied", "updateNoUserDenied", topicId);
    String pageId = "00000000-0000-0000-0017-100000000000";

    controller.update(page, pageId);
  }

  private PageEntity newPage(String title, String content, String topicId) {
    PageEntity page = new PageEntity();
    page.setTitle(title);
    page.setContent(content);
    page.setTopicId(topicId);
    return page;
  }

}
