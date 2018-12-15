package de.codeschluss.portal.components.blog;

import com.querydsl.core.types.Predicate;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public interface BlogRepositoryCustom {
  
  public Optional<BlogEntity> findOne(Predicate predicate);
  
  public List<BlogEntity> findAll();
  
  public List<BlogEntity> findAll(Sort sort);
  
  public List<BlogEntity> findAll(Predicate predicate, Sort sort);
  
  public Page<BlogEntity> findAll(Predicate predicate, Pageable pageable);
  
  public List<BlogEntity> findAll(Predicate predicate);

}
