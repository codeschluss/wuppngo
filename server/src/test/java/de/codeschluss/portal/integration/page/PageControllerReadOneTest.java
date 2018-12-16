package de.codeschluss.portal.integration.page;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.page.PageController;
import de.codeschluss.portal.components.page.PageEntity;
import de.codeschluss.portal.core.exception.NotFoundException;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.Resource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PageControllerReadOneTest {

  @Autowired
  private PageController controller;

  @Test
  public void findOneOk() {
    String pageId = "00000000-0000-0000-0016-100000000000";

    Resource<PageEntity> result = (Resource<PageEntity>) controller.readOne(pageId);

    assertThat(result.getContent()).isNotNull();
  }

  @Test(expected = NotFoundException.class)
  public void findPageNotFound() {
    String pageId = "00000000-0000-0000-0016-XX0000000000";

    controller.readOne(pageId);
  }
}
