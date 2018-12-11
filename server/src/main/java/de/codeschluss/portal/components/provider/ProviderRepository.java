package de.codeschluss.portal.components.provider;

import de.codeschluss.portal.core.service.DataRepository;

import org.springframework.stereotype.Repository;

/**
 * The Interface ProviderRepository.
 * 
 * @author Valmir Etemi
 *
 */
@Repository
public interface ProviderRepository extends DataRepository<ProviderEntity> {
  
}