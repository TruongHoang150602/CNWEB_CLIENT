import { useCallback, useState } from "react";
import Head from "next/head";
import { subDays, subHours, subMinutes, subMonths } from "date-fns";
import {
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "layouts/dashboard";
import { AccountGeneralSettings } from "components/setting/account-general-settings";
import { AccountSecuritySettings } from "components/setting/account-security-settings";
import { useAuth } from "hook/useAuth";

const now = new Date();

const tabs = [
  { label: "General", value: "general" },
  { label: "Security", value: "security" },
];

const Page = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("general");

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Account | Devias Kit PRO</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3} sx={{ mb: 3 }}>
            <Typography variant="h4">Account</Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {currentTab === "general" && <AccountGeneralSettings user={user} />}
          {currentTab === "security" && (
            <AccountSecuritySettings
              loginEvents={[
                {
                  id: "1bd6d44321cb78fd915462fa",
                  createdAt: subDays(
                    subHours(subMinutes(now, 5), 7),
                    1
                  ).getTime(),
                  ip: "95.130.17.84",
                  type: "Credential login",
                  userAgent: "Chrome, Mac OS 10.15.7",
                },
                {
                  id: "bde169c2fe9adea5d4598ea9",
                  createdAt: subDays(
                    subHours(subMinutes(now, 25), 9),
                    1
                  ).getTime(),
                  ip: "95.130.17.84",
                  type: "Credential login",
                  userAgent: "Chrome, Mac OS 10.15.7",
                },
              ]}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
