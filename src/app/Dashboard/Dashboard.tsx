import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  CodeBlock,
  CodeBlockAction,
  CodeBlockCode,
  CompassContent,
  CompassPanel,
  Content,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  JumpLinks,
  JumpLinksItem,
  Label,
  MenuToggle,
  MenuToggleElement,
  Pagination,
  SearchInput,
  Select,
  SelectList,
  SelectOption,
  Tab,
  Tabs,
  TabsComponent,
  TabTitleText,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  Tooltip,
} from '@patternfly/react-core';
import {
  ArrowRightIcon,
  StarIcon,
  OutlinedStarIcon,
  ExternalLinkAltIcon,
  DownloadIcon,
  CubeIcon,
  CopyIcon,
  TimesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  FilterIcon,
  PlusCircleIcon,
  BookOpenIcon,
  ShieldAltIcon,
  HistoryIcon,
  InfoCircleIcon,
  PlusIcon,
  QuestionCircleIcon,
  SecurityIcon,
  SyncAltIcon,
  EllipsisVIcon,
  TagIcon,
  HomeIcon,
} from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { useCardStyle, useTypographyLabels } from '@app/utils/CardStyleContext';

// Typography label component - shows semantic level in pink/red
const TypeLabel: React.FC<{ level: string }> = ({ level }) => {
  const { showTypographyLabels } = useTypographyLabels();
  if (!showTypographyLabels) return null;
  return (
    <span style={{
      backgroundColor: '#E91E63',
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '4px',
      marginLeft: '8px',
      verticalAlign: 'middle',
      fontFamily: 'monospace',
    }}>
      {level}
    </span>
  );
};

// Typography Standards Reference:
// H1 (--pf-t--global--font--size--heading--h1) - Page titles, hero text
// H2 (--pf-t--global--font--size--heading--h2 / --pf-t--global--font--size--2xl) - Section titles
// H3 (--pf-t--global--font--size--heading--h3 / --pf-t--global--font--size--lg) - Subsection titles, card titles
// H4 (--pf-t--global--font--size--heading--h4 / --pf-t--global--font--size--md) - Minor headings
// Body-lg (--pf-t--global--font--size--body--lg) - Emphasized body text
// Body (--pf-t--global--font--size--body--default) - Standard body text
// Body-sm (--pf-t--global--font--size--body--sm) - Helper text, captions

// Container image data
interface ContainerImage {
  name: string;
  description: string;
  pullCommand: string;
  latestTag: string;
  isFavorite?: boolean;
  cveCount?: number;
  daysSincePublished?: number;
  size?: string;
  upstreamSize?: string; // Size of the equivalent Docker Hub image for comparison
  availableVariants?: ('fips' | 'builder' | 'go-tools')[];
  lastUpdated?: string; // ISO date string
  lastScanned?: string; // ISO date string
  documentationUrl?: string;
}


// Languages/Runtimes - alphabetically ordered: go, node-js, openjdk, python, ruby
const languageRuntimes: ContainerImage[] = [
  {
    name: 'go',
    description: 'Hardened, minimal delivery of Go lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/go:latest',
    latestTag: '1.22.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 7,
    size: '32 MB',
    upstreamSize: '850 MB',
    availableVariants: ['fips', 'go-tools'],
    lastUpdated: '2026-01-23T11:45:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/go',
  },
  {
    name: 'node-js',
    description: 'Hardened, minimal delivery of Node.js lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/nodejs:latest',
    latestTag: '20.11.0',
    isFavorite: true,
    cveCount: 2,
    daysSincePublished: 3,
    size: '45 MB',
    upstreamSize: '1.1 GB',
    availableVariants: ['builder'],
    lastUpdated: '2026-01-27T09:10:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/nodejs',
  },
  {
    name: 'openjdk',
    description: 'Hardened, minimal delivery of OpenJDK lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/openjdk:latest',
    latestTag: '21.0.2',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 10,
    size: '85 MB',
    upstreamSize: '470 MB',
    availableVariants: ['fips', 'builder'],
    lastUpdated: '2026-01-20T14:30:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/openjdk',
  },
  {
    name: 'python',
    description: 'Hardened, minimal delivery of Python lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/python:latest',
    latestTag: '3.14.2',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 12,
    size: '24 MB',
    upstreamSize: '1.0 GB',
    availableVariants: ['fips', 'builder', 'go-tools'],
    lastUpdated: '2026-01-18T14:32:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/python',
  },
  {
    name: 'ruby',
    description: 'Hardened, minimal delivery of Ruby lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/ruby:latest',
    latestTag: '3.3.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 6,
    size: '28 MB',
    upstreamSize: '900 MB',
    availableVariants: ['builder'],
    lastUpdated: '2026-01-24T08:20:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/ruby',
  },
];

// Databases - alphabetically ordered: mariadb, memcached, postgresql
const databases: ContainerImage[] = [
  {
    name: 'mariadb',
    description: 'Hardened, minimal delivery of MariaDB lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/mariadb:latest',
    latestTag: '11.2.2',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 9,
    size: '120 MB',
    upstreamSize: '405 MB',
    availableVariants: ['fips'],
    lastUpdated: '2026-01-21T12:00:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/mariadb',
  },
  {
    name: 'memcached',
    description: 'Hardened, minimal delivery of Memcached lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/memcached:latest',
    latestTag: '1.6.23',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 4,
    size: '8 MB',
    upstreamSize: '85 MB',
    availableVariants: [],
    lastUpdated: '2026-01-26T15:30:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/memcached',
  },
  {
    name: 'postgresql',
    description: 'Hardened, minimal delivery of PostgreSQL lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/postgresql:latest',
    latestTag: '16.1',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 11,
    size: '95 MB',
    upstreamSize: '425 MB',
    availableVariants: ['fips', 'builder'],
    lastUpdated: '2026-01-19T10:15:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/postgresql',
  },
];

// Dev Tools - alphabetically ordered: curl, git, jq
const devTools: ContainerImage[] = [
  {
    name: 'curl',
    description: 'Hardened, minimal delivery of Curl lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/curl:latest',
    latestTag: '8.5.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 5,
    size: '12 MB',
    upstreamSize: '130 MB',
    availableVariants: ['fips', 'builder'],
    lastUpdated: '2026-01-25T10:45:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/curl',
  },
  {
    name: 'git',
    description: 'Hardened, minimal delivery of Git lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/git:latest',
    latestTag: '2.43.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 8,
    size: '15 MB',
    upstreamSize: '200 MB',
    availableVariants: ['builder'],
    lastUpdated: '2026-01-22T09:00:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/git',
  },
  {
    name: 'jq',
    description: 'Hardened, minimal delivery of jq lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.access.redhat.com/hummingbird/jq:latest',
    latestTag: '1.7.1',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 2,
    size: '5 MB',
    upstreamSize: '20 MB',
    availableVariants: [],
    lastUpdated: '2026-01-28T14:20:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/jq',
  },
];

// Sample variants data for the drawer table
// isLatest indicates which version "latest" points to
// availableVariants indicates which variant types are available for this version
interface ImageVariant {
  tag: string;
  project: string;
  lastUpdate: string;
  isLatest?: boolean;
  availableVariants?: ('fips' | 'builder' | 'go-tools')[];
}

// Security Feed data for images
interface ImageCveRow {
  cveId: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  affectedPackage: string;
  status: 'fixed' | 'affected' | 'ongoing';
  published: string;
  lastUpdated: string;
  affectedImages: string[]; // which images this CVE affects
}

const imageCveData: ImageCveRow[] = [
  { cveId: 'CVE-YEAR-10', severity: 'critical', affectedPackage: 'openssl-1.1.1', status: 'fixed', published: '2026-02-01', lastUpdated: '2026-02-03', affectedImages: ['Python', 'Curl', 'OpenSSL'] },
  { cveId: 'CVE-YEAR-10', severity: 'high', affectedPackage: 'libxml2-2.9.14', status: 'affected', published: '2026-02-01', lastUpdated: '2026-02-02', affectedImages: ['Python'] },
  { cveId: 'CVE-YEAR-10', severity: 'moderate', affectedPackage: 'zlib-1.2.13', status: 'ongoing', published: '2026-01-30', lastUpdated: '2026-02-02', affectedImages: ['Python', 'node-js', 'go'] },
  { cveId: 'CVE-YEAR-10', severity: 'low', affectedPackage: 'ncurses-6.4', status: 'fixed', published: '2026-01-30', lastUpdated: '2026-02-01', affectedImages: ['Python', 'Curl'] },
  { cveId: 'CVE-YEAR-10', severity: 'moderate', affectedPackage: 'glibc-2.38', status: 'fixed', published: '2026-01-30', lastUpdated: '2026-01-31', affectedImages: ['Python', 'Curl', 'OpenSSL', 'node-js', 'go'] },
  { cveId: 'CVE-YEAR-10', severity: 'moderate', affectedPackage: 'pip-23.3.1', status: 'fixed', published: '2026-01-29', lastUpdated: '2026-02-02', affectedImages: ['Python'] },
];

// Helper function to convert date string to relative time
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) {
    return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
  } else if (diffMonths > 0) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  } else if (diffWeeks > 0) {
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  } else if (diffDays > 0) {
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffMinutes > 0) {
    return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  } else {
    return 'Just now';
  }
};

// Severity label component
const CveSeverityLabel: React.FC<{ severity: ImageCveRow['severity'] }> = ({ severity }) => {
  switch (severity) {
    case 'critical':
      return <Label color="red" icon={<ExclamationCircleIcon />}>Critical</Label>;
    case 'high':
      return <Label color="orange" icon={<ExclamationTriangleIcon />}>High</Label>;
    case 'moderate':
      return <Label color="teal" icon={<CheckCircleIcon />}>Moderate</Label>;
    case 'low':
      return <Label color="grey" icon={<CheckCircleIcon />}>Low</Label>;
  }
};

// Status label component
const CveStatusLabel: React.FC<{ status: ImageCveRow['status'] }> = ({ status }) => {
  switch (status) {
    case 'fixed':
      return <Label variant="outline" color="green" icon={<CheckCircleIcon />}>Fixed</Label>;
    case 'affected':
      return <Label variant="outline" color="red" icon={<ExclamationCircleIcon />}>Affected</Label>;
    case 'ongoing':
      return <Label variant="outline" color="blue" icon={<SyncAltIcon />}>Ongoing Fix</Label>;
  }
};

// SBOM (Software Bill of Materials) data
interface SbomPackage {
  name: string;
  version: string;
  type: 'rpm' | 'pip' | 'npm' | 'go-module' | 'gem';
  license: string;
  supplier: string;
}

const sbomPackages: SbomPackage[] = [
  { name: 'python', version: '3.12.1', type: 'rpm', license: 'PSF-2.0', supplier: 'Red Hat' },
  { name: 'openssl', version: '3.1.4', type: 'rpm', license: 'Apache-2.0', supplier: 'Red Hat' },
  { name: 'glibc', version: '2.38', type: 'rpm', license: 'LGPL-2.1', supplier: 'Red Hat' },
  { name: 'libxml2', version: '2.10.4', type: 'rpm', license: 'MIT', supplier: 'Red Hat' },
  { name: 'zlib', version: '1.2.13', type: 'rpm', license: 'Zlib', supplier: 'Red Hat' },
  { name: 'pip', version: '23.3.2', type: 'pip', license: 'MIT', supplier: 'PyPA' },
  { name: 'setuptools', version: '69.0.3', type: 'pip', license: 'MIT', supplier: 'PyPA' },
  { name: 'wheel', version: '0.42.0', type: 'pip', license: 'MIT', supplier: 'PyPA' },
  { name: 'ca-certificates', version: '2023.12', type: 'rpm', license: 'MPL-2.0', supplier: 'Red Hat' },
  { name: 'ncurses', version: '6.4', type: 'rpm', license: 'MIT', supplier: 'Red Hat' },
  { name: 'readline', version: '8.2', type: 'rpm', license: 'GPL-3.0', supplier: 'Red Hat' },
  { name: 'sqlite', version: '3.44.2', type: 'rpm', license: 'Public Domain', supplier: 'Red Hat' },
];

// Package type label
const PackageTypeLabel: React.FC<{ type: SbomPackage['type'] }> = ({ type }) => {
  switch (type) {
    case 'rpm':
      return <Label isCompact color="blue">RPM</Label>;
    case 'pip':
      return <Label isCompact color="green">pip</Label>;
    case 'npm':
      return <Label isCompact color="orange">npm</Label>;
    case 'go-module':
      return <Label isCompact color="teal">Go</Label>;
    case 'gem':
      return <Label isCompact color="red">gem</Label>;
  }
};

const getVariantsForImage = (imageName: string): ImageVariant[] => [
  { tag: '8.18.0', project: '1-1768379478', lastUpdate: '12 days ago', isLatest: true, availableVariants: ['fips', 'builder', 'go-tools'] },
  { tag: '8.18', project: '1-1768379478', lastUpdate: '12 days ago', availableVariants: ['fips', 'builder', 'go-tools'] },
  { tag: '8', project: '1-1768379478', lastUpdate: '12 days ago', availableVariants: ['fips', 'builder'] },
  { tag: '8.17.1', project: '1-1768379478', lastUpdate: '2 months ago', availableVariants: ['fips', 'builder'] },
  { tag: '8.17.0', project: '1-1768379478', lastUpdate: '3 months ago', availableVariants: ['fips', 'builder'] },
  { tag: '8.16.2', project: '1-1768379478', lastUpdate: '5 months ago', availableVariants: ['builder'] },
  { tag: '8.16.1', project: '1-1768379478', lastUpdate: '6 months ago', availableVariants: ['builder'] },
  { tag: '8.16.0', project: '1-1768379478', lastUpdate: '8 months ago', availableVariants: [] },
  { tag: '8.15.0', project: '1-1768379478', lastUpdate: '10 months ago', availableVariants: [] },
];

// Helper function to format dates
const formatDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatShortDate = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
  });
};

// Max display length for pull commands
const PULL_COMMAND_MAX_LENGTH = 55;

// Render pull command with smart truncation:
// - If tag suffixes present (-fips, -builder, -go-tools) → truncate from beginning (show end)
// - If no suffixes → truncate from end (show beginning with podman/docker)
const renderPullCommandWithHighlights = (command: string): React.ReactNode => {
  const highlightStyle: React.CSSProperties = {
    color: 'var(--pf-t--global--color--brand--default)',
    fontWeight: 600,
  };
  
  // Tags to highlight and check for
  const tagsToHighlight = ['-fips', '-builder', '-go-tools'];
  
  // Check if command has any tag suffixes
  const hasTagSuffixes = tagsToHighlight.some(tag => command.includes(tag));
  
  // Smart truncation based on what's important to show
  let displayCommand = command;
  if (command.length > PULL_COMMAND_MAX_LENGTH) {
    if (hasTagSuffixes) {
      // Truncate from beginning to show the tag suffixes at the end
      displayCommand = '...' + command.slice(-(PULL_COMMAND_MAX_LENGTH - 3));
    } else {
      // Truncate from end to show podman/docker at the beginning
      displayCommand = command.slice(0, PULL_COMMAND_MAX_LENGTH - 3) + '...';
    }
  }
  
  // Find all tags in the command and highlight them
  let result: React.ReactNode[] = [];
  let remainingCommand = displayCommand;
  let key = 0;
  
  // Check for each tag and split the command
  for (const tag of tagsToHighlight) {
    if (remainingCommand.includes(tag)) {
      const parts = remainingCommand.split(tag);
      // Only handle the first occurrence and keep the rest together
      result.push(<span key={key++}>{parts[0]}</span>);
      result.push(<span key={key++} style={highlightStyle}>{tag}</span>);
      remainingCommand = parts.slice(1).join(tag);
    }
  }
  
  // Add any remaining text
  if (remainingCommand) {
    result.push(<span key={key++}>{remainingCommand}</span>);
  }
  
  // If no tags were found, return the truncated command
  if (result.length === 0) {
    return displayCommand;
  }
  
  return <>{result}</>;
};

const ContainerImageCard: React.FC<{
  image: ContainerImage;
  onClick?: () => void;
  onClickSide?: () => void;
  commandType: 'podman' | 'docker';
  displayName?: string;
  pullCommand?: string;
  isStarFilled?: boolean;
  onCopy?: (imageName: string, commandType: 'podman' | 'docker', variants: string[]) => void;
}> = ({ image, onClick, onClickSide, commandType, displayName, pullCommand, isStarFilled = true, onCopy }) => {
  const cardId = `card-${image.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Extract variants from pull command for toast notification
  const getVariantsFromCommand = (cmd: string): string[] => {
    const variants: string[] = [];
    if (cmd.includes('-fips')) variants.push('FIPS');
    if (cmd.includes('-builder')) variants.push('Builder');
    if (cmd.includes('-go-tools')) variants.push('Go Tools');
    return variants;
  };

  // Generate pull command based on command type (fallback if not provided)
  const getPullCommand = () => {
    if (pullCommand) return pullCommand;
    const baseRegistry = `registry.access.redhat.com/hummingbird/${image.name.toLowerCase()}:latest`;
    return `${commandType} pull ${baseRegistry}`;
  };

  // Render styled pull command with bold uppercase command type
  const renderStyledPullCommand = () => {
    const cmd = getPullCommand();
    const cmdType = commandType.toUpperCase();
    const restOfCommand = cmd.substring(commandType.length);
    return <><strong>{cmdType}</strong>{restOfCommand}</>;
  };
  
  // Use displayName if provided, otherwise use image.name
  const cardTitle = displayName || image.name;
  
  return (
    <Card 
      isCompact
      isClickable
      id={cardId}
      style={{
        backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
        boxShadow: 'var(--pf-t--global--box-shadow--md)',
        borderRadius: '16px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        selectableActions={{
          onClickAction: onClick,
          selectableActionId: `${cardId}-action`,
          selectableActionAriaLabelledby: cardId,
          name: 'container-image-cards',
        }}
        actions={{
          actions: (
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
                  <Tooltip content="Favorites">
                    <Button 
                      variant="plain" 
                      aria-label="Favorite" 
                      style={{ padding: '4px' }}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => e.stopPropagation()}
                    >
                      {isStarFilled ? (
                        <StarIcon style={{ color: 'var(--pf-t--global--color--nonstatus--orange--default)', fontSize: '1.25rem' }} />
                      ) : (
                        <OutlinedStarIcon style={{ fontSize: '1.25rem' }} />
                      )}
                    </Button>
                  </Tooltip>
          </FlexItem>
          <FlexItem>
                  <Tooltip content="See upstream source">
                    <Button 
                      variant="plain" 
                      aria-label="Upstream source" 
                      style={{ padding: '4px' }}
                      component="a"
                      href={image.documentationUrl || '#'}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => e.stopPropagation()}
                    >
                      <ExternalLinkAltIcon style={{ fontSize: '1.1rem' }} />
                    </Button>
                  </Tooltip>
          </FlexItem>
          <FlexItem>
                  <Tooltip content={`Updated: ${formatShortDate(image.lastUpdated)}`}>
                    <Button 
                      variant="plain" 
                      aria-label="Last updated" 
                      style={{ padding: '4px' }}
                      onClick={(e) => e.stopPropagation()}
                      onMouseEnter={(e) => e.stopPropagation()}
                    >
                      <HistoryIcon style={{ fontSize: '1.1rem' }} />
                    </Button>
                  </Tooltip>
          </FlexItem>
        </Flex>
            </div>
          ),
          hasNoOffset: true,
        }}
      >
        {/* Circular icon container */}
                <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
                  backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--pf-t--global--border--color--default)',
        }}>
          <CubeIcon style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)', fontSize: '1.75rem' }} />
        </div>
      </CardHeader>
      <CardTitle>
        <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--lg)', fontFamily: 'var(--pf-t--global--font--family--heading)', fontWeight: 'var(--pf-t--global--font--weight--heading--bold)' }}>{cardTitle}<TypeLabel level="CARD-DISPLAY-BOLD" /></Content>
      </CardTitle>
      <CardBody style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          fontFamily: 'var(--pf-t--global--font--family--text)',
          color: 'var(--pf-t--global--text--color--subtle)',
          marginBottom: 'var(--pf-t--global--spacer--md)',
          lineHeight: '1.5',
          flex: 1,
        }}>
          {image.description}<TypeLabel level="BODY" />
        </Content>
        <div style={{ marginBottom: 'var(--pf-t--global--spacer--md)', marginTop: 'auto' }}>
          <CodeBlock
            actions={
              <CodeBlockAction>
                <Tooltip content="Copy to clipboard">
                  <Button 
                    variant="plain" 
                    aria-label="Copy to clipboard"
                    onClick={(e) => {
                      e.stopPropagation();
                      const cmd = getPullCommand();
                      navigator.clipboard.writeText(cmd);
                      if (onCopy) {
                        onCopy(image.name, commandType, getVariantsFromCommand(cmd));
                      }
                    }}
                  >
                    <CopyIcon />
                  </Button>
                </Tooltip>
              </CodeBlockAction>
            }
          >
            <CodeBlockCode>{renderStyledPullCommand()}</CodeBlockCode>
          </CodeBlock>
          <TypeLabel level="CMD-TEXT" />
        </div>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--sm)',
          fontFamily: 'var(--pf-t--global--font--family--text)',
          color: 'var(--pf-t--global--text--color--default)',
          margin: 0
        }}>
          {image.latestTag}<TypeLabel level="SM" />
        </Content>
      </CardBody>
      <CardFooter>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            {image.cveCount === 0 ? (
              <Label color="green" icon={<InfoCircleIcon />}>0 CVEs</Label>
            ) : (
              /* Invisible placeholder to maintain consistent card height */
              <div style={{ height: '24px' }} />
            )}
          </FlexItem>
          <FlexItem>
            <Button 
              variant="link" 
              isInline 
              icon={<ArrowRightIcon />} 
              iconPosition="end"
              onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
              }}
            >
              More tags
            </Button>
                        </FlexItem>
        </Flex>
      </CardFooter>
    </Card>
  );
};

// Option 1: Header-Heavy Stack Card
const HeaderHeavyCard: React.FC<{
  image: ContainerImage;
  onClick?: () => void;
  commandType: 'podman' | 'docker';
  displayName?: string;
  pullCommand?: string;
  onCopy?: (imageName: string, commandType: 'podman' | 'docker', variants: string[]) => void;
  isStarFilled?: boolean;
}> = ({ image, onClick, commandType, displayName, pullCommand, onCopy, isStarFilled = false }) => {
  const cardId = `header-heavy-${image.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  const getVariantsFromCommand = (cmd: string): string[] => {
    const variants: string[] = [];
    if (cmd.includes('-fips')) variants.push('FIPS');
    if (cmd.includes('-builder')) variants.push('Builder');
    if (cmd.includes('-go-tools')) variants.push('Go Tools');
    return variants;
  };

  const getPullCommand = () => {
    if (pullCommand) return pullCommand;
    const baseRegistry = `registry.access.redhat.com/hummingbird/${image.name.toLowerCase()}:latest`;
    return `${commandType} pull ${baseRegistry}`;
  };

  // Render styled pull command with bold uppercase command type
  const renderStyledPullCommand = () => {
    const cmd = getPullCommand();
    const cmdType = commandType.toUpperCase();
    const restOfCommand = cmd.substring(commandType.length);
    return <><strong>{cmdType}</strong>{restOfCommand}</>;
  };
  
  const cardTitle = displayName || image.name;
  
  return (
    <Card 
      isCompact
      isClickable
      id={cardId}
      style={{
        backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
        boxShadow: 'var(--pf-t--global--box-shadow--md)',
        borderRadius: '24px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        selectableActions={{
          onClickAction: onClick,
          selectableActionId: `${cardId}-action`,
          selectableActionAriaLabelledby: cardId,
          name: 'header-heavy-cards',
        }}
      >
        {/* Header row: Logo | Title + CVE | Tag pill + More tags icon */}
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ width: '100%' }}>
          {/* Product Logo */}
          <FlexItem>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--pf-t--global--border--color--default)',
            }}>
              <CubeIcon style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)', fontSize: '1.5rem' }} />
            </div>
          </FlexItem>
          
          {/* Title + CVE Badge + Latest Tag */}
          <FlexItem flex={{ default: 'flex_1' }}>
            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
              <FlexItem>
                <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--lg)', fontFamily: 'var(--pf-t--global--font--family--heading)', fontWeight: 'var(--pf-t--global--font--weight--heading--bold)' }}>
                  {cardTitle}<TypeLabel level="CARD-DISPLAY-BOLD" />
                </Content>
              </FlexItem>
              <FlexItem>
                <Label color="grey" icon={<TagIcon />} isCompact>{image.latestTag}</Label>
              </FlexItem>
            </Flex>
          </FlexItem>
          
          {/* Favorite icon */}
          <FlexItem>
            <Tooltip content={isStarFilled ? "Remove from favorites" : "Add to favorites"}>
              <Button 
                variant="plain" 
                aria-label={isStarFilled ? "Remove from favorites" : "Add to favorites"}
                style={{ padding: '4px' }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {isStarFilled ? (
                  <StarIcon style={{ color: 'var(--pf-t--global--color--nonstatus--orange--default)', fontSize: '1rem' }} />
                ) : (
                  <OutlinedStarIcon style={{ fontSize: '1rem' }} />
                )}
              </Button>
            </Tooltip>
          </FlexItem>
        </Flex>
      </CardHeader>
      
      <CardBody style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Description */}
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          fontFamily: 'var(--pf-t--global--font--family--text)',
          color: 'var(--pf-t--global--text--color--subtle)',
          marginBottom: 'var(--pf-t--global--spacer--md)',
          lineHeight: '1.5',
          flex: 1,
        }}>
          {image.description}<TypeLabel level="BODY" />
        </Content>
        
        {/* Full-width Pull Command */}
        <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', marginTop: 'auto' }}>
          <CodeBlock
            actions={
              <CodeBlockAction>
                <Tooltip content="Copy to clipboard">
                  <Button 
                    variant="plain" 
                    aria-label="Copy to clipboard"
                    onClick={(e) => {
                      e.stopPropagation();
                      const cmd = getPullCommand();
                      navigator.clipboard.writeText(cmd);
                      if (onCopy) {
                        onCopy(image.name, commandType, getVariantsFromCommand(cmd));
                      }
                    }}
                  >
                    <CopyIcon />
                  </Button>
                </Tooltip>
              </CodeBlockAction>
            }
          >
            <CodeBlockCode>{renderStyledPullCommand()}</CodeBlockCode>
          </CodeBlock>
          <TypeLabel level="CMD-TEXT" />
        </div>
        
        {/* Last Updated */}
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--sm)',
          fontFamily: 'var(--pf-t--global--font--family--text)',
          color: 'var(--pf-t--global--text--color--subtle)',
          margin: 0
        }}>
          Last updated: {formatShortDate(image.lastUpdated)}<TypeLabel level="SM" />
        </Content>
      </CardBody>
    </Card>
  );
};

// Option 2: Minimal Card (like original but with only favorite icon)
const SplitVerticalCard: React.FC<{
  image: ContainerImage;
  onClick?: () => void;
  commandType: 'podman' | 'docker';
  displayName?: string;
  pullCommand?: string;
  isStarFilled?: boolean;
  onCopy?: (imageName: string, commandType: 'podman' | 'docker', variants: string[]) => void;
}> = ({ image, onClick, commandType, displayName, pullCommand, isStarFilled = false, onCopy }) => {
  const cardId = `minimal-${image.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  const getVariantsFromCommand = (cmd: string): string[] => {
    const variants: string[] = [];
    if (cmd.includes('-fips')) variants.push('FIPS');
    if (cmd.includes('-builder')) variants.push('Builder');
    if (cmd.includes('-go-tools')) variants.push('Go Tools');
    return variants;
  };

  const getPullCommand = () => {
    if (pullCommand) return pullCommand;
    const baseRegistry = `registry.access.redhat.com/hummingbird/${image.name.toLowerCase()}:latest`;
    return `${commandType} pull ${baseRegistry}`;
  };

  // Render styled pull command with bold uppercase command type
  const renderStyledPullCommand = () => {
    const cmd = getPullCommand();
    const cmdType = commandType.toUpperCase();
    const restOfCommand = cmd.substring(commandType.length);
    return <><strong>{cmdType}</strong>{restOfCommand}</>;
  };
  
  const cardTitle = displayName || image.name;
  
  return (
    <Card 
      isCompact
      isClickable
      id={cardId}
      style={{
        backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
        boxShadow: 'var(--pf-t--global--box-shadow--md)',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        selectableActions={{
          onClickAction: onClick,
          selectableActionId: `${cardId}-action`,
          selectableActionAriaLabelledby: cardId,
          name: 'minimal-cards',
        }}
        actions={{
          actions: (
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Tooltip content="Favorites">
                <Button 
                  variant="plain" 
                  aria-label="Favorite" 
                  style={{ padding: '4px' }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => e.stopPropagation()}
                >
                  {isStarFilled ? (
                    <StarIcon style={{ color: 'var(--pf-t--global--color--nonstatus--orange--default)', fontSize: '1.25rem' }} />
                  ) : (
                    <OutlinedStarIcon style={{ fontSize: '1.25rem' }} />
                  )}
                </Button>
              </Tooltip>
            </div>
          ),
          hasNoOffset: true,
        }}
      >
        {/* Circular icon container */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--pf-t--global--border--color--default)',
        }}>
          <CubeIcon style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)', fontSize: '1.75rem' }} />
        </div>
      </CardHeader>
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
          <FlexItem>
            <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--lg)', fontFamily: 'var(--pf-t--global--font--family--heading)', fontWeight: 'var(--pf-t--global--font--weight--heading--bold)' }}>{cardTitle}<TypeLabel level="CARD-DISPLAY-BOLD" /></Content>
          </FlexItem>
          <FlexItem>
            {image.cveCount === 0 && (
              <Label color="green" icon={<InfoCircleIcon />} isCompact>0 CVEs</Label>
            )}
          </FlexItem>
        </Flex>
      </CardTitle>
      <CardBody style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          fontFamily: 'var(--pf-t--global--font--family--text)',
          color: 'var(--pf-t--global--text--color--subtle)',
          marginBottom: 'var(--pf-t--global--spacer--md)',
          lineHeight: '1.5',
          flex: 1,
        }}>
          {image.description}<TypeLabel level="BODY" />
        </Content>
        <div style={{ marginBottom: 'var(--pf-t--global--spacer--md)', marginTop: 'auto' }}>
          <CodeBlock
            actions={
              <CodeBlockAction>
                <Tooltip content="Copy to clipboard">
                  <Button 
                    variant="plain" 
                    aria-label="Copy to clipboard"
                    onClick={(e) => {
                      e.stopPropagation();
                      const cmd = getPullCommand();
                      navigator.clipboard.writeText(cmd);
                      if (onCopy) {
                        onCopy(image.name, commandType, getVariantsFromCommand(cmd));
                      }
                    }}
                  >
                    <CopyIcon />
                  </Button>
                </Tooltip>
              </CodeBlockAction>
            }
          >
            <CodeBlockCode>{renderStyledPullCommand()}</CodeBlockCode>
          </CodeBlock>
          <TypeLabel level="CMD-TEXT" />
        </div>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
          <FlexItem>
            <Content component="p" style={{ 
              fontSize: 'var(--pf-t--global--font--size--body--sm)',
              fontFamily: 'var(--pf-t--global--font--family--text)',
              color: 'var(--pf-t--global--text--color--subtle)',
              margin: 0
            }}>
              {image.latestTag}<TypeLabel level="SM" />
            </Content>
          </FlexItem>
          <FlexItem>
            <Content component="p" style={{ 
              fontSize: 'var(--pf-t--global--font--size--body--sm)',
              fontFamily: 'var(--pf-t--global--font--family--text)',
              color: 'var(--pf-t--global--text--color--subtle)',
              margin: 0
            }}>
              Last updated: {formatShortDate(image.lastUpdated)}<TypeLabel level="SM" />
            </Content>
          </FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
};

interface DashboardProps {
  previewMode?: boolean;
}

const Dashboard: React.FunctionComponent<DashboardProps> = ({ previewMode = false }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<ContainerImage | null>(null);
  const [selectedVariants, setSelectedVariants] = React.useState<Set<string>>(new Set());
  const [drawerRestrictTags, setDrawerRestrictTags] = React.useState<'all' | 'fips' | 'exclude-fips'>('all');
  const [isDrawerRestrictTagsOpen, setIsDrawerRestrictTagsOpen] = React.useState(false);
  const [copiedRowIndex, setCopiedRowIndex] = React.useState<number | null>(null);
  const [modalTab, setModalTab] = React.useState<string>('overview');
  const scrollableRef = React.useRef<HTMLDivElement>(null);
  const [sbomSearchValue, setSbomSearchValue] = React.useState('');
  const [sbomPage, setSbomPage] = React.useState(1);
  const [sbomPerPage, setSbomPerPage] = React.useState(10);
  const [commandType, setCommandType] = React.useState<'podman' | 'docker'>('podman');
  const [showFloatingCTA, setShowFloatingCTA] = React.useState(false);
  const heroRef = React.useRef<HTMLDivElement>(null);
  
  // Track when hero section scrolls out of view using IntersectionObserver
  React.useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating CTA when hero is NOT intersecting (scrolled out of view)
        setShowFloatingCTA(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    
    observer.observe(heroElement);
    return () => observer.disconnect();
  }, []);
  
  // New filter state
  const [orderBy, setOrderBy] = React.useState<'type' | 'alphabetical'>('type');
  const [restrictTags, setRestrictTags] = React.useState<'all' | 'fips' | 'exclude-fips' | 'favorites'>('all');
  const [addBuilderTag, setAddBuilderTag] = React.useState(false);
  const [addGoToolsTag, setAddGoToolsTag] = React.useState(false);
  const [isOrderByOpen, setIsOrderByOpen] = React.useState(false);
  const [isRestrictTagsOpen, setIsRestrictTagsOpen] = React.useState(false);
  const { cardStyle } = useCardStyle();
  const [showFavoritesFirst, setShowFavoritesFirst] = React.useState(false);
  
  // Toast notification state
  const [toasts, setToasts] = React.useState<Array<{ key: number; message: string; description?: string }>>([]);
  const toastKeyRef = React.useRef(0);

  // Handle copy with toast notification
  const handleCopyCommand = (imageName: string, cmdType: 'podman' | 'docker', variants: string[]) => {
    // Build the image name with -fips suffix if applicable
    const hasFips = variants.includes('FIPS');
    const displayImageName = hasFips ? `${imageName}-fips` : imageName;
    
    // Main message: "Copied [podman/docker] command: "[image name]""
    const message = `Copied ${cmdType} command: "${displayImageName}"`;
    
    // Description: only include Builder & Go Tools if added (not FIPS)
    const builderGoToolsAdded = variants.filter(v => v === 'Builder' || v === 'Go Tools');
    const description = builderGoToolsAdded.length > 0 
      ? `${builderGoToolsAdded.join(' & ')} added`
      : undefined;
    
    const key = toastKeyRef.current++;
    setToasts(prev => [...prev, { key, message, description }]);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.key !== key));
    }, 4000);
  };

  // Remove a specific toast
  const removeToast = (key: number) => {
    setToasts(prev => prev.filter(t => t.key !== key));
  };

  const handleShowAllImages = () => {
    setIsDrawerOpen(false);
    navigate('/security-feed');
  };

  // Toggle a variant in the selection
  const toggleVariant = (variant: string) => {
    setSelectedVariants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(variant)) {
        newSet.delete(variant);
      } else {
        newSet.add(variant);
      }
      return newSet;
    });
  };

  // Combine all images for filtering/sorting
  const allImages = [...languageRuntimes, ...databases, ...devTools];

  // Render card based on selected style
  const renderStyledCard = (image: ContainerImage, displayName: string, pullCmd: string, key: string) => {
    const commonProps = {
      image,
      onClick: () => handleCardClick(image),
      commandType,
      displayName,
      pullCommand: pullCmd,
      onCopy: handleCopyCommand,
    };

    switch (cardStyle) {
      case 'B':
        return (
          <div key={key}>
            <HeaderHeavyCard {...commonProps} isStarFilled={isStarFilled(image)} />
          </div>
        );
      case 'C':
        return (
          <div key={key}>
            <SplitVerticalCard {...commonProps} isStarFilled={isStarFilled(image)} />
          </div>
        );
      case 'A':
      default:
        return (
          <div key={key}>
            <ContainerImageCard 
              {...commonProps}
              onClickSide={() => handleCardClickSide(image)}
              isStarFilled={isStarFilled(image)}
            />
          </div>
        );
    }
  };
  
  // Filter images based on search and restrict tags
  const getFilteredImages = (images: ContainerImage[]) => {
    return images.filter(image => {
      // Search filter
      const matchesSearch = searchValue === '' || 
        image.name.toLowerCase().includes(searchValue.toLowerCase());
      
      // Restrict tags filter
      let matchesRestriction = true;
      if (restrictTags === 'fips') {
        matchesRestriction = image.availableVariants?.includes('fips') || false;
      } else if (restrictTags === 'exclude-fips') {
        matchesRestriction = !image.availableVariants?.includes('fips');
      } else if (restrictTags === 'favorites') {
        matchesRestriction = image.isFavorite || false;
      }
      
      return matchesSearch && matchesRestriction;
    });
  };
  
  // Get all filtered images sorted alphabetically (for alphabetical view)
  const getAllFilteredImagesSorted = () => {
    return getFilteredImages(allImages).sort((a, b) => 
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  };

  // Get all images with favorites first, then rest alphabetically
  const getImagesWithFavoritesFirst = () => {
    const filtered = getFilteredImages(allImages);
    const favorites = filtered.filter(img => img.isFavorite).sort((a, b) => 
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    const nonFavorites = filtered.filter(img => !img.isFavorite).sort((a, b) => 
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
    return [...favorites, ...nonFavorites];
  };
  
  // Get all images with FIPS available (for Hardened Images section)
  const getHardenedImages = () => {
    return allImages
      .filter(image => image.availableVariants && image.availableVariants.includes('fips'))
      .filter(image => {
        // Also apply search filter
        return searchValue === '' || image.name.toLowerCase().includes(searchValue.toLowerCase());
      })
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  };
  
  // Get card display name (adds FIPS suffix when FIPS is selected)
  const getCardDisplayName = (name: string) => {
    if (restrictTags === 'fips') {
      return `${name}- FIPS`;
    }
    return name;
  };
  
  // Get card pull command with tag suffixes
  const getCardPullCommand = (imageName: string, cmdType: 'podman' | 'docker') => {
    let suffix = '';
    if (restrictTags === 'fips') suffix += '-fips';
    if (addBuilderTag) suffix += '-builder';
    if (addGoToolsTag) suffix += '-go-tools';
    
    return `${cmdType} pull registry.access.redhat.com/hummingbird/${imageName.toLowerCase()}${suffix}:latest`;
  };
  
  // Check if star should be filled (unfilled when FIPS is selected)
  const isStarFilled = (image: ContainerImage) => {
    if (restrictTags === 'fips') return false;
    return image.isFavorite;
  };

  // Build variant suffix from selected variants (order matters: fips first, then builder/go-tools)
  const getVariantSuffix = (): string => {
    const parts: string[] = [];
    // FIPS comes first in the suffix order (uses drawer restrict tags dropdown)
    if (drawerRestrictTags === 'fips') parts.push('fips');
    // Then builder or go-tools (uses pill buttons)
    if (selectedVariants.has('builder')) parts.push('builder');
    if (selectedVariants.has('go-tools')) parts.push('go-tools');
    
    return parts.length > 0 ? '-' + parts.join('-') : '';
  };

  // Generate pull command based on image, tag, and selected variants (full version for copying)
  const getFullPullCommand = (imageName: string, tag: string): string => {
    const suffix = getVariantSuffix();
    return `${commandType} pull registry.access.redhat.com/hummingbird/${imageName.toLowerCase()}:${tag}${suffix}`;
  };

  // Generate pull command for display (no truncation)
  const getDisplayPullCommand = (imageName: string, tag: string): string => {
    const suffix = getVariantSuffix();
    return `${commandType} pull registry.access.redhat.com/hummingbird/${imageName.toLowerCase()}:${tag}${suffix}`;
  };

  // Filter variants based on selected variant types - only show versions that have ALL selected variants available
  const getFilteredVariants = () => {
    if (!selectedImage) return [];
    const allVariants = getVariantsForImage(selectedImage.name);
    
    // If no variant filters selected, show all versions
    if (selectedVariants.size === 0) {
      return allVariants;
    }
    
    // Filter to only versions that have ALL selected variants available
    return allVariants.filter(v => {
      const available = v.availableVariants || [];
      return Array.from(selectedVariants).every(selected => 
        available.includes(selected as 'fips' | 'builder' | 'go-tools')
      );
    });
  };

  // Handle copy action
  const handleCopyPullCommand = (index: number, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedRowIndex(index);
    setTimeout(() => setCopiedRowIndex(null), 2000);
  };

  // Open bottom drawer (default)
  const handleCardClick = (image: ContainerImage) => {
    if (previewMode) return; // Disable in preview mode
    setSelectedImage(image);
    setIsDrawerOpen(true);
    setSelectedVariants(new Set());
    setDrawerRestrictTags('all');
    setCopiedRowIndex(null);
    setModalTab('overview');
  };

  // Open side drawer (A/B test variant)
  const handleCardClickSide = (image: ContainerImage) => {
    if (previewMode) return; // Disable in preview mode
    setSelectedImage(image);
    setIsSideDrawerOpen(true);
    setSelectedVariants(new Set());
    setDrawerRestrictTags('all');
    setCopiedRowIndex(null);
    setModalTab('overview');
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCloseSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };

  const variants = getFilteredVariants();

  // Modal content for the bottom slide-up panel
  const renderModalContent = () => selectedImage && (
    <div style={{ 
      padding: 'var(--pf-t--global--spacer--xl)',
      height: '100%',
      overflowY: 'auto',
    }}>
      {/* Modal Header */}
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapLg' }} style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
          <FlexItem>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CubeIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--info--default)' }} />
            </div>
          </FlexItem>
          <FlexItem flex={{ default: 'flex_1' }}>
            <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
              Red Hat Project Hummingbird, <span style={{ marginLeft: '4px' }}>Last Updated XX:XX:XX</span><TypeLabel level="SM" />
            </Content>
            <Content component="h4" style={{ margin: 0, marginTop: 'var(--pf-t--global--spacer--xs)', fontSize: 'var(--pf-t--global--font--size--heading--h4)' }}>
              {selectedImage.name}<TypeLabel level="H4-DISPLAY-BOLD" />
            </Content>
            <Flex gap={{ default: 'gapMd' }} style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
          <FlexItem>
                <Label variant="outline" icon={<DownloadIcon />}>RHEL 9</Label>
          </FlexItem>
          <FlexItem>
                <Label variant="outline" icon={<DownloadIcon />}>amd64</Label>
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem>
            {/* Tabs in the drawer header - upper right */}
            <CompassPanel isPill hasNoPadding style={{ 
              display: 'inline-block',
              '--pf-v6-c-tabs--before--BorderColor': 'transparent',
              '--pf-v6-c-tabs--after--BorderColor': 'transparent',
            } as React.CSSProperties}>
              <Tabs
                activeKey={modalTab}
                onSelect={(_event, tabKey) => setModalTab(tabKey as string)}
                aria-label="Image detail tabs"
                component={TabsComponent.nav}
                style={{
                  '--pf-v6-c-tabs__list--before--BorderBottomWidth': '0',
                  '--pf-v6-c-tabs__list--before--BorderBottomColor': 'transparent',
                } as React.CSSProperties}
              >
                <Tab eventKey="overview" title={<TabTitleText>Overview</TabTitleText>} />
                <Tab eventKey="security" title={<TabTitleText>Security Feed</TabTitleText>} />
                <Tab eventKey="technical" title={<TabTitleText>Technical Information</TabTitleText>} />
                <Tab eventKey="packages" title={<TabTitleText>SBOM</TabTitleText>} />
                <Tab eventKey="containerfile" title={<TabTitleText>Containerfile</TabTitleText>} />
              </Tabs>
            </CompassPanel>
          </FlexItem>
        </Flex>

        {/* Tab Content */}
        {modalTab === 'overview' && (
          <Flex>
            {/* Left Content - Scrollable */}
            <FlexItem flex={{ default: 'flex_1' }} style={{ paddingRight: 'var(--pf-t--global--spacer--lg)' }}>
              <div 
                ref={scrollableRef}
                style={{ 
                  overflowY: 'auto', 
                  maxHeight: '70vh',
                  paddingRight: 'var(--pf-t--global--spacer--md)'
                }}
              >
                {/* Get Started Section */}
                <div id="get-started" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Get Started<TypeLabel level="H2" /></Content>
                  
                  {/* Stats - Two separate panels */}
                  <Flex gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                    <FlexItem flex={{ default: 'flex_1' }}>
                      <CompassPanel style={{ height: '100%' }}>
                        <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                          <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                            <CheckCircleIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          </div>
                          <Content component="h2" style={{ margin: 0, fontSize: '2rem' }}>{selectedImage.cveCount || 0}<TypeLabel level="STAT" /></Content>
                          <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>CVEs<TypeLabel level="SM" /></Content>
                          <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                            Security feed<TypeLabel level="LINK" />
                          </Button>
                        </div>
                      </CompassPanel>
                    </FlexItem>
                    <FlexItem flex={{ default: 'flex_1' }}>
                      <CompassPanel style={{ height: '100%' }}>
                        <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                          <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                            <DownloadIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--info--default)' }} />
                          </div>
                          <Content component="h2" style={{ margin: 0, fontSize: '2rem' }}>{selectedImage.daysSincePublished || 0} days<TypeLabel level="STAT" /></Content>
                          <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>since last published<TypeLabel level="SM" /></Content>
                          <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                            Repository<TypeLabel level="LINK" />
                          </Button>
                        </div>
                      </CompassPanel>
                    </FlexItem>
                    <FlexItem flex={{ default: 'flex_2' }}>
                      <CompassPanel style={{ height: '100%' }}>
                        <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                          <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>Quick Pull<TypeLabel level="H3" /></Content>
                          <CodeBlock 
                            actions={
                              <CodeBlockAction>
                                <Tooltip content="Copy to clipboard">
                                  <Button 
                                    variant="plain" 
                                    aria-label="Copy to clipboard" 
                                    onClick={() => {
                                      let cmd = `${commandType} pull registry.access.redhat.com/hummingbird/${selectedImage.name.toLowerCase()}`;
                                      if (selectedVariants.has('fips')) cmd += '-fips';
                                      if (selectedVariants.has('builder')) cmd += '-builder';
                                      if (selectedVariants.has('go-tools')) cmd += '-go-tools';
                                      cmd += ':latest';
                                      navigator.clipboard.writeText(cmd);
                                    }}
                                  >
                                    <CopyIcon />
                                  </Button>
                                </Tooltip>
                              </CodeBlockAction>
                            }
                          >
                            <CodeBlockCode>
                              {(() => {
                                let cmd = `${commandType} pull registry.access.redhat.com/hummingbird/${selectedImage.name.toLowerCase()}`;
                                if (selectedVariants.has('fips')) cmd += '-fips';
                                if (selectedVariants.has('builder')) cmd += '-builder';
                                if (selectedVariants.has('go-tools')) cmd += '-go-tools';
                                cmd += ':latest';
                                return cmd;
                              })()}
                            </CodeBlockCode>
                          </CodeBlock>
                          <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginTop: 'var(--pf-t--global--spacer--md)' }}>
                            <FlexItem>
                              <Button 
                                variant={selectedVariants.has('fips') ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => {
                                  const newVariants = new Set(selectedVariants);
                                  if (newVariants.has('fips')) {
                                    newVariants.delete('fips');
                                  } else {
                                    newVariants.add('fips');
                                  }
                                  setSelectedVariants(newVariants);
                                }}
                                style={{ borderRadius: '20px' }}
                              >
                                FIPS
                              </Button>
                            </FlexItem>
                            <FlexItem>
                              <Tooltip content="For development environments only">
                                <Button 
                                  variant={selectedVariants.has('builder') ? 'primary' : 'secondary'}
                                  size="sm"
                                  onClick={() => {
                                    const newVariants = new Set(selectedVariants);
                                    if (newVariants.has('builder')) {
                                      newVariants.delete('builder');
                                    } else {
                                      newVariants.add('builder');
                                    }
                                    setSelectedVariants(newVariants);
                                  }}
                                  style={{ borderRadius: '20px' }}
                                >
                                  Builder (Dev)
                                </Button>
                              </Tooltip>
                            </FlexItem>
                            <FlexItem>
                              <Button 
                                variant={selectedVariants.has('go-tools') ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={() => {
                                  const newVariants = new Set(selectedVariants);
                                  if (newVariants.has('go-tools')) {
                                    newVariants.delete('go-tools');
                                  } else {
                                    newVariants.add('go-tools');
                                  }
                                  setSelectedVariants(newVariants);
                                }}
                                style={{ borderRadius: '20px' }}
                              >
                                Go Tools
                              </Button>
                            </FlexItem>
                            <FlexItem style={{ marginLeft: 'auto' }}>
                              <Button 
                                variant="link" 
                                isInline 
                                onClick={() => {
                                  const el = document.getElementById('available-tags');
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                              >
                                See additional tags<TypeLabel level="LINK" />
                              </Button>
                            </FlexItem>
                          </Flex>
                        </div>
                      </CompassPanel>
                    </FlexItem>
                  </Flex>

                  {/* Start using this image */}
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>Start using this image<TypeLabel level="H3" /></Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Swap existing instance<TypeLabel level="SM" />
                      </Content>
                      <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                        <FlexItem flex={{ default: 'flex_1' }}>
                          <CodeBlock actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`podman pull registry.access.redhat.com/hummingbird/${selectedImage.name.toLowerCase()}:latest`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}>
                            <CodeBlockCode>{`podman pull registry.access.redhat.com/hummingbird/${selectedImage.name.toLowerCase()}:latest`}</CodeBlockCode>
                          </CodeBlock>
                        </FlexItem>
                        <FlexItem>
                          <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)' }}>{selectedImage.size}</Content>
                        </FlexItem>
                      </Flex>

                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Manifest Digest</Content>
                      <div style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                        <CodeBlock actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText('sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4')}><CopyIcon /></Button></Tooltip></CodeBlockAction>}>
                          <CodeBlockCode>sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4</CodeBlockCode>
                        </CodeBlock>
                      </div>

                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Registry</Content>
                      <CodeBlock actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText('registry.access.redhat.com/hummingbird')}><CopyIcon /></Button></Tooltip></CodeBlockAction>}>
                        <CodeBlockCode>registry.access.redhat.com/hummingbird</CodeBlockCode>
                      </CodeBlock>
                    </div>
                  </CompassPanel>
                </div>

                {/* Available Tags Section */}
                <div id="available-tags" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Available Tags<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsFlexEnd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                        <FlexItem>
                          <ToggleGroup aria-label="Command type toggle">
                            <ToggleGroupItem
                              text="Podman"
                              buttonId="drawer-podman-toggle"
                              isSelected={commandType === 'podman'}
                              onChange={() => setCommandType('podman')}
                            />
                            <ToggleGroupItem
                              text="Docker"
                              buttonId="drawer-docker-toggle"
                              isSelected={commandType === 'docker'}
                              onChange={() => setCommandType('docker')}
                            />
                          </ToggleGroup>
                        </FlexItem>
                        <FlexItem>
                          <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsFlexEnd' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ height: '18px' }} />
                              <SearchInput placeholder="Search tags" style={{ width: '150px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <label style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Restrict tags</label>
                              <Select id="drawer-restrict-tags-select" isOpen={isDrawerRestrictTagsOpen} selected={drawerRestrictTags} onSelect={(_event, value) => { setDrawerRestrictTags(value as 'all' | 'fips' | 'exclude-fips'); setIsDrawerRestrictTagsOpen(false); }} onOpenChange={setIsDrawerRestrictTagsOpen} toggle={(toggleRef: React.Ref<MenuToggleElement>) => (<MenuToggle ref={toggleRef} onClick={() => setIsDrawerRestrictTagsOpen(!isDrawerRestrictTagsOpen)} isExpanded={isDrawerRestrictTagsOpen} style={{ minWidth: '120px' }}>{drawerRestrictTags === 'all' ? 'All' : drawerRestrictTags === 'fips' ? 'FIPS only' : 'Exclude FIPS'}</MenuToggle>)}>
                                <SelectList>
                                  <SelectOption value="all" isSelected={drawerRestrictTags === 'all'}>All</SelectOption>
                                  <SelectOption value="fips" isSelected={drawerRestrictTags === 'fips'}>FIPS only</SelectOption>
                                  <SelectOption value="exclude-fips" isSelected={drawerRestrictTags === 'exclude-fips'}>Exclude FIPS</SelectOption>
                                </SelectList>
                              </Select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ height: '18px' }} />
                              <Flex gap={{ default: 'gapSm' }}>
                                <Tooltip content="For development environments only"><Button variant={selectedVariants.has('builder') ? 'primary' : 'secondary'} onClick={() => toggleVariant('builder')} icon={<PlusIcon />} style={{ borderRadius: '20px', paddingLeft: '12px', paddingRight: '16px' }}>Builder (Dev)</Button></Tooltip>
                                <Button variant={selectedVariants.has('go-tools') ? 'primary' : 'secondary'} onClick={() => toggleVariant('go-tools')} icon={<PlusIcon />} style={{ borderRadius: '20px', paddingLeft: '12px', paddingRight: '16px' }}>Go Tools</Button>
                              </Flex>
                            </div>
                          </Flex>
                        </FlexItem>
                      </Flex>
                      <Table variant="compact" borders={false} style={{ tableLayout: 'fixed' }}>
                        <Thead><Tr><Th width={20}>Tag</Th><Th width={20}>UID</Th><Th width={15}>Last update</Th><Th width={45}>Pull command</Th></Tr></Thead>
                        <Tbody>
                          {variants.map((variant, index) => {
                            const fullCommand = getFullPullCommand(selectedImage?.name || '', variant.tag);
                            const displayCommand = getDisplayPullCommand(selectedImage?.name || '', variant.tag);
                            return (
                              <Tr key={index} style={variant.isLatest ? { backgroundColor: 'rgba(0, 102, 204, 0.08)' } : undefined}>
                                <Td dataLabel="Tag"><Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}><Label variant="outline" isCompact>{variant.tag}</Label>{variant.isLatest && <Label color="blue" isCompact>Latest</Label>}</Flex></Td>
                                <Td dataLabel="UID"><Tooltip content={<Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}><span>{variant.project}</span><Button variant="plain" size="sm" onClick={() => navigator.clipboard.writeText(variant.project)} style={{ color: 'white', padding: '2px' }}><CopyIcon /></Button></Flex>}><span style={{ cursor: 'pointer' }}>...{variant.project.slice(-8)}</span></Tooltip></Td>
                                <Td dataLabel="Last update">{variant.lastUpdate}</Td>
                                <Td dataLabel="Pull command"><CodeBlock actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => handleCopyPullCommand(index, fullCommand)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{displayCommand}</CodeBlockCode></CodeBlock></Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </div>
                  </CompassPanel>
                </div>

                {/* Deployment Section */}
                <div id="deployment" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Deployment<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                        Use the following snippets to deploy this image in your preferred environment. Choose the appropriate tag for your use case.
                      </Content>

                      {/* Available Tags Overview */}
                      <div style={{ 
                        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                        borderRadius: '8px',
                        padding: 'var(--pf-t--global--spacer--md)',
                        marginBottom: 'var(--pf-t--global--spacer--lg)'
                      }}>
                        <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                          Tag Reference<TypeLabel level="H3" />
                        </Content>
                        <Grid hasGutter>
                          <GridItem span={6} md={3}>
                            <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                              <code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontWeight: 'bold' }}>:latest</code>
                              <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Stable production release</span>
                            </Flex>
                          </GridItem>
                          <GridItem span={6} md={3}>
                            <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                              <code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontWeight: 'bold' }}>:latest-fips</code>
                              <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>FIPS 140-2 compliant</span>
                            </Flex>
                          </GridItem>
                          <GridItem span={6} md={3}>
                            <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                              <code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontWeight: 'bold' }}>:latest-dev</code>
                              <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>For development only</span>
                            </Flex>
                          </GridItem>
                          <GridItem span={6} md={3}>
                            <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                              <code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontWeight: 'bold' }}>:3.12</code>
                              <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Pinned version</span>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </div>

                      {/* Container Pull Commands */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Container Pull Commands<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Pull the image directly with Podman or Docker:
                      </Content>
                      <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                        <GridItem span={12} md={6}>
                          <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Production (latest)</Content>
                          <CodeBlock actions={<CodeBlockAction><Button variant="plain" aria-label="Copy" onClick={() => navigator.clipboard.writeText(`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest`)}><CopyIcon /></Button></CodeBlockAction>}>
                            <CodeBlockCode style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest`}</CodeBlockCode>
                          </CodeBlock>
                        </GridItem>
                        <GridItem span={12} md={6}>
                          <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>FIPS Compliant</Content>
                          <CodeBlock actions={<CodeBlockAction><Button variant="plain" aria-label="Copy" onClick={() => navigator.clipboard.writeText(`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-fips`)}><CopyIcon /></Button></CodeBlockAction>}>
                            <CodeBlockCode style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-fips`}</CodeBlockCode>
                          </CodeBlock>
                        </GridItem>
                        <GridItem span={12} md={6}>
                          <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Development (Builder)</Content>
                          <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Includes package managers & build tools. Not for production.</Content>
                          <CodeBlock actions={<CodeBlockAction><Button variant="plain" aria-label="Copy" onClick={() => navigator.clipboard.writeText(`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-dev`)}><CopyIcon /></Button></CodeBlockAction>}>
                            <CodeBlockCode style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-dev`}</CodeBlockCode>
                          </CodeBlock>
                        </GridItem>
                        <GridItem span={12} md={6}>
                          <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Pinned Version</Content>
                          <CodeBlock actions={<CodeBlockAction><Button variant="plain" aria-label="Copy" onClick={() => navigator.clipboard.writeText(`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:3.12`)}><CopyIcon /></Button></CodeBlockAction>}>
                            <CodeBlockCode style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`podman pull registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:3.12`}</CodeBlockCode>
                          </CodeBlock>
                        </GridItem>
                      </Grid>

                      {/* Kubernetes / Helm */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Kubernetes / Helm<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Add this to your Helm values.yaml or Kubernetes deployment:
                      </Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }} actions={<CodeBlockAction><Button variant="plain" aria-label="Copy Helm snippet" onClick={() => navigator.clipboard.writeText(`# values.yaml
image:
  repository: registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}
  tag: "latest"        # or "latest-fips" for FIPS compliance
  pullPolicy: IfNotPresent

# For FIPS-compliant deployments:
# tag: "latest-fips"

# For development environments only (includes build tools, NOT for production):
# tag: "latest-dev"

# For pinned versions (recommended for production):
# tag: "3.12"`)}><CopyIcon /></Button></CodeBlockAction>}>
                        <CodeBlockCode style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`# values.yaml
image:
  repository: registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}
  tag: "latest"        # or "latest-fips" for FIPS compliance
  pullPolicy: IfNotPresent

# For FIPS-compliant deployments:
# tag: "latest-fips"

# For development environments only (includes build tools, NOT for production):
# tag: "latest-dev"

# For pinned versions (recommended for production):
# tag: "3.12"`}</CodeBlockCode>
                      </CodeBlock>

                      {/* Terraform */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Terraform<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Use this Terraform block for container deployments:
                      </Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }} actions={<CodeBlockAction><Button variant="plain" aria-label="Copy Terraform block" onClick={() => navigator.clipboard.writeText(`# Terraform container resource
resource "docker_image" "hummingbird_${selectedImage?.name.toLowerCase()}" {
  name = "registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest"
}

resource "docker_container" "${selectedImage?.name.toLowerCase()}" {
  name  = "${selectedImage?.name.toLowerCase()}-app"
  image = docker_image.hummingbird_${selectedImage?.name.toLowerCase()}.image_id

  ports {
    internal = 8080
    external = 8080
  }

  # For FIPS compliance, use:
  # name = "registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-fips"
}`)}><CopyIcon /></Button></CodeBlockAction>}>
                        <CodeBlockCode style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`# Terraform container resource
resource "docker_image" "hummingbird_${selectedImage?.name.toLowerCase()}" {
  name = "registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest"
}

resource "docker_container" "${selectedImage?.name.toLowerCase()}" {
  name  = "${selectedImage?.name.toLowerCase()}-app"
  image = docker_image.hummingbird_${selectedImage?.name.toLowerCase()}.image_id

  ports {
    internal = 8080
    external = 8080
  }

  # For FIPS compliance, use:
  # name = "registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-fips"
}`}</CodeBlockCode>
                      </CodeBlock>

                      {/* OpenShift / Kubernetes YAML */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        OpenShift / Kubernetes YAML<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Deploy directly with kubectl or oc:
                      </Content>
                      <CodeBlock actions={<CodeBlockAction><Button variant="plain" aria-label="Copy K8s YAML" onClick={() => navigator.clipboard.writeText(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${selectedImage?.name.toLowerCase()}-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${selectedImage?.name.toLowerCase()}
  template:
    metadata:
      labels:
        app: ${selectedImage?.name.toLowerCase()}
    spec:
      containers:
      - name: ${selectedImage?.name.toLowerCase()}
        image: registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest
        # For FIPS: registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-fips
        ports:
        - containerPort: 8080
        securityContext:
          runAsNonRoot: true
          allowPrivilegeEscalation: false`)}><CopyIcon /></Button></CodeBlockAction>}>
                        <CodeBlockCode style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${selectedImage?.name.toLowerCase()}-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${selectedImage?.name.toLowerCase()}
  template:
    metadata:
      labels:
        app: ${selectedImage?.name.toLowerCase()}
    spec:
      containers:
      - name: ${selectedImage?.name.toLowerCase()}
        image: registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest
        # For FIPS: registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest-fips
        ports:
        - containerPort: 8080
        securityContext:
          runAsNonRoot: true
          allowPrivilegeEscalation: false`}</CodeBlockCode>
                      </CodeBlock>
                    </div>
                  </CompassPanel>
                </div>

                {/* Documentation Section */}
                <div id="documentation" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Documentation<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Project Hummingbird httpd Image</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>The Apache HTTP Server, colloquially called Apache, is a Web server application notable for playing a key role in the initial growth of the World Wide Web. Originally based on the NCSA HTTPd server, development of Apache began in early 1995 after work on the NCSA code stalled. Apache quickly overtook NCSA HTTPd as the dominant HTTP server, and has remained the most popular HTTP server in use since April 1996.</Content>
                      
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>This image runs as a non-root user on port 8080 (not 80) for improved security as the non-root user cannot bind to privileged ports.</Content>
                      
                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Basic Startup</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Start an httpd container serving the default welcome page:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText('podman run -d --name httpd-server -p 8080:8080 quay.io/hummingbird/httpd:latest')}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>podman run -d --name httpd-server -p 8080:8080 quay.io/hummingbird/httpd:latest</CodeBlockCode></CodeBlock>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>Access the server at http://localhost:8080.</Content>

                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Serving Custom Content</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Mount your content directory to serve static files:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`podman run -d --name httpd-server \\\n  -p 8080:8080 \\\n  -v /path/to/your/html:/usr/local/apache2/htdocs:ro,Z \\\n  quay.io/hummingbird/httpd:latest`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{`podman run -d --name httpd-server \\
  -p 8080:8080 \\
  -v /path/to/your/html:/usr/local/apache2/htdocs:ro,Z \\
  quay.io/hummingbird/httpd:latest`}</CodeBlockCode></CodeBlock>

                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Custom Configuration</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Mount a custom httpd configuration:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`podman run -d --name httpd-server \\\n  -p 8080:8080 \\\n  -v /path/to/my-httpd.conf:/etc/httpd/conf.d/custom.conf:ro,Z \\\n  quay.io/hummingbird/httpd:latest`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{`podman run -d --name httpd-server \\
  -p 8080:8080 \\
  -v /path/to/my-httpd.conf:/etc/httpd/conf.d/custom.conf:ro,Z \\
  quay.io/hummingbird/httpd:latest`}</CodeBlockCode></CodeBlock>

                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Container Networking</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Connect to httpd from another container:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`# Create a network\npodman network create myapp-network\n\n# Start httpd on the network\npodman run -d --name httpd-server \\\n  --network myapp-network \\\n  quay.io/hummingbird/httpd:latest\n\n# Connect from another container (note: port 8080)\npodman run --rm --network myapp-network \\\n  quay.io/hummingbird/curl:latest \\\n  http://httpd-server:8080/`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{`# Create a network
podman network create myapp-network

# Start httpd on the network
podman run -d --name httpd-server \\
  --network myapp-network \\
  quay.io/hummingbird/httpd:latest

# Connect from another container (note: port 8080)
podman run --rm --network myapp-network \\
  quay.io/hummingbird/curl:latest \\
  http://httpd-server:8080/`}</CodeBlockCode></CodeBlock>

                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Version Check</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Verify the httpd version:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText('podman run --rm quay.io/hummingbird/httpd:latest httpd -v')}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>podman run --rm quay.io/hummingbird/httpd:latest httpd -v</CodeBlockCode></CodeBlock>

                      <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Building a Custom Image</Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Create a Containerfile to build an image with your static content:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`FROM quay.io/hummingbird/httpd:latest\n\nCOPY index.html /usr/local/apache2/htdocs/\nCOPY css/ /usr/local/apache2/htdocs/css/\nCOPY images/ /usr/local/apache2/htdocs/images/`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{`FROM quay.io/hummingbird/httpd:latest

COPY index.html /usr/local/apache2/htdocs/
COPY css/ /usr/local/apache2/htdocs/css/
COPY images/ /usr/local/apache2/htdocs/images/`}</CodeBlockCode></CodeBlock>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Build and run:</Content>
                      <CodeBlock actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`podman build -t my-website .\npodman run -d -p 8080:8080 my-website`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{`podman build -t my-website .
podman run -d -p 8080:8080 my-website`}</CodeBlockCode></CodeBlock>
                    </div>
                  </CompassPanel>
                </div>

                {/* Compatibility Notes Section */}
                <div id="compatibility-notes" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Compatibility Notes<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                        The Hummingbird {selectedImage?.name} image is designed to be a drop-in compatible alternative for{' '}
                        <code style={{ 
                          fontFamily: 'var(--pf-t--global--font--family--mono)',
                          fontSize: 'var(--pf-t--global--font--size--body--sm)',
                          backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          docker.io/library/{selectedImage?.name.toLowerCase()}:latest
                        </code>
                        {' '}({selectedImage?.upstreamSize || 'N/A'}).
                      </Content>
                      <Flex gap={{ default: 'gapLg' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                        <FlexItem>
                          <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                            <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Upstream Size</span>
                            <span style={{ fontWeight: 'bold' }}>{selectedImage?.upstreamSize || 'N/A'}</span>
                          </Flex>
                        </FlexItem>
                        <FlexItem>
                          <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                            <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Hummingbird Size</span>
                            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                              <span style={{ fontWeight: 'bold', color: 'var(--pf-t--global--icon--color--status--success--default)' }}>{selectedImage?.size || 'N/A'}</span>
                              <Label color="green" isCompact>Optimized</Label>
                            </Flex>
                          </Flex>
                        </FlexItem>
                      </Flex>
                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        For detailed compatibility information and known differences, see the full compatibility table in the documentation.
                      </Content>
                    </div>
                  </CompassPanel>
                </div>

                {/* Image Verification Section */}
                <div id="image-verification" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Image Verification<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>You can use the following public key to verify Hummingbird images:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText(`-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEtYRltxRJvXLMpXT+pIIu86CLhDP7\nQ6VznCXqlzV3AO4AK/ge/HYtv6wMPfe4NHP3VQkCWoUokegC926FB+MTyA==\n-----END PUBLIC KEY-----`)}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>{`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEtYRltxRJvXLMpXT+pIIu86CLhDP7
Q6VznCXqlzV3AO4AK/ge/HYtv6wMPfe4NHP3VQkCWoUokegC926FB+MTyA==
-----END PUBLIC KEY-----`}</CodeBlockCode></CodeBlock>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>First, copy the upper key to a file (e.g., key.pub). Then you can use cosign along with the key:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText('cosign verify --key key.pub --insecure-ignore-tlog quay.io/hummingbird/httpd:latest')}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>cosign verify --key key.pub --insecure-ignore-tlog quay.io/hummingbird/httpd:latest</CodeBlockCode></CodeBlock>
                      <Content component="p" style={{ fontStyle: 'italic', color: 'var(--pf-t--global--text--color--subtle)' }}>Note that the key is not sufficient to establish trust as it only verifies that the image was built in Hummingbird's Tekton pipeline. Once Project Hummingbird releases official images, they will be signed with an official Red Hat key and go through Red Hat's publishing pipeline.</Content>
                    </div>
                  </CompassPanel>
                </div>

                {/* Vulnerability Scanning Section */}
                <div id="vulnerability-scanning" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Vulnerability Scanning<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>For security vulnerability scanning, Hummingbird uses Syft for SBOM generation and Grype for vulnerability detection. However, for the time being, Syft's output needs to be post-processed for accurate vulnerability matching with Fedora packages. You can conveniently run the scan yourself in a container:</Content>
                      <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }} actions={<CodeBlockAction><Tooltip content="Copy to clipboard"><Button variant="plain" aria-label="Copy to clipboard" onClick={() => navigator.clipboard.writeText('podman run --volume vuln-db:/tmp/.cache quay.io/hummingbird-ci/gitlab-ci grype-hummingbird.sh quay.io/hummingbird/httpd:latest')}><CopyIcon /></Button></Tooltip></CodeBlockAction>}><CodeBlockCode>podman run --volume vuln-db:/tmp/.cache quay.io/hummingbird-ci/gitlab-ci grype-hummingbird.sh quay.io/hummingbird/httpd:latest</CodeBlockCode></CodeBlock>
                      <Content component="p">For details and other ways how to do the scan, see the vulnerability scanning documentation.</Content>
                    </div>
                  </CompassPanel>
                </div>

              </div>
            </FlexItem>

            {/* Right Side - Jump Links */}
            <FlexItem style={{ width: '200px', minWidth: '200px', paddingLeft: 'var(--pf-t--global--spacer--md)' }}>
              <JumpLinks
                isVertical
                scrollableRef={scrollableRef}
                offset={160}
                aria-label="Page navigation"
                style={{ '--pf-v6-c-jump-links__list--before--BorderLeftWidth': '0' } as React.CSSProperties}
              >
                <JumpLinksItem href="#get-started">Get Started</JumpLinksItem>
                <JumpLinksItem href="#available-tags">Available Tags</JumpLinksItem>
                <JumpLinksItem href="#deployment">Deployment</JumpLinksItem>
                <JumpLinksItem href="#documentation">Documentation</JumpLinksItem>
                <JumpLinksItem href="#compatibility-notes">Compatibility Notes</JumpLinksItem>
                <JumpLinksItem href="#image-verification">Image Verification</JumpLinksItem>
                <JumpLinksItem href="#vulnerability-scanning">Vulnerability Scanning</JumpLinksItem>
              </JumpLinks>
            </FlexItem>
          </Flex>
        )}

        {/* Technical Information Tab */}
        {modalTab === 'technical' && (
          <Flex>
            {/* Left Side - Scrollable Content */}
            <FlexItem flex={{ default: 'flex_1' }}>
              <div
                ref={scrollableRef}
                style={{
                  overflowY: 'auto',
                  maxHeight: '70vh',
                  paddingRight: 'var(--pf-t--global--spacer--md)'
                }}
              >
                {/* Build Information Section */}
                <div id="tech-build-info" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Build Information<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      {/* Upstream Alternative Info */}
                      <div style={{ 
                        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                        borderRadius: '8px',
                        padding: 'var(--pf-t--global--spacer--md)',
                        marginBottom: 'var(--pf-t--global--spacer--lg)'
                      }}>
                        <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                          Drop-in Alternative For<TypeLabel level="H3" />
                        </Content>
                        <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--default)' }}>
                          This Hummingbird image is designed as a <strong>secure, hardened drop-in alternative</strong> for:
                        </Content>
                        <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                          <Label color="blue" isCompact>Docker Hub</Label>
                          <code style={{ 
                            fontFamily: 'var(--pf-t--global--font--family--mono)',
                            fontSize: 'var(--pf-t--global--font--size--body--default)',
                            backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
                            padding: '4px 8px',
                            borderRadius: '4px'
                          }}>
                            docker.io/library/{selectedImage?.name.toLowerCase()}:latest
                          </code>
                        </Flex>

                        {/* Size Comparison */}
                        <div style={{ 
                          backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
                          borderRadius: '8px',
                          padding: 'var(--pf-t--global--spacer--md)',
                          marginBottom: 'var(--pf-t--global--spacer--md)'
                        }}>
                          <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--default)' }}>
                            Size Comparison
                          </Content>
                          <Grid hasGutter>
                            <GridItem span={6}>
                              <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                                <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Upstream (Docker Hub)</span>
                                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--pf-t--global--icon--color--status--danger--default)' }}>{selectedImage?.upstreamSize || 'N/A'}</span>
                                </Flex>
                              </Flex>
                            </GridItem>
                            <GridItem span={6}>
                              <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                                <span style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Hummingbird</span>
                                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--pf-t--global--icon--color--status--success--default)' }}>{selectedImage?.size || 'N/A'}</span>
                                  <Label color="green" isCompact>
                                    {selectedImage?.upstreamSize && selectedImage?.size ? 
                                      `${Math.round((1 - parseFloat(selectedImage.size) / (selectedImage.upstreamSize.includes('GB') ? parseFloat(selectedImage.upstreamSize) * 1000 : parseFloat(selectedImage.upstreamSize))) * 100)}% smaller` 
                                      : ''}
                                  </Label>
                                </Flex>
                              </Flex>
                            </GridItem>
                          </Grid>
                        </div>

                        <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)', margin: 0 }}>
                          Hummingbird {selectedImage?.name} provides the same functionality with a significantly reduced attack surface, 
                          near-zero CVEs, and full compatibility with existing workflows. Simply swap the image reference in your 
                          Containerfile or deployment configuration.
                        </Content>
                      </div>

                      {/* Build Pipeline Info */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Build Pipeline<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        This image is built using Red Hat's Trusted Application Pipeline with full supply chain attestation.
                      </Content>
                      
                      <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                        <GridItem span={6}>
                          <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                            <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Build System</Content>
                            <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>Konflux (Tekton Chains)</Content>
                          </Flex>
                        </GridItem>
                        <GridItem span={6}>
                          <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                            <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Last Build</Content>
                            <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>January 28, 2026 at 14:30 UTC</Content>
                          </Flex>
                        </GridItem>
                        <GridItem span={6}>
                          <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                            <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Build ID</Content>
                            <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>
                              <code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                                hb-{selectedImage?.name.toLowerCase()}-20260128-1430
                              </code>
                            </Content>
                          </Flex>
                        </GridItem>
                        <GridItem span={6}>
                          <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                            <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>SLSA Level</Content>
                            <Flex gap={{ default: 'gapSm' }} alignItems={{ default: 'alignItemsCenter' }}>
                              <Label color="green" icon={<CheckCircleIcon />} isCompact>Level 3</Label>
                            </Flex>
                          </Flex>
                        </GridItem>
                      </Grid>

                      <Flex gap={{ default: 'gapSm' }}>
                        <Button 
                          variant="primary" 
                          icon={<ExternalLinkAltIcon />} 
                          iconPosition="end"
                          component="a" 
                          href={`https://konflux.ci/builds/hummingbird/${selectedImage?.name.toLowerCase()}`} 
                          target="_blank"
                        >
                          View Build Pipeline
                        </Button>
                        <Button 
                          variant="secondary" 
                          icon={<ExternalLinkAltIcon />} 
                          iconPosition="end"
                          component="a" 
                          href={`https://github.com/redhat/hummingbird-${selectedImage?.name.toLowerCase()}`} 
                          target="_blank"
                        >
                          Source Repository
                        </Button>
                      </Flex>
                    </div>
                  </CompassPanel>
                </div>

                {/* System Requirements Section */}
                <div id="tech-system-requirements" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>System Requirements<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      {/* Architecture Support with Badges */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Architecture Support<TypeLabel level="H3" />
                      </Content>
                      <Flex gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                        <Label color="blue" icon={<CheckCircleIcon />}>amd64 / x86_64</Label>
                        <Label color="blue" icon={<CheckCircleIcon />}>arm64 / aarch64</Label>
                        <Label color="grey" variant="outline">s390x (coming soon)</Label>
                      </Flex>

                      <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                        {/* Default User ID */}
                        <GridItem span={12} md={6}>
                          <div style={{ 
                            backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                            borderRadius: '8px',
                            padding: 'var(--pf-t--global--spacer--md)',
                            height: '100%'
                          }}>
                            <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold' }}>
                              Default User ID
                            </Content>
                            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }} style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                              <Label color="green" icon={<CheckCircleIcon />}>Non-root</Label>
                              <code style={{ 
                                fontFamily: 'var(--pf-t--global--font--family--mono)',
                                fontSize: 'var(--pf-t--global--font--size--body--default)',
                                fontWeight: 'bold'
                              }}>
                                UID 65532
                              </code>
                            </Flex>
                            <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                              This image runs as a non-root user by default for enhanced security. 
                              The container will not have elevated privileges unless explicitly granted.
                            </Content>
                          </div>
                        </GridItem>

                        {/* Platform Compatibility */}
                        <GridItem span={12} md={6}>
                          <div style={{ 
                            backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                            borderRadius: '8px',
                            padding: 'var(--pf-t--global--spacer--md)',
                            height: '100%'
                          }}>
                            <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold' }}>
                              Platform Compatibility
                            </Content>
                            <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                                <span>RHEL 9+</span>
                              </Flex>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                                <span>OpenShift 4.14+</span>
                              </Flex>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                                <span>Kubernetes 1.28+</span>
                              </Flex>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                                <span>Podman / Docker</span>
                              </Flex>
                            </Flex>
                          </div>
                        </GridItem>
                      </Grid>
                    </div>
                  </CompassPanel>
                </div>

                {/* Runtime Configuration Section */}
                <div id="tech-runtime-config" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Runtime Configuration<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      {/* Entrypoint & Command */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Entrypoint & Command<TypeLabel level="H3" />
                      </Content>
                      <div style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                        <Grid hasGutter>
                          <GridItem span={12} md={6}>
                            <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>ENTRYPOINT</Content>
                            <CodeBlock>
                              <CodeBlockCode style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>["/usr/bin/{selectedImage?.name.toLowerCase()}"]</CodeBlockCode>
                            </CodeBlock>
                          </GridItem>
                          <GridItem span={12} md={6}>
                            <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>CMD (default)</Content>
                            <CodeBlock>
                              <CodeBlockCode style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>["--help"]</CodeBlockCode>
                            </CodeBlock>
                          </GridItem>
                        </Grid>
                      </div>

                      {/* Environment Variables */}
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Default Environment Variables<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                        These environment variables are set by default in the container image:
                      </Content>
                      <Table variant="compact" borders={false}>
                        <Thead>
                          <Tr>
                            <Th>Variable</Th>
                            <Th>Default Value</Th>
                            <Th>Description</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>HOME</code></Td>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>/home/hummingbird</code></Td>
                            <Td style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Home directory for the non-root user</Td>
                          </Tr>
                          <Tr>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>USER</code></Td>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>hummingbird</code></Td>
                            <Td style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Username of the container user</Td>
                          </Tr>
                          <Tr>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>PATH</code></Td>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>/usr/local/bin:/usr/bin</code></Td>
                            <Td style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>System path for executables</Td>
                          </Tr>
                          <Tr>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>LANG</code></Td>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>C.UTF-8</code></Td>
                            <Td style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Default locale setting</Td>
                          </Tr>
                          <Tr>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>TZ</code></Td>
                            <Td><code style={{ fontFamily: 'var(--pf-t--global--font--family--mono)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>UTC</code></Td>
                            <Td style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Timezone (override with -e TZ=...)</Td>
                          </Tr>
                        </Tbody>
                      </Table>

                      {/* Exposed Ports */}
                      <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Exposed Ports<TypeLabel level="H3" />
                      </Content>
                      <Flex gap={{ default: 'gapMd' }}>
                        <Label color="blue" isCompact>8080/tcp (HTTP)</Label>
                        <Label color="grey" variant="outline" isCompact>8443/tcp (HTTPS, optional)</Label>
                      </Flex>
                      <Content component="p" style={{ marginTop: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                        Port 8080 is used instead of 80 because the container runs as a non-root user and cannot bind to privileged ports (&lt;1024).
                      </Content>
                    </div>
                  </CompassPanel>
                </div>

                {/* Licenses Section */}
                <div id="tech-licenses" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Licenses<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>MIT</span>
                        </Flex>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>Apache-2.0</span>
                        </Flex>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>PSF-2.0</span>
                        </Flex>
                      </Flex>
                    </div>
                  </CompassPanel>
                </div>

                {/* Image Verification Section */}
                <div id="tech-image-verification" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Image Verification<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        You can use the following public key to verify Hummingbird images:
                      </Content>
                      
                      <div style={{
                        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                        padding: 'var(--pf-t--global--spacer--md)',
                        borderRadius: 'var(--pf-t--global--border--radius--small)',
                        fontFamily: 'var(--pf-t--global--font--family--mono)',
                        fontSize: 'var(--pf-t--global--font--size--body--sm)',
                        marginBottom: 'var(--pf-t--global--spacer--md)',
                        overflowX: 'auto',
                      }}>
                        <pre style={{ margin: 0 }}>
{`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEtYRltxRJvXLMpXT+pIIu86CLhDP7
Q6VznCXqlzV3A04AK/ge/HYtv6wMPfe4NHP3VQkCWoUokegC926FB+MTyA==
-----END PUBLIC KEY-----`}
                        </pre>
                      </div>

                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        First, copy the key to a file (e.g., <Button variant="link" isInline style={{ padding: 0 }}>key.pub</Button>). Then verify with cosign:
                      </Content>

                      <div style={{
                        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                        padding: 'var(--pf-t--global--spacer--md)',
                        borderRadius: 'var(--pf-t--global--border--radius--small)',
                        fontFamily: 'var(--pf-t--global--font--family--mono)',
                        fontSize: 'var(--pf-t--global--font--size--body--sm)',
                        marginBottom: 'var(--pf-t--global--spacer--md)',
                      }}>
                        <span style={{ color: 'var(--pf-t--global--color--nonstatus--red--default)' }}>cosign</span> verify --key key.pub --insecure-ignore-tlog registry.access.redhat.com/hummingbird/{selectedImage?.name.toLowerCase()}:latest
                      </div>

                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Note: The key verifies images built in Hummingbird&apos;s Tekton pipeline. Official releases will be signed with Red Hat&apos;s publishing key.
                      </Content>
                    </div>
                  </CompassPanel>
                </div>

                {/* Vulnerability Scanning Section */}
                <div id="tech-vulnerability-scanning" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Vulnerability Scanning<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Hummingbird uses <Button variant="link" isInline style={{ padding: 0 }}>Syft</Button> for SBOM generation and <Button variant="link" isInline style={{ padding: 0 }}>Grype</Button> for vulnerability detection. Run the scan locally:
                      </Content>

                      <div style={{
                        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                        padding: 'var(--pf-t--global--spacer--md)',
                        borderRadius: 'var(--pf-t--global--border--radius--small)',
                        fontFamily: 'var(--pf-t--global--font--family--mono)',
                        fontSize: 'var(--pf-t--global--font--size--body--sm)',
                        marginBottom: 'var(--pf-t--global--spacer--md)',
                        overflowX: 'auto',
                      }}>
                        <span style={{ color: 'var(--pf-t--global--color--nonstatus--red--default)' }}>podman</span> run --volume vuln-db:/tmp/.cache registry.access.redhat.com/hummingbird-ci/grype-hummingbird.sh registry.access.redhat.com/hummingbird/{selectedImage?.name.toLowerCase()}:latest
                      </div>

                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        For detailed scanning documentation, see the <Button variant="link" isInline icon={<ExternalLinkAltIcon />} iconPosition="end" style={{ padding: 0 }}>vulnerability scanning guide</Button>.
                      </Content>

                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Current Scan Results<TypeLabel level="H3" />
                      </Content>
                      <Flex gap={{ default: 'gapMd' }}>
                        <Label color="green" icon={<CheckCircleIcon />}>0 Critical</Label>
                        <Label color="green" icon={<CheckCircleIcon />}>0 High</Label>
                        <Label color="green" icon={<CheckCircleIcon />}>0 Medium</Label>
                        <Label color="blue">2 Low</Label>
                      </Flex>
                    </div>
                  </CompassPanel>
                </div>

                {/* Inventory Section */}
                <div id="tech-inventory" style={{ marginBottom: 'var(--pf-t--global--spacer--xl)', scrollMarginTop: '24px' }}>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Inventory<TypeLabel level="H2" /></Content>
                  <CompassPanel>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                      <Flex 
                        justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                        alignItems={{ default: 'alignItemsCenter' }}
                        style={{ padding: 'var(--pf-t--global--spacer--md) 0', borderBottom: '1px solid var(--pf-t--global--border--color--default)' }}
                      >
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>12 Layers</Content>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>12</span>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                        </Flex>
                      </Flex>

                      <Flex 
                        justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                        alignItems={{ default: 'alignItemsCenter' }}
                        style={{ padding: 'var(--pf-t--global--spacer--md) 0', borderBottom: '1px solid var(--pf-t--global--border--color--default)' }}
                      >
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>42 Packages</Content>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>42</span>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                        </Flex>
                      </Flex>

                      <Flex 
                        justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                        alignItems={{ default: 'alignItemsCenter' }}
                        style={{ padding: 'var(--pf-t--global--spacer--md) 0', borderBottom: '1px solid var(--pf-t--global--border--color--default)' }}
                      >
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>156 Dependencies</Content>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>156</span>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                        </Flex>
                      </Flex>

                      <Flex 
                        justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                        alignItems={{ default: 'alignItemsCenter' }}
                        style={{ padding: 'var(--pf-t--global--spacer--md) 0', borderBottom: '1px solid var(--pf-t--global--border--color--default)' }}
                      >
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>2,847 Files</Content>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>2,847</span>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                        </Flex>
                      </Flex>

                      <Flex 
                        justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                        alignItems={{ default: 'alignItemsCenter' }}
                        style={{ padding: 'var(--pf-t--global--spacer--md) 0', borderBottom: '1px solid var(--pf-t--global--border--color--default)' }}
                      >
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>24 MB Compressed</Content>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>24</span>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                        </Flex>
                      </Flex>

                      <Flex 
                        justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                        alignItems={{ default: 'alignItemsCenter' }}
                        style={{ padding: 'var(--pf-t--global--spacer--md) 0' }}
                      >
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>3 Architectures</Content>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>3</span>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                        </Flex>
                      </Flex>
                    </div>
                  </CompassPanel>
                </div>
              </div>
            </FlexItem>

            {/* Right Side - Jump Links */}
            <FlexItem style={{ width: '200px', minWidth: '200px', paddingLeft: 'var(--pf-t--global--spacer--md)' }}>
              <JumpLinks
                isVertical
                scrollableRef={scrollableRef}
                offset={160}
                aria-label="Technical information navigation"
                style={{ '--pf-v6-c-jump-links__list--before--BorderLeftWidth': '0' } as React.CSSProperties}
              >
                <JumpLinksItem href="#tech-build-info">Build Information</JumpLinksItem>
                <JumpLinksItem href="#tech-system-requirements">System Requirements</JumpLinksItem>
                <JumpLinksItem href="#tech-runtime-config">Runtime Configuration</JumpLinksItem>
                <JumpLinksItem href="#tech-licenses">Licenses</JumpLinksItem>
                <JumpLinksItem href="#tech-image-verification">Image Verification</JumpLinksItem>
                <JumpLinksItem href="#tech-vulnerability-scanning">Vulnerability Scanning</JumpLinksItem>
                <JumpLinksItem href="#tech-inventory">Inventory</JumpLinksItem>
              </JumpLinks>
            </FlexItem>
          </Flex>
        )}

        {/* Security Feed Tab */}
        {modalTab === 'security' && (
          <>
            {/* Prominent filter banner */}
            <div style={{
              backgroundColor: 'var(--pf-t--global--color--brand--default)',
              color: 'white',
              padding: 'var(--pf-t--global--spacer--md) var(--pf-t--global--spacer--lg)',
              borderRadius: 'var(--pf-t--global--border--radius--medium)',
              marginBottom: 'var(--pf-t--global--spacer--lg)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--pf-t--global--spacer--md)',
            }}>
              <FilterIcon />
              <span style={{ fontWeight: 'bold' }}>
                Showing CVEs affecting packages in: {selectedImage.name}
              </span>
              <Label style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                {imageCveData.filter(cve => cve.affectedImages.includes(selectedImage.name)).length} CVEs
              </Label>
              <Button 
                variant="link" 
                onClick={handleShowAllImages}
                style={{ marginLeft: 'auto', color: 'white', textDecoration: 'underline' }}
                icon={<ArrowRightIcon />}
                iconPosition="end"
              >
                CVEs for all images
              </Button>
            </div>

            <CompassPanel>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <FlexItem>
                    <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>Security Vulnerabilities<TypeLabel level="H3" /></Content>
                  </FlexItem>
                  <FlexItem>
                    <SearchInput placeholder="Search CVE or Package ID" style={{ width: '220px' }} />
                    </FlexItem>
                  </Flex>

                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  This is an ongoing list of CVEs Project Hummingbird is tracking
                </Content>
                <Table variant="compact" borders={false}>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Severity</Th>
                      <Th>Affected package</Th>
                      <Th>Status</Th>
                      <Th>Published</Th>
                      <Th>Last Update</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {imageCveData
                      .filter(cve => cve.affectedImages.includes(selectedImage.name))
                      .map((row, index) => (
                        <Tr key={index}>
                          <Td dataLabel="Name">
                            <Button variant="link" isInline>
                              {row.cveId}
                            </Button>
                          </Td>
                          <Td dataLabel="Severity">
                            <CveSeverityLabel severity={row.severity} />
                          </Td>
                          <Td dataLabel="Affected package">
                            {row.affectedPackage}
                          </Td>
                          <Td dataLabel="Status">
                            <CveStatusLabel status={row.status} />
                          </Td>
                          <Td dataLabel="Published">
                            {getRelativeTime(row.published)}
                          </Td>
                          <Td dataLabel="Last Update">
                            {getRelativeTime(row.lastUpdated)}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>

                {imageCveData.filter(cve => cve.affectedImages.includes(selectedImage.name)).length === 0 && (
                  <div style={{ textAlign: 'center', padding: 'var(--pf-t--global--spacer--2xl)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                    <CheckCircleIcon style={{ fontSize: '3rem', color: 'var(--pf-t--global--icon--color--status--success--default)', marginBottom: 'var(--pf-t--global--spacer--md)' }} />
                    <Content component="p">No CVEs found affecting this image</Content>
                </div>
                )}
              </div>
            </CompassPanel>
          </>
        )}

        {modalTab === 'packages' && (() => {
          const filteredSbomPackages = sbomPackages.filter(pkg => 
            pkg.name.toLowerCase().includes(sbomSearchValue.toLowerCase()) ||
            pkg.version.toLowerCase().includes(sbomSearchValue.toLowerCase()) ||
            pkg.license.toLowerCase().includes(sbomSearchValue.toLowerCase()) ||
            pkg.supplier.toLowerCase().includes(sbomSearchValue.toLowerCase()) ||
            pkg.type.toLowerCase().includes(sbomSearchValue.toLowerCase())
          );
          const paginatedPackages = filteredSbomPackages.slice(
            (sbomPage - 1) * sbomPerPage,
            sbomPage * sbomPerPage
          );
          return (
          <>
          <CompassPanel>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsFlexStart' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                <div>
                  <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>Software Bill of Materials (SBOM)<TypeLabel level="H2" /></Content>
                  <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }}>
                    <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Generated: <strong>January 28, 2026 at 14:32 UTC</strong>
                    </Content>
                    <span style={{ color: 'var(--pf-t--global--border--color--default)' }}>|</span>
                    <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Format: <strong>SPDX 2.3</strong>
                    </Content>
                    <span style={{ color: 'var(--pf-t--global--border--color--default)' }}>|</span>
                    <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Tool: <strong>Syft v1.0.1</strong>
                    </Content>
                  </Flex>
                </div>
                <Flex gap={{ default: 'gapSm' }}>
                  <Button variant="secondary" icon={<DownloadIcon />} component="a" href={`https://registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}/sbom/spdx.json`} target="_blank">
                    SPDX JSON
                  </Button>
                  <Button variant="secondary" icon={<DownloadIcon />} component="a" href={`https://registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}/sbom/spdx.rdf`} target="_blank">
                    SPDX RDF
                  </Button>
                  <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="end" component="a" href="https://spdx.dev/learn/overview/" target="_blank">
                    About SPDX
                  </Button>
                </Flex>
              </Flex>

              {/* Toolbar with search, download action, and pagination */}
              <Toolbar>
                <ToolbarContent>
                  <ToolbarItem>
                      <SearchInput
                      placeholder="Search packages"
                        value={sbomSearchValue}
                        onChange={(_event, value) => {
                          setSbomSearchValue(value);
                          setSbomPage(1); // Reset to first page on search
                        }}
                        onClear={() => {
                          setSbomSearchValue('');
                          setSbomPage(1);
                        }}
                      style={{ width: '250px' }}
                    />
                  </ToolbarItem>
                  <ToolbarItem variant="pagination" align={{ default: 'alignEnd' }}>
                      <Pagination
                      itemCount={filteredSbomPackages.length}
                        perPage={sbomPerPage}
                        page={sbomPage}
                        onSetPage={(_event, newPage) => setSbomPage(newPage)}
                      onPerPageSelect={(_event, newPerPage) => {
                          setSbomPerPage(newPerPage);
                        setSbomPage(1);
                        }}
                        isCompact
                    />
                  </ToolbarItem>
                </ToolbarContent>
              </Toolbar>

                    <Table variant="compact" borders={false}>
                      <Thead>
                        <Tr>
                    <Th>Package Name</Th>
                          <Th>Version</Th>
                    <Th>Type</Th>
                    <Th>License</Th>
                    <Th>Supplier</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                  {paginatedPackages.map((pkg, index) => (
                    <Tr key={index}>
                      <Td dataLabel="Package Name">
                        <Button variant="link" isInline>{pkg.name}</Button>
                      </Td>
                      <Td dataLabel="Version">
                        <code style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>{pkg.version}</code>
                      </Td>
                      <Td dataLabel="Type">
                        <PackageTypeLabel type={pkg.type} />
                      </Td>
                      <Td dataLabel="License">{pkg.license}</Td>
                      <Td dataLabel="Supplier">{pkg.supplier}</Td>
                            </Tr>
                          ))}
                      </Tbody>
                    </Table>

              {filteredSbomPackages.length === 0 && (
                <div style={{ textAlign: 'center', padding: 'var(--pf-t--global--spacer--2xl)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  <Content component="p">No packages found matching "{sbomSearchValue}"</Content>
                  </div>
              )}

              {/* Bottom pagination */}
              {filteredSbomPackages.length > 0 && (
                <Toolbar>
                  <ToolbarContent>
                    <ToolbarItem variant="pagination" align={{ default: 'alignEnd' }}>
                      <Pagination
                        itemCount={filteredSbomPackages.length}
                        perPage={sbomPerPage}
                        page={sbomPage}
                        onSetPage={(_event, newPage) => setSbomPage(newPage)}
                        onPerPageSelect={(_event, newPerPage) => {
                          setSbomPerPage(newPerPage);
                          setSbomPage(1);
                        }}
                        variant="bottom"
                      />
                    </ToolbarItem>
                  </ToolbarContent>
                </Toolbar>
              )}
                  </div>
          </CompassPanel>

          {/* Attestations Section */}
          <div style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
            <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
              Attestations<TypeLabel level="H2" />
            </Content>
            <CompassPanel>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  Build attestations provide cryptographic proof of how this image was built, including the build environment, 
                  source code provenance, and build process integrity.
                </Content>
                
                <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                  <GridItem span={12} md={6}>
                    <div style={{ 
                      padding: 'var(--pf-t--global--spacer--md)', 
                      backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                      borderRadius: '8px'
                    }}>
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        SLSA Provenance<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                        Supply-chain Levels for Software Artifacts (SLSA Level 3)
                      </Content>
                      <Flex gap={{ default: 'gapSm' }} style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <Label color="green" icon={<CheckCircleIcon />} isCompact>Verified</Label>
                        <Label color="blue" isCompact>Level 3</Label>
                      </Flex>
                      <Content component="p" style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        <strong>Builder:</strong> Red Hat Trusted Application Pipeline<br />
                        <strong>Build Type:</strong> Tekton Chains<br />
                        <strong>Build Date:</strong> January 28, 2026 at 14:30 UTC
                      </Content>
                    </div>
                  </GridItem>
                  <GridItem span={12} md={6}>
                    <div style={{ 
                      padding: 'var(--pf-t--global--spacer--md)', 
                      backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                      borderRadius: '8px'
                    }}>
                      <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                        Source Provenance<TypeLabel level="H3" />
                      </Content>
                      <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                        Verified source code origin and commit integrity
                      </Content>
                      <Flex gap={{ default: 'gapSm' }} style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <Label color="green" icon={<CheckCircleIcon />} isCompact>Signed Commit</Label>
                      </Flex>
                      <Content component="p" style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        <strong>Repository:</strong> github.com/redhat/hummingbird-{selectedImage?.name.toLowerCase()}<br />
                        <strong>Commit:</strong> <code style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>a1b2c3d4e5f6</code><br />
                        <strong>Branch:</strong> main
                      </Content>
                    </div>
                  </GridItem>
                </Grid>

                <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                  View Attestation<TypeLabel level="H3" />
                </Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  Download or inspect the full attestation bundle for this image.
                </Content>
                <Flex gap={{ default: 'gapSm' }}>
                  <Button variant="secondary" icon={<DownloadIcon />} component="a" href={`https://registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}/attestation.json`} target="_blank">
                    Download Attestation (JSON)
                  </Button>
                  <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="end" component="a" href="https://slsa.dev/spec/v1.0/provenance" target="_blank">
                    About SLSA Provenance
                  </Button>
                </Flex>
              </div>
            </CompassPanel>
          </div>

          {/* Signature Verification Section */}
          <div style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
            <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
              Signature Verification<TypeLabel level="H2" />
            </Content>
            <CompassPanel>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  All Hummingbird images are signed using Sigstore/Cosign. Verify the image signature before deploying to ensure 
                  the image has not been tampered with and originates from Red Hat.
                </Content>

                <div style={{ 
                  padding: 'var(--pf-t--global--spacer--md)', 
                  backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                  borderRadius: '8px',
                  marginBottom: 'var(--pf-t--global--spacer--lg)'
                }}>
                  <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                    <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                      Signature Status<TypeLabel level="H3" />
                    </Content>
                    <Label color="green" icon={<CheckCircleIcon />}>Valid Signature</Label>
                  </Flex>
                  <Content component="p" style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                    <strong>Signing Key:</strong> Red Hat Release Key (cosign)<br />
                    <strong>Signature Algorithm:</strong> ECDSA-P256<br />
                    <strong>Transparency Log:</strong> Rekor (rekor.sigstore.dev)
                  </Content>
                </div>

                <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                  Verify with Cosign<TypeLabel level="H3" />
                </Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  Use the following command to verify the image signature locally:
                </Content>
                <CodeBlock>
                  <CodeBlockAction>
                    <Button
                      variant="plain"
                      aria-label="Copy verification command"
                      onClick={() => {
                        navigator.clipboard.writeText(`cosign verify \\
  --key https://access.redhat.com/security/team/key/cosign.pub \\
  registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest`);
                      }}
                    >
                      <CopyIcon />
                    </Button>
                  </CodeBlockAction>
                  <CodeBlockCode style={{ 
                    fontFamily: 'var(--pf-t--global--font--family--mono)',
                    fontSize: 'var(--pf-t--global--font--size--body--default)',
                    padding: '8px',
                    paddingRight: '48px'
                  }}>
{`cosign verify \\
  --key https://access.redhat.com/security/team/key/cosign.pub \\
  registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest`}
                  </CodeBlockCode>
                </CodeBlock>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                  Verify Attestation with Cosign<TypeLabel level="H3" />
                </Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  Verify the SLSA provenance attestation:
                </Content>
                <CodeBlock>
                  <CodeBlockAction>
                    <Button
                      variant="plain"
                      aria-label="Copy attestation verification command"
                      onClick={() => {
                        navigator.clipboard.writeText(`cosign verify-attestation \\
  --type slsaprovenance \\
  --key https://access.redhat.com/security/team/key/cosign.pub \\
  registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest`);
                      }}
                    >
                      <CopyIcon />
                    </Button>
                  </CodeBlockAction>
                  <CodeBlockCode style={{ 
                    fontFamily: 'var(--pf-t--global--font--family--mono)',
                    fontSize: 'var(--pf-t--global--font--size--body--default)',
                    padding: '8px',
                    paddingRight: '48px'
                  }}>
{`cosign verify-attestation \\
  --type slsaprovenance \\
  --key https://access.redhat.com/security/team/key/cosign.pub \\
  registry.access.redhat.com/hummingbird/${selectedImage?.name.toLowerCase()}:latest`}
                  </CodeBlockCode>
                </CodeBlock>

                <Flex gap={{ default: 'gapSm' }} style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
                  <Button variant="secondary" icon={<DownloadIcon />} component="a" href="https://access.redhat.com/security/team/key/cosign.pub" target="_blank">
                    Download Public Key
                  </Button>
                  <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="end" component="a" href="https://docs.sigstore.dev/cosign/verify/" target="_blank">
                    Cosign Documentation
                  </Button>
                  <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="end" component="a" href="https://access.redhat.com/articles/container-image-signing" target="_blank">
                    Red Hat Signing Policy
                  </Button>
                </Flex>
              </div>
            </CompassPanel>
          </div>
          </>
          );
        })()}

        {modalTab === 'containerfile' && (
          <CompassPanel>
            <div style={{ padding: 'var(--pf-t--global--spacer--xl)' }}>
              <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                <Content component="h2" style={{ margin: 0 }}>Containerfile<TypeLabel level="H2" /></Content>
                <Button 
                  variant="secondary" 
                  icon={<CopyIcon />}
                  onClick={() => {
                    const containerfile = `# Hummingbird ${selectedImage?.name || 'Image'} Container
# Minimal, hardened container image with reduced attack surface
# Built with distroless principles for enhanced security

FROM registry.access.redhat.com/ubi9/ubi-micro:latest AS base

# Build stage for compilation (if needed)
FROM registry.access.redhat.com/ubi9/ubi-minimal:latest AS builder

# Install build dependencies
RUN microdnf install -y \\
    gcc \\
    make \\
    && microdnf clean all

# Final minimal image
FROM base

# Labels for container metadata
LABEL name="hummingbird/${selectedImage?.name.toLowerCase() || 'image'}" \\
      version="latest" \\
      summary="Hummingbird ${selectedImage?.name || 'Image'} - Minimal hardened container" \\
      description="A minimal, hardened container image built with security-first principles" \\
      maintainer="Red Hat Hummingbird Team" \\
      io.k8s.display-name="Hummingbird ${selectedImage?.name || 'Image'}" \\
      io.openshift.tags="hummingbird,minimal,hardened,fips"

# Set environment variables
ENV HOME=/app \\
    USER_NAME=hummingbird \\
    USER_UID=1001

# Create non-root user for security
RUN echo "hummingbird:x:\${USER_UID}:0:Hummingbird User:\${HOME}:/sbin/nologin" >> /etc/passwd

# Copy application binaries from builder
COPY --from=builder --chown=\${USER_UID}:0 /app /app

# Set working directory
WORKDIR \${HOME}

# Switch to non-root user
USER \${USER_UID}

# Expose application port (non-privileged)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8080/health || exit 1

# Default command
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["--help"]`;
                    navigator.clipboard.writeText(containerfile);
                  }}
                >
                  Copy Containerfile
                </Button>
              </Flex>
              <div style={{
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                padding: 'var(--pf-t--global--spacer--lg)',
                borderRadius: 'var(--pf-t--global--border--radius--medium)',
                fontFamily: 'var(--pf-t--global--font--family--mono)',
                fontSize: 'var(--pf-t--global--font--size--body--sm)',
                overflowX: 'auto',
                lineHeight: '1.6',
              }}>
                <pre style={{ margin: 0 }}>
{`# Hummingbird ${selectedImage?.name || 'Image'} Container
# Minimal, hardened container image with reduced attack surface
# Built with distroless principles for enhanced security

`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>FROM</span>{` registry.access.redhat.com/ubi9/ubi-micro:latest `}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>AS</span>{` base

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Build stage for compilation (if needed)</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>FROM</span>{` registry.access.redhat.com/ubi9/ubi-minimal:latest `}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>AS</span>{` builder

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Install build dependencies</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>RUN</span>{` microdnf install -y \\
    gcc \\
    make \\
    && microdnf clean all

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Final minimal image</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>FROM</span>{` base

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Labels for container metadata</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>LABEL</span>{` name=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"hummingbird/{selectedImage?.name.toLowerCase() || 'image'}"</span>{` \\
      version=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"latest"</span>{` \\
      summary=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"Hummingbird {selectedImage?.name || 'Image'} - Minimal hardened container"</span>{` \\
      description=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"A minimal, hardened container image built with security-first principles"</span>{` \\
      maintainer=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"Red Hat Hummingbird Team"</span>{` \\
      io.k8s.display-name=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"Hummingbird {selectedImage?.name || 'Image'}"</span>{` \\
      io.openshift.tags=`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"hummingbird,minimal,hardened,fips"</span>{`

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Set environment variables</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>ENV</span>{` HOME=/app \\
    USER_NAME=hummingbird \\
    USER_UID=1001

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Create non-root user for security</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>RUN</span>{` echo "hummingbird:x:\${USER_UID}:0:Hummingbird User:\${HOME}:/sbin/nologin" >> /etc/passwd

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Copy application binaries from builder</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>COPY</span>{` --from=builder --chown=\${USER_UID}:0 /app /app

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Set working directory</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>WORKDIR</span>{` \${HOME}

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Switch to non-root user</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>USER</span>{` \${USER_UID}

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Expose application port (non-privileged)</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>EXPOSE</span>{` 8080

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Health check</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>HEALTHCHECK</span>{` --interval=30s --timeout=3s --start-period=5s --retries=3 \\
    CMD curl -f http://localhost:8080/health || exit 1

`}<span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}># Default command</span>{`
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>ENTRYPOINT</span>{` [`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"/app/entrypoint.sh"</span>{`]
`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--purple--default)' }}>CMD</span>{` [`}<span style={{ color: 'var(--pf-t--global--color--nonstatus--green--default)' }}>"--help"</span>{`]`}
                </pre>
              </div>
            </div>
          </CompassPanel>
        )}
                </div>
  );

  return (
    <>
      {/* Toast notifications for copy actions */}
      <AlertGroup isToast isLiveRegion>
        {toasts.map(({ key, message, description }) => (
          <Alert
            key={key}
            variant="success"
            title={message}
            actionClose={<AlertActionCloseButton onClose={() => removeToast(key)} />}
          >
            {description && <p style={{ margin: 0 }}>{description}</p>}
          </Alert>
        ))}
      </AlertGroup>

      <CompassContent>
      {/* Hero Banner - asymmetric corners per Compass design */}
      <div 
        ref={heroRef}
        className="pf-v6-c-hero"
        style={{
          marginBottom: 'var(--pf-t--global--spacer--xl)', /* 32px */
          backgroundColor: 'rgba(199, 199, 199, 0.25)',
          borderStartStartRadius: '24px',
          borderStartEndRadius: '72px',
          borderEndEndRadius: '24px',
          borderEndStartRadius: '72px',
          padding: 'var(--pf-t--global--spacer--xl)',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <Content component="h1" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--heading--h1)' }}>
            Project Hummingbird Container Images<TypeLabel level="H1-DISPLAY-BOLD" />
          </Content>
          <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
            Red Hat is excited to introduce <strong>Hummingbird container images</strong>.
            These container images are near-zero CVE, lightweight images ready 
            to plug and play with your existing stack.
          </Content>
                      <Flex gap={{ default: 'gapMd' }}>
                        <FlexItem>
              <Button 
                variant="primary" 
                isDisabled={previewMode}
                {...(!previewMode && { component: 'a', href: 'https://issues.redhat.com/secure/CreateIssue.jspa?issuetype=17&pid=12332745', target: '_blank' })}
              >
                Request an image
                          </Button>
                        </FlexItem>
                        <FlexItem>
              <Button 
                variant="link" 
                icon={<ArrowRightIcon />} 
                iconPosition="end"
                isDisabled={previewMode}
                onClick={previewMode ? undefined : () => navigate('/about')}
              >
                Learn more
                          </Button>
                        </FlexItem>
                      </Flex>
                </div>
                </div>

      {/* Popular Images Section */}
      <div style={{ 
        marginBottom: 'var(--pf-t--global--spacer--xl)',
        backgroundColor: 'rgba(231, 241, 250, 0.75)',
        border: '1px solid #0066CC',
        borderRadius: '16px',
        padding: 'var(--pf-t--global--spacer--lg)'
      }}>
        <Flex 
          justifyContent={{ default: 'justifyContentSpaceBetween' }} 
          alignItems={{ default: 'alignItemsCenter' }}
          style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}
        >
          <FlexItem>
            <Content component="h2" style={{ margin: 0, fontWeight: 600, fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>Popular Images<TypeLabel level="H2" /></Content>
          </FlexItem>
          <FlexItem>
            <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', maxWidth: '280px', textAlign: 'right', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
              These distributions are verified by the Red Hat trusted software supply chain.
            </Content>
          </FlexItem>
        </Flex>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {/* Featured popular images - card style changes with sidebar selection */}
          {allImages.filter(img => img.availableVariants?.includes('fips')).slice(0, 3).map((image, index) => {
            const pullCmd = `${commandType} pull registry.access.redhat.com/hummingbird/${image.name.toLowerCase()}-fips:latest`;
            return renderStyledCard(image, 'ExampleCard', pullCmd, `popular-${index}`);
          })}
        </div>
      </div>

      {/* Filter Bar Container */}
      <div style={{ 
        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
        borderRadius: '16px',
        padding: 'var(--pf-t--global--spacer--md)',
        marginBottom: 'var(--pf-t--global--spacer--md)'
      }}>
        <Flex 
          justifyContent={{ default: 'justifyContentSpaceBetween' }} 
          alignItems={{ default: 'alignItemsFlexEnd' }}
          flexWrap={{ default: 'wrap' }}
          gap={{ default: 'gapMd' }}
        >
          {/* Left side filters: Search, Order by, Restrict tags */}
          <FlexItem>
            <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsFlexEnd' }} flexWrap={{ default: 'wrap' }}>
              {/* Search */}
              <FlexItem>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ height: '18px' }} /> {/* Spacer to align with labeled dropdowns */}
                  <SearchInput
                    placeholder="Search images..."
                    value={searchValue}
                    onChange={(_event, value) => setSearchValue(value)}
                    onClear={() => setSearchValue('')}
                    style={{ width: '200px' }}
                  />
                </div>
              </FlexItem>
              
              {/* Order by */}
              <FlexItem>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                    Order by
                  </label>
                  <Select
                    id="order-by-select"
                    isOpen={isOrderByOpen}
                    selected={orderBy}
                    onSelect={(_event, value) => {
                      setOrderBy(value as 'type' | 'alphabetical');
                      setIsOrderByOpen(false);
                    }}
                    onOpenChange={setIsOrderByOpen}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={() => setIsOrderByOpen(!isOrderByOpen)}
                        isExpanded={isOrderByOpen}
                        style={{ minWidth: '120px' }}
                      >
                        {orderBy === 'type' ? 'Type' : 'Alphabetical'}
                      </MenuToggle>
                    )}
                  >
                    <SelectList>
                      <SelectOption value="type" isSelected={orderBy === 'type'}>Type</SelectOption>
                      <SelectOption value="alphabetical" isSelected={orderBy === 'alphabetical'}>Alphabetical</SelectOption>
                    </SelectList>
                  </Select>
                </div>
              </FlexItem>
              
              {/* Restrict tags */}
              <FlexItem>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                    Restrict tags
                  </label>
                  <Select
                    id="restrict-tags-select"
                    isOpen={isRestrictTagsOpen}
                    selected={restrictTags}
                    onSelect={(_event, value) => {
                      setRestrictTags(value as 'all' | 'fips' | 'exclude-fips' | 'favorites');
                      setIsRestrictTagsOpen(false);
                    }}
                    onOpenChange={setIsRestrictTagsOpen}
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={() => setIsRestrictTagsOpen(!isRestrictTagsOpen)}
                        isExpanded={isRestrictTagsOpen}
                        style={{ minWidth: '140px' }}
                      >
                        {restrictTags === 'all' ? 'All' : 
                         restrictTags === 'fips' ? 'FIPS only' : 
                         restrictTags === 'exclude-fips' ? 'Exclude FIPS' : 
                         'Favorites only'}
                      </MenuToggle>
                    )}
                  >
                    <SelectList>
                      <SelectOption value="all" isSelected={restrictTags === 'all'}>All</SelectOption>
                      <SelectOption value="fips" isSelected={restrictTags === 'fips'}>FIPS only</SelectOption>
                      <SelectOption value="exclude-fips" isSelected={restrictTags === 'exclude-fips'}>Exclude FIPS</SelectOption>
                      <SelectOption value="favorites" isSelected={restrictTags === 'favorites'}>Favorites only</SelectOption>
                    </SelectList>
                  </Select>
                </div>
              </FlexItem>
              
              {/* Favorites first quick action */}
              <FlexItem>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ height: '18px' }} /> {/* Spacer to align with labeled dropdowns */}
                  <Button
                    variant={showFavoritesFirst ? 'primary' : 'secondary'}
                    onClick={() => setShowFavoritesFirst(!showFavoritesFirst)}
                    icon={<StarIcon />}
                  >
                    Favorites first
                  </Button>
                </div>
              </FlexItem>
            </Flex>
          </FlexItem>
          
          {/* Right side: Podman/Docker toggle and Add to tags (Builder and Go Tools) */}
          <FlexItem>
            <Flex gap={{ default: 'gapLg' }} alignItems={{ default: 'alignItemsFlexEnd' }}>
              {/* Podman/Docker Toggle */}
              <FlexItem>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ height: '18px' }} /> {/* Spacer to align with labeled sections */}
                  <ToggleGroup aria-label="Container runtime">
                    <ToggleGroupItem
                      text="Podman"
                      buttonId="toggle-podman"
                      isSelected={commandType === 'podman'}
                      onChange={() => setCommandType('podman')}
                    />
                    <ToggleGroupItem
                      text="Docker"
                      buttonId="toggle-docker"
                      isSelected={commandType === 'docker'}
                      onChange={() => setCommandType('docker')}
                    />
                  </ToggleGroup>
                </div>
              </FlexItem>
              
              {/* Add to tags */}
              <FlexItem>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Flex gap={{ default: 'gapXs' }} alignItems={{ default: 'alignItemsCenter' }}>
                    <label style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                      Add to tags
                    </label>
                    <Tooltip content="Builder images include package managers and build tools for development environments. Use base images for production.">
                      <QuestionCircleIcon style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)' }} />
                    </Tooltip>
                  </Flex>
                  <Flex gap={{ default: 'gapSm' }}>
                    <Tooltip content="For development environments only">
                      <Button 
                        variant={addBuilderTag ? 'primary' : 'secondary'}
                        onClick={() => setAddBuilderTag(!addBuilderTag)}
                        icon={<PlusIcon />}
                        style={{ 
                          borderRadius: '20px',
                          paddingLeft: '12px',
                          paddingRight: '16px',
                        }}
                      >
                        Builder (Dev)
                      </Button>
                    </Tooltip>
                    <Button 
                      variant={addGoToolsTag ? 'primary' : 'secondary'}
                      onClick={() => setAddGoToolsTag(!addGoToolsTag)}
                      icon={<PlusIcon />}
                      style={{ 
                        borderRadius: '20px',
                        paddingLeft: '12px',
                        paddingRight: '16px',
                      }}
                    >
                      Go Tools
                    </Button>
                  </Flex>
                </div>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </div>

      {/* Progress indicator */}
      <div style={{ 
        height: '4px', 
        backgroundColor: 'var(--pf-t--global--border--color--default)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: 'var(--pf-t--global--spacer--md)', /* small gap after header */
      }}>
        <div style={{ 
          width: '30%', 
          height: '100%', 
          backgroundColor: 'var(--pf-t--global--color--brand--default)'
        }} />
      </div>

      {/* Card Sections - conditionally render based on orderBy and showFavoritesFirst */}
      {showFavoritesFirst ? (
        /* Favorites First View - favorites section at top, then non-favorites below */
        <>
          {/* Favorites Section */}
          {getFilteredImages(allImages).filter(img => img.isFavorite).length > 0 && (
            <>
              <Content component="h3" style={{ marginTop: '24px', marginBottom: '24px', fontWeight: 500, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                Favorites<TypeLabel level="H3" />
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getFilteredImages(allImages)
                  .filter(img => img.isFavorite)
                  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                  .map((image, index) => 
                    renderStyledCard(
                      image,
                      getCardDisplayName(image.name),
                      getCardPullCommand(image.name, commandType),
                      `fav-${index}`
                    )
                  )}
              </div>
            </>
          )}

          {/* Non-Favorites Section */}
          {getFilteredImages(allImages).filter(img => !img.isFavorite).length > 0 && (
            <>
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                All Images<TypeLabel level="H3" />
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getFilteredImages(allImages)
                  .filter(img => !img.isFavorite)
                  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                  .map((image, index) => 
                    renderStyledCard(
                      image,
                      getCardDisplayName(image.name),
                      getCardPullCommand(image.name, commandType),
                      `nonfav-${index}`
                    )
                  )}
              </div>
            </>
          )}
        </>
      ) : orderBy === 'type' ? (
        <>
          {/* Hardened Images Section - FIPS available images (always show with FIPS styling, hide when Exclude FIPS is selected) */}
          {restrictTags !== 'exclude-fips' && getHardenedImages().length > 0 && (
            <>
              <Content component="h3" style={{ marginTop: '24px', marginBottom: '24px', fontWeight: 500, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                Hardened Images<TypeLabel level="H3" />
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getHardenedImages().map((image, index) => {
                  // Always apply FIPS styling for hardened images
                  let fipsSuffix = '-fips';
                  if (addBuilderTag) fipsSuffix += '-builder';
                  if (addGoToolsTag) fipsSuffix += '-go-tools';
                  const fipsPullCommand = `${commandType} pull registry.access.redhat.com/hummingbird/${image.name.toLowerCase()}${fipsSuffix}:latest`;
                  
                  return renderStyledCard(
                    image,
                    `${image.name}- FIPS`,
                    fipsPullCommand,
                    `hardened-${index}`
                  );
                })}
              </div>
            </>
          )}

          {/* Languages/Runtimes Section */}
          {getFilteredImages(languageRuntimes).length > 0 && (
            <>
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                Languages/Runtimes<TypeLabel level="H3" />
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getFilteredImages(languageRuntimes).map((image, index) => 
                  renderStyledCard(
                    image,
                    getCardDisplayName(image.name),
                    getCardPullCommand(image.name, commandType),
                    `lang-${index}`
                  )
                )}
              </div>
            </>
          )}

          {/* Databases Section */}
          {getFilteredImages(databases).length > 0 && (
            <>
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                Databases<TypeLabel level="H3" />
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getFilteredImages(databases).map((image, index) => 
                  renderStyledCard(
                    image,
                    getCardDisplayName(image.name),
                    getCardPullCommand(image.name, commandType),
                    `db-${index}`
                  )
                )}
              </div>
            </>
          )}

          {/* Dev Tools Section */}
          {getFilteredImages(devTools).length > 0 && (
            <>
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                Dev Tools<TypeLabel level="H3" />
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getFilteredImages(devTools).map((image, index) => 
                  renderStyledCard(
                    image,
                    getCardDisplayName(image.name),
                    getCardPullCommand(image.name, commandType),
                    `devtools-${index}`
                  )
                )}
              </div>
            </>
          )}
        </>
      ) : (
        /* Alphabetical View - all cards in one grid, sorted alphabetically */
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {getAllFilteredImagesSorted().map((image, index) => 
            renderStyledCard(
              image,
              getCardDisplayName(image.name),
              getCardPullCommand(image.name, commandType),
              `alpha-${index}`
            )
          )}
        </div>
      )}
    </CompassContent>

      {/* Bottom slide-up overlay */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={handleCloseDrawer}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 500,
            }}
          />
          {/* Bottom panel - full width, 11/12 height */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '91.67vh',
            backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            boxShadow: 'var(--pf-t--global--box-shadow--lg)',
            zIndex: 501,
            overflowY: 'auto',
          }}>
            {/* Close button inside modal - upper right corner */}
            <Button
              variant="plain"
              aria-label="Close panel"
              onClick={handleCloseDrawer}
              style={{
                position: 'absolute',
                top: 'var(--pf-t--global--spacer--md)',
                right: 'var(--pf-t--global--spacer--md)',
                zIndex: 10,
              }}
            >
              <TimesIcon />
            </Button>
            {renderModalContent()}
          </div>
        </>
      )}

      {/* Side Drawer (A/B Test Variant) */}
      {isSideDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 500,
            }}
            onClick={handleCloseSideDrawer}
          />
          {/* Side panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '50%',
            minWidth: '400px',
            maxWidth: '75%',
            height: '100vh',
            backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
            boxShadow: 'var(--pf-t--global--box-shadow--lg)',
            zIndex: 501,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Side drawer header */}
            <div style={{
              padding: 'var(--pf-t--global--spacer--lg)',
              borderBottom: '1px solid var(--pf-t--global--border--color--default)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
                {selectedImage && (
                  <>
                  <FlexItem>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <CubeIcon style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)', fontSize: '1.5rem' }} />
                      </div>
                  </FlexItem>
                  <FlexItem>
                      <Content component="h2" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>{selectedImage.name}<TypeLabel level="H2" /></Content>
                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Container Image Details<TypeLabel level="SM" />
                      </Content>
                  </FlexItem>
                  </>
                )}
                </Flex>
              <Button
                variant="plain"
                aria-label="Close panel"
                onClick={handleCloseSideDrawer}
              >
                <TimesIcon />
              </Button>
            </div>
            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {renderModalContent()}
            </div>
          </div>
        </>
      )}

      {/* Floating CTA - Request an Image (shows when masthead scrolls out of view) */}
      {showFloatingCTA && (
        <Button
          variant="primary"
          icon={<PlusCircleIcon />}
          {...(!previewMode && { component: 'a', href: 'https://issues.redhat.com/secure/CreateIssue.jspa?issuetype=17&pid=12332745', target: '_blank' })}
          isDisabled={previewMode}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            boxShadow: 'var(--pf-t--global--box-shadow--lg)',
            zIndex: 1000,
          }}
        >
          Request an image
        </Button>
      )}

  </>
  );
};

export { Dashboard };
