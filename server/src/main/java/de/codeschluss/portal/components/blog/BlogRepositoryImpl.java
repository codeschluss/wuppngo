package de.codeschluss.portal.components.blog;

import com.querydsl.core.types.Predicate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * The Class BlogRepositoryImpl.
 * 
 * @author Valmir Etemi
 *
 */
@Transactional
@Service
public class BlogRepositoryImpl implements BlogRepositoryCustom {

  @Autowired
  private BlogRepository defaultBlogRepo;
  
  @Override
  public Optional<BlogEntity> findOne(Predicate predicate) {
    Optional<BlogEntity> optional = defaultBlogRepo.findOne(predicate);
    return optional.isPresent()
        ? Optional.of(transformSingle(optional.get()))
        : optional;
  }

  @Override
  public List<BlogEntity> findAll() {
    return transformList(defaultBlogRepo.findAll());
  }

  @Override
  public List<BlogEntity> findAll(Sort sort) {
    return transformList(defaultBlogRepo.findAll(sort));
  }

  @Override
  public List<BlogEntity> findAll(Predicate predicate, Sort sort) {
    return transformList(defaultBlogRepo.findAll(predicate, sort));
  }

  @Override
  public Page<BlogEntity> findAll(Predicate predicate, Pageable pageable) {
    return transformPage(defaultBlogRepo.findAll(predicate, pageable));
  }

  @Override
  public List<BlogEntity> findAll(Predicate predicate) {
    return transformList(defaultBlogRepo.findAll(predicate));
  }

  /**
   * Transform.
   *
   * @param stream the stream
   * @return the list
   */
  private List<BlogEntity> transformList(List<BlogEntity> list) {
    return list.parallelStream().map(blog -> {
      return transformSingle(blog);
    }).collect(Collectors.toList());
  }
  
  /**
   * Transform page.
   *
   * @param page the page
   * @return the page
   */
  private Page<BlogEntity> transformPage(Page<BlogEntity> page) {
    return page.map(blog -> {
      return transformSingle(blog);
    });
  }
  
  /**
   * Transform single.
   *
   * @param findOne the find one
   * @return the optional
   */
  private BlogEntity transformSingle(BlogEntity single) {
    single.setAuthor(single.getBlogger().getUser().getName());
    return single;
  }
}
