// Practice areas and their groups, managed in the CMS (Practice areas).
// Single source for Home, Practice areas, Contact and article sidebars.
import groupsData from '../content/practice/groups.json';
import areasData from '../content/practice/areas.json';

export const practiceGroups = groupsData.groups;

export const practiceAreas = areasData.areas.map((area) => ({
  ...area,
  audience: area.audience || [],
  services: area.services || [],
  // Home shows four key services; fall back to the first four services.
  keyServices: area.keyServices?.length ? area.keyServices : (area.services || []).slice(0, 4),
}));

export const findPracticeArea = (slug) => practiceAreas.find((a) => a.slug === slug);
