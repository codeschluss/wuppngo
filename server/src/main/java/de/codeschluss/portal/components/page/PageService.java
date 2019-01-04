package de.codeschluss.portal.components.page;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.util.List;

import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class PageService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class PageService extends ResourceDataService<PageEntity, PageQueryBuilder> {

  /**
   * Instantiates a new page service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public PageService(PageRepository repo, PagingAndSortingAssembler assembler,
      PageQueryBuilder entities) {
    super(repo, entities, assembler);
  }

  @Override
  public PageEntity getExisting(PageEntity newPage) {
    return repo.findOne(entities.withTitle(newPage.getTitle())).orElse(null);
  }

  @Override
  public boolean validCreateFieldConstraints(PageEntity newPage) {
    return validBaseFields(newPage) && newPage.getTopicId() != null
        && !newPage.getTopicId().isEmpty();
  }

  @Override
  public boolean validUpdateFieldConstraints(PageEntity newPage) {
    return validBaseFields(newPage);
  }

  /**
   * Valid base fields.
   *
   * @param newPage
   *          the new page
   * @return true, if successful
   */
  private boolean validBaseFields(PageEntity newPage) {
    return newPage.getTitle() != null && !newPage.getTitle().isEmpty()
        && newPage.getContent() != null && !newPage.getContent().isEmpty();
  }

  @Override
  public PageEntity update(String id, PageEntity newPage) {
    return repo.findById(id).map(page -> {
      page.setTitle(newPage.getTitle());
      page.setContent(newPage.getContent());
      return repo.save(page);
    }).orElseGet(() -> {
      newPage.setId(id);
      return repo.save(newPage);
    });
  }

  /**
   * Gets the resource by topic.
   *
   * @param topicId the topic id
   * @param params the params
   * @return the resource by topic
   * @throws JsonParseException the json parse exception
   * @throws JsonMappingException the json mapping exception
   * @throws IOException Signals that an I/O exception has occurred.
   */
  public Resources<?> getResourcesByTopic(String topicId, BaseParams params)
      throws JsonParseException, JsonMappingException, IOException {
    List<PageEntity> pages = repo.findAll(
        entities.withTopicId(topicId), 
        entities.createSort(params));
    if (pages == null || pages.isEmpty()) {
      throw new NotFoundException(topicId);
    }
    return assembler.entitiesToResources(pages, params);
  }
}
