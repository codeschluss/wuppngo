package de.codeschluss.portal.components.topic;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.service.ResourceDataService;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class PageService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class TopicService extends ResourceDataService<TopicEntity, TopicQueryBuilder> {
  
  /**
   * Instantiates a new topic service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public TopicService(
      TopicRepository repo, 
      PagingAndSortingAssembler assembler,
      TopicQueryBuilder entities) {
    super(repo, entities, assembler);
  }

  @Override
  public TopicEntity getExisting(TopicEntity newPage) {
    return repo.findOne(entities.withName(newPage.getName())).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(TopicEntity newPage) {
    return validFields(newPage);
  }
  
  @Override
  public boolean validUpdateFieldConstraints(TopicEntity newPage) {
    return validFields(newPage);
  }

  /**
   * Valid fields.
   *
   * @param newPage the new page
   * @return true, if successful
   */
  private boolean validFields(TopicEntity newPage) {
    return newPage.getName() != null && !newPage.getName().isEmpty();
  }

  @Override
  public TopicEntity update(String id, TopicEntity newTopic) {
    return repo.findById(id).map(topic -> {
      topic.setName(newTopic.getName());
      return repo.save(topic);
    }).orElseGet(() -> {
      newTopic.setId(id);
      return repo.save(newTopic);
    });
  }

  /**
   * Gets the resource by page.
   *
   * @param pageId the page id
   * @return the resource by page
   */
  public Object getResourceByPage(String pageId) {
    TopicEntity topic = repo.findOne(entities.withAnyPageId(pageId))
        .orElseThrow(() -> new NotFoundException(pageId));
    return assembler.toResource(topic);
  }
}
