import * as React from 'react';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  ClipboardCopy,
  CompassContent,
  CompassPanel,
  Content,
  Flex,
  FlexItem,
  FormGroup,
  Grid,
  GridItem,
  Label,
  Progress,
  ProgressSize,
  ProgressVariant,
  Stack,
  StackItem,
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
      {/* Breadcrumb navigation */}
      <Breadcrumb style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
        <BreadcrumbItem>
          <a href="#">Back to Catalog</a>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Page Title - wrapped in CompassPanel for background styling */}
      <CompassPanel style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
          <FlexItem>
            <Content component="h1">Python</Content>
          </FlexItem>
          <FlexItem>
            <Label color="green" icon={<CheckCircleIcon />}>0 CVE's</Label>
          </FlexItem>
        </Flex>
        <p style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>
          Distributed by <strong>Red Hat</strong>
        </p>
      </CompassPanel>

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
            kebabItems={[
              { key: "copy", label: "Copy image reference" },
              { key: "docs", label: "View documentation" },
              { key: "source", label: "View source" },
            ]}
          >
            <Stack hasGutter>
              <StackItem>
                <FormGroup label="Pull this image" fieldId="pull-command">
                  <ClipboardCopy isReadOnly>docker pull registry.redhat.io/ubi9/python-311</ClipboardCopy>
                </FormGroup>
              </StackItem>
              <StackItem>
                <FormGroup label="Image reference" fieldId="image-ref">
                  <ClipboardCopy isReadOnly>registry.redhat.io/ubi9/python-311:latest</ClipboardCopy>
                </FormGroup>
              </StackItem>
            </Stack>
          </ActionPanelCard>
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

        {/* Documentation */}
        <GridItem lg={6} md={12} sm={12}>
          <ActionPanelCard
            title="Documentation"
            primaryAction={{
              label: "Copy All",
              onClick: () => console.log('Copy all clicked'),
              showExternalIcon: false,
            }}
          >
            <Stack hasGutter>
              <StackItem>
                <div style={{ marginBottom: '0.5rem' }}>CPU Usage</div>
                <Progress value={45} title="CPU" size={ProgressSize.sm} />
              </StackItem>
              <StackItem>
                <div style={{ marginBottom: '0.5rem' }}>Memory</div>
                <Progress value={51} title="Memory" size={ProgressSize.sm} variant={ProgressVariant.warning} />
              </StackItem>
              <StackItem>
                <div style={{ marginBottom: '0.5rem' }}>Storage</div>
                <Progress value={78} title="Storage" size={ProgressSize.sm} variant={ProgressVariant.danger} />
              </StackItem>
              <StackItem>
                <div style={{ marginBottom: '0.5rem' }}>Network</div>
                <Progress value={32} title="Network" size={ProgressSize.sm} variant={ProgressVariant.success} />
              </StackItem>
            </Stack>
          </ActionPanelCard>
        </GridItem>
      </Grid>
    </CompassContent>
  </>
  );
};

export { Dashboard };
