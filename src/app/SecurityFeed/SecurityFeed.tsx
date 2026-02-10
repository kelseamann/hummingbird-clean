import * as React from 'react';
import {
  Button,
  CompassContent,
  CompassPanel,
  Content,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  MenuToggle,
  MenuToggleElement,
  SearchInput,
  Select,
  SelectList,
  SelectOption,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  TimesCircleIcon,
  TimesIcon,
  ArrowRightIcon,
  SecurityIcon,
  InfoCircleIcon,
  SyncAltIcon,
  ClockIcon,
  TachometerAltIcon,
  ShieldAltIcon,
  CubesIcon,
} from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td, ThProps } from '@patternfly/react-table';
import { useTypographyLabels } from '@app/utils/CardStyleContext';

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

// Security Feed data
interface SecurityFeedRow {
  cveId: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  affectedPackage: string;
  status: 'fixed' | 'affected' | 'ongoing';
  published: string;
  lastUpdated: string;
}

const securityFeedData: SecurityFeedRow[] = [
  { cveId: 'CVE-YEAR-10', severity: 'high', affectedPackage: 'openssl-1.1.1', status: 'fixed', published: '2026-02-01', lastUpdated: '2026-02-03' },
  { cveId: 'CVE-YEAR-10', severity: 'low', affectedPackage: 'curl-7.88.0', status: 'affected', published: '2026-02-01', lastUpdated: '2026-02-02' },
  { cveId: 'CVE-YEAR-10', severity: 'critical', affectedPackage: 'python-3.11.0', status: 'ongoing', published: '2026-01-30', lastUpdated: '2026-02-02' },
  { cveId: 'CVE-YEAR-10', severity: 'moderate', affectedPackage: 'nodejs-18.0.0', status: 'fixed', published: '2026-01-30', lastUpdated: '2026-02-01' },
  { cveId: 'CVE-YEAR-10', severity: 'moderate', affectedPackage: 'go-1.21.0', status: 'fixed', published: '2026-01-30', lastUpdated: '2026-01-31' },
  { cveId: 'CVE-YEAR-10', severity: 'moderate', affectedPackage: 'nginx-1.24.0', status: 'fixed', published: '2026-01-29', lastUpdated: '2026-02-02' },
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

const SeverityLabel: React.FC<{ severity: SecurityFeedRow['severity'] }> = ({ severity }) => {
  switch (severity) {
    case 'critical':
      return <Label color="red" icon={<ExclamationCircleIcon />}>Critical</Label>;
    case 'high':
      return <Label color="yellow" icon={<ExclamationTriangleIcon />}>High</Label>;
    case 'moderate':
      return <Label color="teal" icon={<CheckCircleIcon />}>Moderate</Label>;
    case 'low':
      return <Label color="grey" icon={<CheckCircleIcon />}>Low</Label>;
  }
};

const StatusLabel: React.FC<{ status: SecurityFeedRow['status'] }> = ({ status }) => {
  switch (status) {
    case 'fixed':
      return <Label variant="outline" color="green" icon={<CheckCircleIcon />}>Fixed</Label>;
    case 'affected':
      return <Label variant="outline" color="red" icon={<ExclamationCircleIcon />}>Affected</Label>;
    case 'ongoing':
      return <Label variant="outline" color="blue" icon={<SyncAltIcon />}>Ongoing Fix</Label>;
  }
};

// Severity order for sorting (critical is highest)
const severityOrder: Record<SecurityFeedRow['severity'], number> = {
  critical: 0,
  high: 1,
  moderate: 2,
  low: 3,
};

// Status order for sorting
const statusOrder: Record<SecurityFeedRow['status'], number> = {
  affected: 0,
  ongoing: 1,
  fixed: 2,
};

const SecurityFeed: React.FunctionComponent = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [isDrawerExpanded, setIsDrawerExpanded] = React.useState(false);
  const [selectedCve, setSelectedCve] = React.useState<SecurityFeedRow | null>(null);
  const [isResultsFilterOpen, setIsResultsFilterOpen] = React.useState(false);
  const [resultsFilter, setResultsFilter] = React.useState<'active' | 'all'>('active');
  const [activeSortIndex, setActiveSortIndex] = React.useState<number | null>(null);
  const [activeSortDirection, setActiveSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const onCveClick = (row: SecurityFeedRow) => {
    setSelectedCve(row);
    setIsDrawerExpanded(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerExpanded(false);
  };

  // Sort handler
  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: activeSortIndex ?? undefined,
      direction: activeSortDirection,
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex,
  });

  const filteredData = securityFeedData.filter(row => {
    const matchesSearch = row.cveId.toLowerCase().includes(searchValue.toLowerCase()) ||
                          row.affectedPackage.toLowerCase().includes(searchValue.toLowerCase());
    // "Active CVEs" excludes fixed/resolved CVEs
    const matchesResultsFilter = resultsFilter === 'all' || row.status !== 'fixed';
    return matchesSearch && matchesResultsFilter;
  });

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (activeSortIndex === null) return 0;
    
    let comparison = 0;
    if (activeSortIndex === 1) {
      // Severity column
      comparison = severityOrder[a.severity] - severityOrder[b.severity];
    } else if (activeSortIndex === 3) {
      // Status column
      comparison = statusOrder[a.status] - statusOrder[b.status];
    }
    
    return activeSortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <>
      <CompassContent>
            {/* Hero Banner - asymmetric corners per Compass design */}
            <div 
              className="pf-v6-c-hero"
              style={{
                marginBottom: 'var(--pf-t--global--spacer--lg)',
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
                    <Button variant="primary">Request an image</Button>
                  </FlexItem>
                  <FlexItem>
                    <Button variant="link" icon={<ArrowRightIcon />} iconPosition="end">
                      Learn more
                    </Button>
                  </FlexItem>
                </Flex>
              </div>
            </div>

            {/* Vanity Metrics Section */}
            <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
              <GridItem span={12} md={6} lg={3}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                    <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                      <ClockIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--color--brand--default)' }} />
                    </div>
                    <Content component="h2" style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                      &lt;24h<TypeLabel level="STAT" />
                    </Content>
                    <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Avg. Resolution Time
                    </Content>
                    <Content component="p" style={{ margin: 0, marginTop: '4px', fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                      vs ~7 days upstream avg.
                    </Content>
                    <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      View metrics
                    </Button>
                  </div>
                </CompassPanel>
              </GridItem>
              <GridItem span={12} md={6} lg={3}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                    <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                      <ShieldAltIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                    </div>
                    <Content component="h2" style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                      127<TypeLabel level="STAT" />
                    </Content>
                    <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      CVEs Resolved (30d)
                    </Content>
                    <Content component="p" style={{ margin: 0, marginTop: '4px', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      <span style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)' }}>1,247</span>
                      <span style={{ marginLeft: '4px', color: 'var(--pf-t--global--text--color--subtle)' }}>unresolved in upstream</span>
                    </Content>
                    <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      View resolved
                    </Button>
                  </div>
                </CompassPanel>
              </GridItem>
              <GridItem span={12} md={6} lg={3}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                    <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                      <CubesIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--color--nonstatus--purple--default)' }} />
                    </div>
                    <Content component="h2" style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                      42<TypeLabel level="STAT" />
                    </Content>
                    <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Images Scanned
                    </Content>
                    <Content component="p" style={{ margin: 0, marginTop: '4px', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      <Label color="green" isCompact>100% coverage</Label>
                    </Content>
                    <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      View images
                    </Button>
                  </div>
                </CompassPanel>
              </GridItem>
              <GridItem span={12} md={6} lg={3}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)', textAlign: 'center' }}>
                    <div style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                      <TachometerAltIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--warning--default)' }} />
                    </div>
                    <Content component="h2" style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
                      3<TypeLabel level="STAT" />
                    </Content>
                    <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Active Vulnerabilities
                    </Content>
                    <Content component="p" style={{ margin: 0, marginTop: '4px', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      <span style={{ color: 'var(--pf-t--global--icon--color--status--danger--default)' }}>~89 avg.</span>
                      <span style={{ marginLeft: '4px', color: 'var(--pf-t--global--text--color--subtle)' }}>per upstream image</span>
                    </Content>
                    <Button variant="link" isInline icon={<ArrowRightIcon />} iconPosition="end" style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      View active
                    </Button>
                  </div>
                </CompassPanel>
              </GridItem>
            </Grid>

            {/* Upstream Comparison Summary */}
            <CompassPanel style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }} flexWrap={{ default: 'wrap' }} gap={{ default: 'gapMd' }}>
                  <FlexItem>
                    <Content component="h3" style={{ margin: 0, marginBottom: '4px' }}>Hummingbird vs Upstream Docker Hub Images</Content>
                    <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      Aggregate comparison across all 42 Hummingbird images vs their upstream equivalents
                    </Content>
                  </FlexItem>
                  <FlexItem>
                    <Button variant="secondary">View detailed comparison</Button>
                  </FlexItem>
                </Flex>
                <Grid hasGutter style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
                  <GridItem span={12} md={4}>
                    <div style={{ textAlign: 'center', padding: 'var(--pf-t--global--spacer--md)', backgroundColor: 'var(--pf-t--global--background--color--secondary--default)', borderRadius: '8px' }}>
                      <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Total CVEs Eliminated</Content>
                      <Flex justifyContent={{ default: 'justifyContentCenter' }} alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginTop: '8px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--pf-t--global--icon--color--status--success--default)' }}>3,847</span>
                        <span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>vs 3,850 in upstream</span>
                      </Flex>
                    </div>
                  </GridItem>
                  <GridItem span={12} md={4}>
                    <div style={{ textAlign: 'center', padding: 'var(--pf-t--global--spacer--md)', backgroundColor: 'var(--pf-t--global--background--color--secondary--default)', borderRadius: '8px' }}>
                      <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Average Image Size Reduction</Content>
                      <Flex justifyContent={{ default: 'justifyContentCenter' }} alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginTop: '8px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--pf-t--global--icon--color--status--success--default)' }}>94%</span>
                        <span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>smaller</span>
                        <Label color="green" isCompact>~850MB → ~45MB avg</Label>
                      </Flex>
                    </div>
                  </GridItem>
                  <GridItem span={12} md={4}>
                    <div style={{ textAlign: 'center', padding: 'var(--pf-t--global--spacer--md)', backgroundColor: 'var(--pf-t--global--background--color--secondary--default)', borderRadius: '8px' }}>
                      <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Security Score Improvement</Content>
                      <Flex justifyContent={{ default: 'justifyContentCenter' }} alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginTop: '8px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--pf-t--global--icon--color--status--success--default)' }}>A+</span>
                        <span style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>vs</span>
                        <span style={{ fontSize: '1rem', color: 'var(--pf-t--global--icon--color--status--danger--default)' }}>C- upstream avg</span>
                      </Flex>
                    </div>
                  </GridItem>
                </Grid>
              </div>
            </CompassPanel>

            {/* Middle Row - Activity Chart and Recent Resolutions */}
            <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
              <GridItem span={12} md={5}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} alignItems={{ default: 'alignItemsCenter' }}>
                      <Content component="h3" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TachometerAltIcon /> Resolution activity
                      </Content>
                      <Button variant="plain" aria-label="More options">⋮</Button>
                    </Flex>
                    {/* Simple SVG Line Chart */}
                    <div style={{ marginTop: 'var(--pf-t--global--spacer--md)', position: 'relative', height: '180px' }}>
                      <svg width="100%" height="180" viewBox="0 0 300 180" preserveAspectRatio="xMidYMid meet">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <line key={`h-${i}`} x1="30" y1={20 + i * 14} x2="290" y2={20 + i * 14} stroke="#e0e0e0" strokeWidth="1" />
                        ))}
                        {/* Y-axis labels */}
                        {[10, 8, 6, 4, 2, 0].map((val, i) => (
                          <text key={`y-${i}`} x="20" y={28 + i * 28} fontSize="10" fill="#666" textAnchor="end">{val}</text>
                        ))}
                        {/* X-axis labels */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, i) => (
                          <text key={`x-${i}`} x={55 + i * 25} y="170" fontSize="10" fill="#666" textAnchor="middle">{val}</text>
                        ))}
                        {/* Line 1 - CVEs Resolved (solid blue) */}
                        <polyline
                          fill="none"
                          stroke="#0066CC"
                          strokeWidth="2"
                          points="55,76 80,62 105,48 130,62 155,76 180,62 205,48 230,62 255,76 280,48"
                        />
                        {/* Line 2 - Target (dashed yellow) */}
                        <polyline
                          fill="none"
                          stroke="#F0AB00"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          points="55,90 80,76 105,90 130,76 155,90 180,76 205,90 230,76 255,62 280,76"
                        />
                        {/* Line 3 - Images Updated (teal) */}
                        <polyline
                          fill="none"
                          stroke="#009596"
                          strokeWidth="2"
                          points="55,118 80,104 105,118 130,104 155,118 180,104 205,90 230,104 255,104 280,90"
                        />
                      </svg>
                    </div>
                  </div>
                </CompassPanel>
              </GridItem>
              <GridItem span={12} md={7}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                    <Content component="h3" style={{ margin: 0, marginBottom: 'var(--pf-t--global--spacer--md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <SyncAltIcon /> Recent resolutions
                    </Content>
                    <Table variant="compact" borders={false}>
                      <Thead>
                        <Tr>
                          <Th>CVE</Th>
                          <Th>Image</Th>
                          <Th>Status</Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td><Button variant="link" isInline>CVE-2026-1234</Button></Td>
                          <Td><Button variant="link" isInline>python-test</Button></Td>
                          <Td><Label color="green" icon={<CheckCircleIcon />}>Resolved</Label></Td>
                          <Td><Button variant="plain" aria-label="More">⋮</Button></Td>
                        </Tr>
                        <Tr>
                          <Td><Button variant="link" isInline>CVE-2026-1235</Button></Td>
                          <Td><Button variant="link" isInline>nodejs-test</Button></Td>
                          <Td><Label color="green" icon={<CheckCircleIcon />}>Resolved</Label></Td>
                          <Td><Button variant="plain" aria-label="More">⋮</Button></Td>
                        </Tr>
                        <Tr>
                          <Td><Button variant="link" isInline>CVE-2026-1236</Button></Td>
                          <Td><Button variant="link" isInline>go-test</Button></Td>
                          <Td><Label color="yellow" icon={<ExclamationTriangleIcon />}>Pending</Label></Td>
                          <Td><Button variant="plain" aria-label="More">⋮</Button></Td>
                        </Tr>
                        <Tr>
                          <Td><Button variant="link" isInline>CVE-2026-1237</Button></Td>
                          <Td><Button variant="link" isInline>nginx-test</Button></Td>
                          <Td><Label color="red" icon={<ExclamationCircleIcon />}>Critical</Label></Td>
                          <Td><Button variant="plain" aria-label="More">⋮</Button></Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </div>
                </CompassPanel>
              </GridItem>
            </Grid>

            {/* Bottom Row - Donut Charts */}
            <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }}>
              <GridItem span={12} md={4}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                    <Content component="h3" style={{ margin: 0, marginBottom: '4px' }}>Resolution Rate</Content>
                    <Label color="green" icon={<CheckCircleIcon />} isCompact>Excellent</Label>
                    {/* Donut Chart SVG */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--pf-t--global--spacer--lg) 0' }}>
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="55" fill="none" stroke="#e0e0e0" strokeWidth="15" />
                        <circle 
                          cx="70" cy="70" r="55" fill="none" 
                          stroke="#3E8635" strokeWidth="15"
                          strokeDasharray={`${0.92 * 345.58} ${345.58}`}
                          strokeDashoffset="86.4"
                          transform="rotate(-90 70 70)"
                        />
                        <text x="70" y="65" textAnchor="middle" fontSize="24" fontWeight="bold">92%</text>
                        <text x="70" y="85" textAnchor="middle" fontSize="11" fill="#666">of CVEs</text>
                      </svg>
                    </div>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                      <FlexItem>
                        <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Resolved</Content>
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>92%</Content>
                      </FlexItem>
                      <FlexItem>
                        <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Pending</Content>
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>8%</Content>
                      </FlexItem>
                    </Flex>
                    <div style={{ marginTop: 'var(--pf-t--global--spacer--sm)', height: '8px', borderRadius: '4px', background: '#e0e0e0', overflow: 'hidden' }}>
                      <div style={{ width: '92%', height: '100%', background: '#3E8635' }} />
                    </div>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Performance</Content>
                      <Label color="green" isCompact>↑ High</Label>
                    </Flex>
                  </div>
                </CompassPanel>
              </GridItem>
              <GridItem span={12} md={4}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                    <Content component="h3" style={{ margin: 0, marginBottom: '4px' }}>Scan Coverage</Content>
                    <Label color="green" icon={<CheckCircleIcon />} isCompact>Complete</Label>
                    {/* Donut Chart SVG */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--pf-t--global--spacer--lg) 0' }}>
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="55" fill="none" stroke="#e0e0e0" strokeWidth="15" />
                        <circle 
                          cx="70" cy="70" r="55" fill="none" 
                          stroke="#3E8635" strokeWidth="15"
                          strokeDasharray={`${1.0 * 345.58} ${345.58}`}
                          strokeDashoffset="86.4"
                          transform="rotate(-90 70 70)"
                        />
                        <text x="70" y="65" textAnchor="middle" fontSize="24" fontWeight="bold">100%</text>
                        <text x="70" y="85" textAnchor="middle" fontSize="11" fill="#666">of images</text>
                      </svg>
                    </div>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                      <FlexItem>
                        <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Scanned</Content>
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>100%</Content>
                      </FlexItem>
                      <FlexItem>
                        <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Unscanned</Content>
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>0%</Content>
                      </FlexItem>
                    </Flex>
                    <div style={{ marginTop: 'var(--pf-t--global--spacer--sm)', height: '8px', borderRadius: '4px', background: '#e0e0e0', overflow: 'hidden' }}>
                      <div style={{ width: '100%', height: '100%', background: '#3E8635' }} />
                    </div>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Coverage</Content>
                      <Label color="green" isCompact>↓ Low Risk</Label>
                    </Flex>
                  </div>
                </CompassPanel>
              </GridItem>
              <GridItem span={12} md={4}>
                <CompassPanel style={{ height: '100%' }}>
                  <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                    <Content component="h3" style={{ margin: 0, marginBottom: '4px' }}>Image Health</Content>
                    <Label color="yellow" icon={<ExclamationTriangleIcon />} isCompact>Attention</Label>
                    {/* Donut Chart SVG */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: 'var(--pf-t--global--spacer--lg) 0' }}>
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="55" fill="none" stroke="#e0e0e0" strokeWidth="15" />
                        <circle 
                          cx="70" cy="70" r="55" fill="none" 
                          stroke="#F0AB00" strokeWidth="15"
                          strokeDasharray={`${0.84 * 345.58} ${345.58}`}
                          strokeDashoffset="86.4"
                          transform="rotate(-90 70 70)"
                        />
                        <text x="70" y="65" textAnchor="middle" fontSize="24" fontWeight="bold">84%</text>
                        <text x="70" y="85" textAnchor="middle" fontSize="11" fill="#666">healthy</text>
                      </svg>
                    </div>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                      <FlexItem>
                        <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Healthy</Content>
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>84%</Content>
                      </FlexItem>
                      <FlexItem>
                        <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>Needs Review</Content>
                        <Content component="p" style={{ margin: 0, fontWeight: 'bold' }}>16%</Content>
                      </FlexItem>
                    </Flex>
                    <div style={{ marginTop: 'var(--pf-t--global--spacer--sm)', height: '8px', borderRadius: '4px', background: '#e0e0e0', overflow: 'hidden' }}>
                      <div style={{ width: '84%', height: '100%', background: '#F0AB00' }} />
                    </div>
                    <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                      <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>Health Score</Content>
                      <Label color="yellow" isCompact>↔ Medium</Label>
                    </Flex>
                  </div>
                </CompassPanel>
              </GridItem>
            </Grid>

            {/* Security Feed Header - floating on background, sticky */}
            <div style={{ 
              position: 'sticky',
              top: 0,
              zIndex: 1,
              paddingBottom: 'var(--pf-t--global--spacer--md)',
            }}>
              <Flex 
                justifyContent={{ default: 'justifyContentSpaceBetween' }} 
                alignItems={{ default: 'alignItemsCenter' }}
                flexWrap={{ default: 'wrap' }}
                gap={{ default: 'gapMd' }}
              >
                <FlexItem>
                  <Content component="h2" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>Security Feed<TypeLabel level="H2-DISPLAY-BOLD" /></Content>
                </FlexItem>
                <FlexItem>
                  <Flex gap={{ default: 'gapMd' }} alignItems={{ default: 'alignItemsFlexEnd' }}>
                    <FlexItem>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ height: '18px' }} /> {/* Spacer to align with labeled dropdown */}
                        <SearchInput
                          placeholder="Search CVE or Package ID"
                          value={searchValue}
                          onChange={(_event, value) => setSearchValue(value)}
                          onClear={() => setSearchValue('')}
                          style={{ width: '200px' }}
                        />
                      </div>
                    </FlexItem>
                    <FlexItem>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: 'var(--pf-t--global--font--size--body--sm)', color: 'var(--pf-t--global--text--color--subtle)' }}>
                          Show results for
                        </label>
                        <Select
                          id="results-filter-select"
                          isOpen={isResultsFilterOpen}
                          selected={resultsFilter}
                          onSelect={(_event, value) => {
                            setResultsFilter(value as 'active' | 'all');
                            setIsResultsFilterOpen(false);
                          }}
                          onOpenChange={setIsResultsFilterOpen}
                          toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                            <MenuToggle
                              ref={toggleRef}
                              onClick={() => setIsResultsFilterOpen(!isResultsFilterOpen)}
                              isExpanded={isResultsFilterOpen}
                              style={{ minWidth: '200px' }}
                            >
                              {resultsFilter === 'active' ? 'Active CVEs' : 'Active and resolved CVEs'}
                            </MenuToggle>
                          )}
                        >
                          <SelectList>
                            <SelectOption value="active" isSelected={resultsFilter === 'active'}>Active CVEs</SelectOption>
                            <SelectOption value="all" isSelected={resultsFilter === 'all'}>Active and resolved CVEs</SelectOption>
                          </SelectList>
                        </Select>
                      </div>
                    </FlexItem>
                  </Flex>
                </FlexItem>
              </Flex>
            </div>

            {/* Table Panel */}
            <CompassPanel className="pf-m-no-padding">
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Content component="p" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--default)' }}>
                  This is an ongoing list of CVEs Project Hummingbird is tracking<TypeLabel level="BODY" />
                </Content>
                <Table variant="compact" borders={false}>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th sort={getSortParams(1)}>Severity</Th>
                      <Th>Affected package</Th>
                      <Th sort={getSortParams(3)}>Status</Th>
                      <Th>Published</Th>
                      <Th>Last Update</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sortedData.map((row, index) => (
                      <Tr key={index}>
                        <Td dataLabel="Name">
                          <Button 
                            variant="link" 
                            isInline 
                            onClick={() => onCveClick(row)}
                          >
                            {row.cveId}
                          </Button>
                        </Td>
                        <Td dataLabel="Severity">
                          <SeverityLabel severity={row.severity} />
                        </Td>
                        <Td dataLabel="Affected package">
                          {row.affectedPackage}
                        </Td>
                        <Td dataLabel="Status">
                          <StatusLabel status={row.status} />
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
              </div>
            </CompassPanel>
      </CompassContent>

      {/* Drawer overlay - positioned fixed to cover entire viewport */}
      {isDrawerExpanded && (
        <>
          {/* Backdrop */}
          <div 
            onClick={onCloseDrawer}
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
          {/* Drawer panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '400px',
            backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
            boxShadow: 'var(--pf-t--global--box-shadow--lg)',
            zIndex: 501,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: 'var(--pf-t--global--spacer--lg)',
              borderBottom: '1px solid var(--pf-t--global--border--color--default)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <div>
                <Content component="h2" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
                  {selectedCve?.cveId}<TypeLabel level="H2-DISPLAY-BOLD" />
                </Content>
                <Content component="p" style={{ margin: 0, marginTop: 'var(--pf-t--global--spacer--sm)', color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                  {selectedCve && `${selectedCve.severity.charAt(0).toUpperCase() + selectedCve.severity.slice(1)} severity vulnerability in ${selectedCve.affectedPackage}`}<TypeLabel level="SM" />
                </Content>
              </div>
              <Button variant="plain" aria-label="Close drawer" onClick={onCloseDrawer}>
                <TimesIcon />
              </Button>
            </div>
            {/* Drawer Body */}
            <div style={{
              padding: 'var(--pf-t--global--spacer--lg)',
              flex: 1,
              overflowY: 'auto',
            }}>
              <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>
                Drawer panel body content
              </Content>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { SecurityFeed };
