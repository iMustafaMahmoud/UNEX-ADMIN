import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
// components
import Page from '../../components/shared/Page';
import Iconify from '../../components/shared/Iconify';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('profile');

  const [findFriends, setFindFriends] = useState('');

  const handleFindFriends = (value: string) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: (
        <Profile
          myProfile={{
            company: 'ds',
            id: '',
            cover: '',
            position: '',
            follower: 10,
            country: '',
            email: '',
            facebookLink: '',
            following: 15,
            instagramLink: '',
            linkedinLink: '',
            quote: '',
            role: '',
            school: '',
            twitterLink: '',
          }}
          posts={[]}
        />
      ),
    },
    {
      value: 'followers',
      icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ProfileFollowers followers={[]} />,
    },
    {
      value: 'friends',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: (
        <ProfileFriends friends={[]} findFriends={findFriends} onFindFriends={handleFindFriends} />
      ),
    },
    {
      value: 'gallery',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery gallery={[]} />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover
            myProfile={{
              company: 'ds',
              id: '',
              cover: '',
              position: '',
              follower: 10,
              country: '',
              email: '',
              facebookLink: '',
              following: 15,
              instagramLink: '',
              linkedinLink: '',
              quote: '',
              role: '',
              school: '',
              twitterLink: '',
            }}
          />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
