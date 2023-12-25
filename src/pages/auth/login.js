import { useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as AuthLayout } from "layouts/auth";
import { useAuth } from "hook/useAuth";

const initialValues = {
  email: "a@gmail.com",
  password: "1234567",
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Page = () => {
  const router = useRouter();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signInWithEmailAndPassword(values.email, values.password);
        router.push("/");
      } catch (err) {
        console.error(err);

        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleGoogleClick = useCallback(async () => {
    try {
      await signInWithGoogle();
      console.log(user);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }, [router, signInWithGoogle]);

  return (
    <>
      <Head>
        <title>Login | QuizzifyME</title>
      </Head>
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Log in"
          />
          <CardContent>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <Button
                  fullWidth
                  onClick={handleGoogleClick}
                  size="large"
                  sx={{
                    backgroundColor: "common.white",
                    color: "common.black",
                    "&:hover": {
                      backgroundColor: "common.white",
                      color: "common.black",
                    },
                  }}
                  variant="contained"
                >
                  <Box
                    alt="Google"
                    component="img"
                    src="/assets/icons/google.svg"
                    sx={{ mr: 1 }}
                  />
                  Google
                </Button>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    mt: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Divider orientation="horizontal" />
                  </Box>
                  <Typography
                    color="text.secondary"
                    sx={{ m: 2 }}
                    variant="body1"
                  >
                    OR
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Divider orientation="horizontal" />
                  </Box>
                </Box>
              </Box>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <FormHelperText error sx={{ mt: 3 }}>
                  {formik.errors.submit}
                </FormHelperText>
              )}
              <Box sx={{ mt: 2 }}>
                <Button
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        <Stack spacing={3} sx={{ mt: 3 }}>
          <Alert severity="error">
            <div>
              You can use <b>a@gmail.com</b> and password <b>1234567</b>
            </div>
          </Alert>
          {/* <AuthIssuer issuer={issuer} /> */}
        </Stack>
      </div>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
