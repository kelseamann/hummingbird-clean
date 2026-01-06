import * as React from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  CompassContent,
  CompassPanel,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Progress,
  ProgressSize,
  ProgressVariant,
  Title,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
} from '@patternfly/react-icons';
import { ActionPanelCard } from '../components/ActionPanelCard';

const Dashboard: React.FunctionComponent = () => {
  return (
  <>
    <CompassContent>
      {/* Page Title */}
      <Content component="h1">Python</Content>
      <p style={{ marginBottom: '1.5rem', color: 'var(--pf-t--global--text--color--subtle)' }}>
        Distributed by <strong>Red Hat</strong>
      </p>

      <Grid hasGutter>
        {/* Get Started Section - Using ActionPanelCard component */}
        <GridItem lg={6} md={12} sm={12}>
          <ActionPanelCard
            title="Get Started"
            primaryAction={{
              label: "Upstream source",
              href: "https://hub.docker.com/_/python",
            }}
            secondaryAction={{
              label: "GitHub",
              href: "https://github.com/python/cpython",
            }}
            tertiaryAction={{
              label: "Documentation",
              href: "https://docs.python.org",
            }}
            kebabItems={[
              { key: "copy", label: "Copy image reference" },
              { key: "docs", label: "View documentation" },
              { key: "source", label: "View source" },
            ]}
          />
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
          <ActionPanelCard
            title="History for this image"
            primaryAction={{
              label: "Advisories",
              href: "#advisories",
            }}
          >
            <Title headingLevel="h2" size="2xl">
              15
            </Title>
            <Badge>-87% CVEs</Badge>
          </ActionPanelCard>
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
          <ActionPanelCard
            title="AI Migration Instructions"
            primaryAction={{
              label: "Copy All",
              onClick: () => console.log('Copy all clicked'),
              showExternalIcon: false,
            }}
          >
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
          </ActionPanelCard>
        </GridItem>
      </Grid>
    </CompassContent>
  </>
  );
};

export { Dashboard };
