import * as React from 'react';
import {
  Button,
  CompassPanel,
  Content,
  ExpandableSection,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import {
  TimesIcon,
  QuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
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

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is Hummingbird?',
    answer: (
      <>
        <p>Hummingbird is Red Hat&apos;s initiative to provide hardened, minimal container images. These images are designed to be secure, lightweight, and optimized for production workloads.</p>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>Key benefits include:</p>
        <ul style={{ marginTop: 'var(--pf-t--global--spacer--xs)', paddingLeft: 'var(--pf-t--global--spacer--lg)' }}>
          <li>Minimal attack surface with only essential packages</li>
          <li>Regular security scanning and updates</li>
          <li>FIPS compliance options</li>
          <li>Optimized for containerized environments</li>
        </ul>
      </>
    ),
  },
  {
    question: 'How do I pull a Hummingbird image?',
    answer: (
      <>
        <p>You can pull Hummingbird images using either podman or docker:</p>
        <pre style={{ 
          backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
          padding: 'var(--pf-t--global--spacer--md)',
          borderRadius: 'var(--pf-t--global--border--radius--small)',
          marginTop: 'var(--pf-t--global--spacer--sm)',
          overflow: 'auto',
        }}>
          podman pull registry.access.redhat.com/hummingbird/python:latest
        </pre>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>
          Or with docker:
        </p>
        <pre style={{ 
          backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
          padding: 'var(--pf-t--global--spacer--md)',
          borderRadius: 'var(--pf-t--global--border--radius--small)',
          marginTop: 'var(--pf-t--global--spacer--sm)',
          overflow: 'auto',
        }}>
          docker pull registry.access.redhat.com/hummingbird/python:latest
        </pre>
      </>
    ),
  },
  {
    question: 'What is the difference between base images and builder images?',
    answer: (
      <>
        <p><strong>Base images</strong> (e.g., <code>python:latest</code>) are minimal images containing only the runtime and essential dependencies. They are optimized for production deployments.</p>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}><strong>Builder images</strong> (e.g., <code>python:latest-builder</code>) include additional tools like:</p>
        <ul style={{ marginTop: 'var(--pf-t--global--spacer--xs)', paddingLeft: 'var(--pf-t--global--spacer--lg)' }}>
          <li>Package managers (pip, npm, etc.)</li>
          <li>Shell access</li>
          <li>Build tools and compilers</li>
        </ul>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>Use builder images during development and CI/CD, then switch to base images for production.</p>
      </>
    ),
  },
  {
    question: 'What are FIPS-compliant images?',
    answer: (
      <>
        <p>FIPS (Federal Information Processing Standards) compliant images use cryptographic modules that have been validated against FIPS 140-2/140-3 standards.</p>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>These images are required for:</p>
        <ul style={{ marginTop: 'var(--pf-t--global--spacer--xs)', paddingLeft: 'var(--pf-t--global--spacer--lg)' }}>
          <li>U.S. government agencies</li>
          <li>Government contractors</li>
          <li>Organizations with strict security compliance requirements</li>
        </ul>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>FIPS images are indicated with the <strong>FIPS Available</strong> badge.</p>
      </>
    ),
  },
  {
    question: 'How do I verify an image signature?',
    answer: (
      <>
        <p>Hummingbird images are signed using cosign. To verify an image:</p>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>1. Save the public key to a file:</p>
        <pre style={{ 
          backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
          padding: 'var(--pf-t--global--spacer--md)',
          borderRadius: 'var(--pf-t--global--border--radius--small)',
          marginTop: 'var(--pf-t--global--spacer--sm)',
          overflow: 'auto',
          fontSize: 'var(--pf-t--global--font--size--body--sm)',
        }}>
{`-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEtYRltxRJvXLMpXT+pIIu86CLhDP7
Q6VznCXqlzV3A04AK/ge/HYtv6wMPfe4NHP3VQkCWoUokegC926FB+MTyA==
-----END PUBLIC KEY-----`}
        </pre>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>2. Run cosign verify:</p>
        <pre style={{ 
          backgroundColor: 'var(--pf-t--global--background--color--secondary--default)',
          padding: 'var(--pf-t--global--spacer--md)',
          borderRadius: 'var(--pf-t--global--border--radius--small)',
          marginTop: 'var(--pf-t--global--spacer--sm)',
          overflow: 'auto',
        }}>
          cosign verify --key key.pub --insecure-ignore-tlog registry.access.redhat.com/hummingbird/python:latest
        </pre>
      </>
    ),
  },
  {
    question: 'How often are images scanned for vulnerabilities?',
    answer: (
      <>
        <p>Hummingbird images are scanned continuously:</p>
        <ul style={{ marginTop: 'var(--pf-t--global--spacer--sm)', paddingLeft: 'var(--pf-t--global--spacer--lg)' }}>
          <li><strong>On build:</strong> Every image is scanned before release</li>
          <li><strong>Daily:</strong> All published images are rescanned against updated vulnerability databases</li>
          <li><strong>On CVE disclosure:</strong> Priority scans when new critical vulnerabilities are disclosed</li>
        </ul>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>Scan results are available in the Security Feed and each image&apos;s detail page.</p>
      </>
    ),
  },
  {
    question: 'How do I request a new image?',
    answer: (
      <>
        <p>If you need an image that isn&apos;t currently available, you can request one:</p>
        <ol style={{ marginTop: 'var(--pf-t--global--spacer--sm)', paddingLeft: 'var(--pf-t--global--spacer--lg)' }}>
          <li>Click the <strong>+</strong> button in the bottom-right corner of the screen</li>
          <li>Fill out the Jira request form with details about the image you need</li>
          <li>Our team will review your request and prioritize accordingly</li>
        </ol>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>Popular requests are more likely to be prioritized, so feel free to share your request with colleagues!</p>
      </>
    ),
  },
  {
    question: 'How do I provide feedback?',
    answer: (
      <>
        <p>We welcome your feedback! You can reach us through:</p>
        <ul style={{ marginTop: 'var(--pf-t--global--spacer--sm)', paddingLeft: 'var(--pf-t--global--spacer--lg)' }}>
          <li><strong>Email:</strong> <a href="mailto:hummingbird-feedback@redhat.com">hummingbird-feedback@redhat.com</a></li>
          <li><strong>Feedback button:</strong> Click the chat icon in the bottom-right corner</li>
        </ul>
        <p style={{ marginTop: 'var(--pf-t--global--spacer--sm)' }}>Your feedback helps us improve Hummingbird for everyone!</p>
      </>
    ),
  },
];

interface FAQDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQDrawer: React.FC<FAQDrawerProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set([0]));

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
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
      {/* Floating close button */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(85vh + 12px)',
        right: 'calc(12.5% + 24px)',
        zIndex: 502,
      }}>
        <Button
          variant="plain"
          aria-label="Close panel"
          onClick={onClose}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
            boxShadow: 'var(--pf-t--global--box-shadow--lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TimesIcon />
        </Button>
      </div>
      {/* Bottom panel */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '87.5%',
        height: '85vh',
        backgroundColor: 'var(--pf-t--global--background--color--primary--default)',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        boxShadow: 'var(--pf-t--global--box-shadow--lg)',
        zIndex: 501,
        overflowY: 'auto',
      }}>
        <div style={{ padding: 'var(--pf-t--global--spacer--xl)' }}>
          {/* Header */}
          <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapLg' }} style={{ marginBottom: 'var(--pf-t--global--spacer--xl)' }}>
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
                <QuestionCircleIcon style={{ fontSize: '2rem', color: 'var(--pf-t--global--icon--color--status--info--default)' }} />
              </div>
            </FlexItem>
            <FlexItem flex={{ default: 'flex_1' }}>
              <Content component="p" style={{ margin: 0, color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                Hummingbird Documentation<TypeLabel level="SM" />
              </Content>
              <Content component="h1" style={{ margin: 0, marginTop: 'var(--pf-t--global--spacer--xs)', fontSize: 'var(--pf-t--global--font--size--heading--h1)' }}>
                Frequently Asked Questions<TypeLabel level="H1-DISPLAY-BOLD" />
              </Content>
            </FlexItem>
            <FlexItem>
              <Button 
                variant="link" 
                component="a" 
                href="https://gitlab.com/redhat/hummingbird/containers" 
                target="_blank"
                icon={<ExternalLinkAltIcon />}
                iconPosition="end"
              >
                Full Documentation
              </Button>
            </FlexItem>
          </Flex>

          {/* FAQ Items */}
          <CompassPanel>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              {faqItems.map((item, index) => (
                <ExpandableSection
                  key={index}
                  toggleText={item.question}
                  onToggle={() => toggleItem(index)}
                  isExpanded={expandedItems.has(index)}
                  style={{
                    borderBottom: index < faqItems.length - 1 ? '1px solid var(--pf-t--global--border--color--default)' : 'none',
                    paddingBottom: 'var(--pf-t--global--spacer--md)',
                    marginBottom: 'var(--pf-t--global--spacer--md)',
                  }}
                >
                  <div style={{ 
                    padding: 'var(--pf-t--global--spacer--md)',
                    color: 'var(--pf-t--global--text--color--regular)',
                    lineHeight: '1.6',
                  }}>
                    {item.answer}
                  </div>
                </ExpandableSection>
              ))}
            </div>
          </CompassPanel>

          {/* Additional Resources */}
          <CompassPanel style={{ marginTop: 'var(--pf-t--global--spacer--lg)' }}>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              <Content component="h3" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--heading--h3)' }}>
                Additional Resources<TypeLabel level="H3-DISPLAY-BOLD" />
              </Content>
              <Flex gap={{ default: 'gapMd' }} flexWrap={{ default: 'wrap' }}>
                <FlexItem>
                  <Button 
                    variant="secondary" 
                    component="a" 
                    href="https://gitlab.com/redhat/hummingbird/containers" 
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                  >
                    GitLab Repository
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button 
                    variant="secondary" 
                    component="a" 
                    href="https://access.redhat.com/documentation" 
                    target="_blank"
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                  >
                    Red Hat Documentation
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button 
                    variant="secondary" 
                    component="a" 
                    href="mailto:hummingbird-feedback@redhat.com?subject=Hummingbird%20Support%20Request" 
                    icon={<ExternalLinkAltIcon />}
                    iconPosition="end"
                  >
                    Contact Support
                  </Button>
                </FlexItem>
              </Flex>
            </div>
          </CompassPanel>
        </div>
      </div>
    </>
  );
};

export { FAQDrawer };
