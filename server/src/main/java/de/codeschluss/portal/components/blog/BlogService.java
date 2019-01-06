package de.codeschluss.portal.components.blog;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.querydsl.core.types.Predicate;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.core.api.PagingAndSortingAssembler;
import de.codeschluss.portal.core.api.dto.BaseParams;
import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.repository.DataRepository;
import de.codeschluss.portal.core.service.ResourceDataService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.hateoas.Resources;
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
	 * @param repo      the repo
	 * @param entities  the entities
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

	public boolean validFieldConstraints(BlogEntity newBlog) {
		return newBlog.getTitle() != null && !newBlog.getTitle().isEmpty() && newBlog.getContent() != null
				&& !newBlog.getContent().isEmpty();
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
	 * Gets the resource by user.
	 *
	 * @param userId the user id
	 * @param params the params
	 * @return the resource by user
	 * @throws JsonParseException   the json parse exception
	 * @throws JsonMappingException the json mapping exception
	 * @throws IOException          Signals that an I/O exception has occurred.
	 */
	public Resources<?> getResourceByUser(String userId, BaseParams params)
			throws JsonParseException, JsonMappingException, IOException {
		List<BlogEntity> result = getByUser(userId, params);
		if (result == null || result.isEmpty()) {
			throw new NotFoundException("For params: " + params + " and User with id: " + userId);
		}
		return assembler.entitiesToResources(result, params);
	}

	/**
	 * Gets the by user.
	 *
	 * @param userId the user id
	 * @return the by user
	 */
	public List<BlogEntity> getByUser(String userId, BaseParams params) {
		Predicate query = entities.withUserId(userId);
		List<BlogEntity> result = params == null ? repo.findAll(query)
				: repo.findAll(query, entities.createSort(params));

		if (result == null || result.isEmpty()) {
			return Collections.emptyList();
		}

		return transformList(result);
	}

	@Override
	public <P extends FilterSortPaginate> List<BlogEntity> getSortedList(P params) {
		List<BlogEntity> nonEmptyResult = super.getSortedList(params);
		return transformList(nonEmptyResult);
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
	 * Gets the paged.
	 *
	 * @param        <P> the generic type
	 * @param params the params
	 * @return the paged
	 */
	public <P extends FilterSortPaginate> Page<BlogEntity> getPaged(P params) {
		Page<BlogEntity> nonEmptyPage = super.getPaged(params);
		return nonEmptyPage.map(blog -> transformSingle(blog));
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

	/**
	 * Update activity.
	 *
	 * @param blogId   the blog id
	 * @param activity the activity
	 */
	public BlogEntity updateActivity(String blogId, ActivityEntity activity) {
		BlogEntity blog = getById(blogId);
		blog.setActivity(activity);
		return repo.save(blog);
	}

	@Override
	public boolean validCreateFieldConstraints(BlogEntity newBlog) {
		return newBlog.getTitle() != null && !newBlog.getTitle().isEmpty() && newBlog.getContent() != null
				&& !newBlog.getContent().isEmpty();
	}

	@Override
	public boolean validUpdateFieldConstraints(BlogEntity newBlog) {
		return newBlog.getTitle() != null && !newBlog.getTitle().isEmpty() 
				&& newBlog.getContent() != null && !newBlog.getContent().isEmpty();
	}
}
