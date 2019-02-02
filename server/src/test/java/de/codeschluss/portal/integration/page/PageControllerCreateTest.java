package de.codeschluss.portal.integration.page;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.page.PageController;
import de.codeschluss.portal.components.page.PageEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.DuplicateEntryException;

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
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PageControllerCreateTest {

  @Autowired
  private PageController controller;

  @Test
  @WithUserDetails("super@user")
  @SuppressWarnings("unchecked")
  public void createSuperUserOk() throws Exception {
    String topicId = "00000000-0000-0000-0014-100000000000";
    PageEntity page = newPage("createSuperUserOk", "createSuperUserOk", topicId);

    controller.create(page);

    Resources<Resource<PageEntity>> result = (Resources<Resource<PageEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(new Condition<>(
        p -> p.getContent().getTitle().equals(page.getTitle()), "page exists"));
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidTitleDenied() throws Exception {
    String topicId = "00000000-0000-0000-0014-100000000000";
    PageEntity page = newPage(null, "createNotValidTitleDenied", topicId);

    controller.create(page);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("super@user")
  public void createNotValidContentDenied() throws Exception {
    String topicId = "00000000-0000-0000-0014-100000000000";
    PageEntity page = newPage("createNotValidContentDenied", null, topicId);

    controller.create(page);
  }

  @Test(expected = DuplicateEntryException.class)
  @WithUserDetails("super@user")
  public void createSuperUserDuplicated() throws Exception {
    String topicId = "00000000-0000-0000-0014-100000000000";
    PageEntity page = newPage("page1", "createSuperUserDuplicated", topicId);

    controller.create(page);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void createProviderDenied() throws Exception {
    String topicId = "00000000-0000-0000-0014-100000000000";
    PageEntity page = newPage("createProviderDenied", "createProviderDenied", topicId);

    controller.create(page);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void createNoUserDenied() throws Exception {
    String topicId = "00000000-0000-0000-0014-100000000000";
    PageEntity page = newPage("createNoUserDenied", "createNoUserDenied", topicId);

    controller.create(page);
  }

  private PageEntity newPage(String name, String content, String topicId) {
    PageEntity page = new PageEntity();
    page.setTitle(name);
    page.setContent(content);
    page.setTopicId(topicId);
    return page;
  }
}
