package de.codeschluss.portal.core.security.permissions;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.springframework.security.access.prepost.PreAuthorize;

/**
 * The Annotation OwnBlogOrSuperuserPermission.
 * 
 * @author vetemi
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@authorizationService.isOwnBlog(authentication, #blogId) "
    + "or @authorizationService.isSuperUser(authentication)")
public @interface OwnBlogOrSuperuserPermission {

}
