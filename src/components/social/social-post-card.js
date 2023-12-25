import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import ClockIcon from "@untitled-ui/icons-react/build/esm/Clock";
import HeartIcon from "@untitled-ui/icons-react/build/esm/Heart";
import Share07Icon from "@untitled-ui/icons-react/build/esm/Share07";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { SocialComment } from "./social-comment";
import { SocialCommentAdd } from "./social-comment-add";
import { useAuth } from "hook/useAuth";

export const SocialPostCard = (props) => {
  const {
    postId,
    authorAvatar,
    authorName,
    comments,
    createdAt,
    likedList,
    attachment,
    content,
    addComment,
    ...other
  } = props;
  const { user } = useAuth();

  const [isLiked, setIsLiked] = useState(likedList.includes(user.id));
  const [likes, setLikes] = useState(likedList.length);

  const handleLike = useCallback(() => {
    setIsLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  }, []);

  const handleUnlike = useCallback(() => {
    setIsLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  }, []);

  return (
    <Card key={postId} {...other}>
      <CardHeader
        avatar={<Avatar component="a" href="#" src={authorAvatar} />}
        disableTypography
        subheader={
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action">
              <ClockIcon />
            </SvgIcon>
            <Typography color="text.secondary" variant="caption">
              {formatDistanceToNowStrict(parseISO(createdAt))} ago
            </Typography>
          </Stack>
        }
        title={
          <Stack
            alignItems="center"
            direction="row"
            spacing={0.5}
            sx={{ mb: 1 }}
          >
            <Link color="text.primary" href="#" variant="subtitle2">
              {authorName}
            </Link>
            <Typography variant="body2">updated her status</Typography>
          </Stack>
        }
      />
      <Box
        sx={{
          pb: 2,
          px: 3,
        }}
      >
        <Typography variant="body1">{content}</Typography>
        {attachment && (
          <Box sx={{ mt: 3 }}>
            <CardActionArea>
              <CardMedia
                image={attachment}
                sx={{
                  backgroundPosition: "top",
                  height: 500,
                }}
              />
            </CardActionArea>
          </Box>
        )}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <div>
            <Stack alignItems="center" direction="row">
              {isLiked ? (
                <Tooltip title="Unlike">
                  <IconButton onClick={handleUnlike}>
                    <SvgIcon
                      sx={{
                        color: "error.main",
                        "& path": {
                          fill: (theme) => theme.palette.error.main,
                          fillOpacity: 1,
                        },
                      }}
                    >
                      <HeartIcon />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Like">
                  <IconButton onClick={handleLike}>
                    <SvgIcon>
                      <HeartIcon />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              )}
              <Typography color="text.secondary" variant="subtitle2">
                {likes}
              </Typography>
            </Stack>
          </div>
          <div>
            <IconButton>
              <SvgIcon>
                <Share07Icon />
              </SvgIcon>
            </IconButton>
          </div>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Stack spacing={3}>
          {comments.map((comment) => (
            <SocialComment
              authorId={comment.author.id}
              authorAvatar={comment.author.avatar}
              authorName={comment.author.name}
              createdAt={comment.createdAt}
              key={comment.id}
              content={comment.content}
            />
          ))}
        </Stack>
        <Divider sx={{ my: 3 }} />
        <SocialCommentAdd addComment={addComment} social_id={postId} />
      </Box>
    </Card>
  );
};

SocialPostCard.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired,
  likedList: PropTypes.array.isRequired,
  attachment: PropTypes.string,
  content: PropTypes.string.isRequired,
};
