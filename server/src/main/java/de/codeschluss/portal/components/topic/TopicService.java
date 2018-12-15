package de.codeschluss.portal.components.topic;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
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
  public boolean validFieldConstraints(TopicEntity newPage) {
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
}
