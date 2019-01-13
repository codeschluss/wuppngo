package de.codeschluss.portal.components.blogger;

import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.DuplicateEntryException;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.repository.DataRepository;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.apache.commons.lang3.NotImplementedException;
import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.stereotype.Service;

/**
 * The Class BloggerService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class BloggerService extends ResourceDataService<BloggerEntity, BloggerQueryBuilder> {

  public BloggerService(DataRepository<BloggerEntity> repo, BloggerQueryBuilder entities,
      PagingAndSortingAssembler assembler) {
    super(repo, entities, assembler);
  }

  @Override
  public BloggerEntity getExisting(BloggerEntity newBlogger) {
    try {
      return getByUser(newBlogger.getUser().getId());
    } catch (NotFoundException e) {
      return null;
    }
  }
  
  @Override
  public boolean validCreateFieldConstraints(BloggerEntity newEntity) {
    return newEntity.getUser().getBlogger() != null;
  }

  @Override
  public boolean validUpdateFieldConstraints(BloggerEntity newEntity) {
    return newEntity.getUser().getBlogger() != null;
  }

  /**
   * Gets the by user.
   *
   * @param userId
   *          the user id
   * @return the by user
   */
  public BloggerEntity getByUser(String userId) {
    return repo.findOne(entities.withUserId(userId))
        .orElseThrow(() -> new NotFoundException(userId));
  }
  
  /**
   * Gets the by user.
   *
   * @param userId
   *          the user id
   * @return the by user
   */
  public Resource<?> getResourceByUser(String userId) {
    return assembler.toResource(getByUser(userId));
  }

  @Override
  public <P extends FilterSortPaginate> Resources<?> getSortedListResources(P params) {
    List<BloggerEntity> result = getSortedList(params);

    if (result == null || result.isEmpty()) {
      throw new NotFoundException("no bloggers found");
    }
    return assembler.toListResources(convertToEmbedded(result.stream()), params);
  }

  @Override
  public <P extends FilterSortPaginate> PagedResources<Resource<?>> getPagedResources(P params) {
    Page<BloggerEntity> pagedResult = getPaged(params);

    if (pagedResult == null || pagedResult.isEmpty()) {
      throw new NotFoundException("no bloggers found");
    }

    return assembler.toPagedResources(convertToEmbedded(pagedResult.stream()), pagedResult, params);
  }

  /**
   * Convert to embedded.
   *
   * @param stream
   *          the stream
   * @return the list
   */
  public List<Resource<?>> convertToEmbedded(Stream<BloggerEntity> stream) {
    return stream.map(blogger -> {
      Map<String, Object> embedded = new HashMap<>();
      embedded.put("blogger", blogger);
      return assembler.resourceWithEmbeddable(blogger.getUser(), embedded);
    }).collect(Collectors.toList());
  }

  @Override
  public BloggerEntity update(String id, BloggerEntity updatedEntity) {
    throw new NotImplementedException("For security reasons");
  }

  /**
   * Approve by user id.
   *
   * @param userId the user id
   */
  public void approveByUserId(String userId) {
    BloggerEntity blogger = getByUser(userId);
    blogger.setApproved(true);
    repo.save(blogger);
  }

  /**
   * Creates the application.
   *
   * @param user
   *          the user
   */
  public BloggerEntity createApplication(UserEntity user) {
    BloggerEntity blogger = new BloggerEntity();
    blogger.setApproved(false);
    blogger.setUser(user);
    if (getExisting(blogger) == null) {
      return repo.save(blogger);
    } else {
      throw new DuplicateEntryException("Blogger already exists");
    }
  }

  /**
   * Delete by user.
   *
   * @param userId the user id
   */
  public void deleteByUser(String userId) {
    repo.delete(getByUser(userId));
  }
}
