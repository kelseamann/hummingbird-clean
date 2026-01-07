import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
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
  SearchInput,
  Stack,
  StackItem,
  Tab,
  Tabs,
  TabTitleText,
  Title,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ShieldAltIcon,
  TimesCircleIcon,
  ThumbsUpIcon,
} from '@patternfly/react-icons';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import { ActionPanelCard } from '../components/ActionPanelCard';

// SBOM packages data
const sbomPackages = [
  { name: 'python', version: '3.11.6' },
  { name: 'openssl', version: '3.0.8' },
  { name: 'pip', version: '23.3.1' },
  { name: 'setuptools', version: '68.2.2' },
  { name: 'wheel', version: '0.41.2' },
  { name: 'glibc', version: '2.34' },
  { name: 'libffi', version: '3.4.4' },
  { name: 'zlib', version: '1.2.13' },
  { name: 'sqlite', version: '3.42.0' },
  { name: 'ncurses', version: '6.4' },
  { name: 'readline', version: '8.2' },
  { name: 'bzip2', version: '1.0.8' },
  { name: 'xz', version: '5.4.3' },
  { name: 'libexpat', version: '2.5.0' },
  { name: 'libxml2', version: '2.10.4' },
  { name: 'ca-certificates', version: '2023.08' },
  { name: 'tzdata', version: '2023c' },
  { name: 'bash', version: '5.2.15' },
  { name: 'coreutils', version: '9.3' },
  { name: 'grep', version: '3.11' },
  { name: 'gawk', version: '5.2.2' },
  { name: 'sed', version: '4.9' },
  { name: 'tar', version: '1.35' },
  { name: 'gzip', version: '1.12' },
  { name: 'curl', version: '8.2.1' },
  { name: 'libcurl', version: '8.2.1' },
  { name: 'git', version: '2.41.0' },
  { name: 'openssh', version: '9.3p2' },
  { name: 'gnupg', version: '2.4.3' },
  { name: 'libgcrypt', version: '1.10.2' },
  { name: 'libgpg-error', version: '1.47' },
  { name: 'krb5', version: '1.21' },
  { name: 'cyrus-sasl', version: '2.1.28' },
  { name: 'ldns', version: '1.8.3' },
  { name: 'libevent', version: '2.1.12' },
  { name: 'libuv', version: '1.46.0' },
  { name: 'libev', version: '4.33' },
  { name: 'pcre2', version: '10.42' },
  { name: 'icu', version: '73.2' },
  { name: 'libidn2', version: '2.3.4' },
  { name: 'libunistring', version: '1.1' },
  { name: 'libpsl', version: '0.21.2' },
  { name: 'nghttp2', version: '1.55.1' },
  { name: 'brotli', version: '1.0.9' },
  { name: 'zstd', version: '1.5.5' },
  { name: 'lz4', version: '1.9.4' },
  { name: 'libssh2', version: '1.11.0' },
  { name: 'libpng', version: '1.6.40' },
  { name: 'libjpeg-turbo', version: '3.0.0' },
  { name: 'freetype', version: '2.13.1' },
  { name: 'fontconfig', version: '2.14.2' },
  { name: 'harfbuzz', version: '8.1.1' },
  { name: 'pango', version: '1.51.0' },
  { name: 'cairo', version: '1.17.8' },
  { name: 'pixman', version: '0.42.2' },
  { name: 'glib', version: '2.78.0' },
  { name: 'dbus', version: '1.14.8' },
  { name: 'systemd-libs', version: '254' },
];

// Compatibility table data
type CompatStatus = 'compatible' | 'incompatible' | 'note';
interface CompatRow {
  property: string;
  status: CompatStatus;
  noteNumber?: number;
  hummingbird: string;
  upstream: string;
}

const compatibilityData: CompatRow[] = [
  { property: 'cmd', status: 'compatible', hummingbird: 'python3', upstream: 'python3' },
  { property: 'compressed_size_mb', status: 'compatible', hummingbird: '39', upstream: '394' },
  { property: 'entrypoint', status: 'compatible', hummingbird: '-', upstream: '-' },
  { property: 'env.HOME', status: 'incompatible', hummingbird: '/tmp', upstream: '-' },
  { property: 'env.PATH', status: 'note', noteNumber: 1, hummingbird: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin', upstream: '/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' },
  { property: 'env.PYTHON_SHA256', status: 'note', noteNumber: 2, hummingbird: '-', upstream: 'ce543ab854bc256b61b71e9b27f831ffd1bfd60a479d639f8be7f9757cf573e9' },
  { property: 'env.PYTHON_VERSION', status: 'compatible', hummingbird: '3.14.2', upstream: '3.14.2' },
  { property: 'exposed_ports', status: 'compatible', hummingbird: '-', upstream: '-' },
  { property: 'user', status: 'note', noteNumber: 3, hummingbird: '65532', upstream: '-' },
  { property: 'volumes', status: 'compatible', hummingbird: '-', upstream: '-' },
  { property: 'workdir', status: 'incompatible', hummingbird: '/tmp', upstream: '/' },
];

const compatibilityNotes = [
  { number: 1, text: 'different ordering, official image is buggy (bin before sbin)' },
  { number: 2, text: 'too hard to dynamically get into the Containerfile' },
  { number: 3, text: 'run workload unprivileged (security and OpenShift compatibility)' },
];

const Dashboard: React.FunctionComponent = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string | number>(0);
  const [sbomSearchValue, setSbomSearchValue] = React.useState('');

  const filteredPackages = sbomPackages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(sbomSearchValue.toLowerCase()) ||
      pkg.version.toLowerCase().includes(sbomSearchValue.toLowerCase())
  );

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
        <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
          <FlexItem>
            <Content component="h1">Python</Content>
          </FlexItem>
          <FlexItem>
            <Label color="green" icon={<CheckCircleIcon />}>0 CVE's</Label>
          </FlexItem>
          <FlexItem>
            <Label color="purple" icon={<ShieldAltIcon />}>FIPS available</Label>
          </FlexItem>
          <FlexItem>
            <Label color="purple" icon={<ShieldAltIcon />}>STIG available</Label>
          </FlexItem>
        </Flex>
        <p style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>
          Distributed by <strong>Red Hat</strong> · Last updated Jan 7, 2026
        </p>
      </CompassPanel>

      <Grid hasGutter>
        {/* Get Started */}
        <GridItem lg={4} md={12} sm={12}>
          <ActionPanelCard
            title="Get Started"
            primaryAction={{
              label: "Upstream source",
              href: "https://hub.docker.com/_/python",
            }}
            secondaryAction={{
              label: "GitLab",
              href: "https://gitlab.com/redhat/hummingbird",
            }}
          >
            <Stack hasGutter>
              <StackItem>
                <FormGroup label="Podman" fieldId="podman-pull">
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <FlexItem grow={{ default: 'grow' }}>
                      <ClipboardCopy isReadOnly>podman pull registry.redhat.io/ubi9/python-311</ClipboardCopy>
                    </FlexItem>
                    <FlexItem>
                      <span style={{ fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)', whiteSpace: 'nowrap' }}>47 MB</span>
                    </FlexItem>
                  </Flex>
                </FormGroup>
              </StackItem>
              <StackItem>
                <FormGroup label="Docker" fieldId="docker-pull">
                  <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapSm' }}>
                    <FlexItem grow={{ default: 'grow' }}>
                      <ClipboardCopy isReadOnly>docker pull registry.redhat.io/ubi9/python-311</ClipboardCopy>
                    </FlexItem>
                    <FlexItem>
                      <span style={{ fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)', whiteSpace: 'nowrap' }}>47 MB</span>
                    </FlexItem>
                  </Flex>
                </FormGroup>
              </StackItem>
              <StackItem>
                <p style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)' }}>
                  Use a container engine to pull and run this image
                </p>
              </StackItem>
              <StackItem>
                <FormGroup label="Replace with Hummingbird Image" fieldId="hummingbird-image">
                  <ClipboardCopy isReadOnly>FROM registry.redhat.io/hummingbird/default:latest</ClipboardCopy>
                </FormGroup>
                <p style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)', marginTop: '0.5rem' }}>
                  Replace the <code style={{ backgroundColor: 'var(--pf-t--global--background--color--secondary--default)', padding: '0.125rem 0.25rem', borderRadius: '3px' }}>FROM</code> line in your Containerfile or update the <code style={{ backgroundColor: 'var(--pf-t--global--background--color--secondary--default)', padding: '0.125rem 0.25rem', borderRadius: '3px' }}>image:</code> field in your Kubernetes/OpenShift deployment YAML.
                </p>
              </StackItem>
            </Stack>
          </ActionPanelCard>
        </GridItem>

        {/* Documentation */}
        <GridItem lg={4} md={12} sm={12}>
          <ActionPanelCard
            title="Documentation"
          >
            <Tabs
              activeKey={activeTabKey}
              onSelect={(_event, tabIndex) => setActiveTabKey(tabIndex)}
            >
              <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>}>
                <div style={{ padding: '1rem 0', maxHeight: '400px', overflowY: 'auto' }}>
                  <Flex direction={{ default: 'column' }} gap={{ default: 'gapMd' }}>
                    <FlexItem>
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        Manifest Digest
                      </div>
                      <ClipboardCopy isReadOnly variant="inline-compact">
                        sha256:a3b5c9d7e2f1a0b8c6d4e2f0a8b6c4d2e0f8a6b4
                      </ClipboardCopy>
                    </FlexItem>
                    <FlexItem>
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        Licenses
                      </div>
                      <Flex gap={{ default: 'gapSm' }} wrap={{ default: 'wrap' }}>
                        <FlexItem><Label isCompact>MIT</Label></FlexItem>
                        <FlexItem><Label isCompact>Apache-2.0</Label></FlexItem>
                        <FlexItem><Label isCompact>PSF-2.0</Label></FlexItem>
                      </Flex>
                    </FlexItem>
                    <FlexItem>
                      <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        Compatibility Info
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)', marginBottom: '0.75rem' }}>
                        Hummingbird images are designed for compatibility with popular images from Docker Hub, Red Hat UBI, and other registries, enabling straightforward migration of existing workloads.
                      </p>
                      <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)' }}>
                          Architectures
                        </div>
                        <Flex gap={{ default: 'gapSm' }} wrap={{ default: 'wrap' }}>
                          <FlexItem><Label isCompact color="blue">x86_64</Label></FlexItem>
                          <FlexItem><Label isCompact color="blue">arm64</Label></FlexItem>
                        </Flex>
                      </div>
                      <div>
                        <div style={{ marginBottom: '0.25rem', fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)' }}>
                          Other
                        </div>
                        <Flex gap={{ default: 'gapSm' }} wrap={{ default: 'wrap' }}>
                          <FlexItem><Label isCompact color="purple">RHEL 9</Label></FlexItem>
                          <FlexItem><Label isCompact color="purple">OpenShift 4.14+</Label></FlexItem>
                        </Flex>
                      </div>
                    </FlexItem>
                  </Flex>
                </div>
              </Tab>
              <Tab eventKey={1} title={<TabTitleText>SBOM</TabTitleText>}>
                <div style={{ padding: '1rem 0', maxHeight: '400px', overflowY: 'auto' }}>
                  <SearchInput
                    placeholder="Search packages..."
                    value={sbomSearchValue}
                    onChange={(_event, value) => setSbomSearchValue(value)}
                    onClear={() => setSbomSearchValue('')}
                    style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}
                  />
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Table variant="compact" borders={false}>
                      <Thead>
                        <Tr>
                          <Th>Package</Th>
                          <Th>Version</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredPackages.map((pkg) => (
                          <Tr key={pkg.name}>
                            <Td>{pkg.name}</Td>
                            <Td>{pkg.version}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)', marginTop: 'var(--pf-t--global--spacer--sm)' }}>
                    {filteredPackages.length} of {sbomPackages.length} packages
                  </p>
                </div>
              </Tab>
              <Tab eventKey={2} title={<TabTitleText>Attestation</TabTitleText>}>
                <div style={{ padding: '1rem 0', maxHeight: '400px', overflowY: 'auto' }}>
                  <Stack hasGutter>
                    <StackItem>
                      <p style={{ fontSize: '0.875rem', marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <strong>1. Verify the image signature</strong>
                      </p>
                      <ClipboardCopy isReadOnly>
                        cosign verify --key cosign.pub registry.redhat.io/ubi9/python-311
                      </ClipboardCopy>
                    </StackItem>
                    <StackItem>
                      <p style={{ fontSize: '0.875rem', marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <strong>2. Download the attestation</strong>
                      </p>
                      <ClipboardCopy isReadOnly>
                        cosign download attestation registry.redhat.io/ubi9/python-311 | jq -r .payload | base64 -d | jq
                      </ClipboardCopy>
                    </StackItem>
                    <StackItem>
                      <p style={{ fontSize: '0.875rem', marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <strong>3. Verify SLSA provenance</strong>
                      </p>
                      <ClipboardCopy isReadOnly>
                        slsa-verifier verify-image registry.redhat.io/ubi9/python-311 --source-uri github.com/redhat/ubi9
                      </ClipboardCopy>
                    </StackItem>
                    <StackItem>
                      <p style={{ fontSize: '0.875rem', marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <strong>4. Extract SBOM from attestation</strong>
                      </p>
                      <ClipboardCopy isReadOnly>
                        cosign download sbom registry.redhat.io/ubi9/python-311 &gt; sbom.spdx.json
                      </ClipboardCopy>
                    </StackItem>
                    <StackItem>
                      <p style={{ fontSize: '0.875rem', marginBottom: 'var(--pf-t--global--spacer--sm)' }}>
                        <strong>5. View attestation predicates</strong>
                      </p>
                      <ClipboardCopy isReadOnly>
                        cosign verify-attestation --type slsaprovenance --key cosign.pub registry.redhat.io/ubi9/python-311
                      </ClipboardCopy>
                    </StackItem>
                  </Stack>
                </div>
              </Tab>
              <Tab eventKey={3} title={<TabTitleText>Compatibility</TabTitleText>}>
                <div style={{ padding: '1rem 0', maxHeight: '400px', overflowY: 'auto' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <Table variant="compact" borders>
                      <Thead>
                        <Tr>
                          <Th>Compat</Th>
                          <Th>Property</Th>
                          <Th><code style={{ fontSize: '0.75rem' }}>quay.io/hummingbird/python:3</code></Th>
                          <Th><code style={{ fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)' }}>docker.io/python:latest</code></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {compatibilityData.map((row, index) => (
                          <Tr key={index}>
                            <Td>
                              {row.status === 'compatible' && (
                                <CheckCircleIcon color="var(--pf-t--global--icon--color--status--success--default)" />
                              )}
                              {row.status === 'incompatible' && (
                                <TimesCircleIcon color="var(--pf-t--global--icon--color--status--danger--default)" />
                              )}
                              {row.status === 'note' && (
                                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '2px' }}>
                                  <ThumbsUpIcon color="var(--pf-t--global--icon--color--status--warning--default)" />
                                  <sup style={{ fontSize: '0.625rem' }}>{row.noteNumber}</sup>
                                </span>
                              )}
                            </Td>
                            <Td>{row.property}</Td>
                            <Td style={{ fontSize: '0.75rem', fontFamily: 'var(--pf-t--global--font--family--mono)', wordBreak: 'break-all' }}>{row.hummingbird}</Td>
                            <Td style={{ fontSize: '0.75rem', fontFamily: 'var(--pf-t--global--font--family--mono)', wordBreak: 'break-all', color: 'var(--pf-t--global--text--color--subtle)' }}>{row.upstream}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </div>
                  <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--pf-t--global--text--color--subtle)' }}>
                    {compatibilityNotes.map((note) => (
                      <p key={note.number} style={{ marginBottom: '0.25rem' }}>
                        {note.number}. {note.text}
                      </p>
                    ))}
                  </div>
                </div>
              </Tab>
            </Tabs>
          </ActionPanelCard>
        </GridItem>

        {/* Vulnerabilities + Get in Touch */}
        <GridItem lg={4} md={12} sm={12}>
          <Stack hasGutter>
            <StackItem>
              <ActionPanelCard
                title="Vulnerabilities"
                primaryAction={{
                  label: "Advisories",
                  href: "#advisories",
                }}
              >
                <div style={{
                  backgroundColor: 'var(--pf-t--global--color--status--success--default)',
                  color: 'var(--pf-t--global--text--color--on-status--success--default)',
                  padding: 'var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--md)',
                  borderRadius: 'var(--pf-t--global--border--radius--small)',
                  marginBottom: 'var(--pf-t--global--spacer--md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--pf-t--global--spacer--sm)',
                }}>
                  <CheckCircleIcon />
                  <strong>0 CVE's</strong>
                  <span style={{ fontWeight: 'normal', opacity: 0.85 }}>Last scanned XX:XX:XX ago</span>
                </div>
                <Table variant="compact">
                  <Thead>
                    <Tr>
                      <Th>CVE ID</Th>
                      <Th>Status</Th>
                      <Th>Last Update</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>CVE-2024-1234</Td>
                      <Td><Label color="green" icon={<CheckCircleIcon />} isCompact>Resolved</Label></Td>
                      <Td>Nov 26, 10:30 AM</Td>
                    </Tr>
                    <Tr>
                      <Td>CVE-2024-5678</Td>
                      <Td><Label color="green" icon={<CheckCircleIcon />} isCompact>Resolved</Label></Td>
                      <Td>Nov 25, 3:45 PM</Td>
                    </Tr>
                    <Tr>
                      <Td>CVE-2024-9012</Td>
                      <Td><Label color="green" icon={<CheckCircleIcon />} isCompact>Resolved</Label></Td>
                      <Td>Nov 24, 9:15 AM</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </ActionPanelCard>
            </StackItem>
            <StackItem>
              <ActionPanelCard title="Get in Touch">
                <Flex gap={{ default: 'gapSm' }} flexWrap={{ default: 'wrap' }}>
                  <FlexItem>
                    <Button variant="secondary" size="sm" component="a" href="mailto:support@redhat.com">
                      Contact Us
                    </Button>
                  </FlexItem>
                  <FlexItem>
                    <Button variant="secondary" size="sm" component="a" href="#feedback">
                      Provide Feedback
                    </Button>
                  </FlexItem>
                  <FlexItem>
                    <Button variant="primary" size="sm" component="a" href="#request-image">
                      Request an Image
                    </Button>
                  </FlexItem>
                </Flex>
              </ActionPanelCard>
            </StackItem>
          </Stack>
        </GridItem>

      </Grid>
    </CompassContent>
  </>
  );
};

export { Dashboard };
