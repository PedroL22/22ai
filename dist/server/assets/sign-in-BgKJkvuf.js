import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { D as DropdownMenu, b as DropdownMenuTrigger, B as Button, c as DropdownMenuContent, d as DropdownMenuItem, S as SignIn, e as clerkThemes } from "./router-BbxO0Be2.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@vercel/analytics/react";
import "react";
import "sonner";
import "@trpc/client";
import "@trpc/react-query";
import "superjson";
import "@clerk/clerk-react";
import "uuid";
import "zustand";
import "zustand/middleware";
import "cmdk";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
import "motion/react";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-context-menu";
import "@clerk/clerk-react/internal";
import "./env-CF34CcsW.js";
import "@clerk/shared/error";
import "@clerk/shared/getEnvVariable";
import "@clerk/shared/underscore";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "@tanstack/router-core/ssr/server";
import "node:async_hooks";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "svix";
import "@t3-oss/env-core";
import "zod";
import "@prisma/adapter-pg";
import "@prisma/client";
import "pg";
import "@trpc/server/adapters/fetch";
import "@trpc/server";
import "@clerk/backend/internal";
import "openai";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { size: "icon", "aria-label": "Change theme", className: "dark:text-accent-foreground", children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
      /* @__PURE__ */ jsx(Moon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Change theme" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          "data-selected": theme === "system",
          className: "transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent",
          onClick: () => setTheme("system"),
          children: "System"
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          "data-selected": theme === "dark",
          className: "transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent",
          onClick: () => setTheme("dark"),
          children: "Dark"
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenuItem,
        {
          "data-selected": theme === "light",
          className: "transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent",
          onClick: () => setTheme("light"),
          children: "Light"
        }
      )
    ] })
  ] });
};
function SignInPage() {
  const {
    resolvedTheme
  } = useTheme();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4", children: /* @__PURE__ */ jsx(ThemeToggle, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex h-svh items-center justify-center", children: /* @__PURE__ */ jsx(SignIn, { routing: "hash", appearance: clerkThemes(resolvedTheme ?? "dark") }) })
  ] });
}
export {
  SignInPage as component
};
