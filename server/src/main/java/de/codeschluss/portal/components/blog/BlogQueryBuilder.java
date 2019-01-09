package de.codeschluss.portal.components.blog;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.service.QueryBuilder;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * The Class BlogQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class BlogQueryBuilder extends QueryBuilder<QBlogEntity> {
  
  protected final String defaultSortProp = "translatables.title";
  
  /** The language service. */
  private final LanguageService languageService;

  public BlogQueryBuilder(LanguageService languageService) {
    super(QBlogEntity.blogEntity);
    this.languageService = languageService;
  }
  
  @Override
  public boolean localized() {
    return true;
  }
  
  @Override
  protected String prepareSort(String sortProp) {
    return sortProp.equals("title") || sortProp.equals("content")
        ? "translatables." + sortProp
        : sortProp;
  }

  @Override
  public <P extends FilterSortPaginate> Predicate search(P params) {
    List<String> locales = languageService.getCurrentReadLocales();
    BooleanBuilder search = new BooleanBuilder(withLocalized(locales));
    return params.isEmptyQuery()
        ? search.getValue()
        : searchFiltered(search, params);
  }

  /**
   * With localized.
   *
   * @param locales the locales
   * @return the predicate
   */
  private Predicate withLocalized(List<String> locales) {
    String defaultLang = languageService.getDefaultLocale();
    if (!locales.contains(defaultLang)) {
      locales.add(defaultLang);
    }
    return query.translatables.any().language.locale.in(locales);
  }
  
  /**
   * Search filtered.
   *
   * @param search the search
   * @param filter the filter
   * @return the predicate
   */
  private Predicate searchFiltered(BooleanBuilder search, FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return search.and(likeTitle(filter)
        .or(likeContent(filter)));
  }

  /**
   * Like title.
   *
   * @param filter the filter
   * @return the boolean expression
   */
  private BooleanExpression likeTitle(String filter) {
    return query.translatables.any().title.likeIgnoreCase(filter)
        .and(query.translatables.any().language.locale.in(languageService.getCurrentReadLocales()));
  }

  /**
   * Like content.
   *
   * @param filter the filter
   * @return the boolean expression
   */
  private BooleanExpression likeContent(String filter) {
    return query.translatables.any().content.likeIgnoreCase(filter)
        .and(query.translatables.any().language.locale.in(languageService.getCurrentReadLocales()));
  }
  
  /**
   * With blog id and user id.
   *
   * @param id the blog id
   * @param userId the user id
   * @return the predicate
   */
  public Predicate withBlogIdAndUserId(String id, String userId) {
    return withUserId(userId).and(withId(id));
  }

  /**
   * With user id.
   *
   * @param userId the user id
   * @return the boolean expression
   */
  public BooleanExpression withUserId(String userId) {
    return query.blogger.user.id.eq(userId);
  }

  /**
   * For activity.
   *
   * @param activityId the activity id
   * @return the predicate
   */
  public BooleanExpression forActivity(String activityId) {
    return query.activity.id.eq(activityId);
  }

}
