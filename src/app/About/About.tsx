import * as React from 'react';
import {
  Content,
  Button,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionToggle,
  CompassPanel,
  CompassContent,
} from '@patternfly/react-core';
import {
  ShieldAltIcon,
  CubeIcon,
  ClockIcon,
  LockIcon,
  CodeIcon,
  ExternalLinkAltIcon,
  CheckCircleIcon,
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

const About: React.FunctionComponent = () => {
  const [expanded, setExpanded] = React.useState<string>('faq-1');

  const onToggle = (id: string) => {
    if (id === expanded) {
      setExpanded('');
    } else {
      setExpanded(id);
    }
  };

  const features = [
    {
      icon: <CubeIcon style={{ fontSize: '1.5rem', color: 'var(--pf-t--global--icon--color--status--info--default)' }} />,
      title: 'Minimal Software Footprint',
      description: 'Images include only essential software packages required for the workload, significantly reducing the attack surface and CVEs per image.',
    },
    {
      icon: <ClockIcon style={{ fontSize: '1.5rem', color: 'var(--pf-t--global--icon--color--status--success--default)' }} />,
      title: 'Rapid Update Deployment',
      description: 'Software package updates are shipped as quickly as possible, ensuring that fixes are consumed early.',
    },
    {
      icon: <LockIcon style={{ fontSize: '1.5rem', color: 'var(--pf-t--global--icon--color--status--warning--default)' }} />,
      title: 'Non-Root User Default',
      description: 'Most containers default to a non-root user, increasing security by reducing privileges within the container.',
    },
    {
      icon: <ShieldAltIcon style={{ fontSize: '1.5rem', color: 'var(--pf-t--global--icon--color--status--danger--default)' }} />,
      title: 'Hermetic Build Environment',
      description: 'All containers are built in a hermetic environment without network access, preventing unintended package drift.',
    },
    {
      icon: <CodeIcon style={{ fontSize: '1.5rem', color: 'var(--pf-t--global--icon--color--brand--default)' }} />,
      title: 'Distroless Security',
      description: 'The distroless nature of Hummingbird containers ships only what is strictly necessary, making certain types of attacks impossible.',
    },
  ];

  const faqItems = [
    {
      id: 'faq-1',
      question: 'What is Project Hummingbird?',
      answer: 'Project Hummingbird is an initiative to provide minimal, hardened, and secure container images. Our goal is to reduce the attack surface and ensure rapid updates for critical software components.',
    },
    {
      id: 'faq-2',
      question: 'How are Hummingbird images different from standard container images?',
      answer: 'Hummingbird images are built with a "distroless" approach, containing only the application and its runtime dependencies. This dramatically reduces the attack surface compared to traditional base images that include a full Linux distribution.',
    },
    {
      id: 'faq-3',
      question: 'What does FIPS compliance mean for Hummingbird images?',
      answer: 'FIPS (Federal Information Processing Standards) compliant images use cryptographic modules that have been validated to meet FIPS 140-2/140-3 requirements. These are required for many government and regulated industry workloads.',
    },
    {
      id: 'faq-4',
      question: 'How quickly are security updates applied?',
      answer: 'Our automated pipeline monitors for CVEs and package updates continuously. Critical security patches are typically deployed within 24-48 hours of becoming available upstream.',
    },
    {
      id: 'faq-5',
      question: 'Can I use Hummingbird images in production?',
      answer: 'The project is currently under development. All containers are tested and built with care, but are not yet recommended for production use. Please check back for updates on production readiness.',
    },
    {
      id: 'faq-6',
      question: 'How do I request a new image or variant?',
      answer: 'You can request new images or variants by using the "Request an Image" button on the Overview page, which will open a Jira ticket for our team to review.',
    },
    {
      id: 'faq-7',
      question: 'Where can I find the source code and documentation?',
      answer: 'All source code is available on the Hummingbird GitLab repository. Documentation can be found on the Red Hat documentation portal.',
    },
  ];

  return (
    <CompassContent>
      {/* Hero Section */}
      <div
        className="pf-v6-c-hero"
        style={{
          backgroundColor: 'rgba(199, 199, 199, 0.25)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '72px',
          borderBottomRightRadius: '24px',
          borderBottomLeftRadius: '72px',
          marginBottom: 'var(--pf-t--global--spacer--xl)',
        }}
      >
        <div style={{ maxWidth: '800px', padding: 'var(--pf-t--global--spacer--2xl)' }}>
          <Content component="h1" style={{ marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--heading--h1)' }}>
            About Project Hummingbird<TypeLabel level="H1-DISPLAY-BOLD" />
          </Content>
          <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--default)' }}>
            Building minimal, hardened, and secure container images with a significantly reduced attack surface.<TypeLabel level="BODY" />
          </Content>
        </div>
      </div>

      {/* Mission Statement */}
      <CompassPanel style={{ marginBottom: 'var(--pf-t--global--spacer--xl)' }}>
        <div style={{ padding: 'var(--pf-t--global--spacer--xl)' }}>
          <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
            Our Mission<TypeLabel level="H2-DISPLAY-BOLD" />
          </Content>
          <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', fontSize: 'var(--pf-t--global--font--size--body--lg)', lineHeight: '1.6' }}>
            Project Hummingbird builds a collection of minimal, hardened, and secure container images, aiming to provide purpose-built containers with a significantly reduced attack surface. This strong focus on security combined with a highly automated update workflow results in containers with nearly zero CVEs.
          </Content>
          <div style={{ 
            marginTop: 'var(--pf-t--global--spacer--lg)', 
            padding: 'var(--pf-t--global--spacer--md)',
            backgroundColor: 'var(--pf-t--global--background--color--status--warning--default)',
            borderRadius: 'var(--pf-t--global--border--radius--small)',
            borderLeft: '4px solid var(--pf-t--global--border--color--status--warning--default)'
          }}>
            <Content component="p" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)', fontStyle: 'italic' }}>
              <strong>Note:</strong> The project is currently under development. All containers are tested and built with care, but are not yet recommended for production.
            </Content>
          </div>
        </div>
      </CompassPanel>

      {/* Security Features Grid */}
      <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
        Security Features<TypeLabel level="H2-DISPLAY-BOLD" />
      </Content>
      <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--xl)' }}>
        {features.map((feature, index) => (
          <GridItem key={index} span={12} md={6} lg={4}>
            <CompassPanel style={{ height: '100%' }}>
              <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
                <Flex alignItems={{ default: 'alignItemsFlexStart' }} gap={{ default: 'gapMd' }}>
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
                      {feature.icon}
                    </div>
                  </FlexItem>
                  <FlexItem flex={{ default: 'flex_1' }}>
                    <Content component="h4" style={{ marginBottom: 'var(--pf-t--global--spacer--sm)', fontSize: 'var(--pf-t--global--font--size--md)' }}>
                      {feature.title}<TypeLabel level="H4-DISPLAY-BOLD" />
                    </Content>
                    <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', margin: 0, fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                      {feature.description}
                    </Content>
                  </FlexItem>
                </Flex>
              </div>
            </CompassPanel>
          </GridItem>
        ))}
      </Grid>

      {/* FAQ Section */}
      <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
        Frequently Asked Questions<TypeLabel level="H2-DISPLAY-BOLD" />
      </Content>
      <CompassPanel style={{ marginBottom: 'var(--pf-t--global--spacer--xl)' }}>
        <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
          <Accordion asDefinitionList>
            {faqItems.map((item) => (
              <AccordionItem key={item.id}>
                <AccordionToggle onClick={() => onToggle(item.id)} id={item.id}>
                  {item.question}
                </AccordionToggle>
                <AccordionContent id={`${item.id}-content`} hidden={expanded !== item.id}>
                  <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)' }}>
                    {item.answer}
                  </Content>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CompassPanel>

      {/* Additional Resources */}
      <Content component="h2" style={{ marginBottom: 'var(--pf-t--global--spacer--lg)', fontSize: 'var(--pf-t--global--font--size--heading--h2)' }}>
        Additional Resources<TypeLabel level="H2-DISPLAY-BOLD" />
      </Content>
      <Grid hasGutter style={{ marginBottom: 'var(--pf-t--global--spacer--xl)' }}>
        <GridItem span={12} md={6} lg={4}>
          <CompassPanel style={{ height: '100%' }}>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                <FlexItem>
                  <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                </FlexItem>
                <FlexItem>
                  <Content component="h4" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--md)' }}>GitLab Repository<TypeLabel level="H4-DISPLAY-BOLD" /></Content>
                </FlexItem>
              </Flex>
              <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                Access the source code, Containerfiles, and contribute to the project.
              </Content>
              <Button 
                variant="link" 
                isInline 
                icon={<ExternalLinkAltIcon />} 
                iconPosition="end" 
                component="a" 
                href="https://gitlab.com/redhat/hummingbird/containers" 
                target="_blank"
              >
                View Repository
              </Button>
            </div>
          </CompassPanel>
        </GridItem>
        <GridItem span={12} md={6} lg={4}>
          <CompassPanel style={{ height: '100%' }}>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                <FlexItem>
                  <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                </FlexItem>
                <FlexItem>
                  <Content component="h4" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--md)' }}>Documentation<TypeLabel level="H4-DISPLAY-BOLD" /></Content>
                </FlexItem>
              </Flex>
              <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                Read the official documentation for usage guides and best practices.
              </Content>
              <Button 
                variant="link" 
                isInline 
                icon={<ExternalLinkAltIcon />} 
                iconPosition="end" 
                component="a" 
                href="https://docs.redhat.com/en/hummingbird" 
                target="_blank"
              >
                Read Documentation
              </Button>
            </div>
          </CompassPanel>
        </GridItem>
        <GridItem span={12} md={6} lg={4}>
          <CompassPanel style={{ height: '100%' }}>
            <div style={{ padding: 'var(--pf-t--global--spacer--lg)' }}>
              <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }} style={{ marginBottom: 'var(--pf-t--global--spacer--md)' }}>
                <FlexItem>
                  <CheckCircleIcon style={{ color: 'var(--pf-t--global--icon--color--status--success--default)' }} />
                </FlexItem>
                <FlexItem>
                  <Content component="h4" style={{ margin: 0, fontSize: 'var(--pf-t--global--font--size--md)' }}>Support<TypeLabel level="H4-DISPLAY-BOLD" /></Content>
                </FlexItem>
              </Flex>
              <Content component="p" style={{ color: 'var(--pf-t--global--text--color--subtle)', marginBottom: 'var(--pf-t--global--spacer--md)', fontSize: 'var(--pf-t--global--font--size--body--sm)' }}>
                Get help from Red Hat's support team and customer portal.
              </Content>
              <Button 
                variant="link" 
                isInline 
                icon={<ExternalLinkAltIcon />} 
                iconPosition="end" 
                component="a" 
                href="https://access.redhat.com/support" 
                target="_blank"
              >
                Contact Support
              </Button>
            </div>
          </CompassPanel>
        </GridItem>
      </Grid>
    </CompassContent>
  );
};

export { About };
