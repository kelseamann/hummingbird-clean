import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
  Avatar,
  Button,
  Compass,
  CompassHeader,
  CompassPanel,
  Dropdown,
  DropdownItem,
  DropdownList,
  Flex,
  MastheadBrand,
  MastheadLogo,
  MenuToggle,
  MenuToggleElement,
  Tab,
  TabTitleText,
  Tabs,
  TabsComponent,
  Tooltip,
} from '@patternfly/react-core';
import { useTheme } from '@app/utils/ThemeContext';
import { useCardStyle } from '@app/utils/CardStyleContext';
import CubeIcon from '@patternfly/react-icons/dist/esm/icons/cube-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import MoonIcon from '@patternfly/react-icons/dist/esm/icons/moon-icon';
import SunIcon from '@patternfly/react-icons/dist/esm/icons/sun-icon';
import pfBackground from '../bgimages/pf-background.svg';
import avatarSvg from '../bgimages/avatar.svg';
import imageLogo from '../../hummingbird_full_color_logomark.png';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { cardStyle, setCardStyle } = useCardStyle();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine active tabs based on current route
  const getActiveTabIndex = React.useCallback(() => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/security-feed') return 1;
    if (path === '/about') return 2;
    return 0;
  }, [location.pathname]);

  const [activeTab, setActiveTab] = React.useState(getActiveTabIndex);

  // Update active tab when route changes
  React.useEffect(() => {
    setActiveTab(getActiveTabIndex());
  }, [getActiveTabIndex]);

  const handleTabSelect = (_event: React.MouseEvent<HTMLElement>, tabIndex: number | string) => {
    const idx = tabIndex as number;
    setActiveTab(idx);
    if (idx === 0) navigate('/');
    else if (idx === 1) navigate('/security-feed');
    else if (idx === 2) navigate('/about');
  };

  const navContent = (
    <CompassPanel isPill hasNoPadding>
      <Tabs
        activeKey={activeTab}
        isNav
        onSelect={handleTabSelect}
        component={TabsComponent.nav}
        aria-label="Main navigation"
        inset={{ default: 'insetXl' }}
      >
        <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>} />
        <Tab eventKey={1} title={<TabTitleText>Security Feed</TabTitleText>} />
        <Tab eventKey={2} title={<TabTitleText>About Hummingbird</TabTitleText>} />
      </Tabs>
    </CompassPanel>
  );

  const userDropdownItems = (
    <>
      <DropdownItem>My profile</DropdownItem>
      <DropdownItem>User management</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </>
  );

  const userDropdown = (
    <Dropdown
      isOpen={isDropdownOpen}
      onSelect={() => setIsDropdownOpen(false)}
      onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
      popperProps={{ position: 'right' }}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          isExpanded={isDropdownOpen}
          variant="plain"
          isCircle
        >
          <Flex alignItems={{ default: 'alignItemsCenter' }} gap={{ default: 'gapMd' }}>
            User Name
            <Avatar src={avatarSvg} alt="User avatar" size="md" />
          </Flex>
        </MenuToggle>
      )}
    >
      <DropdownList>{userDropdownItems}</DropdownList>
    </Dropdown>
  );

  const sidebarContent = (
    <CompassPanel isPill>
      <ActionList isIconList isVertical>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Card Style A">
              <Button
                isCircle
                variant={cardStyle === 'A' ? 'primary' : 'plain'}
                aria-label="Card Style A"
                onClick={() => setCardStyle('A')}
                style={{ fontWeight: 'bold', fontSize: '14px' }}
              >
                A
              </Button>
            </Tooltip>
          </ActionListItem>
          <ActionListItem>
            <Tooltip content="Card Style B">
              <Button
                isCircle
                variant={cardStyle === 'B' ? 'primary' : 'plain'}
                aria-label="Card Style B"
                onClick={() => setCardStyle('B')}
                style={{ fontWeight: 'bold', fontSize: '14px' }}
              >
                B
              </Button>
            </Tooltip>
          </ActionListItem>
          <ActionListItem>
            <Tooltip content="Card Style C">
              <Button
                isCircle
                variant={cardStyle === 'C' ? 'primary' : 'plain'}
                aria-label="Card Style C"
                onClick={() => setCardStyle('C')}
                style={{ fontWeight: 'bold', fontSize: '14px' }}
              >
                C
              </Button>
            </Tooltip>
          </ActionListItem>
        </ActionListGroup>
        <ActionListGroup>
          <ActionListItem>
            <Tooltip content="Help">
              <Button isCircle  variant="plain" icon={<HelpIcon />} aria-label="Help" />
            </Tooltip>
          </ActionListItem>
          <ActionListItem>
            <Tooltip content={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}>
              <Button
                isCircle
                variant="plain"
                icon={isDarkTheme ? <SunIcon /> : <MoonIcon />}
                aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
                onClick={toggleTheme}
              />
            </Tooltip>
          </ActionListItem>
        </ActionListGroup>
      </ActionList>
    </CompassPanel>
  );

  const headerContent = (
    <CompassHeader
      logo={
        <MastheadBrand>
          <MastheadLogo>
            <img src={imageLogo} alt="Logo" style={{ height: '72px', width: 'auto' }} />
          </MastheadLogo>
        </MastheadBrand>
      }
      nav={navContent}
      profile={userDropdown}
    />
  );

  return (
    <Compass
      header={headerContent}
      sidebarStart={sidebarContent}
      main={children}
      sidebarEnd={sidebarContent}
      backgroundSrcDark={pfBackground}
      backgroundSrcLight={pfBackground}
    />
  );
};

export { AppLayout };
