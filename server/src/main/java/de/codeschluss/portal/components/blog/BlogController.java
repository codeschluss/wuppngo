package de.codeschluss.portal.components.blog;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.blogger.BloggerEntity;
import de.codeschluss.portal.components.blogger.BloggerService;
import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.BadParamsException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.i18n.translation.TranslationService;
import de.codeschluss.portal.core.security.permissions.BloggerPermission;
import de.codeschluss.portal.core.security.permissions.OwnBlogOrSuperuserPermission;
import de.codeschluss.portal.core.security.permissions.OwnOrOrgaActivityOrSuperUserPermission;
import de.codeschluss.portal.core.security.services.AuthorizationService;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URISyntaxException;

import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class BlogController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class BlogController extends CrudController<BlogEntity, BlogService> {
  
  /** The blogger service. */
  private final BloggerService bloggerService;
  
  /** The activity service. */
  private final ActivityService activityService;
  
  /** The translation service. */
  private final TranslationService translationService;
  
  /** The auth service. */
  private final AuthorizationService authService;

  /**
   * Instantiates a new blog controller.
   *
   * @param service the service
   */
  public BlogController(
      BlogService service,
      BloggerService bloggerService,
      ActivityService activityService,
      TranslationService translationService,
      AuthorizationService authService) {
    super(service);
    this.bloggerService = bloggerService;
    this.activityService = activityService;
    this.translationService = translationService;
    this.authService = authService;
  }
  
  @Override
  @GetMapping("/blogs")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }
  
  @Override
  @GetMapping("/blogs/{blogId}")
  public Resource<BlogEntity> readOne(@PathVariable String blogId) {
    return super.readOne(blogId);
  }

  @Override
  @PostMapping("/blogs")
  @BloggerPermission
  public ResponseEntity<?> create(@RequestBody BlogEntity newBlog) throws URISyntaxException {
    newBlog.setBlogger(getBlogger());
    return super.create(newBlog);
  }
  
  private BloggerEntity getBlogger() {
    return bloggerService.getByUser(authService.getCurrentUser().getId());
  }

  @Override
  @PutMapping("/blogs/{blogId}")
  @OwnBlogOrSuperuserPermission
  public ResponseEntity<?> update(@RequestBody BlogEntity newBlog, @PathVariable String blogId)
      throws URISyntaxException {
    return super.update(newBlog, blogId);
  }

  @Override
  @DeleteMapping("/blogs/{blogId}")
  @OwnBlogOrSuperuserPermission
  public ResponseEntity<?> delete(@PathVariable String blogId) {
    return super.delete(blogId);
  }
  
  /**
   * Read activity.
   *
   * @param blogId the blog id
   * @return the response entity
   */
  @GetMapping("/blogs/{blogId}/activity")
  public ResponseEntity<?> readActivity(@PathVariable String blogId) {
    return ok(activityService.getResourceByBlogId(blogId)); 
  }

  /**
   * Update activity.
   *
   * @param blogId the blog id
   * @param activityId the activity id
   * @return the response entity
   */
  @PutMapping("/blogs/{activityId}/activity")
  @OwnBlogOrSuperuserPermission
  public ResponseEntity<?> updateActivity(@PathVariable String blogId,
      @RequestBody String activityId) {
    if (activityService.existsById(activityId) && service.existsById(blogId)) {
      return ok(service.updateActivity(blogId, activityService.getById(activityId)));
    } else {
      throw new BadParamsException("Blog or Activity with given ID do not exist!");
    }
  }
  
  /**
   * Read translations.
   *
   * @param blogId
   *          the blog id
   * @return the response entity
   */
  @GetMapping("/activities/{blogId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String blogId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(blogId)));
    } catch (NoSuchMethodException | SecurityException | IllegalAccessException
        | IllegalArgumentException | InvocationTargetException | IOException e) {
      throw new RuntimeException(e.getMessage());
    }
  }
  
  /**
   * Increase like.
   *
   * @param blogId the blog id
   * @return the response entity
   */
  @PutMapping("/blogs/{blogId}/like")
  public ResponseEntity<?> increaseLike(@PathVariable String blogId) {
    try {
      service.increaseLike(blogId);
      return noContent().build();
    } catch (NotFoundException e) {
      throw new BadParamsException("Given Activity does not exist");
    }
  }
}
