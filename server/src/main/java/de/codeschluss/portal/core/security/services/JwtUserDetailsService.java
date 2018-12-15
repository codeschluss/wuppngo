package de.codeschluss.portal.core.security.services;

import de.codeschluss.portal.components.activity.ActivityEntity;
import de.codeschluss.portal.components.activity.ActivityService;
import de.codeschluss.portal.components.blog.BlogEntity;
import de.codeschluss.portal.components.blog.BlogService;
import de.codeschluss.portal.components.blogger.BloggerService;
import de.codeschluss.portal.components.provider.ProviderEntity;
import de.codeschluss.portal.components.provider.ProviderService;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.components.user.UserService;
import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.security.jwt.JwtUserDetails;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class JwtUserDetailsService.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class JwtUserDetailsService implements UserDetailsService {

  /** The user service. */
  private final UserService userService;
  
  /** The provider service. */
  private final ProviderService providerService;
  
  /** The activity service. */
  private final ActivityService activityService;
  
  /** The blog service. */
  private final BlogService blogService;
  
  /** The blogger service. */
  private final BloggerService bloggerService;


  /**
   * Instantiates a new jwt user details service.
   *
   * @param userService the user service
   * @param providerService the provider service
   * @param activityService the activity service
   * @param blogService the blog service
   */
  public JwtUserDetailsService(UserService userService, ProviderService providerService,
      ActivityService activityService, BlogService blogService, BloggerService bloggerService) {
    this.userService = userService;
    this.providerService = providerService;
    this.activityService = activityService;
    this.blogService = blogService;
    this.bloggerService = bloggerService;
  }

  @Override
  public JwtUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    UserEntity user = this.userService.getUser(username);
    
    return new JwtUserDetails(user, getApprovedOrgasForApprovedProvider(user),
        getOrgaForAdmin(user), getCreatedActivities(user), isBlogger(user), getBlogs(user));
  }

  /**
   * Gets the created activities.
   *
   * @param user the user
   * @return the created activities
   */
  private String[] getCreatedActivities(UserEntity user) {
    List<ActivityEntity> activities = this.activityService.getByUser(user);
    return activities == null || activities.isEmpty() ? new String[0]
        : (String[]) activities.stream().map(activity -> activity.getId()).toArray(String[]::new);

  }

  /**
   * Gets the orga for admin.
   *
   * @param user the user
   * @return the orga for admin
   */
  private String[] getOrgaForAdmin(UserEntity user) {
    List<ProviderEntity> providers = providerService.getOrgaAdminProviders(user);
    return providers == null || providers.isEmpty() ? new String[0]
        : (String[]) providers.stream().map(provider -> provider.getOrganisation().getId())
            .toArray(String[]::new);
  }

  /**
   * Gets the approved orgas for approved provider.
   *
   * @param user the user
   * @return the approved orgas for approved provider
   */
  private String[] getApprovedOrgasForApprovedProvider(UserEntity user) {
    List<ProviderEntity> providers = providerService.getApprovedProviders(user);
    return providers == null || providers.isEmpty() ? new String[0]
        : (String[]) providers.stream().map(provider -> provider.getOrganisation().getId())
            .toArray(String[]::new);
  }
  
  /**
   * Checks if is blogger.
   *
   * @param user the user
   * @return true, if is blogger
   */
  private boolean isBlogger(UserEntity user) {
    try {
      return bloggerService.getByUser(user.getId()).isApproved();
    } catch (NotFoundException e) {
      return false;
    }
  }
  
  /**
   * Gets the blogs.
   *
   * @param user the user
   * @return the blogs
   */
  private String[] getBlogs(UserEntity user) {
    List<BlogEntity> blogs = blogService.getByUser(user.getId(), null);
    return blogs == null || blogs.isEmpty() ? new String[0]
        : (String[]) blogs.stream().map(blog -> blog.getId())
            .toArray(String[]::new);
  }
}