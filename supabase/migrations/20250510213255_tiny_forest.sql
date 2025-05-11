/*
  # Sample Data for Enterprises
  
  This migration adds sample enterprises across different categories:
  - Land Projects
  - Capital Sources
  - Open Source Tools
  - Network Organizers
*/

-- Sample Land Projects
INSERT INTO enterprises (
  name, description, website, location_name, latitude, longitude, has_location,
  category, subcategories, is_featured
) VALUES
(
  'Wildflower Farm',
  'A regenerative farm demonstrating permaculture principles and agroforestry. We offer workshops, farm stays, and community supported agriculture shares.',
  'https://example.com/wildflower',
  'Occidental, California',
  38.4048, -122.9480,
  TRUE,
  'Land Projects',
  '["Permaculture Farm", "Agroforestry System", "Training Center"]',
  TRUE
),
(
  'Urban Roots Community Garden',
  'A community-led urban agriculture project transforming vacant lots into productive food gardens. We provide fresh produce to local food banks and educate city residents on growing their own food.',
  'https://example.com/urbanroots',
  'Detroit, Michigan',
  42.3314, -83.0458,
  TRUE,
  'Land Projects',
  '["Community Garden", "Urban Farm", "Demonstration Site"]',
  TRUE
),
(
  'Rainforest Rescue',
  'A conservation initiative focused on preserving and regenerating rainforest ecosystems through strategic land acquisition and community-based stewardship.',
  'https://example.com/rainforestrescue',
  'Byron Bay, Australia',
  -28.6474, 153.6020,
  TRUE,
  'Land Projects',
  '["Wildlife Sanctuary", "Demonstration Site"]',
  FALSE
);

-- Sample Capital Sources
INSERT INTO enterprises (
  name, description, website, location_name, latitude, longitude, has_location,
  category, subcategories, is_featured
) VALUES
(
  'Regeneration Fund',
  'An impact investment fund focusing exclusively on regenerative agriculture, forestry, and ecosystem restoration projects with measurable ecological and social returns.',
  'https://example.com/regenfund',
  'San Francisco, California',
  37.7749, -122.4194,
  TRUE,
  'Capital Sources',
  '["Impact Investment Fund", "Regenerative Venture Capital", "Climate Finance"]',
  TRUE
),
(
  'EarthTrust Foundation',
  'A philanthropic foundation supporting grassroots regenerative projects worldwide through grants, capacity building, and network development.',
  'https://example.com/earthtrust',
  'London, UK',
  51.5074, -0.1278,
  TRUE,
  'Capital Sources',
  '["Philanthropic Foundation", "Grantmaking Organization"]',
  FALSE
),
(
  'Community Land Cooperative',
  'A member-owned financial institution that helps communities acquire and steward land for ecological restoration, affordable housing, and local food production.',
  'https://example.com/landcoop',
  NULL,
  NULL,
  NULL,
  FALSE,
  'Capital Sources',
  '["Community Land Trust", "Cooperative Finance"]',
  FALSE
);

-- Sample Open Source Tools
INSERT INTO enterprises (
  name, description, website, location_name, latitude, longitude, has_location,
  category, subcategories, is_featured
) VALUES
(
  'EcoMapper',
  'An open-source GIS platform designed specifically for ecological restoration and regenerative land management, enabling users to map, monitor, and visualize ecosystem health over time.',
  'https://example.com/ecomapper',
  NULL,
  NULL,
  NULL,
  FALSE,
  'Open Source Tools',
  '["Mapping / GIS", "Data Visualization / Dashboards", "Environmental Data Platforms"]',
  TRUE
),
(
  'FarmFlow',
  'A comprehensive open source farm management system helping regenerative farmers track crops, monitor soil health, manage water resources, and measure ecological impact.',
  'https://example.com/farmflow',
  'Boulder, Colorado',
  40.0150,
  -105.2705,
  TRUE,
  'Open Source Tools',
  '["Farm Management (e.g., farmOS)", "Water Management"]',
  FALSE
),
(
  'ForestSense',
  'A low-cost sensor network and monitoring system for forest conservation projects to track biodiversity, carbon sequestration, and ecosystem health metrics.',
  'https://example.com/forestsense',
  NULL,
  NULL,
  NULL,
  FALSE,
  'Open Source Tools',
  '["Sensor Networks / IoT", "Environmental Data Platforms", "Climate Modeling"]',
  FALSE
);

-- Sample Network Organizers
INSERT INTO enterprises (
  name, description, website, location_name, latitude, longitude, has_location,
  category, subcategories, is_featured
) VALUES
(
  'Regeneration Alliance',
  'A global network connecting regenerative practitioners, businesses, and educators to accelerate the transition to regenerative practices through knowledge sharing and collaborative projects.',
  'https://example.com/regenalliance',
  'Berlin, Germany',
  52.5200,
  13.4050,
  TRUE,
  'Network Organizers',
  '["Permaculture Network", "Regional Organizer", "Curriculum Developer"]',
  TRUE
),
(
  'Ecosystem Restoration Camps',
  'A worldwide movement that brings people together to restore degraded ecosystems, creating camps where people learn to restore land while building community.',
  'https://example.com/restorationcamps',
  NULL,
  NULL,
  NULL,
  FALSE,
  'Network Organizers',
  '["Training / Certification Body", "Event Producer / Conference Host", "Media & Storytelling Hub"]',
  FALSE
),
(
  'Earth Regenerators',
  'A collective of scientists, designers, educators, and entrepreneurs advancing policy frameworks and economic models that support ecosystem regeneration.',
  'https://example.com/earthregenerators',
  'Melbourne, Australia',
  -37.8136,
  144.9631,
  TRUE,
  'Network Organizers',
  '["Policy & Advocacy Group", "Regenerative Think Tank", "Cooperative Organizer"]',
  FALSE
);