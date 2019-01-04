package de.codeschluss.portal.components.topic;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.components.page.PageService;
import de.codeschluss.portal.core.api.CrudController;
import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.translation.TranslationService;
import de.codeschluss.portal.core.security.permissions.SuperUserPermission;

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
 * The Class TopicController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class TopicController extends CrudController<TopicEntity, TopicService> {
  
  /** The translation service. */
  private final TranslationService translationService;
  
  /** The page service. */
  private final PageService pageService;

  /**
   * Instantiates a new topic controller.
   *
   * @param service the service
   * @param pageService the page service
   * @param translationService the translation service
   */
  public TopicController(
      TopicService service,
      PageService pageService,
      TranslationService translationService) {
    super(service);
    this.pageService = pageService;
    this.translationService = translationService;
  }

  @Override
  @GetMapping("/topics")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/topics/{topicId}")
  public Resource<TopicEntity> readOne(@PathVariable String topicId) {
    return super.readOne(topicId);
  }

  @Override
  @PostMapping("/topics")
  @SuperUserPermission
  public ResponseEntity<?> create(@RequestBody TopicEntity newTopic) 
      throws URISyntaxException {
    return super.create(newTopic);
  }

  @Override
  @PutMapping("/topics/{topicId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody TopicEntity newTopic,
      @PathVariable String topicId) throws URISyntaxException {
    return super.update(newTopic, topicId);
  }

  @Override
  @DeleteMapping("/topics/{topicId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String topicId) {
    return super.delete(topicId);
  }
  
  /**
   * Read pages.
   *
   * @param topicId the topic id
   * @param params the params
   * @return the response entity
   */
  @GetMapping("/topics/{topicId}/pages")
  public ResponseEntity<?> readPages(@PathVariable String topicId, BaseParams params) {
    try {
      return ok(pageService.getResourcesByTopic(topicId, params));
    } catch (IOException e) {
      throw new RuntimeException(e.getMessage());
    }
  }
  
  /**
   * Read translations.
   *
   * @param topicId the topic id
   * @return the response entity
   */
  @GetMapping("/topics/{topicId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String topicId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(topicId)));
    } catch (NoSuchMethodException | SecurityException | IllegalAccessException
        | IllegalArgumentException | InvocationTargetException | IOException e) {
      throw new RuntimeException(e.getMessage());
    }
  }
}
