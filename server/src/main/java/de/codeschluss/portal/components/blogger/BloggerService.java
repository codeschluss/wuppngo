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
      return getByUser(newBlogger.getUser().getId());
    } catch (NotFoundException e) {
      return null;
    }
  }
  
  /**
   * Gets the by user.
   *
   * @param userId the user id
   * @return the by user
   */
  public BloggerEntity getByUser(String userId) {
    return repo.findOne(entities.withUserId(userId))
        .orElseThrow(() -> new NotFoundException(userId));
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
   * Sets the blogger approval by user id.
   *
   * @param userId the user id
   * @param approved the approved
   */
  public void setBloggerApprovalByUserId(String userId, Boolean approved) {
    BloggerEntity blogger = getByUser(userId);
    blogger.setApproved(approved);
    repo.save(blogger);
  }

  /**
   * Creates the application.
   *
   * @param user the user
   */
  public void createApplication(UserEntity user) {
    BloggerEntity blogger = new BloggerEntity();
    blogger.setApproved(false);
    repo.save(blogger);
  }
}
