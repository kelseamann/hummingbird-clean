import * as React from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CompassContent,
  CompassPanel,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  MenuToggle,
  Progress,
  ProgressSize,
  ProgressVariant,
  Title,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  EllipsisVIcon,
  ExclamationTriangleIcon,
  ExternalLinkAltIcon,
  InfoCircleIcon,
} from '@patternfly/react-icons';

const Dashboard: React.FunctionComponent = () => {
  const [isKebabOpen, setIsKebabOpen] = React.useState(false);

  const onKebabToggle = () => {
    setIsKebabOpen(!isKebabOpen);
  };

  const onKebabSelect = () => {
    setIsKebabOpen(false);
  };

  const kebabDropdownItems = (
    <DropdownList>
      <DropdownItem key="copy">Copy image reference</DropdownItem>
      <DropdownItem key="docs" to="https://docs.python.org" target="_blank">
        View documentation <ExternalLinkAltIcon />
      </DropdownItem>
      <DropdownItem key="github" to="https://github.com/python/cpython" target="_blank">
        View source <ExternalLinkAltIcon />
      </DropdownItem>
    </DropdownList>
  );

  const headerActions = (
    <Flex gap={{ default: 'gapSm' }}>
      <FlexItem>
        <Button 
          variant="secondary" 
          icon={<ExternalLinkAltIcon />} 
          iconPosition="end"
          component="a"
          href="https://hub.docker.com/_/python"
          target="_blank"
        >
          Upstream source
        </Button>
      </FlexItem>
      <FlexItem>
        <Button 
          variant="secondary" 
          icon={<ExternalLinkAltIcon />} 
          iconPosition="end"
          component="a"
          href="https://github.com/python/cpython"
          target="_blank"
        >
          GitHub
        </Button>
      </FlexItem>
      <FlexItem>
        <Button 
          variant="secondary" 
          icon={<ExternalLinkAltIcon />} 
          iconPosition="end"
          component="a"
          href="https://docs.python.org"
          target="_blank"
        >
          Documentation
        </Button>
      </FlexItem>
      <FlexItem>
        <Dropdown
          isOpen={isKebabOpen}
          onSelect={onKebabSelect}
          onOpenChange={setIsKebabOpen}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              aria-label="Card actions"
              variant="plain"
              onClick={onKebabToggle}
              isExpanded={isKebabOpen}
            >
              <EllipsisVIcon />
            </MenuToggle>
          )}
          popperProps={{ position: 'right' }}
        >
          {kebabDropdownItems}
        </Dropdown>
      </FlexItem>
    </Flex>
  );

  return (
  <>
    <CompassContent>
      <Grid hasGutter>
        {/* Python Section */}
        <GridItem lg={6} md={12} sm={12}>
          <CompassPanel>
            <Card isPlain isFullHeight>
              <CardHeader actions={{ actions: headerActions }}>
                <Flex direction={{ default: 'column' }} gap={{ default: 'gapXs' }}>
                  <FlexItem>
                    <Title headingLevel="h2" size="2xl">Python</Title>
                  </FlexItem>
                  <FlexItem>
                    <span style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)' }}>
                      Distributed by <strong>Red Hat</strong>
                    </span>
                  </FlexItem>
                </Flex>
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </CompassPanel>
        </GridItem>
        <GridItem lg={3} md={6} sm={12}>
          <CompassPanel isThinking>
            <Card isPlain isFullHeight>
              <CardTitle>
                <Flex alignItems={{ default: 'alignItemsCenter' }}>
                  <FlexItem>
                    <CheckCircleIcon color="var(--pf-t--global--icon--color--status--success--default)" />
                  </FlexItem>
                  <FlexItem>0 CVE's!</FlexItem>
                </Flex>
              </CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="2xl">
                  0
                </Title>
                <Badge>-100% CVEs</Badge>
              </CardBody>
            </Card>
          </CompassPanel>
        </GridItem>
        <GridItem lg={3} md={6} sm={12}>
          <CompassPanel>
            <Card isPlain isFullHeight>
              <CardTitle>History for this image</CardTitle>
              <CardBody>
                <Title headingLevel="h2" size="2xl">
                  15
                </Title>
                <Badge>-87% CVEs</Badge>
              </CardBody>
            </Card>
          </CompassPanel>
        </GridItem>

        {/* Get Started */}
        <GridItem span={6}>
          <CompassPanel>
            <Card isPlain isFullHeight>
              <CardTitle>Get Started</CardTitle>
              <CardBody>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>CPU Usage</div>
                  <Progress value={45} title="CPU" size={ProgressSize.sm} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>Memory</div>
                  <Progress value={51} title="Memory" size={ProgressSize.sm} variant={ProgressVariant.warning} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>Storage</div>
                  <Progress value={78} title="Storage" size={ProgressSize.sm} variant={ProgressVariant.danger} />
                </div>
                <div>
                  <div style={{ marginBottom: '0.5rem' }}>Network</div>
                  <Progress value={32} title="Network" size={ProgressSize.sm} variant={ProgressVariant.success} />
                </div>
              </CardBody>
            </Card>
          </CompassPanel>
        </GridItem>

        {/* AI Migration Instructions */}
        <GridItem span={6}>
          <CompassPanel>
            <Card isPlain isFullHeight>
              <CardTitle>AI Migration Instructions</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Hostname</DescriptionListTerm>
                    <DescriptionListDescription>prod-server-01</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>IP Address</DescriptionListTerm>
                    <DescriptionListDescription>192.168.1.100</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Operating System</DescriptionListTerm>
                    <DescriptionListDescription>Red Hat Enterprise Linux 9.2</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Uptime</DescriptionListTerm>
                    <DescriptionListDescription>15 days, 7 hours, 23 minutes</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Last Backup</DescriptionListTerm>
                    <DescriptionListDescription>2 hours ago</DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </CompassPanel>
        </GridItem>
      </Grid>
    </CompassContent>
  </>
  );
};

export { Dashboard };
