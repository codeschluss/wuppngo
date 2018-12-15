package de.codeschluss.portal.integration.user;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.user.UserController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mapping.PropertyReferenceException;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resources;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerReadBloggersTest {

  @Autowired
  private UserController controller;

  private FilterSortPaginate params = new FilterSortPaginate("user", 0, 5, "username", "asc", null);

  @Test
  @WithUserDetails("super@user")
  public void readAllBloggersWithoutPaginationSuperUserOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, "username", "asc", null);

    Resources<?> result = (Resources<?>) controller.readAllBloggers(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  @WithUserDetails("super@user")
  public void readAllBloggersEmptyParamsSuperUserOk() {
    FilterSortPaginate params = new FilterSortPaginate(null, null, null, null, null, null);

    Resources<?> result = (Resources<?>) controller.readAllBloggers(params).getBody();

    assertThat(result.getContent()).isNotEmpty();
  }

  @Test
  @WithUserDetails("super@user")
  public void readAllBloggersWithPaginationSuperUserOk() {
    PagedResources<?> result = (PagedResources<?>) controller.readAllBloggers(params).getBody();
    assertThat(result.getContent()).isNotEmpty();
  }

  @Test(expected = PropertyReferenceException.class)
  @WithUserDetails("super@user")
  public void readAllBloggersWrongParamsSuperUser() {
    FilterSortPaginate params = new FilterSortPaginate("user", 1, 5, "blablabla123", "wrong", null);
    controller.readAllBloggers(params);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("admin@user")
  public void readAllBloggersWithAdminUserDenied() {
    controller.readAllBloggers(params);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("provider1@user")
  public void readAllBloggersWithProviderUserDenied() {
    controller.readAllBloggers(params);
  }

  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("new@user")
  public void readAllBloggersWithNotApprovedUserUserDenied() {
    controller.readAllBloggers(params);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void readAllBloggersWithNoUserUserUserDenied() {
    controller.readAllBloggers(params);
  }
}
