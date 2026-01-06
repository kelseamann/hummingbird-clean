import * as React from 'react';
import { CompassContent, CompassPanel, Title } from '@patternfly/react-core';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';

const ProfileSettings: React.FunctionComponent = () => {
  useDocumentTitle('Profile Settings');

  return (
    <>
      <CompassContent>
        <CompassPanel>
          <Title headingLevel="h1">Profile Settings</Title>
          Some profile settings stuff here...
        </CompassPanel>
      </CompassContent>
    </>
  );
};

export { ProfileSettings };
