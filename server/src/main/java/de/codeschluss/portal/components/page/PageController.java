package de.codeschluss.portal.components.page;

import static org.springframework.http.ResponseEntity.ok;

import de.codeschluss.portal.core.api.CrudController;
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
 * The Class PageController.
 * 
 * @author Valmir Etemi
 *
 */
@RestController
public class PageController extends CrudController<PageEntity, PageService> {
  
  /** The translation service. */
  private final TranslationService translationService;

  public PageController(
      PageService service,
      TranslationService translationService) {
    super(service);
    this.translationService = translationService;
  }

  @Override
  @GetMapping("/pages")
  public ResponseEntity<?> readAll(FilterSortPaginate params) {
    return super.readAll(params);
  }

  @Override
  @GetMapping("/pages/{pageId}")
  public Resource<PageEntity> readOne(@PathVariable String pageId) {
    return super.readOne(pageId);
  }

  @Override
  @PostMapping("/pages")
  @SuperUserPermission
  public ResponseEntity<?> create(@RequestBody PageEntity newPage) 
      throws URISyntaxException {
    return super.create(newPage);
  }

  @Override
  @PutMapping("/pages/{pageId}")
  @SuperUserPermission
  public ResponseEntity<?> update(@RequestBody PageEntity newPage,
      @PathVariable String pageId) throws URISyntaxException {
    return super.update(newPage, pageId);
  }

  @Override
  @DeleteMapping("/pages/{pageId}")
  @SuperUserPermission
  public ResponseEntity<?> delete(@PathVariable String pageId) {
    return super.delete(pageId);
  }
  
  /**
   * Read translations.
   *
   * @param pageId the page id
   * @return the response entity
   */
  @GetMapping("/pages/{pageId}/translations")
  public ResponseEntity<?> readTranslations(@PathVariable String pageId) {
    try {
      return ok(translationService.getAllTranslations(service.getById(pageId)));
    } catch (NoSuchMethodException | SecurityException | IllegalAccessException
        | IllegalArgumentException | InvocationTargetException | IOException e) {
      throw new RuntimeException(e.getMessage());
    }
  }
}
