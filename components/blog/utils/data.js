// data.js
const STRAPI_API_URL = 'http://localhost:1337/api';
const STRAPI_TOKEN = 'bdd0aa7259a9a8c9754fdf0c760e37b10d2b72c4e214c3e412419901990603d01524956fe5b232931ece70f348f07d87347703aba5e4ebe073e08b0a0252eea98e5ec5a7158b027277ed6bf8b9694a6bb2fb6b67942d8a223e3b208373573fdeabacd215fa94a41c345b646dabb51b23b48a7690b479f0813175c922855b7185';

// mock blog disconnected from CMS












const MOCK_BLOG_44 = {
  id: 'mock-44',
  slug: 'hidden-costs-break-fix-it-growing-companies',
  title: 'The Hidden Costs of Break/Fix IT for Growing Companies',
  description: 'Break/fix IT feels cost-effective at first, but as companies grow, reactive support creates hidden operational costs, compounding risk, and instability that slow down scaling.',
  author: 'GoCo Team',
  date: '2026-06-23',
  readTime: '6 min read',
  tags: ['Break/Fix IT', 'Managed IT', 'IT Strategy', 'Growing Companies'],
  category: 'IT Operations',
  image: '/imgs/blog/44.png',
  featured: false,
  content: `At first, break/fix I.T. feels practical.

Something breaks.

For small teams operating with limited complexity, this approach can appear efficient and cost-effective. There are no long-term commitments, no structured I.T. strategy, and no investment in proactive management.

But growth changes the equation.

As companies scale, reactive I.T. models begin creating operational costs that are far less visible than the invoice attached to a support ticket. By the time organizations recognize the impact, the environment is usually already fragmented.

## What Is Break/Fix I.T.?

Break/fix I.T. is a reactive support model where technical providers are contacted only when problems occur.

There is no continuous monitoring, operational planning, or long-term systems management. The relationship is transactional:

- A problem appears
- A technician resolves it
- Support ends until the next issue occurs

While this model may work temporarily, it introduces significant operational limitations for growing businesses.

### The Real Cost Is Operational Friction

The biggest misconception around break/fix I.T. is that it saves money. The hidden costs usually appear in operations, productivity, and scalability.

Growing organizations depend on:

- Consistent communication
- Stable systems
- Secure access management
- Predictable workflows

Reactive environments struggle to maintain that consistency because issues are only addressed after they create disruption.

This leads to recurring operational friction:

- Repeated interruptions
- Delayed onboarding
- Poor documentation
- Inconsistent configurations
- Visibility gaps across systems

Over time, teams begin adapting their behavior around instability rather than improving the environment itself.

### Reactive I.T. Creates Compounding Risk

As complexity increases, unmanaged systems become harder to control.

New employees are onboarded quickly. Without structured oversight, the environment grows faster than the processes supporting it.

Break/fix models rarely focus on:

- Long-term governance
- Documentation standards
- Access reviews
- Monitoring systems
- Security consistency

As a result, organizations often discover vulnerabilities only after they create operational or security consequences.

The issue is not simply technical support quality. It is the absence of proactive ownership.

### Downtime Is Only Part of the Problem

Most businesses evaluate IT costs by measuring downtime. But the larger issue is unpredictability.

When systems operate reactively:

- Teams lose confidence in processes
- Leadership loses visibility
- Employees create workarounds
- Knowledge becomes dependent on individuals

This reduces operational maturity across the organization.

Companies stop operating through systems and start operating through constant reaction. That model does not scale.

## Proactive I.T. Changes the Environment

The alternative to break/fix IT is not simply "more support." It is structured operational management.

Proactive I.T. environments focus on:

- Monitoring systems continuously
- Standardizing processes
- Managing devices consistently
- Maintaining documentation
- Reducing recurring issues before they escalate

The objective is not only to resolve incidents faster. It is to create an environment where fewer incidents occur in the first place. This changes how organizations experience growth.

Instead of increasing operational chaos, complexity becomes manageable because systems evolve alongside the business.

## I.T. for Growing Companies Requires Structure

Growing companies need more than technical assistance. They need visibility, governance, operational consistency and structured execution.

Technology should support scalability, not create additional operational pressure. That requires moving beyond reactive support models and building systems intentionally.

Ultimately, the hidden cost of break/fix IT is not the repair itself. It is the long-term instability created when organizations grow without operational structure behind their technology.

*You're in Good Company.*`,
};





























// API Headers
const headers = {
  'Authorization': `Bearer ${STRAPI_TOKEN}`,
  'Content-Type': 'application/json'
};

// Fetch blogs from Strapi API
export const fetchBlogData = async () => {
  try {
    console.log('🚀 Fetching blogs from Strapi API...');
    console.log('API URL:', `${STRAPI_API_URL}/blogs?populate=*`);
    
    const response = await fetch(`${STRAPI_API_URL}/blogs?populate=*`, {
      method: 'GET',
      headers: headers
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Raw Strapi data:', data);
    console.log('📊 Number of blogs found:', data.data?.length || 0);
    
    // Check if data.data exists and is an array
    if (!data.data || !Array.isArray(data.data)) {
      console.warn('⚠️ Unexpected data structure from Strapi:', data);
      return [MOCK_BLOG_44];
    }

    // Transform Strapi data to match your existing structure
    const blogData = data.data.map((blog, index) => {
      console.log(`🔄 Processing blog ${index + 1}:`, blog);
      
      // Check if data is nested under attributes or flat
      const blogData = blog.attributes || blog;
      console.log(`🔍 Blog data structure:`, blogData);
      
      const transformedBlog = {
        id: blog.id,
        slug: blogData.slug || blog.documentId || `blog-${blog.id}`, // Use actual slug field first
        title: blogData.title || `Blog ${blog.id}`,
        description: blogData.description || '',
        author: blogData.author || 'Unknown Author',
        date: blogData.publish_date || blogData.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
        readTime: blogData.minutes_read ? `${blogData.minutes_read} min read` : `${Math.ceil(Math.random() * 8) + 2} min read`,
        tags: blogData.tag ? blogData.tag.split(',').map(tag => tag.trim()) : [],
        category: blogData.category || 'Article',
        image: blogData.image?.data?.attributes?.url 
          ? `${STRAPI_API_URL.replace('/api', '')}${blogData.image.data.attributes.url}`
          : blogData.image?.url 
          ? `${STRAPI_API_URL.replace('/api', '')}${blogData.image.url}`
          : `https://picsum.photos/seed/${index + 1}/800/400`,
        featured: index === 0 || index === 3,
        content: blogData.content || 'Full article content here...'
      };
      
      console.log(`✅ Transformed blog ${index + 1}:`, transformedBlog);
      return transformedBlog;
    });

    console.log('🎉 Final blog data array:', blogData);
    // merge mock blogs at front if not already present
    const staticBlogs = [MOCK_BLOG_44];
    const staticSlugs = new Set(staticBlogs.map(b => b.slug));
    const combined = [...staticBlogs, ...blogData.filter(b => !staticSlugs.has(b.slug))];
    console.log('🎉 Combined array with mock:', combined);
    return combined;
  } catch (error) {
    console.error('❌ Error fetching blog data:', error);
    console.log('🔄 Returning mock blogs instead of empty array');
    return [MOCK_BLOG_44];
  }
};

// Get unique authors from blog data
export const fetchAuthors = async () => {
  try {
    const blogs = await fetchBlogData();
    const uniqueAuthors = [...new Set(blogs.map(blog => blog.author))];
    console.log('👥 Unique authors found:', uniqueAuthors);
    return uniqueAuthors.filter(author => author && author !== 'Unknown Author');
  } catch (error) {
    console.error('❌ Error fetching authors:', error);
    return [];
  }
};

// Get unique categories from blog data
export const fetchCategories = async () => {
  try {
    const blogs = await fetchBlogData();
    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
    console.log('📂 Unique categories found:', uniqueCategories);
    return uniqueCategories.filter(category => category);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
};

// Get unique tags from blog data
export const fetchTags = async () => {
  try {
    const blogs = await fetchBlogData();
    const allTags = blogs.flatMap(blog => blog.tags);
    const uniqueTags = [...new Set(allTags)];
    console.log('🏷️ Unique tags found:', uniqueTags);
    return uniqueTags.filter(tag => tag);
  } catch (error) {
    console.error('❌ Error fetching tags:', error);
    return [];
  }
};

// Create a single blog post
export const createBlog = async (blogData) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/blogs`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        data: {
          title: blogData.title,
          description: blogData.description,
          tag: Array.isArray(blogData.tags) ? blogData.tags.join(', ') : blogData.tags,
          publish_date: blogData.date,
          content: blogData.content,
          author: blogData.author,
          minutes_read: blogData.readTime ? parseInt(blogData.readTime.split(' ')[0]) : 5
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Update a blog post
export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        data: {
          title: blogData.title,
          description: blogData.description,
          tag: Array.isArray(blogData.tags) ? blogData.tags.join(', ') : blogData.tags,
          publish_date: blogData.date,
          content: blogData.content,
          author: blogData.author,
          minutes_read: blogData.readTime ? parseInt(blogData.readTime.split(' ')[0]) : 5
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${STRAPI_API_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

// For backward compatibility - now returns empty arrays, use fetch functions instead
export const blogData = [];
export const authors = [];
export const categories = [];
export const tags = [];

// Utility function to get blog by slug
export const getBlogBySlug = async (slug) => {
  try {
    console.log(`🔍 Fetching blog with slug: ${slug}`);
    
    // check static blogs first
    const staticBlogs = [MOCK_BLOG_44];
    const staticMatch = staticBlogs.find(b => b.slug === slug);
    if (staticMatch) {
      console.log('🧪 Returning static blog for slug', slug);
      return staticMatch;
    }
    
    // Search for blog by slug field first, then fallback to documentId
    const response = await fetch(`${STRAPI_API_URL}/blogs?filters[slug][$eq]=${slug}&populate=*`, {
      method: 'GET',
      headers: headers
    });

    console.log('📡 Single blog by slug response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Single blog by slug raw data:', data);
    
    if (!data.data || data.data.length === 0) {
      console.warn('⚠️ No blog found with this slug, trying documentId...');
      
      // Fallback: try searching by documentId
      const fallbackResponse = await fetch(`${STRAPI_API_URL}/blogs?filters[documentId][$eq]=${slug}&populate=*`, {
        method: 'GET',
        headers: headers
      });
      
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        if (fallbackData.data && fallbackData.data.length > 0) {
          console.log('✅ Found blog by documentId');
          data.data = fallbackData.data;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    
    const blog = data.data[0]; // Get first match
    
    // Check if data is nested under attributes or flat
    const blogData = blog.attributes || blog;
    console.log(`🔍 Single blog data structure:`, blogData);
    
    const transformedBlog = {
      id: blog.id,
      slug: blogData.slug || blog.documentId || `blog-${blog.id}`,
      title: blogData.title || `Blog ${blog.id}`,
      description: blogData.description || '',
      author: blogData.author || 'Unknown Author',
      date: blogData.publish_date || blogData.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
      readTime: blogData.minutes_read ? `${blogData.minutes_read} min read` : '5 min read',
      tags: blogData.tag ? blogData.tag.split(',').map(tag => tag.trim()) : [],
      category: blogData.category || 'Article',
      image: blogData.image?.data?.attributes?.url 
        ? `${STRAPI_API_URL.replace('/api', '')}${blogData.image.data.attributes.url}`
        : blogData.image?.url 
        ? `${STRAPI_API_URL.replace('/api', '')}${blogData.image.url}`
        : 'https://picsum.photos/seed/blog/800/400',
      featured: false,
      content: blogData.content || 'Full article content here...'
    };
    
    console.log('✅ Transformed single blog by slug:', transformedBlog);
    return transformedBlog;
  } catch (error) {
    console.error('❌ Error fetching blog by slug:', error);
    return null;
  }
};