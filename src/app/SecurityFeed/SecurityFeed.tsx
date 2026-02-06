import * as React from 'react';
import {
  Button,
  CompassContent,
  CompassPanel,
  Content,
  Flex,
  FlexItem,
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
