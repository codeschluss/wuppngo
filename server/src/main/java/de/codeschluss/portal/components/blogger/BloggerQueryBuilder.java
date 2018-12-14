package de.codeschluss.portal.components.blogger;

import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.service.QueryBuilder;

import org.springframework.stereotype.Service;

/**
 * The Class BloggerQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class BloggerQueryBuilder extends QueryBuilder<QBloggerEntity> {

  public BloggerQueryBuilder() {
    super(QBloggerEntity.bloggerEntity);
  }

  @Override
  public <P extends FilterSortPaginate> Predicate search(P params) {
    String filter = prepareFilter(params.getFilter());
    return query.user.name.likeIgnoreCase(filter)
        .or(query.blogs.any().translatables.any().title.likeIgnoreCase(filter))
        .or(query.blogs.any().translatables.any().content.likeIgnoreCase(filter));
  }

  /**
   * With user id.
   *
   * @param userId the user id
   * @return the predicate
   */
  public Predicate withUserId(String userId) {
    return query.user.id.eq(userId);
  }

}
