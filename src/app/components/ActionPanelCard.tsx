import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
  ButtonVariant,
  Flex,
  FlexItem,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  CompassPanel,
} from '@patternfly/react-core';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import EllipsisVIcon from '@patternfly/react-icons/dist/esm/icons/ellipsis-v-icon';

/** Action button configuration */
export interface ActionButtonProps {
  /** Button label text */
  label: string;
  /** URL for link buttons (renders as anchor) */
  href?: string;
  /** Click handler for non-link buttons */
  onClick?: () => void;
  /** Open link in new tab (default: true for href buttons) */
  external?: boolean;
  /** Show external link icon (default: true for external links) */
  showExternalIcon?: boolean;
}

/** Kebab menu item configuration */
export interface KebabMenuItem {
  key: string;
  label: string;
  onClick?: () => void;
}

export interface ActionPanelCardProps {
  /** Main title of the card */
  title: string;
  /** Optional subtitle displayed below the title */
  subtitle?: React.ReactNode;
  /** Card body content */
  children?: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Primary action button (uses PatternFly primary variant) */
  primaryAction?: ActionButtonProps;
  /** Secondary action button (uses PatternFly secondary variant) */
  secondaryAction?: ActionButtonProps;
  /** Tertiary action button (uses PatternFly tertiary/link variant) */
  tertiaryAction?: ActionButtonProps;
  /** Items for the kebab dropdown menu */
  kebabItems?: KebabMenuItem[];
  /** CompassPanel props */
  isPill?: boolean;
  isThinking?: boolean;
  isFullHeight?: boolean;
  /** Additional className for the outer CompassPanel */
  className?: string;
}

/**
 * ActionPanelCard - A PatternFly Card wrapped in CompassPanel with optional action buttons.
 * 
 * Extends the standard PF6 Card with up to 3 action buttons (primary, secondary, tertiary)
 * that follow PatternFly's button variant styling conventions.
 */
export const ActionPanelCard: React.FC<ActionPanelCardProps> = ({
  title,
  subtitle,
  children,
  footer,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  kebabItems,
  isPill,
  isThinking,
  isFullHeight = true,
  className,
}) => {
  const [isKebabOpen, setIsKebabOpen] = React.useState(false);

  const onKebabToggle = () => setIsKebabOpen(!isKebabOpen);
  const onKebabSelect = () => setIsKebabOpen(false);

  const renderActionButton = (
    action: ActionButtonProps | undefined,
    variant: ButtonVariant
  ) => {
    if (!action) return null;

    const isExternal = action.external ?? !!action.href;
    const showIcon = action.showExternalIcon ?? isExternal;

    const buttonProps: Record<string, unknown> = {
      variant,
      size: 'sm' as const,
    };

    if (action.href) {
      buttonProps.component = 'a';
      buttonProps.href = action.href;
      if (isExternal) {
        buttonProps.target = '_blank';
        buttonProps.rel = 'noopener noreferrer';
      }
    } else if (action.onClick) {
      buttonProps.onClick = action.onClick;
    }

    if (showIcon) {
      buttonProps.icon = <ExternalLinkAltIcon />;
      buttonProps.iconPosition = 'end';
    }

    return (
      <FlexItem>
        <Button {...buttonProps}>{action.label}</Button>
      </FlexItem>
    );
  };

  const hasActions = primaryAction || secondaryAction || tertiaryAction || kebabItems?.length;

  const cardActions = hasActions ? {
    actions: (
      <Flex gap={{ default: 'gapSm' }} flexWrap={{ default: 'nowrap' }} style={{ flexShrink: 0 }}>
        {renderActionButton(primaryAction, ButtonVariant.primary)}
        {renderActionButton(secondaryAction, ButtonVariant.secondary)}
        {renderActionButton(tertiaryAction, ButtonVariant.tertiary)}
        {kebabItems && kebabItems.length > 0 && (
          <FlexItem>
            <Dropdown
              isOpen={isKebabOpen}
              onSelect={onKebabSelect}
              onOpenChange={setIsKebabOpen}
              toggle={(toggleRef) => (
                <MenuToggle
                  ref={toggleRef}
                  aria-label="Actions"
                  variant="plain"
                  onClick={onKebabToggle}
                  isExpanded={isKebabOpen}
                >
                  <EllipsisVIcon />
                </MenuToggle>
              )}
              popperProps={{ position: 'right' }}
            >
              <DropdownList>
                {kebabItems.map((item) => (
                  <DropdownItem key={item.key} onClick={item.onClick}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownList>
            </Dropdown>
          </FlexItem>
        )}
      </Flex>
    ),
  } : undefined;

  return (
    <CompassPanel isPill={isPill} isThinking={isThinking} className={className}>
      <Card isPlain isFullHeight={isFullHeight}>
        <CardHeader actions={cardActions}>
          <CardTitle>
            {title}
            {subtitle && (
              <div style={{ fontSize: '0.875rem', color: 'var(--pf-t--global--text--color--subtle)', fontWeight: 'normal', marginTop: 'var(--pf-t--global--spacer--xs)' }}>
                {subtitle}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        {children && <CardBody>{children}</CardBody>}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </CompassPanel>
  );
};

export default ActionPanelCard;

