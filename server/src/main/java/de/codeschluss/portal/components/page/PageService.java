package de.codeschluss.portal.components.page;

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
public class PageService extends ResourceDataService<PageEntity, PageQueryBuilder> {
  
  /**
   * Instantiates a new page service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public PageService(
      PageRepository repo, 
      PagingAndSortingAssembler assembler,
      PageQueryBuilder entities) {
    super(repo, entities, assembler);
  }

  @Override
  public PageEntity getExisting(PageEntity newPage) {
    return repo.findOne(entities.withTitle(newPage.getTitle())).orElse(null);
  }
  
  @Override
  public boolean validCreateFieldConstraints(PageEntity newPage) {
    return validBaseFields(newPage)
        && newPage.getTopicId() != null && !newPage.getTopicId().isEmpty();
  }
  
  @Override
  public boolean validUpdateFieldConstraints(PageEntity newPage) {
    return validBaseFields(newPage);
  }

  /**
   * Valid base fields.
   *
   * @param newPage the new page
   * @return true, if successful
   */
  private boolean validBaseFields(PageEntity newPage) {
    return newPage.getTitle() != null && !newPage.getTitle().isEmpty()
        && newPage.getContent() != null && !newPage.getContent().isEmpty();
  }

  @Override
  public PageEntity update(String id, PageEntity newPage) {
    return repo.findById(id).map(page -> {
      page.setTitle(newPage.getTitle());
      page.setContent(newPage.getContent());
      return repo.save(page);
    }).orElseGet(() -> {
      newPage.setId(id);
      return repo.save(newPage);
    });
  }
}
