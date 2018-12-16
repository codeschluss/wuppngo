package de.codeschluss.portal.integration.page;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.page.PageController;
import de.codeschluss.portal.core.exception.NotFoundException;

import java.net.URISyntaxException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Rollback
public class PageControllerDeleteTest {

  @Autowired
  private PageController controller;

  @Test(expected = NotFoundException.class)
  @WithUserDetails("super@user")
  public void deleteSuperUserOk() throws URISyntaxException {
    String pageId = "00000000-0000-0000-0017-300000000000";
    assertThat(controller.readOne(pageId)).isNotNull();

    controller.delete(pageId);

    controller.readOne(pageId);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void deleteProviderUserDenied() throws URISyntaxException {
    String pageId = "00000000-0000-0000-0017-100000000000";

    controller.delete(pageId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void deleteOtherNotRegisteredDenied() {
    String pageId = "00000000-0000-0000-0017-100000000000";

    controller.delete(pageId);
  }

}
