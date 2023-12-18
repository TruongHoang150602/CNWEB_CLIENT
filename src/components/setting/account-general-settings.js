import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Switch,
  Typography,
  Unstable_Grid2 as Grid,
  Box,
  SvgIcon,
  Avatar,
  TextField,
} from "@mui/material";
import Camera01Icon from "@untitled-ui/icons-react/build/esm/Camera01";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import { alpha } from "@mui/material/styles";

export const AccountGeneralSettings = (props) => {
  const { user } = props;

  return (
    <Stack spacing={4} {...props}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Basic Information</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                <Stack alignItems="center" direction="row" spacing={2}>
                  <Box
                    sx={{
                      borderColor: "neutral.300",
                      borderRadius: "50%",
                      borderStyle: "dashed",
                      borderWidth: 1,
                      p: "4px",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: (theme) => alpha("#2F3746", 0.5),
                          borderRadius: "50%",
                          color: "common.white",
                          cursor: "pointer",
                          display: "flex",
                          height: "100%",
                          justifyContent: "center",
                          left: 0,
                          opacity: 0,
                          position: "absolute",
                          top: 0,
                          width: "100%",
                          zIndex: 1,
                          "&:hover": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <SvgIcon color="inherit">
                            <Camera01Icon />
                          </SvgIcon>
                          <Typography
                            color="inherit"
                            variant="subtitle2"
                            sx={{ fontWeight: 700 }}
                          >
                            Select
                          </Typography>
                        </Stack>
                      </Box>
                      <Avatar
                        src={user.avatar}
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                      >
                        <SvgIcon>
                          <User01Icon />
                        </SvgIcon>
                      </Avatar>
                    </Box>
                  </Box>
                  <Button color="inherit" size="small">
                    Change
                  </Button>
                </Stack>
                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.name}
                    label="Full Name"
                    sx={{ flexGrow: 1 }}
                  />
                </Stack>
                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.email}
                    disabled
                    label="Email Address"
                    required
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>

                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.phone}
                    disabled
                    label="Phone"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>

                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.mssv}
                    label="Student code"
                    type="number"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>

                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.class}
                    disabled
                    label="Class"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">More Information</Typography>
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.dob}
                    label="Birthday"
                    type="date"
                    sx={{ flexGrow: 1 }}
                  />
                </Stack>
                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.address}
                    disabled
                    label="Address"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>

                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.hobby}
                    label="Hobby"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>

                <Stack alignItems="center" direction="row">
                  <TextField
                    defaultValue={user.description}
                    label="Description"
                    sx={{
                      flexGrow: 1,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "dashed",
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Typography variant="h6">Public profile</Typography>
            </Grid>
            <Grid xs={12} sm={12} md={8}>
              <Stack divider={<Divider />} spacing={3}>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Make Contact Info Public
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Means that anyone viewing your profile will be able to see
                      your contacts details.
                    </Typography>
                  </Stack>
                  <Switch />
                </Stack>
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="space-between"
                  spacing={3}
                >
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      Available to hire
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Toggling this will let your teammates know that you are
                      available for acquiring new projects.
                    </Typography>
                  </Stack>
                  <Switch defaultChecked />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Stack alignItems="flex-end" direction="row">
        <Button variant="contained">Save</Button>
      </Stack>
    </Stack>
  );
};

AccountGeneralSettings.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
