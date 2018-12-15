package de.codeschluss.portal.components.blog;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.repository.DataRepository;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * The Class BlogService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class BlogService extends ResourceDataService<BlogEntity, BlogQueryBuilder> {


  /**
   * Instantiates a new blog service.
   *
   * @param repo the repo
   * @param entities the entities
   * @param assembler the assembler
   */
  public BlogService(DataRepository<BlogEntity> repo, BlogQueryBuilder entities,
      PagingAndSortingAssembler assembler) {
    super(repo, entities, assembler);
  }

  @Override
  public BlogEntity getExisting(BlogEntity blog) {
    return repo.findById(blog.getId()).orElse(null);
  }
  
  /**
   * Checks if is blog user.
   *
   * @param blogId the blog id
   * @param userId the user id
   * @return true, if is blog user
   */
  public boolean isBlogUser(String blogId, String userId) {
    return repo.exists(entities.withBlogIdAndUserId(blogId, userId));
  }

  @Override
  public boolean validFieldConstraints(BlogEntity newBlog) {
    return newBlog.getTitle() != null && !newBlog.getTitle().isEmpty()
        && newBlog.getContent() != null && !newBlog.getContent().isEmpty();
  }

  @Override
  public BlogEntity update(String id, BlogEntity newBlog) {
    return repo.findById(id).map(blog -> {
      blog.setContent(newBlog.getContent());
      blog.setTitle(newBlog.getTitle());
      return repo.save(blog);
    }).orElseGet(() -> {
      newBlog.setId(id);
      return repo.save(newBlog);
    });
  }

  /**
   * Gets the by user.
   *
   * @param userId the user id
   * @return the by user
   */
  public List<BlogEntity> getByUser(String userId, BaseParams params) {
    Predicate query = entities.withUserId(userId);
    List<BlogEntity> result = params == null
        ? repo.findAll(query)
        : repo.findAll(query, entities.createSort(params));
    
    if (result == null || result.isEmpty()) {
      return Collections.emptyList();
    }
    
    return result;
  }

  /**
   * Increase like.
   *
   * @param blogId the blog id
   */
  public void increaseLike(String blogId) {
    BlogEntity blog = getById(blogId);
    blog.setLikes(blog.getLikes() + 1);
    repo.save(blog);
  }
}
