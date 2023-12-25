import PropTypes from "prop-types";
import { formatDistanceToNowStrict, set, sub } from "date-fns";
import { useState } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
// components
import { createResourceId } from "utils/create-resource-id";
import { Scrollbar } from "components/scrollbar";
import Iconify from "components/iconfy";
import Image from "next/image";

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: createResourceId(),
    title: "ABC",
    description: "answered to your comment",
    avatar: "/assets/images/avatars/avatar_4.jpg",
    type: "comment",
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: createResourceId(),
    title: "Hoàng Vân Trường",
    description: "sent you a send a firend request",
    avatar: "/assets/images/avatars/avatar_3.jpg",
    type: "friend_interactive",
    createdAt: sub(new Date(), { hours: 12, minutes: 45 }),
    isUnRead: true,
  },
  // {
  //   id: createResourceId(),
  //   title: faker.name.fullName(),
  //   description: 'answered to your comment',
  //   avatar: '/assets/images/avatars/avatar_2.jpg',
  //   type: 'friend_cmt',
  //   createdAt: sub(new Date(), {days: 2,  hours: 3, minutes: 30 }),
  //   isUnRead: true,
  // },
  {
    id: createResourceId(),
    title: "",
    description: "You have 2 messages waiting",
    avatar: null,
    type: "chat_message",
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);
  const [actionText, setActionText] = useState("");
  const [isUnRead, setIsUnRead] = useState(notification.isUnRead);

  const handleAccept = () => {
    setIsUnRead(false);
    setActionText("Accepted invite request");
  };

  const handleDecline = () => {
    setIsUnRead(false);
    setActionText("Declined invite request");
  };
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.disabled",
              }}
            >
              <Iconify
                icon="eva:clock-outline"
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {formatDistanceToNowStrict(notification.createdAt)}
            </Typography>
            {notification.type === "friend_interactive" && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 0.5,
                }}
              >
                {actionText ? (
                  <Typography variant="body2" color="text.secondary">
                    {actionText}
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleAccept}
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleDecline}
                    >
                      Decline
                    </Button>
                  </>
                )}
              </Box>
            )}
          </>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  // const title = (
  //   <Typography variant="subtitle2">
  //     {notification.type === 'friend_interactive' && (
  //       <>
  //         <Typography component="span">{notification.title}</Typography>
  //         <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
  //           &nbsp; {noCase(notification.description)}
  //         </Typography>
  //       </>
  //     )}
  //     {notification.type !== 'friend_interactive' && notification.title}
  //   </Typography>
  // );
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        {" "}
        {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === "comment") {
    return {
      avatar: (
        <Image
          alt={notification.title}
          src="/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <Image
          alt={notification.title}
          src="/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "friend_interactive") {
    return {
      avatar: (
        <Avatar
          alt={notification.title}
          src={notification.avatar}
          sx={{ width: 36, height: 36 }}
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? (
      <Avatar alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  };
}
