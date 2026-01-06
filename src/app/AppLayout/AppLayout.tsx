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
  CompassMessageBar,
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
  TabContent,
  TabTitleText,
  Tabs,
  TabsComponent,
  Tooltip,
} from '@patternfly/react-core';
import { MessageBar } from '@patternfly/chatbot/dist/dynamic/MessageBar';
import { useTheme } from '@app/utils/ThemeContext';
import CubeIcon from '@patternfly/react-icons/dist/esm/icons/cube-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import MoonIcon from '@patternfly/react-icons/dist/esm/icons/moon-icon';
import SunIcon from '@patternfly/react-icons/dist/esm/icons/sun-icon';
import pfBackground from '../bgimages/pf-background.svg';
import avatarSvg from '../bgimages/avatar.svg';
import imageLogo from '../bgimages/image-logo.png';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const subTabsRef = React.useRef<HTMLDivElement>(null);
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isThinking, setIsThinking] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine active tabs based on current route
  const getActiveTabIndex = React.useCallback(() => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/support') return 1;
    if (path.startsWith('/settings')) return 2;
    return 0;
  }, [location.pathname]);

  const getActiveSubtabIndex = React.useCallback(() => {
    const path = location.pathname;
    if (path === '/settings/general') return 0;
    if (path === '/settings/profile') return 1;
    return 0;
  }, [location.pathname]);

  const [activeTab, setActiveTab] = React.useState(getActiveTabIndex);
  const [activeSubtab, setActiveSubtab] = React.useState(getActiveSubtabIndex);

  // Update active tab when route changes
  React.useEffect(() => {
    setActiveTab(getActiveTabIndex());
    setActiveSubtab(getActiveSubtabIndex());
  }, [getActiveTabIndex, getActiveSubtabIndex]);

  const handleTabSelect = (_event: React.MouseEvent<HTMLElement>, tabIndex: number | string) => {
    const idx = tabIndex as number;
    setActiveTab(idx);
    if (idx === 0) navigate('/');
    else if (idx === 1) navigate('/support');
    else if (idx === 2) navigate('/settings/general');
  };

  const handleSubtabSelect = (_event: React.MouseEvent<HTMLElement>, tabIndex: number | string) => {
    const idx = tabIndex as number;
    setActiveSubtab(idx);
    if (idx === 0) navigate('/settings/general');
    else if (idx === 1) navigate('/settings/profile');
  };

  const navContent = (
    <>
      <CompassPanel isPill hasNoPadding>
        <Tabs
          activeKey={activeTab}
          isNav
          onSelect={handleTabSelect}
          component={TabsComponent.nav}
          aria-label="Main navigation"
          inset={{ default: 'insetXl' }}
        >
          <Tab
            tabContentId="subtabs"
            tabContentRef={subTabsRef}
            eventKey={0}
            title={<TabTitleText>Dashboard</TabTitleText>}
          />
          <Tab eventKey={1} title={<TabTitleText>Support</TabTitleText>} />
          <Tab eventKey={2} title={<TabTitleText>Settings</TabTitleText>} />
        </Tabs>
      </CompassPanel>
      {activeTab === 2 && (
        <CompassPanel isPill hasNoPadding>
          <TabContent id="subtabs" ref={subTabsRef}>
            <Tabs
              activeKey={activeSubtab}
              isSubtab
              isNav
              onSelect={handleSubtabSelect}
              aria-label="Settings navigation"
              inset={{ default: 'insetXl' }}
            >
              <Tab eventKey={0} title={<TabTitleText>General</TabTitleText>} />
              <Tab eventKey={1} title={<TabTitleText>Profile</TabTitleText>} />
            </Tabs>
          </TabContent>
        </CompassPanel>
      )}
    </>
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
            <Tooltip content="Components">
              <Button isCircle variant="plain" icon={<CubeIcon />} aria-label="Components" />
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

  const handleSendMessage = () => {
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
    }, 10000); // 10 seconds
  };

  const footerContent = (
    <CompassMessageBar>
      <CompassPanel isPill hasNoPadding hasNoBorder>
        <MessageBar
          isCompact
          onSendMessage={handleSendMessage}
          alwayShowSendButton
          hasAttachButton={false}
          hasAiIndicator
          isThinking={isThinking}
        />
      </CompassPanel>
    </CompassMessageBar>
  );

  return (
    <Compass
      header={headerContent}
      sidebarStart={sidebarContent}
      main={children}
      sidebarEnd={sidebarContent}
      footer={footerContent}
      backgroundSrcDark={pfBackground}
      backgroundSrcLight={pfBackground}
    />
  );
};

export { AppLayout };
