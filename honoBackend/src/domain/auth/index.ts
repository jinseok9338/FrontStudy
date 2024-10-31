// import { OpenAPIHono, z } from "@hono/zod-openapi";

// const AuthApp = new OpenAPIHono();

// AuthApp.openapi({
//   method: "post",
//   description: "Admin Login",
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: z.object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           }),
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "Admin login successful",
//       content: {
//         "application/json": {
//           schema: z.object({
//             access_token: z.string(),
//             refresh_token: z.string(),
//           }),
//         },
//       },
//     },
//   },
// });

// AuthApp.openapi({
//   method: "post",
//   description: "User Login",
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: z.object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           }),
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "Admin login successful",
//       content: {
//         "application/json": {
//           schema: z.object({
//             access_token: z.string(),
//             refresh_token: z.string(),
//           }),
//         },
//       },
//     },
//   },
// });

// AuthApp.openapi({
//   method: "post",
//   description: "User Login",
//   request: {
//     body: {
//       content: {
//         "application/json": {
//           schema: z.object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           }),
//         },
//       },
//     },
//   },
//   responses: {
//     200: {
//       description: "User createdsuccessful",
//       content: {
//         "application/json": {
//           schema: z.object({
//             access_token: z.string(),
//             refresh_token: z.string(),
//           }),
//         },
//       },
//     },
//   },
// });
