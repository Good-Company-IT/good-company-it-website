// data.js
const STRAPI_API_URL = 'http://localhost:1337/api';
const STRAPI_TOKEN = 'bdd0aa7259a9a8c9754fdf0c760e37b10d2b72c4e214c3e412419901990603d01524956fe5b232931ece70f348f07d87347703aba5e4ebe073e08b0a0252eea98e5ec5a7158b027277ed6bf8b9694a6bb2fb6b67942d8a223e3b208373573fdeabacd215fa94a41c345b646dabb51b23b48a7690b479f0813175c922855b7185';

// mock blog disconnected from CMS
const MOCK_BLOG = {
  id: 'mock-1',
  slug: 'cybersecurity-it',
  title: 'Cybersecurity & I.T.: Safeguarding Your Digital World',
  description: 'An essential guide to why cybersecurity and information technology are critical for every modern business.',
  author: 'GoCo Team',
  date: '2026-02-24',
  readTime: '6 min read',
  tags: ['cybersecurity', 'IT', 'security'],
  category: 'Security',
  image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=60',
  featured: false,
  content: `### Cybersecurity matters

In today's interconnected landscape, protecting your data and infrastructure is not a luxury—it's a necessity.

Good Company offers insights into best practices for securing networks, training employees, and choosing the right tools.


disconnected from CMS mock post content here...`,
};

const MOCK_BLOG_39 = {
  id: 'mock-39',
  slug: 'it-monitoring-ultimate-guide-prevent-downtime',
  title: 'IT Monitoring Explained: How Proactive Monitoring Prevents Downtime and Data Loss',
  description: 'IT Monitoring helps prevent downtime and data loss. Learn proactive monitoring strategies to protect your IT systems.',
  author: 'GoCo Team',
  date: '2026-04-09',
  readTime: '7 min read',
  tags: ['IT Monitoring', 'Downtime Prevention', 'IT Operations'],
  category: 'IT Operations',
  image: '/imgs/blog/39.png',
  featured: false,
  content: `## What IT Monitoring Actually Means

IT Monitoring is the continuous observation of systems, devices, networks, and applications to detect issues before they impact operations. It provides visibility into:

- System performance
- Device health
- Network activity
- Security events

The goal is simple: Identify problems early — before they become disruptions.

## Reactive vs. Proactive IT Environments

In many organizations, IT operates reactively:

- An issue occurs
- A user reports it
- The team investigates and resolves it

This model depends on failure.

Proactive IT Monitoring changes that dynamic:

- Systems generate alerts
- Anomalies are detected in real time
- Issues are addressed before users notice them

The difference is not just speed. It's control.

## How Proactive Monitoring Prevents Downtime

Downtime rarely happens without warning. There are usually signals:

- Increased CPU usage
- Memory leaks
- Network latency
- Failed login attempts
- Unusual system behavior

Without monitoring, these signals are invisible. With IT Monitoring, they become actionable.

For example:

- A server reaching capacity can be addressed before it crashes
- A failing device can be replaced before it stops working
- A misconfigured system can be corrected before it disrupts operations

Monitoring turns potential failures into manageable events.

## How IT Monitoring Reduces Data Loss

Data loss is often the result of:

- System failures
- Unauthorized access
- Lack of backups
- Delayed response to incidents

IT Monitoring plays a critical role in preventing these scenarios by:

- Tracking backup status and failures
- Detecting unusual access patterns
- Identifying system anomalies that could compromise data integrity
- Alerting teams to issues in real time

The key is timing. The sooner an issue is detected, the lower the impact.

## Key Components of Effective IT Monitoring

### 1. Endpoint Monitoring

Every device connected to your environment represents a potential risk. Monitoring includes:

- Device health
- Patch status
- Security posture

Unmanaged endpoints are one of the most common sources of failure.

### 2. Network Monitoring

Network performance affects everything. Monitoring focuses on:

- Connectivity
- Latency
- Traffic patterns

Issues at this level can impact multiple systems simultaneously.

### 3. Security Monitoring

Not all issues are operational. Some are threats.

Monitoring helps detect:

- Suspicious login attempts
- Unauthorized access
- Anomalous behavior

This is where IT and security intersect.

### 4. Alerting and Response

Monitoring without response is incomplete. Effective systems include:

- Real-time alerts
- Defined escalation paths
- Clear ownership of incidents

Detection is only valuable if action follows.

## Common Mistakes in IT Monitoring

- Monitoring too little (limited visibility)
- Monitoring too much (alert fatigue)
- Ignoring alerts or lacking response processes
- Treating monitoring as a tool, not a system

Effective IT Monitoring requires balance, structure, and clear processes.

## Why Monitoring Is Critical for Growing Companies

As organizations grow, complexity increases:

- More users
- More systems
- More integrations

Each new component adds potential points of failure. Without IT Monitoring, visibility decreases as complexity increases.

This creates an environment where issues are discovered too late. Monitoring ensures that growth does not compromise stability.

IT Monitoring is not about watching systems. It's about understanding them.

It provides the visibility needed to:

- Prevent downtime
- Protect data
- Maintain operational continuity

In modern IT environments, the question is no longer: "Can we fix issues when they happen?"

It becomes: "Can we detect them before they impact the business?"

Because the most effective IT environments are not the ones that respond quickly. They are the ones who rarely need to respond at all.

*You're in Good Company.*`,
};

const MOCK_BLOG_40 = {
  id: 'mock-40',
  slug: 'what-is-device-management-mdm-remote-teams',
  title: 'What is Device Management (MDM) and Why It Matters for Remote Teams',
  description: 'Device Management (MDM) for remote teams. Secure devices, control access, and scale IT operations without losing visibility.',
  author: 'GoCo Team',
  date: '2026-04-09',
  readTime: '8 min read',
  tags: ['MDM', 'Device Management', 'Remote Work', 'IT Security'],
  category: 'IT Security',
  image: '/imgs/blog/40.png',
  featured: false,
  content: `Most companies don't lose control of their IT systems all at once. It happens gradually.

A new employee joins remotely. A laptop is shipped without proper configuration. A device misses critical updates. Access is granted without structure.

Nothing breaks immediately. But over time, visibility disappears. And with it, control.

## What is Device Management (MDM)?

Device Management (MDM) is the process of monitoring, configuring, and securing all devices connected to an organization's IT environment.

This includes:

- Laptops
- Mobile devices
- Tablets
- Remote endpoints

MDM allows IT teams to manage these devices centrally, regardless of location. The goal is not just control. It's consistency.

## Why Device Management Matters More for Remote Teams

In a traditional office, devices are physically accessible. In remote environments, they are not. This changes everything.

Each device becomes:

- A potential entry point for threats
- A point of failure for operations
- A variable that must be managed remotely

Without Device Management (MDM), organizations rely on assumptions:

- That devices are updated
- That security settings are applied
- That access is controlled

These assumptions often fail.

## The Risks of Unmanaged Devices

When devices are not properly managed, several risks emerge:

### 1. Inconsistent Security

Some devices may have:

- Outdated operating systems
- Missing security patches
- Disabled protections

This creates uneven security across the organization.

### 2. Lack of Visibility

Without MDM, IT teams often don't know:

- Which devices are active
- Who is using them
- What their security status is

This lack of visibility limits decision-making.

### 3. Data Exposure

Unsecured or lost devices can expose:

- Client data
- Internal documents
- Credentials and access tokens

Device-level security is directly linked to data protection.

### 4. Inefficient Onboarding and Offboarding

Manual device setup leads to:

- Delays in onboarding
- Inconsistent configurations
- Missed steps during offboarding

This affects both productivity and security.

## What Device Management (MDM) Actually Enables

A structured MDM solution brings control back into the environment.

### 1. Centralized Device Control

All devices are managed from a single platform. IT teams can:

- Apply configurations
- Enforce policies
- Monitor device status

Location becomes irrelevant.

### 2. Automated Security Enforcement

MDM ensures that:

- Devices are encrypted
- Updates are applied automatically
- Security policies are consistently enforced

Security becomes standardized.

### 3. Remote Monitoring and Response

IT teams can:

- Detect issues in real time
- Respond to threats
- Troubleshoot devices remotely

This reduces downtime and operational disruption.

### 4. Structured Onboarding and Offboarding

With MDM:

- Devices are pre-configured before delivery
- Access is aligned with user roles
- Devices can be wiped or secured instantly when needed

Processes become predictable and controlled.

## MDM and the Broader IT Environment

Device Management (MDM) does not operate in isolation. It is part of a larger IT and security framework that includes:

- Identity and Access Management (IAM)
- Endpoint Detection and Response (EDR)
- Cloud security configurations
- Monitoring systems

MDM connects these elements by ensuring that every device follows the same structure. Without it, even well-designed systems become fragmented.

## Common Misconceptions About MDM

**"We're a small team, we don't need it."**
Growth introduces complexity quickly. MDM prevents issues before they scale.

**"Our employees manage their own devices."**
User-managed devices often lack consistency and security controls.

**"We already use secure tools."**
Tools alone do not secure devices. Configuration and management do.

## Why MDM Is Critical for Scaling Teams

As companies grow:

- The number of devices increases
- The diversity of environments expands
- The risk surface becomes larger

Manual management does not scale. Device Management (MDM) provides:

- Standardization
- Automation
- Visibility

These are the foundations of a stable IT environment.

In remote teams, the office is no longer a physical space. It's every device your employees use. And every unmanaged device introduces uncertainty.

Device Management (MDM) replaces that uncertainty with control.

Because in modern IT environments, security and performance are not defined by where your team works. They are defined by how well your devices are managed.

*You're in Good Company.*`,
};

const MOCK_BLOG_41 = {
  id: 'mock-41',
  slug: 'how-to-recognize-prevent-phishing-attacks',
  title: 'How to Recognize and Prevent Phishing Attacks to Strengthen Your Security',
  description: 'Phishing attacks are becoming more sophisticated and harder to detect. Learn how to identify the warning signs and protect your business from social engineering threats.',
  author: 'GoCo Team',
  date: '2026-06-17',
  readTime: '9 min read',
  tags: ['Phishing', 'Cybersecurity', 'Security Awareness'],
  category: 'Security',
  image: '/imgs/blog/41.jpg',
  featured: false,
  content: `Phishing attacks are no longer just cleverly disguised emails from a mysterious "Nigerian prince." They've evolved becoming more sophisticated and harder to detect. Plus their impacts are increasingly damaging. And worse yet it only takes one mistake to compromise an entire network. Are you confident your team can spot a phishing attempt before it's too late?

Today's threat landscape and the specific tactics attackers use to engage in social engineering are critical to identify. Let's learn how businesses can strengthen their security posture to avoid falling victim.

## The Psychology Behind Phishing

Phishing can take on many different faces. Malicious actors leverage several factors surrounding our human psychology to engage in social engineering. Whether in the office or remote working, phishing attacks bank on factors like:

- Employees being too busy to spot the details in a forged email
- The trust we have in reading a familiar name on an email
- The urgency that we feel to respond to a person in authority
- The hype we feel if we are receiving a benefit or having to submit information to get "perks from work"

It's one of the most common and successful forms of security breaches because it exploits human behavior, not technology. Understanding the psychology behind these attacks is vital in recognizing and avoiding them.

### So What is Phishing?

When malicious actors impersonate legitimate organizations or individuals in order to trick users into providing sensitive information, such as login credentials, credit card numbers, or access to a company's internal systems.

### Why Phishing is a Major Threat to Security

Phishing is the gateway to more serious IT issues like ransomware attacks, credential theft, and data breaches. According to industry research, over 90% of successful cyberattacks begin with a phishing email.

Security tools like firewalls and antivirus software can't fully protect against phishing because attackers rely on manipulating users. That's why awareness and education are critical layers in any cybersecurity strategy.

## Types of Phishing Attacks

### Email Phishing

The most common method. An attacker sends an email pretending to be a trusted source—often a bank, coworker, or vendor—with a link to a malicious site.

### Spear Phishing

This is a highly targeted form of phishing aimed at specific individuals or departments within an organization, often crafted using personal information.

### Whaling

Aimed at high-profile executives, whaling attacks attempt to steal credentials or authorize fraudulent wire transfers by impersonating other C-level executives or board members.

### Smishing & Vishing

Smishing uses SMS messages to lure victims. Vishing uses phone calls to impersonate authority figures (like IT support or government agencies).

### Clone Phishing

In this method, attackers clone a legitimate email that the victim has received and change the link or attachment to something malicious.

## Red Flags to Spot Phishing Attempts

### Unfamiliar Sender or Domain

Emails coming from a domain that looks "almost" correct — like amaz0n.com instead of amazon.com.

### Poor Spelling and Grammar

While attackers are getting better, many phishing attempts still contain obvious grammar or spelling mistakes.

### Suspicious Attachments or Links

Never open unexpected attachments or click links in unsolicited messages. Hover over links to inspect the URL before clicking.

### Requests for Sensitive Information

Legitimate companies don't ask for passwords or sensitive data over email or text.

### Urgent or Threatening Language

Be cautious of messages that pressure you into immediate action. That's a classic phishing strategy.

## How to Mitigate Phishing Attacks and Reduce Their Impact

### Employee Training

Ongoing IT training is essential. Users should undergo periodic phishing simulations and training on recognizing suspicious content.

### Multi-Factor Authentication (MFA)

MFA adds an additional layer of protection, making it significantly harder for attackers to gain access even if credentials are stolen.

### Advanced Email Filtering

Use IT tools that scan and filter out suspicious messages before they reach inboxes. This includes sandboxing attachments and blocking known malicious URLs.

### Endpoint Detection and Response (EDR)

An effective security setup includes real-time monitoring of endpoints for suspicious behavior.

### Role-Based Access Control (RBAC)

Limit access to sensitive systems or data based on the employee's role. This reduces the potential damage if an account is compromised.

## What to Do If You Suspect a Phishing Attack

### Don't Click or Reply

If you suspect an email is a phishing attempt, don't interact with it.

### Report It Immediately

Alert your internal IT or security team so they can investigate and, if necessary, warn other employees.

### Run a Security Scan

Ensure the affected system is scanned for malware or unauthorized access.

### Change Credentials

If there's even a chance credentials were compromised, update passwords immediately and enable MFA.

## The Cost of Ignoring Phishing Awareness

Phishing is not just an inconvenience. It's a security risk that can result in:

- Financial loss due to fraud or wire transfers
- Loss of customer trust
- Regulatory penalties (especially under GDPR or HIPAA)
- Operational downtime

Investing in user awareness and IT Services can prevent far more costly consequences.

## Building a Phishing-Resistant Culture

Creating a security-first culture takes more than tools. It requires leadership buy-in and consistent messaging. Here's how to start:

- Include phishing awareness in onboarding
- Recognize employees who report phishing attempts
- Conduct quarterly simulations
- Make reporting suspicious activity easy and encouraged

## Managed IT Services for Phishing Protection

If you lack internal expertise, working with a managed IT Services provider can significantly reduce your risk. These providers offer:

- 24/7 monitoring
- Email filtering
- Employee training programs
- Incident response planning
- Ongoing compliance support

Their expertise in network security and emerging threats keeps your organization one step ahead.

## Security Is Everyone's Responsibility

Phishing isn't going away. If anything, it's becoming more dangerous. With generative AI and access to real-time personal data from social platforms, attackers can craft messages that are nearly impossible to distinguish from the real thing.

But knowledge is your greatest defense.

Security awareness, paired with the right IT services, tools, and policies, can dramatically reduce your exposure. The most important step? Start now. Build a culture where every employee feels empowered to be the first line of defense.

Need help strengthening your phishing defenses? A managed IT Services partner can assess your current posture and create a protection plan tailored to your organization.

Let's protect your future, one email at a time.

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
      return [MOCK_BLOG, MOCK_BLOG_39, MOCK_BLOG_40, MOCK_BLOG_41];
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
    const staticBlogs = [MOCK_BLOG, MOCK_BLOG_39, MOCK_BLOG_40, MOCK_BLOG_41];
    const staticSlugs = new Set(staticBlogs.map(b => b.slug));
    const combined = [...staticBlogs, ...blogData.filter(b => !staticSlugs.has(b.slug))];
    console.log('🎉 Combined array with mock:', combined);
    return combined;
  } catch (error) {
    console.error('❌ Error fetching blog data:', error);
    console.log('🔄 Returning mock blogs instead of empty array');
    return [MOCK_BLOG, MOCK_BLOG_39, MOCK_BLOG_40, MOCK_BLOG_41];
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
    const staticBlogs = [MOCK_BLOG, MOCK_BLOG_39, MOCK_BLOG_40, MOCK_BLOG_41];
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