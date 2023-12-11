import { useCallback } from "react";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
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
  email: "",
  password: "",
  policy: true,
  submit: null,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string().min(7).max(255).required("Password is required"),
  policy: Yup.boolean().oneOf([true], "This field must be checked"),
});

const Page = () => {
  const router = useRouter();
  const { createUserWithEmailAndPassword, signInWithGoogle } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await createUserWithEmailAndPassword(values.email, values.password);

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

      router.push("/");
    } catch (err) {
      console.error(err);
    }
  }, [router, signInWithGoogle]);

  return (
    <>
      <Head>
        <title>Register | Devias Kit PRO</title>
      </Head>
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            }
            sx={{ pb: 0 }}
            title="Register"
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
                    src="/icon/google.svg"
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
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  ml: -1,
                  mt: 1,
                }}
              >
                <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography color="text.secondary" variant="body2">
                  I have read the{" "}
                  <Link component="a" href="#">
                    Terms and Conditions
                  </Link>
                </Typography>
              </Box>
              {!!(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>{formik.errors.policy}</FormHelperText>
              )}
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
                  Register
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
        {/* <Box sx={{ mt: 3 }}>
          <AuthIssuer issuer={issuer} />
        </Box> */}
      </div>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
