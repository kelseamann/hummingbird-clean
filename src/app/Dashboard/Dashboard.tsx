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
  CodeBlockCode,
  CompassContent,
  CompassPanel,
  Content,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  InputGroup,
  InputGroupItem,
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
  TextInput,
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
} from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { useCardStyle } from '@app/utils/CardStyleContext';

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
    pullCommand: 'podman pull registry.redhat.io/hummingbird/go:latest',
    latestTag: '1.22.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 7,
    size: '32 MB',
    availableVariants: ['fips', 'go-tools'],
    lastUpdated: '2026-01-23T11:45:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/go',
  },
  {
    name: 'node-js',
    description: 'Hardened, minimal delivery of Node.js lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/nodejs:latest',
    latestTag: '20.11.0',
    isFavorite: true,
    cveCount: 2,
    daysSincePublished: 3,
    size: '45 MB',
    availableVariants: ['builder'],
    lastUpdated: '2026-01-27T09:10:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/nodejs',
  },
  {
    name: 'openjdk',
    description: 'Hardened, minimal delivery of OpenJDK lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/openjdk:latest',
    latestTag: '21.0.2',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 10,
    size: '85 MB',
    availableVariants: ['fips', 'builder'],
    lastUpdated: '2026-01-20T14:30:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/openjdk',
  },
  {
    name: 'python',
    description: 'Hardened, minimal delivery of Python lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/python:latest',
    latestTag: '3.14.2',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 12,
    size: '24 MB',
    availableVariants: ['fips', 'builder', 'go-tools'],
    lastUpdated: '2026-01-18T14:32:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/python',
  },
  {
    name: 'ruby',
    description: 'Hardened, minimal delivery of Ruby lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/ruby:latest',
    latestTag: '3.3.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 6,
    size: '28 MB',
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
    pullCommand: 'podman pull registry.redhat.io/hummingbird/mariadb:latest',
    latestTag: '11.2.2',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 9,
    size: '120 MB',
    availableVariants: ['fips'],
    lastUpdated: '2026-01-21T12:00:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/mariadb',
  },
  {
    name: 'memcached',
    description: 'Hardened, minimal delivery of Memcached lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/memcached:latest',
    latestTag: '1.6.23',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 4,
    size: '8 MB',
    availableVariants: [],
    lastUpdated: '2026-01-26T15:30:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/memcached',
  },
  {
    name: 'postgresql',
    description: 'Hardened, minimal delivery of PostgreSQL lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/postgresql:latest',
    latestTag: '16.1',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 11,
    size: '95 MB',
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
    pullCommand: 'podman pull registry.redhat.io/hummingbird/curl:latest',
    latestTag: '8.5.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 5,
    size: '12 MB',
    availableVariants: ['fips', 'builder'],
    lastUpdated: '2026-01-25T10:45:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/curl',
  },
  {
    name: 'git',
    description: 'Hardened, minimal delivery of Git lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/git:latest',
    latestTag: '2.43.0',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 8,
    size: '15 MB',
    availableVariants: ['builder'],
    lastUpdated: '2026-01-22T09:00:00Z',
    lastScanned: '2026-01-30T08:15:00Z',
    documentationUrl: 'https://quay.io/repository/hummingbird/git',
  },
  {
    name: 'jq',
    description: 'Hardened, minimal delivery of jq lorem ipsum dolor sedit',
    pullCommand: 'podman pull registry.redhat.io/hummingbird/jq:latest',
    latestTag: '1.7.1',
    isFavorite: true,
    cveCount: 0,
    daysSincePublished: 2,
    size: '5 MB',
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
    const baseRegistry = `registry.redhat.io/hummingbird/${image.name.toLowerCase()}:latest`;
    return `${commandType} pull ${baseRegistry}`;
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
        <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--lg)' }}>{cardTitle}</Content>
      </CardTitle>
      <CardBody>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          color: 'var(--pf-t--global--text--color--subtle)',
          marginBottom: 'var(--pf-t--global--spacer--md)',
          lineHeight: '1.5',
        }}>
          {image.description}
        </Content>
        <Flex style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
          <FlexItem flex={{ default: 'flex_1' }}>
            <div
              style={{ 
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                fontSize: 'var(--pf-t--global--font--size--body--sm)',
                padding: '6px 12px',
                borderRadius: '3px 0 0 3px',
                border: '1px solid var(--pf-t--global--border--color--default)',
                borderRight: 'none',
                whiteSpace: 'nowrap',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {renderPullCommandWithHighlights(getPullCommand())}
            </div>
          </FlexItem>
                        <FlexItem>
            <Button 
              variant="control" 
              aria-label="Copy to clipboard"
              onClick={(e) => {
                e.stopPropagation();
                const cmd = getPullCommand();
                navigator.clipboard.writeText(cmd);
                if (onCopy) {
                  onCopy(image.name, commandType, getVariantsFromCommand(cmd));
                }
              }}
              style={{ 
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                borderRadius: '0 3px 3px 0',
                height: '36px',
              }}
            >
              <CopyIcon />
            </Button>
          </FlexItem>
        </Flex>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--sm)',
          color: 'var(--pf-t--global--text--color--default)',
          margin: 0
        }}>
          Latest tag: {image.latestTag}
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
    const baseRegistry = `registry.redhat.io/hummingbird/${image.name.toLowerCase()}:latest`;
    return `${commandType} pull ${baseRegistry}`;
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
        borderRadius: '16px',
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
          
          {/* Title + CVE Badge */}
          <FlexItem flex={{ default: 'flex_1' }}>
            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
              <FlexItem>
                <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--lg)', fontWeight: 600 }}>
                  {cardTitle}
                </Content>
              </FlexItem>
              <FlexItem>
                {image.cveCount === 0 && (
                  <Label color="green" icon={<InfoCircleIcon />} isCompact>0 CVEs</Label>
                )}
              </FlexItem>
            </Flex>
          </FlexItem>
          
          {/* Latest Tag pill + More tags icon */}
          <FlexItem>
            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
              <FlexItem>
                <span style={{
                  backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                  color: 'var(--pf-t--global--text--color--subtle)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: 'var(--pf-t--global--font--size--body--sm)',
                }}>
                  {image.latestTag}
                </span>
              </FlexItem>
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
                      <StarIcon style={{ color: 'var(--pf-t--global--color--brand--default)', fontSize: '1rem' }} />
                    ) : (
                      <OutlinedStarIcon style={{ fontSize: '1rem' }} />
                    )}
                  </Button>
                </Tooltip>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </CardHeader>
      
      <CardBody>
        {/* Description */}
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          color: 'var(--pf-t--global--text--color--subtle)',
          marginBottom: 'var(--pf-t--global--spacer--md)',
          lineHeight: '1.5',
        }}>
          {image.description}
        </Content>
        
        {/* Full-width Pull Command */}
        <Flex style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
          <FlexItem flex={{ default: 'flex_1' }}>
            <div
              style={{ 
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                fontSize: 'var(--pf-t--global--font--size--body--sm)',
                padding: '6px 12px',
                borderRadius: '3px 0 0 3px',
                border: '1px solid var(--pf-t--global--border--color--default)',
                borderRight: 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {renderPullCommandWithHighlights(getPullCommand())}
            </div>
          </FlexItem>
          <FlexItem>
            <Button 
              variant="control" 
              aria-label="Copy to clipboard"
              onClick={(e) => {
                e.stopPropagation();
                const cmd = getPullCommand();
                navigator.clipboard.writeText(cmd);
                if (onCopy) {
                  onCopy(image.name, commandType, getVariantsFromCommand(cmd));
                }
              }}
              style={{ 
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                borderRadius: '0 3px 3px 0',
                height: '36px',
              }}
            >
              <CopyIcon />
            </Button>
          </FlexItem>
        </Flex>
        
        {/* Last Updated */}
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--sm)',
          color: 'var(--pf-t--global--text--color--subtle)',
          margin: 0
        }}>
          Last updated: {formatShortDate(image.lastUpdated)}
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
    const baseRegistry = `registry.redhat.io/hummingbird/${image.name.toLowerCase()}:latest`;
    return `${commandType} pull ${baseRegistry}`;
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
        borderRadius: '16px',
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
        <Content component="h3" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--lg)' }}>{cardTitle}</Content>
      </CardTitle>
      <CardBody>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--default)',
          color: 'var(--pf-t--global--text--color--subtle)',
          marginBottom: 'var(--pf-t--global--spacer--md)',
          lineHeight: '1.5',
        }}>
          {image.description}
        </Content>
        <Flex style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
          <FlexItem flex={{ default: 'flex_1' }}>
            <div
              style={{ 
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                fontSize: 'var(--pf-t--global--font--size--body--sm)',
                padding: '6px 12px',
                borderRadius: '3px 0 0 3px',
                border: '1px solid var(--pf-t--global--border--color--default)',
                borderRight: 'none',
                whiteSpace: 'nowrap',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {renderPullCommandWithHighlights(getPullCommand())}
            </div>
          </FlexItem>
          <FlexItem>
            <Button 
              variant="control" 
              aria-label="Copy to clipboard"
              onClick={(e) => {
                e.stopPropagation();
                const cmd = getPullCommand();
                navigator.clipboard.writeText(cmd);
                if (onCopy) {
                  onCopy(image.name, commandType, getVariantsFromCommand(cmd));
                }
              }}
              style={{ 
                backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                borderRadius: '0 3px 3px 0',
                height: '36px',
              }}
            >
              <CopyIcon />
            </Button>
          </FlexItem>
        </Flex>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }} style={{ marginBottom: 'var(--pf-t--global--spacer--xs)' }}>
          <FlexItem>
            <Content component="p" style={{ 
              fontSize: 'var(--pf-t--global--font--size--body--sm)',
              color: 'var(--pf-t--global--text--color--default)',
              margin: 0
            }}>
              Latest tag: {image.latestTag}
            </Content>
          </FlexItem>
          <FlexItem>
            {image.cveCount === 0 && (
              <Label color="green" icon={<InfoCircleIcon />}>0 CVEs</Label>
            )}
          </FlexItem>
        </Flex>
        <Content component="p" style={{ 
          fontSize: 'var(--pf-t--global--font--size--body--sm)',
          color: 'var(--pf-t--global--text--color--subtle)',
          margin: 0
        }}>
          Last updated: {formatShortDate(image.lastUpdated)}
        </Content>
      </CardBody>
      <CardFooter>
        <Flex justifyContent={{ default: 'justifyContentFlexEnd' }}>
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
  const [copiedRowIndex, setCopiedRowIndex] = React.useState<number | null>(null);
  const [modalTab, setModalTab] = React.useState<string>('overview');
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
    
    return `${cmdType} pull registry.redhat.io/hummingbird/${imageName.toLowerCase()}${suffix}:latest`;
  };
  
  // Check if star should be filled (unfilled when FIPS is selected)
  const isStarFilled = (image: ContainerImage) => {
    if (restrictTags === 'fips') return false;
    return image.isFavorite;
  };

  // Build variant suffix from selected variants (order matters: fips first, then builder/go-tools)
  const getVariantSuffix = (): string => {
    const parts: string[] = [];
    // FIPS comes first in the suffix order
    if (selectedVariants.has('fips')) parts.push('fips');
    // Then builder or go-tools
    if (selectedVariants.has('builder')) parts.push('builder');
    if (selectedVariants.has('go-tools')) parts.push('go-tools');
    
    return parts.length > 0 ? '-' + parts.join('-') : '';
  };

  // Generate pull command based on image, tag, and selected variants (full version for copying)
  const getFullPullCommand = (imageName: string, tag: string): string => {
    const suffix = getVariantSuffix();
    return `podman pull registry.redhat.io/hummingbird/${imageName.toLowerCase()}:${tag}${suffix}`;
  };

  // Generate truncated pull command for display
  const getDisplayPullCommand = (imageName: string, tag: string): string => {
    const suffix = getVariantSuffix();
    return `.../hummingbird/${imageName.toLowerCase()}:${tag}${suffix}`;
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
    setCopiedRowIndex(null);
    setModalTab('overview');
  };

  // Open side drawer (A/B test variant)
  const handleCardClickSide = (image: ContainerImage) => {
    if (previewMode) return; // Disable in preview mode
    setSelectedImage(image);
    setIsSideDrawerOpen(true);
    setSelectedVariants(new Set());
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
              Red Hat Project Hummingbird, <span style={{ marginLeft: '4px' }}>Last Updated XX:XX:XX</span>
            </Content>
            <Content component="h2" style={{ margin: 0, marginTop: 'var(--pf-t--global--spacer--xs)', fontSize: 'var(--pf-t--global--font--size--lg)' }}>
              {selectedImage.name}
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
                <Tab eventKey="packages" title={<TabTitleText>Packages</TabTitleText>} />
                <Tab eventKey="containerfile" title={<TabTitleText>Containerfile</TabTitleText>} />
              </Tabs>
            </CompassPanel>
          </FlexItem>
        </Flex>

        {/* Tab Content */}
        {modalTab === 'overview' && (
      <Grid hasGutter>
            {/* Left column */}
            <GridItem span={12} lg={4}>
              {/* Stats - Two separate panels */}
              <Flex gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                <FlexItem flex={{ default: 'flex_1' }}>
                  <CompassPanel style={{ height: '100%' }}>
                    <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                      <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <CheckCircleIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                      </div>
                      <Content component="h2" style={{ margin: 0, fontSize: '2rem' }}>{selectedImage.cveCount || 0}</Content>
                      <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)' }}>CVEs</Content>
                      <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                        Security feed
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
                      <Content component="h2" style={{ margin: 0, fontSize: '2rem' }}>{selectedImage.daysSincePublished || 0} days</Content>
                      <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)' }}>since last published</Content>
                      <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                        Repository
                      </Button>
                    </div>
                  </CompassPanel>
                </FlexItem>
              </Flex>

            {/* Start using this image */}
            <CompassPanel style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Start using this image</Content>
                <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                  Copy commands from the table to the right to use different tags.
                </Content>

                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                  Swap existing instance
                </Content>
                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <FlexItem flex={{ default: 'flex_1' }}>
                    <InputGroup>
                      <InputGroupItem isFill>
                        <TextInput
                          readOnlyVariant="default"
                          value={`podman pull registry.redhat.io/hummingbird/${selectedImage.name.toLowerCase()}:latest`}
                          aria-label="Swap command"
                        />
                      </InputGroupItem>
                      <InputGroupItem>
                        <Button variant="control" aria-label="Copy">
                          <CopyIcon />
                        </Button>
                      </InputGroupItem>
                    </InputGroup>
                        </FlexItem>
                        <FlexItem>
                    <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)' }}>{selectedImage.size}</Content>
                        </FlexItem>
                      </Flex>

                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                  Manifest Digest
                </Content>
                <InputGroup style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <InputGroupItem isFill>
                    <TextInput
                      readOnlyVariant="default"
                      value={`sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4`}
                      aria-label="Manifest digest"
                    />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Button variant="control" aria-label="Copy">
                      <CopyIcon />
                    </Button>
                  </InputGroupItem>
                </InputGroup>

                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--xs)', fontWeight: 'bold', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                  Registry
                </Content>
                <InputGroup>
                  <InputGroupItem isFill>
                    <TextInput
                      readOnlyVariant="default"
                      value={`registry.redhat.io/hummingbird`}
                      aria-label="Registry"
                    />
                  </InputGroupItem>
                  <InputGroupItem>
                    <Button variant="control" aria-label="Copy">
                      <CopyIcon />
                    </Button>
                  </InputGroupItem>
                </InputGroup>
                        </div>
            </CompassPanel>

            {/* Documentation */}
            <CompassPanel>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Documentation</Content>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--pf-t--global--spacer--sm)' }}>
                  <Button 
                    variant="link" 
                    isInline 
                    icon={<BookOpenIcon />} 
                    iconPosition="start"
                    component="a"
                    href="#"
                    target="_blank"
                  >
                    Getting Started Guide
                  </Button>
                  <Button 
                    variant="link" 
                    isInline 
                    icon={<BookOpenIcon />} 
                    iconPosition="start"
                    component="a"
                    href="#"
                    target="_blank"
                  >
                    API Reference
                  </Button>
                  <Button 
                    variant="link" 
                    isInline 
                    icon={<BookOpenIcon />} 
                    iconPosition="start"
                    component="a"
                    href="#"
                    target="_blank"
                  >
                    Configuration Options
                  </Button>
                  <Button 
                    variant="link" 
                    isInline 
                    icon={<BookOpenIcon />} 
                    iconPosition="start"
                    component="a"
                    href="#"
                    target="_blank"
                  >
                    Migration from UBI
                  </Button>
                  <Button 
                    variant="link" 
                    isInline 
                    icon={<ExternalLinkAltIcon />} 
                    iconPosition="start"
                    component="a"
                    href="#"
                    target="_blank"
                  >
                    Community Forum
                  </Button>
                </div>
              </div>
            </CompassPanel>
        </GridItem>

          {/* Right column - Documentation */}
          <GridItem span={12} lg={8}>
            <CompassPanel>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)', maxHeight: '60vh', overflowY: 'auto' }}>
                <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Documentation</Content>
                
                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Description</Content>
                <Content component="p" style={{ fontWeight: 'bold', marginBottom: 'var(--pf-t--global--spacer--xs)' }}>Project Hummingbird httpd Image</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  The Apache HTTP Server, colloquially called Apache, is a Web server application notable for playing a key role in the initial growth of the World Wide Web. Originally based on the NCSA HTTPd server, development of Apache began in early 1995 after work on the NCSA code stalled. Apache quickly overtook NCSA HTTPd as the dominant HTTP server, and has remained the most popular HTTP server in use since April 1996.
                </Content>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Usage</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  This image runs as a non-root user on port 8080 (not 80) for improved security as the non-root user cannot bind to privileged ports.
                </Content>

                <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Basic Startup</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Start an httpd container serving the default welcome page:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  <CodeBlockCode>podman run -d --name httpd-server -p 8080:8080 quay.io/hummingbird/httpd:latest</CodeBlockCode>
                </CodeBlock>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>Access the server at http://localhost:8080.</Content>

                <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Serving Custom Content</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Mount your content directory to serve static files:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <CodeBlockCode>{`podman run -d --name httpd-server \\
  -p 8080:8080 \\
  -v /path/to/your/html:/usr/local/apache2/htdocs:ro,Z \\
  quay.io/hummingbird/httpd:latest`}</CodeBlockCode>
                </CodeBlock>

                <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Custom Configuration</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Mount a custom httpd configuration:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <CodeBlockCode>{`podman run -d --name httpd-server \\
  -p 8080:8080 \\
  -v /path/to/my-httpd.conf:/etc/httpd/conf.d/custom.conf:ro,Z \\
  quay.io/hummingbird/httpd:latest`}</CodeBlockCode>
                </CodeBlock>

                <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Container Networking</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Connect to httpd from another container:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <CodeBlockCode>{`# Create a network
podman network create myapp-network

# Start httpd on the network
podman run -d --name httpd-server \\
  --network myapp-network \\
  quay.io/hummingbird/httpd:latest

# Connect from another container (note: port 8080)
podman run --rm --network myapp-network \\
  quay.io/hummingbird/curl:latest \\
  http://httpd-server:8080/`}</CodeBlockCode>
                </CodeBlock>

                <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Version Check</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Verify the httpd version:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <CodeBlockCode>podman run --rm quay.io/hummingbird/httpd:latest httpd -v</CodeBlockCode>
                </CodeBlock>

                <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Building a Custom Image</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Create a Containerfile to build an image with your static content:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  <CodeBlockCode>{`FROM quay.io/hummingbird/httpd:latest

COPY index.html /usr/local/apache2/htdocs/
COPY css/ /usr/local/apache2/htdocs/css/
COPY images/ /usr/local/apache2/htdocs/images/`}</CodeBlockCode>
                </CodeBlock>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Build and run:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <CodeBlockCode>{`podman build -t my-website .
podman run -d -p 8080:8080 my-website`}</CodeBlockCode>
                </CodeBlock>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Variants</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>The following variants and tags are available:</Content>
                <Content component="p" style={{ fontFamily: 'monospace', marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  :2 · :2-builder · :2.4 · :2.4-builder · :2.4.66 · :2.4.66-builder · :latest · :latest-builder
                </Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  For more information on image variants, how to get the sources, and general information, visit the Project Hummingbird docs.
                </Content>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Compatibility Notes</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  The Hummingbird httpd image is aiming to be compatible with the docker.io/httpd:latest image. For details, see the compatibility table.
                </Content>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Image Verification</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>You can use the following public key to verify Hummingbird images:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  <CodeBlockCode>{`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEtYRltxRJvXLMpXT+pIIu86CLhDP7
Q6VznCXqlzV3AO4AK/ge/HYtv6wMPfe4NHP3VQkCWoUokegC926FB+MTyA==
-----END PUBLIC KEY-----`}</CodeBlockCode>
                </CodeBlock>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>First, copy the upper key to a file (e.g., key.pub). Then you can use cosign along with the key:</Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  <CodeBlockCode>cosign verify --key key.pub --insecure-ignore-tlog quay.io/hummingbird/httpd:latest</CodeBlockCode>
                </CodeBlock>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontStyle: 'italic', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  Note that the key is not sufficient to establish trust as it only verifies that the image was built in Hummingbird's Tekton pipeline. Once Project Hummingbird releases official images, they will be signed with an official Red Hat key and go through Red Hat's publishing pipeline.
                </Content>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>Vulnerability Scanning</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  For security vulnerability scanning, Hummingbird uses Syft for SBOM generation and Grype for vulnerability detection. However, for the time being, Syft's output needs to be post-processed for accurate vulnerability matching with Fedora packages. You can conveniently run the scan yourself in a container:
                </Content>
                <CodeBlock style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  <CodeBlockCode>podman run --volume vuln-db:/tmp/.cache quay.io/hummingbird-ci/gitlab-ci grype-hummingbird.sh quay.io/hummingbird/httpd:latest</CodeBlockCode>
                </CodeBlock>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  For details and other ways how to do the scan, see the vulnerability scanning documentation.
                </Content>

                <Content component="h3" style={{ marginTop: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--lg)', fontWeight: 'var(--pf-t--global--font--weight--body--bold)' }}>About Hummingbird Containers</Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                  Project Hummingbird builds a collection of minimal, hardened, and secure container images, aiming to provide purpose-built containers with a significantly reduced attack surface. This strong focus on security combined with a highly automated update workflow results in containers with nearly zero CVEs.
                </Content>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>The project applies a number of measures to harden the Hummingbird containers:</Content>
                <ul style={{ marginLeft: 'var(--pf-t--global--spacer--lg)', marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <li><strong>Minimal Software Footprint:</strong> Images include only essential software packages required for the workload, significantly reducing the attack surface and the number of CVEs per image.</li>
                  <li><strong>Rapid Update Deployment:</strong> Software package updates are shipped as quickly as possible, ensuring that fixes are consumed early.</li>
                  <li><strong>Non-Root User Default:</strong> Most containers default to a non-root user, increasing security by reducing privileges within the container.</li>
                  <li><strong>Hermetic Build Environment:</strong> All containers are built in a hermetic environment without network access. This prevents unintended package drift and gives the Hummingbird project full control over the software versions used.</li>
                  <li><strong>Distroless Security:</strong> The distroless nature of Hummingbird containers, shipping only what is strictly necessary for the given workload, reduces the attack surface and further improves security by making certain types of attacks impossible.</li>
                </ul>
                <Content component="p" style={{ fontStyle: 'italic', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  Note that the project is currently under development. All containers are tested and built with care, but are not yet recommended for production.
                </Content>
              </div>
            </CompassPanel>

            {/* Available Variants table */}
            <CompassPanel style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                  <FlexItem>
                    <Content component="h2" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--2xl)' }}>Available Tags</Content>
                  </FlexItem>
                  <FlexItem>
                    <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }}>
                      <FlexItem>
                        <SearchInput placeholder="Search tags" style={{ width: '150px' }} />
                      </FlexItem>
                      <FlexItem>
                        <ToggleGroup aria-label="Variant filter">
                          <ToggleGroupItem
                            text="FIPS" 
                            buttonId="drawer-fips" 
                            isSelected={selectedVariants.has('fips')}
                            onChange={() => toggleVariant('fips')}
                          />
                          <ToggleGroupItem
                            text="Builder" 
                            buttonId="drawer-builder" 
                            isSelected={selectedVariants.has('builder')}
                            onChange={() => toggleVariant('builder')}
                          />
                          <ToggleGroupItem
                            text="Go Tools" 
                            buttonId="drawer-go-tools" 
                            isSelected={selectedVariants.has('go-tools')}
                            onChange={() => toggleVariant('go-tools')}
                          />
                        </ToggleGroup>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>

                <Table variant="compact" borders={false} style={{ tableLayout: 'fixed' }}>
                  <Thead>
                    <Tr>
                      <Th width={20}>Tag</Th>
                      <Th width={20}>UID</Th>
                      <Th width={15}>Last update</Th>
                      <Th width={45}>Pull command</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {variants.map((variant, index) => {
                      const fullCommand = getFullPullCommand(selectedImage?.name || '', variant.tag);
                      const displayCommand = getDisplayPullCommand(selectedImage?.name || '', variant.tag);
                      return (
                        <Tr 
                          key={index}
                          style={variant.isLatest ? {
                            backgroundColor: 'rgba(0, 102, 204, 0.08)',
                          } : undefined}
                        >
                          <Td dataLabel="Tag">
                            <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                              <Label variant="outline" isCompact>{variant.tag}</Label>
                              {variant.isLatest && (
                                <Label color="blue" isCompact>Latest</Label>
                              )}
                            </Flex>
                          </Td>
                          <Td dataLabel="UID">
                            <Tooltip
                              content={
                                <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                  <span>{variant.project}</span>
                                  <Button 
                                    variant="plain" 
                                    size="sm"
                                    onClick={() => navigator.clipboard.writeText(variant.project)}
                                    style={{ color: 'white', padding: '2px' }}
                                  >
                                    <CopyIcon />
                                  </Button>
                                </Flex>
                              }
                            >
                              <span style={{ cursor: 'pointer' }}>...{variant.project.slice(-8)}</span>
                            </Tooltip>
                          </Td>
                          <Td dataLabel="Last update">{variant.lastUpdate}</Td>
                          <Td dataLabel="Action">
                            {copiedRowIndex === index ? (
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                                <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                                <span>Copied!</span>
                              </Flex>
                            ) : (
                              <Button 
                                variant="link" 
                                isInline 
                                icon={<CopyIcon />}
                                onClick={() => handleCopyPullCommand(index, fullCommand)}
                              >
                                {displayCommand}
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </div>
            </CompassPanel>
          </GridItem>
          </Grid>
        )}

        {/* Technical Information Tab */}
        {modalTab === 'technical' && (
          <>
          <Grid hasGutter>
            {/* Left column - Architectures, Other, Licenses */}
            <GridItem span={12} lg={4}>
              <CompassPanel>
                <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                  <Flex gap={{ default: 'gap2xl' }}>
                    <FlexItem>
                      <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold' }}>Architectures</Content>
                      <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>x86_64</span>
                        </Flex>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>arm64</span>
                        </Flex>
                      </Flex>
                    </FlexItem>
                    <FlexItem>
                      <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold' }}>Other</Content>
                      <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>RHEL 9</span>
                        </Flex>
                        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                          <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                          <span>OpenShift 4.14+</span>
                        </Flex>
                      </Flex>
                    </FlexItem>
                  </Flex>
                  
                  <div style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
                    <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold' }}>Licenses</Content>
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
                </div>
              </CompassPanel>
            </GridItem>

            {/* Right column - Image Verification */}
            <GridItem span={12} lg={8}>
              <CompassPanel>
                <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                  <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                    Image Verification
                  </Content>
                  <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                    You can use the following public key to verify Hummingbird images:
                  </Content>
                  
                  {/* Public Key Block */}
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

                  {/* Cosign Command */}
                  <div style={{
                    backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                    padding: 'var(--pf-t--global--spacer--md)',
                    borderRadius: 'var(--pf-t--global--border--radius--small)',
                    fontFamily: 'var(--pf-t--global--font--family--mono)',
                    fontSize: 'var(--pf-t--global--font--size--body--sm)',
                    marginBottom: 'var(--pf-t--global--spacer--md)',
                  }}>
                    <span style={{ color: 'var(--pf-t--global--color--nonstatus--red--default)' }}>cosign</span> verify --key key.pub --insecure-ignore-tlog registry.redhat.io/hummingbird/{selectedImage?.name.toLowerCase()}:latest
                </div>

                  <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                    Note: The key verifies images built in Hummingbird&apos;s Tekton pipeline. Official releases will be signed with Red Hat&apos;s publishing key.
                  </Content>
            </div>
              </CompassPanel>

              {/* Vulnerability Scanning */}
              <CompassPanel style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
                <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                  <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                    Vulnerability Scanning
                  </Content>
                  <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                    Hummingbird uses <Button variant="link" isInline style={{ padding: 0 }}>Syft</Button> for SBOM generation and <Button variant="link" isInline style={{ padding: 0 }}>Grype</Button> for vulnerability detection. Run the scan locally:
                  </Content>

                  {/* Scan Command */}
                  <div style={{
                    backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
                    padding: 'var(--pf-t--global--spacer--md)',
                    borderRadius: 'var(--pf-t--global--border--radius--small)',
                    fontFamily: 'var(--pf-t--global--font--family--mono)',
                    fontSize: 'var(--pf-t--global--font--size--body--sm)',
                    marginBottom: 'var(--pf-t--global--spacer--md)',
                    overflowX: 'auto',
                  }}>
                    <span style={{ color: 'var(--pf-t--global--color--nonstatus--red--default)' }}>podman</span> run --volume vuln-db:/tmp/.cache registry.redhat.io/hummingbird-ci/grype-hummingbird.sh registry.redhat.io/hummingbird/{selectedImage?.name.toLowerCase()}:latest
                  </div>

                  <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                    For detailed scanning documentation, see the <Button variant="link" isInline icon={<ExternalLinkAltIcon />} iconPosition="end" style={{ padding: 0 }}>vulnerability scanning guide</Button>.
                  </Content>

                  {/* Vulnerabilities Summary */}
                  <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontWeight: 'bold' }}>
                    Current Scan Results
                  </Content>
                  <Flex gap={{ default: 'gapMd' }}>
                    <Label color="green" icon={<CheckCircleIcon />}>0 Critical</Label>
                    <Label color="green" icon={<CheckCircleIcon />}>0 High</Label>
                    <Label color="green" icon={<CheckCircleIcon />}>0 Medium</Label>
                    <Label color="blue">2 Low</Label>
                  </Flex>
                </div>
              </CompassPanel>
        </GridItem>
          </Grid>

          {/* Inventory Section */}
          <CompassPanel style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
            <div style={{ padding: 'var(--pf-t--global--spacer--xl)' }}>
              <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
                Inventory
              </Content>
              
              {/* Inventory items as a list */}
              <div>
                {/* Layers */}
                <Flex 
                  justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                  alignItems={{ default: 'alignItemsCenter' }}
                  style={{ 
                    padding: 'var(--pf-t--global--spacer--md) 0',
                    borderBottom: '1px solid var(--pf-t--global--border--color--default)',
                  }}
                >
                  <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>12 Layers</Content>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>12</span>
                    <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                  </Flex>
                </Flex>

                {/* Packages */}
                <Flex 
                  justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                  alignItems={{ default: 'alignItemsCenter' }}
                  style={{ 
                    padding: 'var(--pf-t--global--spacer--md) 0',
                    borderBottom: '1px solid var(--pf-t--global--border--color--default)',
                  }}
                >
                  <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>42 Packages</Content>
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>42</span>
                    <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                      </Flex>
                </Flex>

                {/* Dependencies */}
                <Flex 
                  justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                  alignItems={{ default: 'alignItemsCenter' }}
                  style={{ 
                    padding: 'var(--pf-t--global--spacer--md) 0',
                    borderBottom: '1px solid var(--pf-t--global--border--color--default)',
                  }}
                >
                  <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>156 Dependencies</Content>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>156</span>
                    <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                              </Flex>
                </Flex>

                {/* Files */}
                <Flex 
                  justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                  alignItems={{ default: 'alignItemsCenter' }}
                  style={{ 
                    padding: 'var(--pf-t--global--spacer--md) 0',
                    borderBottom: '1px solid var(--pf-t--global--border--color--default)',
                  }}
                >
                  <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>2,847 Files</Content>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>2,847</span>
                    <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                              </Flex>
                </Flex>

                {/* Size */}
                <Flex 
                  justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                  alignItems={{ default: 'alignItemsCenter' }}
                  style={{ 
                    padding: 'var(--pf-t--global--spacer--md) 0',
                    borderBottom: '1px solid var(--pf-t--global--border--color--default)',
                  }}
                >
                  <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>24 MB Compressed</Content>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>24</span>
                    <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                              </Flex>
                </Flex>

                {/* Architectures */}
                <Flex 
                  justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                  alignItems={{ default: 'alignItemsCenter' }}
                  style={{ 
                    padding: 'var(--pf-t--global--spacer--md) 0',
                  }}
                >
                  <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>3 Architectures</Content>
                              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <span style={{ color: 'var(--pf-t--global--color--brand--default)', fontWeight: 'bold' }}>3</span>
                    <CheckCircleIcon style={{ color: 'var(--pf-t--global--color--brand--default)' }} />
                              </Flex>
                      </Flex>
              </div>
            </div>
          </CompassPanel>

          </>
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
                    <Content component="h3" style={{ margin: 0 }}>Security Vulnerabilities</Content>
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
          <CompassPanel>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>Software Bill of Materials (SBOM)</Content>
              <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsCenter' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
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
                  <ToolbarItem>
                    <Button variant="link" icon={<ExternalLinkAltIcon />} iconPosition="end">
                      Download SPDX
                    </Button>
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
          );
        })()}

        {modalTab === 'containerfile' && (
          <CompassPanel>
            <div style={{ padding: 'var(--pf-t--global--spacer--xl)' }}>
              <Content component="h2">Containerfile</Content>
              <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>
                Containerfile content coming soon...
              </Content>
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
          <Content component="h1" style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
            Project Hummingbird Container Images
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
            <Content component="h2" style={{ margin: 0, fontWeight: 600 }}>Popular Images</Content>
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
            const pullCmd = `${commandType} pull registry.redhat.io/hummingbird/${image.name.toLowerCase()}-fips:latest`;
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
                    <Tooltip content="Select builder to add package manager and Go Tools">
                      <QuestionCircleIcon style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)' }} />
                    </Tooltip>
                  </Flex>
                  <Flex gap={{ default: 'gapSm' }}>
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
                      Builder
                    </Button>
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
              <Content component="h3" style={{ marginTop: '24px', marginBottom: '24px', fontWeight: 500, fontSize: '1.125rem' }}>
                Favorites
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
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: '1.125rem' }}>
                All Images
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
              <Content component="h3" style={{ marginTop: '24px', marginBottom: '24px', fontWeight: 500, fontSize: '1.125rem' }}>
                Hardened Images
              </Content>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {getHardenedImages().map((image, index) => {
                  // Always apply FIPS styling for hardened images
                  let fipsSuffix = '-fips';
                  if (addBuilderTag) fipsSuffix += '-builder';
                  if (addGoToolsTag) fipsSuffix += '-go-tools';
                  const fipsPullCommand = `${commandType} pull registry.redhat.io/hummingbird/${image.name.toLowerCase()}${fipsSuffix}:latest`;
                  
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
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: '1.125rem' }}>
                Languages/Runtimes
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
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: '1.125rem' }}>
                Databases
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
              <Content component="h3" style={{ marginTop: '48px', marginBottom: '24px', fontWeight: 500, fontSize: '1.125rem' }}>
                Dev Tools
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
                      <Content component="h2" style={{ margin: 0 }}>{selectedImage.name}</Content>
                      <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                        Container Image Details
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
