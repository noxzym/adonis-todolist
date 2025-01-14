import { jsx } from "react/jsx-runtime";
import { hydrateRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "@adonisjs/inertia/helpers";
var define_import_meta_env_default = { VITE_USER_NODE_ENV: "development", BASE_URL: "/assets/", MODE: "production", DEV: false, PROD: true, SSR: true };
const appName = define_import_meta_env_default.VITE_APP_NAME || "AdonisJS";
createInertiaApp({
  progress: { color: "#5468FF" },
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, /* @__PURE__ */ Object.assign({ "../pages/errors/not_found.tsx": () => import("./not_found-Djv2od_e.js").then((n) => n._), "../pages/errors/server_error.tsx": () => import("./server_error-Cgc8nwHe.js").then((n) => n._), "../pages/home.tsx": () => import("./home-DJ0oNC4G.js").then((n) => n._) }));
  },
  setup({ el, App, props }) {
    hydrateRoot(el, /* @__PURE__ */ jsx(App, { ...props }));
  }
});
