package de.codeschluss.portal.integration.blog;

import static org.assertj.core.api.Assertions.assertThat;

import de.codeschluss.portal.components.blog.BlogController;
import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;

import java.net.URISyntaxException;

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
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class BlogControllerUpdateTest {

  @Autowired
  private BlogController controller;

  @Test
  @WithUserDetails("blog1@user")
  public void updateBloggerOk() throws URISyntaxException {
    BlogEntity blog = newBlog("updateBloggerOk", "updateBloggerOk");
    String blogId = "00000000-0000-0000-0016-200000000000";

    controller.update(blog, blogId);
    
    assertContaining(blog);
  }

  @Test(expected = BadParamsException.class)
  @WithUserDetails("blog1@user")
  public void updateNotValidTitleDenied() throws URISyntaxException {
    BlogEntity blog = newBlog(null, "updateNotValidDenied");
    String blogId = "00000000-0000-0000-0016-200000000000";

    controller.update(blog, blogId);
  }
  
  @Test(expected = BadParamsException.class)
  @WithUserDetails("blog1@user")
  public void updateNotValidContentDenied() throws URISyntaxException {
    BlogEntity blog = newBlog("updateNotValidDenied", null);
    String blogId = "00000000-0000-0000-0016-200000000000";

    controller.update(blog, blogId);
  }

  @Test
  @WithUserDetails("super@user")
  public void updateSuperUserOk() throws URISyntaxException {
    BlogEntity blog = newBlog("updateSuperUserOk", "updateSuperUserOk");
    String blogId = "00000000-0000-0000-0016-200000000000";

    controller.update(blog, blogId);
    
    assertContaining(blog);
  }
  
  @Test(expected = AccessDeniedException.class)
  @WithUserDetails("blog1@user")
  public void updateOtherDenied() throws URISyntaxException {
    BlogEntity blog = newBlog("updateSuperUserOk", "updateSuperUserOk");
    String blogId = "00000000-0000-0000-0016-300000000000";

    controller.update(blog, blogId);
  }

  @Test(expected = AuthenticationCredentialsNotFoundException.class)
  public void updateNoUserDenied() throws URISyntaxException {
    BlogEntity blog = newBlog("updateNoUserDenied", "updateNoUserDenied");
    String blogId = "00000000-0000-0000-0016-100000000000";

    controller.update(blog, blogId);
  }
  
  private BlogEntity newBlog(String title, String content) {
    BlogEntity blog = new BlogEntity();
    blog.setTitle(title);
    blog.setContent(content);
    return blog;
  }
  
  @SuppressWarnings("unchecked")
  private void assertContaining(BlogEntity blog) {
    Resources<Resource<BlogEntity>> result = (Resources<Resource<BlogEntity>>) controller
        .readAll(new FilterSortPaginate()).getBody();
    assertThat(result.getContent()).haveAtLeastOne(
        new Condition<>(p -> p.getContent().getTitle().equals(blog.getTitle()), "blog exists"));
  }

}
