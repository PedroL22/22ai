import { jsxs, jsx } from "react/jsx-runtime";
import { Check, Info, Smartphone, Download, Database, Key, Keyboard, Clipboard, ArrowLeft, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { B as Button, f as cn, u as useUserSettings, A as Avatar, g as AvatarImage, h as AvatarFallback, i as Dialog, j as DialogContent, k as DialogHeader, l as DialogTitle, m as DialogDescription, U as UserProfile, e as clerkThemes } from "./router-BbxO0Be2.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { u as useApiKeyStore } from "./useApiKeyStore-BnN6lbs-.js";
import { useUser } from "@clerk/clerk-react";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@vercel/analytics/react";
import "sonner";
import "@trpc/client";
import "@trpc/react-query";
import "superjson";
import "uuid";
import "zustand";
import "zustand/middleware";
import "cmdk";
import "@radix-ui/react-dialog";
import "clsx";
import "tailwind-merge";
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
const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setIsInstalling(false);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);
  const handleInstallClick = async () => {
    if (!installPrompt) return;
    setIsInstalling(true);
    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
        setIsInstalling(false);
      }
      setInstallPrompt(null);
    } catch (err) {
      console.error("❌ Error installing PWA: ", err);
      setIsInstalling(false);
    }
  };
  if (isInstalled) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-green-600 dark:text-green-400" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium text-green-800 text-sm dark:text-green-200", children: "App Installed" }),
        /* @__PURE__ */ jsx("div", { className: "text-green-600 text-xs dark:text-green-400", children: "22AI is installed on your device" })
      ] })
    ] });
  }
  if (!installPrompt) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950", children: [
        /* @__PURE__ */ jsx(Info, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-blue-800 text-sm dark:text-blue-200", children: "Install Available" }),
          /* @__PURE__ */ jsx("div", { className: "text-blue-600 text-xs dark:text-blue-400", children: "Use your browser's install option or add to home screen" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "w-full gap-2", onClick: () => setShowInfo(!showInfo), children: [
        /* @__PURE__ */ jsx(Smartphone, { className: "h-4 w-4" }),
        "How to Install"
      ] }),
      showInfo && /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-muted p-3 text-muted-foreground text-xs", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Chrome/Edge:" }),
          " Click the install icon in the address bar"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Safari (iOS):" }),
          " Tap Share → Add to Home Screen"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Firefox:" }),
          ' Look for "Install" in the menu'
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Button, { onClick: handleInstallClick, variant: "default", size: "sm", className: "w-full gap-2", disabled: isInstalling, children: [
    /* @__PURE__ */ jsx(Download, { className: `size-4 ${isInstalling ? "animate-bounce" : ""}` }),
    isInstalling ? "Installing..." : "Install App"
  ] });
};
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Switch({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
          )
        }
      )
    }
  );
}
function SettingsPage() {
  var _a, _b, _c;
  const [manageAccountDialogOpen, setManageAccountDialogOpen] = useState(false);
  const {
    settings,
    isLoading,
    updateSetting,
    isUpdating
  } = useUserSettings();
  const openaiApiKey = useApiKeyStore((s) => s.openaiApiKey);
  const anthropicApiKey = useApiKeyStore((s) => s.anthropicApiKey);
  const geminiApiKey = useApiKeyStore((s) => s.geminiApiKey);
  const grokApiKey = useApiKeyStore((s) => s.grokApiKey);
  const setOpenaiApiKey = useApiKeyStore((s) => s.setOpenaiApiKey);
  const setAnthropicApiKey = useApiKeyStore((s) => s.setAnthropicApiKey);
  const setGeminiApiKey = useApiKeyStore((s) => s.setGeminiApiKey);
  const setGrokApiKey = useApiKeyStore((s) => s.setGrokApiKey);
  const {
    isSignedIn,
    user
  } = useUser();
  const {
    resolvedTheme
  } = useTheme();
  const handlePaste = async (setApiKey) => {
    try {
      const text = await navigator.clipboard.readText();
      setApiKey(text.trim());
    } catch (error) {
      console.warn("Failed to read from clipboard:", error);
    }
  };
  const settingSections = [{
    id: "sync",
    title: "Database Sync",
    description: "Sync your chats with the cloud for access across devices",
    icon: Database,
    content: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: isSignedIn ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "sync-chats", className: "font-medium text-sm", children: "Sync chats" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "Keep your conversations synchronized across all devices" })
      ] }),
      /* @__PURE__ */ jsx(Switch, { id: "sync-chats", checked: settings == null ? void 0 : settings.syncWithDb, onCheckedChange: (checked) => updateSetting("syncWithDb", !!checked), disabled: isUpdating || isLoading })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-6 text-center", children: [
      /* @__PURE__ */ jsx(Database, { className: "mx-auto mb-4 size-8 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h3", { className: "mb-2 font-medium", children: "Sign in to sync" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-muted-foreground text-sm", children: "Create an account to sync your chats across devices" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/sign-in", children: "Sign in" }) })
    ] }) })
  }, {
    id: "api-keys",
    title: "API Keys (BYOK)",
    description: "Bring your own API keys for enhanced functionality",
    icon: Key,
    content: /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Key, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: "Your API Keys" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "openai_api_key", className: "font-medium text-sm", children: "OpenAI API Key" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Input, { id: "openai_api_key", type: "password", placeholder: "sk-...", value: openaiApiKey, onChange: (e) => setOpenaiApiKey(e.target.value), autoComplete: "off", className: "flex-1" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: () => handlePaste(setOpenaiApiKey), title: "Paste from clipboard", children: /* @__PURE__ */ jsx(Clipboard, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "gemini_api_key", className: "font-medium text-sm", children: "Gemini API Key" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Input, { id: "gemini_api_key", type: "password", placeholder: "AIza...", value: geminiApiKey, onChange: (e) => setGeminiApiKey(e.target.value), autoComplete: "off", className: "flex-1" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: () => handlePaste(setGeminiApiKey), title: "Paste from clipboard", children: /* @__PURE__ */ jsx(Clipboard, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "anthropic_api_key", className: "font-medium text-sm", children: "Anthropic API Key" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Input, { id: "anthropic_api_key", type: "password", placeholder: "sk-ant-...", value: anthropicApiKey, onChange: (e) => setAnthropicApiKey(e.target.value), autoComplete: "off", className: "flex-1" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: () => handlePaste(setAnthropicApiKey), title: "Paste from clipboard", children: /* @__PURE__ */ jsx(Clipboard, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "grok_api_key", className: "font-medium text-sm", children: "Grok API Key" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Input, { id: "grok_api_key", type: "password", placeholder: "sk-grk-...", value: grokApiKey, onChange: (e) => setGrokApiKey(e.target.value), autoComplete: "off", className: "flex-1" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: () => handlePaste(setGrokApiKey), title: "Paste from clipboard", children: /* @__PURE__ */ jsx(Clipboard, { className: "size-4" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg bg-muted/50 p-3", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "🔒 These keys are stored locally in your browser and never leave your device." }) })
    ] }) })
  }, {
    id: "pwa",
    title: "Progressive Web App",
    description: "Install 22AI as a native app for better performance",
    icon: Smartphone,
    content: /* @__PURE__ */ jsx("div", { className: "flex justify-center space-y-4 rounded-lg border p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm self-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: "Install as Native App" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "Get faster loading and a native app experience" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex size-10 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(Smartphone, { className: "size-5 text-primary" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(PWAInstallPrompt, {}) })
    ] }) })
  }, {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    description: "Speed up your workflow with these keyboard shortcuts",
    icon: Keyboard,
    content: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: [{
      action: "Search chats",
      keys: ["Ctrl", "K"]
    }, {
      action: "New chat",
      keys: ["Ctrl", "Shift", "O"]
    }, {
      action: "Toggle sidebar",
      keys: ["Ctrl", "B"]
    }, {
      action: "New line in message",
      keys: ["Shift", "Enter"]
    }].map((shortcut) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg border p-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: shortcut.action }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: shortcut.keys.map((key) => /* @__PURE__ */ jsx("kbd", { className: "rounded bg-muted px-2 py-1 font-mono text-xs", children: key === "Ctrl" && typeof navigator !== "undefined" && navigator.platform.toUpperCase().includes("MAC") ? "⌘" : key }, `${shortcut.action}-${key}`)) })
    ] }, shortcut.action)) })
  }];
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gradient-to-br from-background to-muted/20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 py-8 sm:px-6", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      duration: 0.5
    }, className: "mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "/", className: "gap-2", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
        "Back to Chat"
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-bold text-3xl tracking-tight", children: "Settings" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Customize your 22AI experience and manage your preferences" })
      ] }),
      isSignedIn && user && /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col items-center justify-between gap-4 rounded-lg border bg-card/50 p-4 backdrop-blur-sm md:flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs(Avatar, { className: "size-10", children: [
            /* @__PURE__ */ jsx(AvatarImage, { src: (user == null ? void 0 : user.imageUrl) || void 0, alt: (user == null ? void 0 : user.fullName) || void 0 }),
            /* @__PURE__ */ jsx(AvatarFallback, { children: (_a = user == null ? void 0 : user.fullName) == null ? void 0 : _a.charAt(0) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-sm", children: user.firstName || ((_b = user.emailAddresses[0]) == null ? void 0 : _b.emailAddress) }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: (_c = user.emailAddresses[0]) == null ? void 0 : _c.emailAddress })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => setManageAccountDialogOpen(true), children: "Manage account" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      settingSections.map((section, index) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.5,
        delay: index * 0.1
      }, className: "rounded-xl border bg-card/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex size-10 items-center justify-center rounded-lg bg-primary/10", children: /* @__PURE__ */ jsx(section.icon, { className: "size-5 text-primary" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-semibold text-lg", children: section.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: section.description })
          ] })
        ] }),
        section.content
      ] }) }, section.id)),
      /* @__PURE__ */ jsx(Dialog, { open: manageAccountDialogOpen, onOpenChange: setManageAccountDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "overflow-auto rounded-2xl border-none p-0 md:max-w-[880px]", children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "sr-only", children: [
          /* @__PURE__ */ jsx(DialogTitle, {}),
          /* @__PURE__ */ jsx(DialogDescription, {})
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx(UserProfile, { routing: "hash", appearance: clerkThemes(resolvedTheme ?? "dark") }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      duration: 0.5,
      delay: 0.5
    }, className: "mt-12 text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2 text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsx(Zap, { className: "size-3" }),
      "22AI - Powered by cutting-edge AI technology"
    ] }) })
  ] }) });
}
export {
  SettingsPage as component
};
