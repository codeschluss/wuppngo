package de.codeschluss.portal.components.page.translations;

import de.codeschluss.portal.core.i18n.translation.TranslationRepository;

import org.springframework.stereotype.Repository;

/**
 * The Interface PageTranslatablesRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface PageTranslatablesRepository 
    extends TranslationRepository<PageTranslatablesEntity> {
}
