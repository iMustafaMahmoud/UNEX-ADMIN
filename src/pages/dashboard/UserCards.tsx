// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
// components
import Page from '../../components/shared/Page';
import HeaderBreadcrumbs from '../../components/shared/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();

  return (
    <Page title="User: Cards">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User Cards"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Cards' },
          ]}
        />

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {/* {[1,2,3].map((user) => (
            <UserCard key={user.id} user={user} />
          ))} */}
        </Box>
      </Container>
    </Page>
  );
}
