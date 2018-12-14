package de.codeschluss.portal.components.blogger;

import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.repository.DataRepository;
import de.codeschluss.portal.core.service.DataService;

import org.apache.commons.lang3.NotImplementedException;
import org.springframework.stereotype.Service;

/**
 * The Class BloggerService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class BloggerService extends DataService<BloggerEntity, BloggerQueryBuilder> {

  public BloggerService(DataRepository<BloggerEntity> repo, BloggerQueryBuilder entities) {
    super(repo, entities);
  }

  @Override
  public BloggerEntity getExisting(BloggerEntity newBlogger) {
    try {
      return getByUser(newBlogger.getUser());
    } catch (NotFoundException e) {
      return null;
    }
  }

  @Override
  public boolean validFieldConstraints(BloggerEntity newEntity) {
    return newEntity.getUser().getBlogger() != null;
  }

  @Override
  public BloggerEntity update(String id, BloggerEntity updatedEntity) {
    throw new NotImplementedException("For security reasons");
  }

  /**
   * Gets the by user.
   *
   * @param user the user
   * @return the by user
   */
  public BloggerEntity getByUser(UserEntity user) {
    return repo.findOne(entities.withUserId(user.getId()))
        .orElseThrow(() -> new NotFoundException(user.getId()));
  }
}
