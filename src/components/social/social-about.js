import PropTypes from "prop-types";
import BookOpen01Icon from "@untitled-ui/icons-react/build/esm/BookOpen01";
import Briefcase01Icon from "@untitled-ui/icons-react/build/esm/Briefcase01";
import Home02Icon from "@untitled-ui/icons-react/build/esm/Home02";
import Mail01Icon from "@untitled-ui/icons-react/build/esm/Mail01";
import CallIcon from "@mui/icons-material/Call";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CakeIcon from "@mui/icons-material/Cake";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";

export const SocialAbout = (props) => {
  const { profile } = props;

  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="About" />
        <CardContent>
          {profile.description && (
            <Typography
              color="text.secondary"
              sx={{ mb: 2 }}
              variant="subtitle2"
            >
              {profile.description}
            </Typography>
          )}
          <List disablePadding>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <CakeIcon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">
                    {format(parseISO(profile.dob), "yyyy-MM-dd")}
                  </Typography>
                }
              />
            </ListItem>

            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <CallIcon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{profile.phone}</Typography>
                }
              />
            </ListItem>

            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <CreditCardIcon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{profile.mssv}</Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <BookOpen01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{profile.class}</Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters divider>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Home02Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{profile.address}</Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemAvatar>
                <SvgIcon color="action">
                  <Mail01Icon />
                </SvgIcon>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2">{profile.email}</Typography>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
};

SocialAbout.propTypes = {
  profile: PropTypes.object,
};
