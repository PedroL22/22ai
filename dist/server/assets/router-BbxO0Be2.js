import { QueryClient, defaultShouldDehydrateQuery, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate, useLocation, ScriptOnce, useParams, useMatches, createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Analytics } from "@vercel/analytics/react";
import React, { useTransition, useEffect, useState, useRef } from "react";
import { toast, Toaster as Toaster$1 } from "sonner";
import { loggerLink, httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import SuperJSON from "superjson";
import { ClerkProvider as ClerkProvider$1, SignIn as SignIn$1, UserProfile as UserProfile$1, OrganizationProfile, OrganizationList, useUser, useClerk } from "@clerk/clerk-react";
import { v4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeProvider as ThemeProvider$1, useTheme } from "next-themes";
import { XIcon, SearchIcon, MessageCircle, Pin, Loader2, MoreHorizontal, Share, Edit, Trash2, PanelLeft, Sun, Moon, Github, Settings, ChevronDown, User, LogOut, LogIn } from "lucide-react";
import { Command as Command$1 } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { useRoutingProps } from "@clerk/clerk-react/internal";
import { g as getPublicEnvVariables, i as isClient, e as errorThrower } from "./env-CF34CcsW.js";
import { g as getStartContext } from "../server.js";
import { Webhook } from "svix";
import { createEnv } from "@t3-oss/env-core";
import { z, ZodError } from "zod";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import { getAuthObjectForAcceptedToken } from "@clerk/backend/internal";
import OpenAI from "openai";
const getGlobalStartContext = () => {
  const context = getStartContext().contextAfterGlobalMiddlewares;
  if (!context) {
    throw new Error(`Global context not set yet, you are calling getGlobalStartContext() before the global middlewares are applied.`);
  }
  return context;
};
var ClerkOptionsCtx = React.createContext(void 0);
ClerkOptionsCtx.displayName = "ClerkOptionsCtx";
var ClerkOptionsProvider = (props) => {
  const { children, options } = props;
  return /* @__PURE__ */ jsx(ClerkOptionsCtx.Provider, { value: { value: options }, children });
};
var useAwaitableNavigate = () => {
  const navigate = useNavigate();
  const location2 = useLocation();
  const resolveFunctionsRef = React.useRef([]);
  const resolveAll = () => {
    resolveFunctionsRef.current.forEach((resolve) => resolve());
    resolveFunctionsRef.current.splice(0, resolveFunctionsRef.current.length);
  };
  const [_, startTransition] = useTransition();
  React.useEffect(() => {
    resolveAll();
  }, [location2]);
  return (options) => {
    return new Promise((res) => {
      startTransition(() => {
        resolveFunctionsRef.current.push(res);
        res(navigate(options));
      });
    });
  };
};
var pickFromClerkInitState = (clerkInitState) => {
  const {
    __clerk_ssr_state,
    __publishableKey,
    __proxyUrl,
    __domain,
    __isSatellite,
    __signInUrl,
    __signUpUrl,
    __afterSignInUrl,
    __afterSignUpUrl,
    __clerkJSUrl,
    __clerkJSVersion,
    __telemetryDisabled,
    __telemetryDebug,
    __signInForceRedirectUrl,
    __signUpForceRedirectUrl,
    __signInFallbackRedirectUrl,
    __signUpFallbackRedirectUrl
  } = clerkInitState || {};
  return {
    clerkSsrState: __clerk_ssr_state,
    publishableKey: __publishableKey,
    proxyUrl: __proxyUrl,
    domain: __domain,
    isSatellite: !!__isSatellite,
    signInUrl: __signInUrl,
    signUpUrl: __signUpUrl,
    afterSignInUrl: __afterSignInUrl,
    afterSignUpUrl: __afterSignUpUrl,
    clerkJSUrl: __clerkJSUrl,
    clerkJSVersion: __clerkJSVersion,
    telemetry: {
      disabled: __telemetryDisabled,
      debug: __telemetryDebug
    },
    signInForceRedirectUrl: __signInForceRedirectUrl,
    signUpForceRedirectUrl: __signUpForceRedirectUrl,
    signInFallbackRedirectUrl: __signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl: __signUpFallbackRedirectUrl
  };
};
var mergeWithPublicEnvs = (restInitState) => {
  return {
    ...restInitState,
    publishableKey: restInitState.publishableKey || getPublicEnvVariables().publishableKey,
    domain: restInitState.domain || getPublicEnvVariables().domain,
    isSatellite: restInitState.isSatellite || getPublicEnvVariables().isSatellite,
    signInUrl: restInitState.signInUrl || getPublicEnvVariables().signInUrl,
    signUpUrl: restInitState.signUpUrl || getPublicEnvVariables().signUpUrl,
    afterSignInUrl: restInitState.afterSignInUrl || getPublicEnvVariables().afterSignInUrl,
    afterSignUpUrl: restInitState.afterSignUpUrl || getPublicEnvVariables().afterSignUpUrl,
    clerkJSUrl: restInitState.clerkJSUrl || getPublicEnvVariables().clerkJsUrl,
    clerkJSVersion: restInitState.clerkJSVersion || getPublicEnvVariables().clerkJsVersion,
    signInForceRedirectUrl: restInitState.signInForceRedirectUrl,
    clerkJSVariant: restInitState.clerkJSVariant || getPublicEnvVariables().clerkJsVariant
  };
};
var SDK_METADATA = {
  name: "@clerk/tanstack-react-start",
  version: "0.29.1"
};
var awaitableNavigateRef = { current: void 0 };
function ClerkProvider({ children, ...providerProps }) {
  var _a;
  const awaitableNavigate = useAwaitableNavigate();
  const clerkInitialState = ((_a = getGlobalStartContext()) == null ? void 0 : _a.clerkInitialState) ?? {};
  useEffect(() => {
    awaitableNavigateRef.current = awaitableNavigate;
  }, [awaitableNavigate]);
  const clerkInitState = isClient() ? window.__clerk_init_state : clerkInitialState;
  const { clerkSsrState, ...restInitState } = pickFromClerkInitState(clerkInitState == null ? void 0 : clerkInitState.__internal_clerk_state);
  const mergedProps = {
    ...mergeWithPublicEnvs(restInitState),
    ...providerProps
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScriptOnce, { children: `window.__clerk_init_state = ${JSON.stringify(clerkInitialState)};` }),
    /* @__PURE__ */ jsx(ClerkOptionsProvider, { options: mergedProps, children: /* @__PURE__ */ jsx(
      ClerkProvider$1,
      {
        initialState: clerkSsrState,
        sdkMetadata: SDK_METADATA,
        routerPush: (to) => {
          var _a2;
          return (_a2 = awaitableNavigateRef.current) == null ? void 0 : _a2.call(awaitableNavigateRef, {
            to,
            replace: false
          });
        },
        routerReplace: (to) => {
          var _a2;
          return (_a2 = awaitableNavigateRef.current) == null ? void 0 : _a2.call(awaitableNavigateRef, {
            to,
            replace: true
          });
        },
        ...mergedProps,
        children
      }
    ) })
  ] });
}
ClerkProvider.displayName = "ClerkProvider";
var usePathnameWithoutSplatRouteParams = () => {
  const { _splat } = useParams({
    strict: false
  });
  const { pathname } = useLocation();
  const splatRouteParam = _splat || "";
  const path = pathname.replace(splatRouteParam, "").replace(/\/$/, "").replace(/^\//, "").trim();
  return `/${path}`;
};
var UserProfile = Object.assign(
  (props) => {
    const path = usePathnameWithoutSplatRouteParams();
    return /* @__PURE__ */ jsx(UserProfile$1, { ...useRoutingProps("UserProfile", props, { path }) });
  },
  { ...UserProfile$1 }
);
Object.assign(
  (props) => {
    const path = usePathnameWithoutSplatRouteParams();
    return /* @__PURE__ */ jsx(OrganizationProfile, { ...useRoutingProps("OrganizationProfile", props, { path }) });
  },
  { ...OrganizationProfile }
);
Object.assign(
  (props) => {
    const path = usePathnameWithoutSplatRouteParams();
    return /* @__PURE__ */ jsx(OrganizationList, { ...useRoutingProps("OrganizationList", props, { path }) });
  },
  { ...OrganizationList }
);
var SignIn = (props) => {
  const path = usePathnameWithoutSplatRouteParams();
  return /* @__PURE__ */ jsx(SignIn$1, { ...useRoutingProps("SignIn", props, { path }) });
};
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 10 * 1e3,
      // 10 seconds
      refetchInterval: 1e3 * 30,
      // 30 seconds
      retry: (failureCount, error) => {
        var _a;
        if (((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.code) === "UNAUTHORIZED") {
          return false;
        }
        return failureCount < 2;
      }
    },
    dehydrate: {
      serializeData: SuperJSON.serialize,
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending"
    },
    hydrate: {
      deserializeData: SuperJSON.deserialize
    }
  }
});
let clientQueryClientSingleton;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  clientQueryClientSingleton ?? (clientQueryClientSingleton = createQueryClient());
  return clientQueryClientSingleton;
};
const api = createTRPCReact();
function TRPCReactProvider(props) {
  const queryClient2 = getQueryClient();
  const [trpcClient] = useState(
    () => api.createClient({
      links: [
        loggerLink({
          enabled: (op) => {
            var _a;
            if (op.direction === "down" && op.result instanceof Error) {
              const error = op.result;
              if (((_a = error.data) == null ? void 0 : _a.code) === "UNAUTHORIZED") {
                return false;
              }
            }
            return op.direction === "down" && op.result instanceof Error;
          }
        }),
        httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => {
            const headers = new Headers();
            headers.set("x-trpc-source", "tanstack-start-react");
            return headers;
          }
        })
      ]
    })
  );
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient2, children: /* @__PURE__ */ jsx(api.Provider, { client: trpcClient, queryClient: queryClient2, children: props.children }) });
}
function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return `http://localhost:${process.env.PORT ?? 3e3}`;
}
const useUserSettings = () => {
  const { isSignedIn, isLoaded } = useUser();
  const utils = api.useUtils();
  const {
    data: settings,
    isLoading,
    error
  } = api.user.getSettings.useQuery(void 0, {
    enabled: isSignedIn && isLoaded
  });
  const updateSettingsMutation = api.user.updateSettings.useMutation({
    onSuccess: (updatedSettings) => {
      console.log("Settings updated successfully: ", updatedSettings);
      utils.user.getSettings.setData(void 0, updatedSettings);
      toast.success("✅ Settings updated successfully.");
    },
    onError: (error2) => {
      console.log("Settings update error: ", error2);
      utils.user.getSettings.invalidate();
      toast.error(`❌ Failed to update settings: ${error2.message}`);
    }
  });
  const updateSettings = (newSettings) => {
    updateSettingsMutation.mutate(newSettings);
  };
  const updateSetting = (key, value) => {
    console.log(`Updating setting ${String(key)} to:`, value);
    updateSettings({ [key]: value });
  };
  return {
    settings,
    isLoading,
    error,
    updateSettings,
    updateSetting,
    isUpdating: updateSettingsMutation.isPending
  };
};
const useChatStore = create()(
  persist(
    (set, get) => ({
      currentChatId: void 0,
      setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
      chats: [],
      selectedModelId: "openai/gpt-oss-20b:free",
      setSelectedModelId: (modelId) => set({ selectedModelId: modelId }),
      streamingMessage: "",
      isStreaming: false,
      chatsDisplayMode: "local",
      isSyncing: false,
      isInitialLoading: false,
      setStreamingMessage: (message) => set((state) => ({
        streamingMessage: typeof message === "function" ? message(state.streamingMessage) : message
      })),
      setIsStreaming: (streaming) => set({ isStreaming: streaming }),
      setIsInitialLoading: (loading) => set({ isInitialLoading: loading }),
      addChat: (chat) => set((state) => ({
        chats: [...state.chats, { ...chat, messages: [] }]
      })),
      renameChat: (id, newTitle) => {
        set((state) => {
          const updatedChats = state.chats.map((chat) => chat.id === id ? { ...chat, title: newTitle } : chat);
          return { chats: updatedChats };
        });
      },
      removeChat: (id) => set((state) => ({
        chats: state.chats.filter((chat) => chat.id !== id)
      })),
      pinChat: (id, isPinned) => {
        set((state) => {
          const updatedChats = state.chats.map((chat) => chat.id === id ? { ...chat, isPinned } : chat);
          return { chats: updatedChats };
        });
      },
      shareChat: (id, isShared) => {
        set((state) => {
          const updatedChats = state.chats.map((chat) => chat.id === id ? { ...chat, isShared } : chat);
          return { chats: updatedChats };
        });
      },
      clearChats: () => set({ chats: [] }),
      addMessage: (chatId, message) => set((state) => ({
        chats: state.chats.map(
          (chat) => chat.id === chatId ? {
            ...chat,
            messages: [...chat.messages, message],
            updatedAt: /* @__PURE__ */ new Date()
            // Update the chat's timestamp when adding messages
          } : chat
        )
      })),
      getMessages: (chatId) => {
        const chat = get().chats.find((chat2) => chat2.id === chatId);
        return (chat == null ? void 0 : chat.messages) || [];
      },
      clearMessages: (chatId) => set((state) => ({
        chats: state.chats.map((chat) => chat.id === chatId ? { ...chat, messages: [] } : chat)
      })),
      replaceMessage: (chatId, messageIndex, newMessage) => set((state) => ({
        chats: state.chats.map(
          (chat) => chat.id === chatId ? {
            ...chat,
            messages: chat.messages.map((msg, index) => index === messageIndex ? newMessage : msg),
            updatedAt: /* @__PURE__ */ new Date()
          } : chat
        )
      })),
      removeMessagesFromIndex: (chatId, messageIndex) => set((state) => ({
        chats: state.chats.map(
          (chat) => chat.id === chatId ? {
            ...chat,
            messages: chat.messages.slice(0, messageIndex),
            updatedAt: /* @__PURE__ */ new Date()
          } : chat
        )
      })),
      branchChat: (sourceChatId, fromMessageIndex) => {
        const state = get();
        const sourceChat = state.chats.find((chat) => chat.id === sourceChatId);
        if (!sourceChat) {
          throw new Error("Source chat not found");
        }
        const branchedMessages = sourceChat.messages.slice(0, fromMessageIndex + 1);
        const newChatId = v4();
        const newChat = {
          id: newChatId,
          title: `${sourceChat.title || "Chat"} (Branch)`,
          isPinned: false,
          isShared: false,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          userId: sourceChat.userId
        };
        const newChatWithMessages = {
          ...newChat,
          messages: branchedMessages.map((msg) => ({
            ...msg,
            id: v4(),
            // New IDs for branched messages
            chatId: newChatId
          }))
        };
        set((state2) => ({
          chats: [...state2.chats, newChatWithMessages]
        }));
        return { id: newChatId, chat: newChatWithMessages };
      },
      syncChatsFromDatabase: (chats) => set({ chats, chatsDisplayMode: "synced" }),
      moveDbChatsToLocal: (chats) => set({ chats, chatsDisplayMode: "local" }),
      getLocalChatsForSync: () => {
        const state = get();
        return state.chats.filter((chat) => chat.messages.length > 0);
      },
      clearLocalChatsAfterSync: () => set({ chats: [] }),
      setChatsDisplayMode: (mode) => set({ chatsDisplayMode: mode }),
      setSyncing: (syncing) => set({ isSyncing: syncing })
    }),
    {
      name: "chat-store",
      partialize: (state) => ({
        // Only persist local chats and display mode
        chats: state.chatsDisplayMode === "local" ? state.chats : [],
        chatsDisplayMode: state.chatsDisplayMode,
        currentChatId: state.currentChatId,
        selectedModelId: state.selectedModelId
      }),
      storage: {
        getItem: (name) => {
          var _a;
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const parsed = JSON.parse(str);
            if ((_a = parsed == null ? void 0 : parsed.state) == null ? void 0 : _a.chats) {
              parsed.state.chats = parsed.state.chats.map((chat) => {
                var _a2;
                return {
                  ...chat,
                  createdAt: new Date(chat.createdAt),
                  updatedAt: new Date(chat.updatedAt),
                  messages: ((_a2 = chat.messages) == null ? void 0 : _a2.map((message) => ({
                    ...message,
                    createdAt: new Date(message.createdAt)
                  }))) || []
                };
              });
            }
            return parsed;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);
const useChatSync = () => {
  const {
    getLocalChatsForSync,
    syncChatsFromDatabase,
    moveDbChatsToLocal,
    setChatsDisplayMode,
    chatsDisplayMode,
    setSyncing
  } = useChatStore();
  const { isSignedIn, isLoaded } = useUser();
  const { settings } = useUserSettings();
  const syncMutation = api.chat.syncLocalChatsToDatabase.useMutation();
  const clearDbChatsMutation = api.chat.clearUserChatsFromDatabase.useMutation();
  const getUserChatsQuery = api.chat.getAllUserChatsWithMessages.useQuery(void 0, {
    enabled: isSignedIn && isLoaded,
    retry: false
  });
  const hasAttemptedSync = useRef(false);
  const previousSignInState = useRef(void 0);
  const previousSyncSetting = useRef(void 0);
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn && !!(settings == null ? void 0 : settings.syncWithDb)) {
      setSyncing(false);
    }
  }, [isLoaded, isSignedIn, setSyncing]);
  useEffect(() => {
    if (!isLoaded) return;
    if (previousSignInState.current === isSignedIn) return;
    previousSignInState.current = isSignedIn;
    if (isSignedIn) {
      handleUserLogin();
    } else {
      handleUserLogout();
    }
  }, [isSignedIn, isLoaded, settings == null ? void 0 : settings.syncWithDb]);
  useEffect(() => {
    if (isSignedIn && getUserChatsQuery.data && !getUserChatsQuery.isLoading && hasAttemptedSync.current) {
      syncChatsFromDatabase(getUserChatsQuery.data);
      setSyncing(false);
    }
  }, [getUserChatsQuery.data, getUserChatsQuery.isLoading, isSignedIn, syncChatsFromDatabase, setSyncing]);
  useEffect(() => {
    if (!isSignedIn || !isLoaded || !settings) return;
    const currentSyncSetting = settings.syncWithDb;
    if (previousSyncSetting.current === currentSyncSetting) return;
    previousSyncSetting.current = currentSyncSetting;
    if (!currentSyncSetting && getUserChatsQuery.data) {
      handleSyncDisabled();
    } else if (currentSyncSetting) {
      handleSyncEnabled();
    }
  }, [isSignedIn, isLoaded, settings == null ? void 0 : settings.syncWithDb, getUserChatsQuery.data, moveDbChatsToLocal, clearDbChatsMutation]);
  const handleUserLogin = async () => {
    if (hasAttemptedSync.current) return;
    if (!(settings == null ? void 0 : settings.syncWithDb)) {
      console.log("⚠️ Sync is disabled - switching to local mode only");
      setChatsDisplayMode("local");
      return;
    }
    setSyncing(true);
    try {
      const localChats = getLocalChatsForSync();
      if (localChats.length > 0) {
        console.log("🔄 Syncing", localChats.length, "local chats to database...");
        const chatsToSync = localChats.map((chat) => ({
          ...chat,
          title: chat.title || "New chat"
        }));
        await syncMutation.mutateAsync({ chats: chatsToSync });
        console.log("✅ Local chats synced successfully.");
      }
      hasAttemptedSync.current = true;
      await getUserChatsQuery.refetch();
    } catch (error) {
      console.error("❌ Failed to sync local chats: ", error);
      setChatsDisplayMode("synced");
    } finally {
      setSyncing(false);
    }
  };
  const handleUserLogout = () => {
    console.log("👋 User logged out - switching to local chat mode");
    setChatsDisplayMode("local");
    setSyncing(false);
    hasAttemptedSync.current = false;
  };
  const handleSyncDisabled = async () => {
    console.log("🔄 User disabled sync - moving DB chats to local storage");
    setSyncing(true);
    try {
      if (getUserChatsQuery.data) {
        moveDbChatsToLocal(getUserChatsQuery.data);
        console.log("✅ DB chats moved to local storage.");
        await clearDbChatsMutation.mutateAsync();
        console.log("✅ DB chats cleared from database.");
      }
    } catch (error) {
      console.error("❌ Failed to move DB chats to local: ", error);
    } finally {
      setSyncing(false);
    }
  };
  const handleSyncEnabled = () => {
    console.log("🔄 User enabled sync - syncing local chats to database");
    hasAttemptedSync.current = false;
    handleUserLogin();
  };
  return {
    syncError: syncMutation.error || getUserChatsQuery.error,
    chatsDisplayMode
  };
};
const ChatSyncProvider = () => {
  useChatSync();
  return null;
};
const ThemeProvider = ({ children, ...props }) => {
  return /* @__PURE__ */ jsx(ThemeProvider$1, { ...props, children });
};
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};
const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-md data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: 'absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg:not([class*="size-"])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("font-semibold text-lg leading-none", className),
      ...props
    }
  );
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(Dialog, { ...props, children: [
    /* @__PURE__ */ jsxs(DialogHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsx(DialogContent, { className: cn("overflow-hidden p-0", className), showCloseButton, children: /* @__PURE__ */ jsx(Command, { className: "**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) })
  ] });
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsxs("div", { "data-slot": "command-input-wrapper", className: "flex h-9 items-center gap-2 border-b px-3", children: [
    /* @__PURE__ */ jsx(SearchIcon, { className: "size-4 shrink-0 opacity-50" }),
    /* @__PURE__ */ jsx(
      Command$1.Input,
      {
        "data-slot": "command-input",
        className: cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ...props
      }
    )
  ] });
}
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1.List,
    {
      "data-slot": "command-list",
      className: cn("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", className),
      ...props
    }
  );
}
function CommandEmpty({ ...props }) {
  return /* @__PURE__ */ jsx(Command$1.Empty, { "data-slot": "command-empty", className: "py-6 text-center text-sm", ...props });
}
function CommandGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
        className
      ),
      ...props
    }
  );
}
function CommandItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1.Item,
    {
      "data-slot": "command-item",
      className: cn(
        '[&_svg]:shrink-0"size-"])]:size-4 relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden [&_svg:not([class*= data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*="text-"])]:text-muted-foreground [&_svg]:pointer-events-none',
        className
      ),
      ...props
    }
  );
}
function CommandShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "command-shortcut",
      className: cn("ml-auto text-muted-foreground text-xs tracking-widest", className),
      ...props
    }
  );
}
const formatMessageDateForChatList = (timestamp) => {
  const messageDate = new Date(timestamp);
  const now = /* @__PURE__ */ new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const timeString = messageDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  if (messageDate.toDateString() === now.toDateString()) {
    return timeString;
  }
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  if (messageDate.getFullYear() === now.getFullYear()) {
    const dateString2 = messageDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit"
    });
    return dateString2;
  }
  const dateString = messageDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  return dateString;
};
function ChatSearchCommand() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { chats } = useChatStore();
  const searchableChats = chats.filter((chat) => chat.title && chat.title.trim() !== "").sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  useEffect(() => {
    const down = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCtrlK = (isMac ? e.metaKey : e.ctrlKey) && e.key === "k";
      if (isCtrlK) {
        e.preventDefault();
        setOpen((open2) => !open2);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  const handleSelect = (chatId) => {
    setOpen(false);
    navigate({ to: "/$chatId", params: { chatId } });
  };
  return /* @__PURE__ */ jsxs(
    CommandDialog,
    {
      open,
      onOpenChange: setOpen,
      title: "Search Chats",
      description: "Find and navigate to your chats",
      children: [
        /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search chats by title..." }),
        /* @__PURE__ */ jsxs(CommandList, { children: [
          /* @__PURE__ */ jsx(CommandEmpty, { children: "No chats found." }),
          searchableChats.length > 0 && /* @__PURE__ */ jsx(CommandGroup, { heading: "Chats", children: searchableChats.map((chat) => /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: chat.title || "",
              onSelect: () => handleSelect(chat.id),
              className: "flex items-center justify-between",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "size-3 text-muted-foreground" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: chat.title || "Untitled" }),
                  chat.isPinned && /* @__PURE__ */ jsx(Pin, { className: "size-3 text-muted-foreground" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs", children: formatMessageDateForChatList(chat.updatedAt.toISOString()) })
              ]
            },
            chat.id
          )) }),
          /* @__PURE__ */ jsx(CommandGroup, { heading: "Shortcuts", children: /* @__PURE__ */ jsxs(
            CommandItem,
            {
              onSelect: () => {
                setOpen(false);
                navigate({ to: "/" });
              },
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "size-3 text-muted-foreground" }),
                /* @__PURE__ */ jsx("span", { children: "New Chat" }),
                /* @__PURE__ */ jsx(CommandShortcut, { children: "Enter" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Avatar({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className),
      ...props
    }
  );
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ jsx(AvatarPrimitive.Image, { "data-slot": "avatar-image", className: cn("aspect-square size-full", className), ...props });
}
function AvatarFallback({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn("flex size-full items-center justify-center rounded-full bg-muted", className),
      ...props
    }
  );
}
const buttonVariants = cva(
  'dark:aria-invalid:ring-destructive/40"size-"])]:size-4 inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all [&_svg:not([class*= focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  isLoading,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(Comp, { "data-slot": "button", className: cn(buttonVariants({ variant, size, className })), ...props, children: isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : props.children });
}
function DropdownMenu({ ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        'data-[variant=destructive]:*:[svg]:!text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20"size-"])]:size-4 data-[variant=destructive]:focus:text-destructive"text-"])]:text-muted-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden [&_svg:not([class*= [&_svg:not([class*= focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      ),
      ...props
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn("px-2 py-1.5 font-medium text-sm data-[inset]:pl-8", className),
      ...props
    }
  );
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("-mx-1 my-1 h-px bg-border", className),
      ...props
    }
  );
}
function ContextMenu({ ...props }) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Root, { "data-slot": "context-menu", ...props });
}
function ContextMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Trigger, { "data-slot": "context-menu-trigger", ...props });
}
function ContextMenuContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(ContextMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Content,
    {
      "data-slot": "context-menu-content",
      className: cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      ),
      ...props
    }
  ) });
}
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ContextMenuPrimitive.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        'data-[variant=destructive]:*:[svg]:!text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20"size-"])]:size-4 data-[variant=destructive]:focus:text-destructive"text-"])]:text-muted-foreground relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden [&_svg:not([class*= [&_svg:not([class*= focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className
      ),
      ...props
    }
  );
}
const useSidebarStore = create()(
  persist(
    (set) => ({
      isOpen: true,
      setIsOpen: (isOpen) => set({ isOpen }),
      selectedTab: "chat",
      setSelectedTab: (selectedTab) => set({ selectedTab })
    }),
    {
      name: "sidebar-storage"
    }
  )
);
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const ChatMenu = ({
  chatId,
  chatTitle,
  isPinned = false,
  isShared = false,
  isSelected = false
}) => {
  const { isSignedIn } = useUser();
  const { removeChat, pinChat, shareChat, renameChat, chatsDisplayMode } = useChatStore();
  const { setIsOpen } = useSidebarStore();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(chatTitle || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showUnshareDialog, setShowUnshareDialog] = useState(false);
  const pinChatMutation = api.chat.pinChat.useMutation();
  const shareChatMutation = api.chat.shareChat.useMutation();
  const deleteChatMutation = api.chat.deleteChat.useMutation();
  const renameChatMutation = api.chat.renameChat.useMutation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    if (isRenaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);
  const handlePin = async (e) => {
    e.stopPropagation();
    try {
      const newPinnedState = !isPinned;
      pinChat(chatId, newPinnedState);
      await pinChatMutation.mutateAsync({
        chatId,
        isPinned: newPinnedState
      });
    } catch (err) {
      console.error("❌ Failed to pin/unpin chat: ", err);
      pinChat(chatId, isPinned);
    }
  };
  const handleShare = (e) => {
    e.stopPropagation();
    if (isShared) {
      setShowUnshareDialog(true);
    } else {
      setShowShareDialog(true);
    }
  };
  const confirmShare = async () => {
    try {
      const newSharedState = !isShared;
      shareChat(chatId, newSharedState);
      await shareChatMutation.mutateAsync({
        chatId,
        isShared: newSharedState
      });
      if (newSharedState) {
        navigator.clipboard.writeText(`${window.location.origin}/${chatId}`);
        toast.success("Chat link copied to clipboard!");
        setShowShareDialog(false);
      } else {
        setShowUnshareDialog(false);
        location.reload();
      }
    } catch (error) {
      console.error("❌ Failed to share/unshare chat: ", error);
      shareChat(chatId, isShared);
      setShowShareDialog(false);
      setShowUnshareDialog(false);
    }
  };
  const handleRename = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
  };
  const handleRenameSubmit = async () => {
    if (!newTitle.trim()) return;
    try {
      renameChat(chatId, newTitle.trim());
      if (isSignedIn && chatsDisplayMode === "synced") {
        await renameChatMutation.mutateAsync({
          chatId,
          newTitle: newTitle.trim()
        });
      }
      setIsRenaming(false);
    } catch (error) {
      console.error("❌ Failed to rename chat: ", error);
      if (isSignedIn && chatsDisplayMode === "synced") {
        renameChat(chatId, chatTitle || "");
      }
    }
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };
  const confirmDelete = async () => {
    try {
      removeChat(chatId);
      await deleteChatMutation.mutateAsync({
        chatId
      });
      setShowDeleteDialog(false);
      navigate({ to: "/" });
    } catch (error) {
      console.error("❌ Failed to delete chat: ", error);
      setShowDeleteDialog(false);
    }
  };
  const handleChatClick = () => {
    if (!isRenaming) {
      if (isMobile) {
        setIsOpen(false);
      }
      navigate({ to: "/$chatId", params: { chatId } });
    }
  };
  const MenuItems = () => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(ContextMenuItem, { className: "flex items-center gap-2", onClick: handlePin, children: [
      /* @__PURE__ */ jsx(Pin, { className: "size-4" }),
      isPinned ? "Unpin chat" : "Pin chat"
    ] }),
    /* @__PURE__ */ jsxs(ContextMenuItem, { className: "flex items-center gap-2", onClick: handleShare, children: [
      /* @__PURE__ */ jsx(Share, { className: "size-4" }),
      isShared ? "Unshare chat" : "Share chat"
    ] }),
    /* @__PURE__ */ jsxs(ContextMenuItem, { className: "flex items-center gap-2", onClick: handleRename, children: [
      /* @__PURE__ */ jsx(Edit, { className: "size-4" }),
      "Rename"
    ] }),
    /* @__PURE__ */ jsxs(
      ContextMenuItem,
      {
        variant: "destructive",
        className: "flex items-center gap-2 text-destructive focus:text-destructive",
        onClick: handleDelete,
        children: [
          /* @__PURE__ */ jsx(Trash2, { className: "size-4" }),
          "Delete"
        ]
      }
    )
  ] });
  if (isRenaming) {
    return /* @__PURE__ */ jsx("div", { className: "flex w-full items-center gap-2 rounded-lg bg-accent px-3 py-4 hover:bg-red-500 dark:bg-accent/35", children: /* @__PURE__ */ jsx(
      "input",
      {
        ref: inputRef,
        type: "text",
        value: newTitle,
        onChange: (e) => setNewTitle(e.target.value),
        onBlur: handleRenameSubmit,
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            handleRenameSubmit();
          } else if (e.key === "Escape") {
            setIsRenaming(false);
            setNewTitle(chatTitle || "");
          }
        },
        className: "w-fit flex-1 rounded-xs border-none bg-background text-muted-foreground text-sm outline-none dark:bg-accent"
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "group relative flex w-full items-center justify-end gap-3 rounded-lg p-3 transition-all ease-in",
          {
            "bg-accent dark:bg-accent/35": isSelected
          }
        ),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              title: chatTitle || "Untitled",
              "aria-label": `Chat: ${chatTitle || "Untitled"}`,
              className: "flex flex-1 cursor-pointer items-center",
              onClick: handleChatClick,
              children: /* @__PURE__ */ jsxs(ContextMenu, { children: [
                /* @__PURE__ */ jsx(ContextMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "w-full cursor-pointer", children: /* @__PURE__ */ jsx("span", { className: "block max-w-54 truncate text-start text-muted-foreground text-sm", children: chatTitle || "" }) }) }),
                /* @__PURE__ */ jsx(ContextMenuContent, { children: /* @__PURE__ */ jsx(MenuItems, {}) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "size-6 shrink-0 cursor-pointer opacity-0 hover:bg-accent/50 group-hover:opacity-100",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                },
                children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "size-4" })
              }
            ) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "flex items-center gap-2", onClick: handlePin, children: [
                /* @__PURE__ */ jsx(Pin, { className: "size-4" }),
                isPinned ? "Unpin chat" : "Pin chat"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "flex items-center gap-2", onClick: handleShare, children: [
                /* @__PURE__ */ jsx(Share, { className: "size-4" }),
                isShared ? "Unshare chat" : "Share chat"
              ] }),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "flex items-center gap-2", onClick: handleRename, children: [
                /* @__PURE__ */ jsx(Edit, { className: "size-4" }),
                "Rename"
              ] }),
              /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  className: "flex items-center gap-2 text-destructive focus:text-destructive",
                  onClick: handleDelete,
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "size-4" }),
                    "Delete"
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Delete Chat" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          'Are you sure you want to delete "',
          chatTitle || "this chat",
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowDeleteDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: confirmDelete, children: "Delete" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showShareDialog, onOpenChange: setShowShareDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Share Chat" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          'Are you sure you want to share "',
          chatTitle || "this chat",
          '"? Others will be able to view this conversation.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowShareDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { onClick: confirmShare, children: "Share" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: showUnshareDialog, onOpenChange: setShowUnshareDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Unshare Chat" }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          'Are you sure you want to make "',
          chatTitle || "this chat",
          '" private? Others will no longer be able to access it.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setShowUnshareDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { onClick: confirmShare, children: "Unshare" })
      ] })
    ] }) })
  ] });
};
const clerkThemes = (resolvedTheme) => {
  const isDark = resolvedTheme === "dark";
  return {
    variables: {
      colorPrimary: isDark ? "#8b5cf6" : "#7c3aed",
      colorBackground: isDark ? "#27272a" : "#ffffff",
      colorText: isDark ? "#ffffff" : "#0f0f23",
      colorTextSecondary: isDark ? "#9ca3af" : "#6b7280",
      colorNeutral: isDark ? "#ffffff" : "#0f0f23",
      colorInputBackground: isDark ? "#27272a" : "#f9fafb",
      colorInputText: isDark ? "#ffffff" : "#0f0f23",
      colorDanger: "#ef4444",
      borderRadius: "0.65rem"
    },
    elements: {
      card: {
        backgroundColor: isDark ? "#27272a" : "#ffffff",
        borderColor: isDark ? "#27272a" : "#e5e7eb",
        color: isDark ? "#ffffff" : "#0f0f23"
      },
      modalBackdrop: {
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      formButtonPrimary: {
        backgroundColor: isDark ? "#8b5cf6" : "#7c3aed",
        color: "#ffffff",
        "&:hover": {
          opacity: "0.9"
        }
      }
    }
  };
};
const groupChats = (chats) => {
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1e3);
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1e3);
  const grouped = {
    pinned: [],
    today: [],
    last7Days: [],
    last30Days: [],
    older: []
  };
  for (const chat of chats) {
    const chatDate = new Date(chat.updatedAt);
    if (chat.isPinned) {
      grouped.pinned.push(chat);
    } else {
      if (chatDate >= today) {
        grouped.today.push(chat);
      } else if (chatDate >= last7Days) {
        grouped.last7Days.push(chat);
      } else if (chatDate >= last30Days) {
        grouped.last30Days.push(chat);
      } else {
        grouped.older.push(chat);
      }
    }
  }
  for (const group of Object.values(grouped)) {
    group.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  }
  return grouped;
};
const getGroupLabel = (groupKey) => {
  const labels = {
    pinned: "Pinned",
    today: "Today",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    older: "Older"
  };
  return labels[groupKey];
};
const Sidebar = ({ selectedChatId }) => {
  var _a;
  const { isOpen, setIsOpen } = useSidebarStore();
  const { chats: localChats, clearChats, chatsDisplayMode, isSyncing, isInitialLoading } = useChatStore();
  const { isSignedIn, isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const [manageAccountDialogOpen, setManageAccountDialogOpen] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const scrollContainerRef = useRef(null);
  const chatsToDisplay = (() => {
    if (!isSignedIn) {
      return localChats.map((chat) => ({ ...chat, isLocal: true }));
    }
    if (chatsDisplayMode === "synced") {
      return localChats.map((chat) => ({ ...chat, isLocal: false }));
    }
    return localChats.map((chat) => ({ ...chat, isLocal: true }));
  })();
  const sortedChats = chatsToDisplay.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    return dateB - dateA;
  });
  const groupedChats = groupChats(sortedChats);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const checkMobile = () => typeof window !== "undefined" && window.innerWidth < 768;
    if (checkMobile()) {
      setIsOpen(false);
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCtrlB = (isMac ? e.metaKey : e.ctrlKey) && (e.key === "b" || e.key === "B");
      const isCtrlShiftO = (isMac ? e.metaKey : e.ctrlKey) && e.shiftKey && (e.key === "o" || e.key === "O");
      if (isCtrlB) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (isCtrlShiftO) {
        e.preventDefault();
        navigate({ to: "/" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen, navigate]);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const checkScrollability = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const canScroll = scrollHeight > clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setCanScrollDown(canScroll && !isAtBottom);
    };
    checkScrollability();
    scrollContainer.addEventListener("scroll", checkScrollability);
    const resizeObserver = new ResizeObserver(checkScrollability);
    resizeObserver.observe(scrollContainer);
    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollability);
      resizeObserver.disconnect();
    };
  }, [sortedChats, isOpen]);
  const handleLogout = async () => {
    clearChats();
    await signOut();
  };
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleNewChatClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("aside", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-2.5 z-50 md:left-3.5", children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        "aria-label": "Open sidebar",
        onClick: toggleSidebar,
        "data-state": isOpen ? "open" : "closed",
        className: "backdrop-blur-sm data-[state=closed]:bg-white/10 md:data-[state=closed]:bg-transparent",
        children: /* @__PURE__ */ jsx(PanelLeft, { className: "size-5" })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: false,
        animate: isOpen ? "open" : "closed",
        variants: {
          open: { width: "24rem" },
          closed: { width: 0 }
        },
        transition: { type: "spring", stiffness: 300, damping: 30 },
        className: "flex h-full shrink-0 select-none flex-row overflow-hidden bg-background text-background-foreground",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-16 shrink-0 flex-col items-center justify-between bg-background p-2 py-4", children: [
            /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Change theme",
                  className: "mt-13 md:mt-11 dark:text-accent-foreground",
                  children: [
                    /* @__PURE__ */ jsx(Sun, { className: "size-5 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
                    /* @__PURE__ */ jsx(Moon, { className: "absolute size-5 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Change theme" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", side: "right", children: [
                /* @__PURE__ */ jsx(
                  DropdownMenuItem,
                  {
                    "data-selected": theme === "system",
                    className: "transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent",
                    onClick: () => handleThemeChange("system"),
                    children: "System"
                  }
                ),
                /* @__PURE__ */ jsx(
                  DropdownMenuItem,
                  {
                    "data-selected": theme === "dark",
                    className: "transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent",
                    onClick: () => handleThemeChange("dark"),
                    children: "Dark"
                  }
                ),
                /* @__PURE__ */ jsx(
                  DropdownMenuItem,
                  {
                    "data-selected": theme === "light",
                    className: "transition-all ease-in hover:bg-accent/10 data-[selected=true]:bg-accent",
                    onClick: () => handleThemeChange("light"),
                    children: "Light"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://github.com/PedroL22/22ai",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": "GitHub repository",
                  children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "cursor-pointer dark:text-accent-foreground", children: /* @__PURE__ */ jsx(Github, { className: "size-5" }) })
                }
              ),
              /* @__PURE__ */ jsx("a", { href: "/settings", "aria-label": "Settings", children: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "aria-label": "Settings",
                  className: "cursor-pointer dark:text-accent-foreground",
                  children: /* @__PURE__ */ jsx(Settings, { className: "size-5" })
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              variants: {
                open: { opacity: 1, pointerEvents: "auto", transition: { delay: 0.1, duration: 0.2 } },
                closed: { opacity: 0, pointerEvents: "none", transition: { duration: 0.1 } }
              },
              animate: isOpen ? "open" : "closed",
              initial: "open",
              className: "flex w-full min-w-80 flex-col p-4 px-6",
              children: [
                /* @__PURE__ */ jsx("div", { className: "mt-2 mb-4 flex w-full items-center justify-center", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: resolvedTheme === "light" ? "/images/icons/logotype-dark-text.svg" : "/images/icons/logotype-light-text.svg",
                    alt: "22AI",
                    className: "h-14",
                    width: 200,
                    height: 200
                  }
                ) }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    variants: {
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 }
                    },
                    initial: "initial",
                    animate: "animate",
                    exit: "exit",
                    transition: {
                      type: "tween",
                      duration: 0.15
                    },
                    className: "flex min-h-0 flex-1 flex-col space-y-4",
                    children: [
                      /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx("a", { href: "/", onClick: handleNewChatClick, children: "New chat" }) }),
                      /* @__PURE__ */ jsxs("div", { className: "relative min-h-0 flex-1", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            ref: scrollContainerRef,
                            className: "scrollbar-hide absolute inset-0 flex min-h-0 flex-1 flex-col items-center space-y-2.5 overflow-y-auto",
                            children: (!isSignedIn || chatsDisplayMode === "local") && !isSyncing && sortedChats.length === 0 && !isInitialLoading ? /* @__PURE__ */ jsx("div", { className: "flex size-full items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "text-center text-muted-foreground text-sm", children: "No chats yet." }) }) : isSyncing || isInitialLoading ? /* @__PURE__ */ jsx("div", { className: "flex size-full items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) }) : /* @__PURE__ */ jsx("div", { className: "w-full space-y-4", children: Object.keys(groupedChats).map((groupKey) => {
                              const group = groupedChats[groupKey];
                              if (group.length === 0) return null;
                              return /* @__PURE__ */ jsxs("div", { className: "space-y-1 pt-1", children: [
                                /* @__PURE__ */ jsx("h3", { className: "px-3 font-medium text-muted-foreground/75 text-xs tracking-wider dark:text-muted-foreground/60", children: groupKey === "pinned" ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                                  /* @__PURE__ */ jsx(Pin, { className: "size-3" }),
                                  /* @__PURE__ */ jsx("span", { children: getGroupLabel(groupKey) })
                                ] }) : getGroupLabel(groupKey) }),
                                /* @__PURE__ */ jsx("div", { className: "space-y-1", children: group.map((chat) => /* @__PURE__ */ jsx(
                                  ChatMenu,
                                  {
                                    chatId: chat.id,
                                    chatTitle: chat.title,
                                    isPinned: chat.isPinned,
                                    isShared: chat.isShared,
                                    isSelected: chat.id === selectedChatId
                                  },
                                  chat.id
                                )) })
                              ] }, groupKey);
                            }) })
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: `pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-linear-to-t from-background to-transparent transition-opacity duration-300 ${canScrollDown ? "opacity-100" : "opacity-0"}`
                          }
                        )
                      ] })
                    ]
                  },
                  "chat"
                ),
                !isLoaded ? /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-11 pb-3", children: /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) }) : isSignedIn ? /* @__PURE__ */ jsx("div", { className: "flex shrink-0 justify-center pt-4", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                  /* @__PURE__ */ jsxs(DropdownMenuTrigger, { className: "group flex cursor-pointer items-center space-x-2 rounded-lg px-5 py-3 transition-all ease-in hover:bg-accent dark:hover:bg-accent/35", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                      /* @__PURE__ */ jsxs(Avatar, { className: "size-8", children: [
                        /* @__PURE__ */ jsx(AvatarImage, { src: (user == null ? void 0 : user.imageUrl) || void 0, alt: (user == null ? void 0 : user.fullName) || void 0 }),
                        /* @__PURE__ */ jsx(AvatarFallback, { children: (_a = user == null ? void 0 : user.fullName) == null ? void 0 : _a.charAt(0) })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "max-w-40 truncate font-medium", children: user == null ? void 0 : user.fullName })
                    ] }),
                    /* @__PURE__ */ jsx(ChevronDown, { className: "mt-1 size-4 transition-all ease-in group-data-[state=open]:rotate-180" })
                  ] }),
                  /* @__PURE__ */ jsxs(DropdownMenuContent, { side: "top", children: [
                    /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "My account" }),
                    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => setManageAccountDialogOpen(true), children: [
                      /* @__PURE__ */ jsx(User, { className: "size-4" }),
                      /* @__PURE__ */ jsx("span", { children: "Manage account" })
                    ] }),
                    /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: handleLogout, children: [
                      /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
                      /* @__PURE__ */ jsx("span", { children: "Sign out" })
                    ] })
                  ] })
                ] }) }) : /* @__PURE__ */ jsx("div", { className: "flex shrink-0 justify-center pt-4", children: /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "/sign-in",
                    className: "flex items-center space-x-2 rounded-lg p-3 transition-all ease-in hover:bg-accent dark:hover:bg-accent/35",
                    children: [
                      /* @__PURE__ */ jsx(LogIn, { className: "size-5" }),
                      /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Sign in" })
                    ]
                  }
                ) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(Dialog, { open: manageAccountDialogOpen, onOpenChange: setManageAccountDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "overflow-auto rounded-2xl border-none p-0 md:max-w-[880px]", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "sr-only", children: [
        /* @__PURE__ */ jsx(DialogTitle, {}),
        /* @__PURE__ */ jsx(DialogDescription, {})
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx(UserProfile, { routing: "hash", appearance: clerkThemes(resolvedTheme ?? "dark") }) })
    ] }) })
  ] });
};
function AppLayout({ children }) {
  var _a;
  const matches = useMatches();
  const pathname = useLocation({ select: (location2) => location2.pathname });
  const chatMatch = matches.find((m) => "chatId" in m.params);
  const chatId = (_a = chatMatch == null ? void 0 : chatMatch.params) == null ? void 0 : _a.chatId;
  const routesToHide = ["/sign-in", "/settings"];
  const showSidebarAndSearchCommand = !routesToHide.some((route) => pathname.startsWith(route));
  if (!showSidebarAndSearchCommand) {
    return children;
  }
  return /* @__PURE__ */ jsx("div", { className: "flex h-svh w-screen items-center justify-center overflow-hidden 2xl:py-5", children: /* @__PURE__ */ jsxs("div", { className: "flex size-full max-w-[1500px] bg-accent 2xl:overflow-hidden 2xl:rounded-lg 2xl:shadow-sm dark:bg-accent", children: [
    /* @__PURE__ */ jsx(Sidebar, { selectedChatId: chatId }),
    /* @__PURE__ */ jsx(ChatSearchCommand, {}),
    children
  ] }) });
}
const geistFont = '"DM Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      refetchOnWindowFocus: false
    }
  }
});
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { title: "22AI" },
      { name: "description", content: "T3 Chat clone for cloneathon. I really like the number 22." },
      { name: "application-name", content: "22AI" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "22AI" },
      { name: "format-detection", content: "telephone=no" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#1e1e20", media: "(prefers-color-scheme: dark)" }
    ],
    links: [
      { rel: "icon", href: "/images/icons/logo.svg" },
      { rel: "apple-touch-icon", href: "/images/icons/app-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "mask-icon", href: "/images/icons/logo.svg", color: "#000000" },
      { rel: "shortcut icon", href: "/favicon.ico" }
    ]
  }),
  component: RootComponent,
  notFoundComponent: () => /* @__PURE__ */ jsx("div", { children: "Not Found" })
});
function RootComponent() {
  return /* @__PURE__ */ jsx(ClerkProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs("html", { lang: "en", style: { fontFamily: geistFont }, suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }),
      /* @__PURE__ */ jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: /* @__PURE__ */ jsx("main", { className: 'min-h-svh bg-[url("/images/bg/light-background.svg")] bg-center bg-cover dark:bg-[url("/images/bg/dark-background.svg")]', children: /* @__PURE__ */ jsxs(TRPCReactProvider, { children: [
        /* @__PURE__ */ jsx(ChatSyncProvider, {}),
        /* @__PURE__ */ jsx(Analytics, {}),
        /* @__PURE__ */ jsx(Toaster, {}),
        /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] }) }) });
}
const $$splitComponentImporter$3 = () => import("./sign-in-BgKJkvuf.js");
const Route$6 = createFileRoute("/sign-in")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./settings-Bd_Idy3W.js");
const Route$5 = createFileRoute("/settings")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./_chatId-IJ38NMTi.js");
const Route$4 = createFileRoute("/$chatId")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DWxlqMx-.js");
const Route$3 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const env = createEnv({
  clientPrefix: "VITE_",
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SECRET: z.string(),
    OPENROUTER_SITE_URL: z.string().url().optional(),
    OPENROUTER_SITE_NAME: z.string().optional(),
    OPENROUTER_API_KEY: z.string()
  },
  client: {
    VITE_CLERK_SIGN_IN_URL: z.string(),
    VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string(),
    VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string(),
    VITE_CLERK_PUBLISHABLE_KEY: z.string(),
    VITE_OPENROUTER_DEFAULT_MODEL: z.string(),
    VITE_APP_URL: z.string().url().optional()
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: "production",
    VITE_CLERK_SIGN_IN_URL: process.env.VITE_CLERK_SIGN_IN_URL,
    VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: process.env.VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
    VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: process.env.VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    VITE_CLERK_PUBLISHABLE_KEY: process.env.VITE_CLERK_PUBLISHABLE_KEY,
    VITE_OPENROUTER_DEFAULT_MODEL: process.env.VITE_OPENROUTER_DEFAULT_MODEL,
    VITE_APP_URL: process.env.VITE_APP_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    OPENROUTER_SITE_URL: process.env.OPENROUTER_SITE_URL,
    OPENROUTER_SITE_NAME: process.env.OPENROUTER_SITE_NAME,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
const globalForPrisma = globalThis;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const db = globalForPrisma.prisma || new PrismaClient({
  adapter,
  log: ["error"]
});
globalForPrisma.prisma = db;
const createUser = async (userId, userEmail) => {
  return await db.user.create({
    data: {
      id: userId,
      email: userEmail
    }
  });
};
const deleteUser = async (userId) => {
  return await db.user.delete({
    where: { id: userId }
  });
};
const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;
const Route$2 = createFileRoute("/api/webhooks/clerk")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        var _a;
        const svix_id = request.headers.get("svix-id");
        const svix_timestamp = request.headers.get("svix-timestamp");
        const svix_signature = request.headers.get("svix-signature");
        if (!svix_id || !svix_timestamp || !svix_signature) {
          return new Response("Error occurred -- no svix headers", {
            status: 400
          });
        }
        const payload = await request.json();
        const body = JSON.stringify(payload);
        const wh = new Webhook(WEBHOOK_SECRET);
        let evt;
        try {
          evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
          });
        } catch (err) {
          console.error("❌ Error verifying webhook: ", err);
          return new Response("Error occurred.", {
            status: 400
          });
        }
        const eventType = evt.type;
        if (eventType === "user.created") {
          const { id, email_addresses } = evt.data;
          const primaryEmail = ((_a = email_addresses == null ? void 0 : email_addresses.find((email) => email.id === evt.data.primary_email_address_id)) == null ? void 0 : _a.email_address) || "";
          try {
            await createUser(id, primaryEmail);
          } catch (err) {
            console.error(`❌ Error creating user ${id}: `, err);
          }
        }
        if (eventType === "user.deleted") {
          const { id } = evt.data;
          try {
            await deleteUser(id);
          } catch (err) {
            console.error(`❌ Error deleting user ${id}: `, err);
          }
        }
        return new Response(JSON.stringify({ received: true }));
      }
    }
  }
});
var createErrorMessage = (msg) => {
  return `🔒 Clerk: ${msg.trim()}

For more info, check out the docs: https://clerk.com/docs,
or come say hi in our discord server: https://clerk.com/discord

`;
};
createErrorMessage(`
  You're calling 'getAuth()' from a server function, without providing the request object.
  Example:

  export const someServerFunction = createServerFn({ method: 'GET' }).handler(async () => {
    const request = getWebRequest()
    const auth = getAuth(request);
    ...
  });
  `);
var clerkMiddlewareNotConfigured = createErrorMessage(`
It looks like you're trying to use Clerk without configuring the middleware.

To fix this, make sure you have the \`clerkMiddleware()\` configured in your \`createStart()\` function in your \`src/start.ts\` file.`);
var auth = (async (opts) => {
  const authObjectFn = getGlobalStartContext().auth;
  if (!authObjectFn) {
    return errorThrower.throw(clerkMiddlewareNotConfigured);
  }
  const authObject = await Promise.resolve(authObjectFn({ treatPendingAsSignedOut: opts == null ? void 0 : opts.treatPendingAsSignedOut }));
  return getAuthObjectForAcceptedToken({ authObject, acceptsToken: opts == null ? void 0 : opts.acceptsToken });
});
const createTRPCContext = async (opts) => {
  const authResult = await auth();
  return {
    db,
    auth: authResult,
    user: (authResult == null ? void 0 : authResult.userId) ? { id: authResult.userId } : null,
    ...opts
  };
};
const t = initTRPC.context().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
const createCallerFactory = t.createCallerFactory;
const createTRPCRouter = t.router;
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  const result = await next();
  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  return result;
});
const publicProcedure = t.procedure.use(timingMiddleware);
const protectedProcedure = t.procedure.use(timingMiddleware).use(({ ctx, next }) => {
  var _a;
  if (!((_a = ctx.auth) == null ? void 0 : _a.userId)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth
    }
  });
});
const createOpenRouterClient = () => {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": env.OPENROUTER_SITE_URL,
      "X-Title": env.OPENROUTER_SITE_NAME
    }
  });
};
const createNativeOpenAIClient = (apiKey) => {
  return new OpenAI({
    apiKey,
    baseURL: "https://api.openai.com/v1"
  });
};
async function createAnthropicChatCompletion(messages, modelId, apiKey, stream = false) {
  var _a, _b, _c;
  const url = "https://api.anthropic.com/v1/messages";
  const modelName = modelId.replace(/^anthropic\//, "").replace(/:byok$/, "");
  const systemPrompt = (_a = messages.find((m) => m.role === "system")) == null ? void 0 : _a.content;
  const conversationMessages = messages.filter((m) => m.role !== "system");
  const body = {
    model: modelName,
    max_tokens: 1024,
    system: systemPrompt,
    // Use the dedicated 'system' parameter
    messages: conversationMessages,
    // Pass the full alternating user/assistant history
    stream
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`❌ Anthropic API error: ${await res.text()}`);
  if (stream) {
    return { success: true, stream: res.body };
  }
  const data = await res.json();
  return { success: true, message: ((_c = (_b = data.content) == null ? void 0 : _b[0]) == null ? void 0 : _c.text) || "" };
}
const parseGeminiRetryDelay = (rawDelay) => {
  if (!rawDelay) return null;
  const trimmed = rawDelay.trim();
  return trimmed.length > 0 ? trimmed : null;
};
const getGeminiRetryDelayFromBody = (errorBody) => {
  var _a, _b;
  const retryDetail = (_b = (_a = errorBody == null ? void 0 : errorBody.error) == null ? void 0 : _a.details) == null ? void 0 : _b.find(
    (detail) => (detail == null ? void 0 : detail["@type"]) === "type.googleapis.com/google.rpc.RetryInfo"
  );
  return parseGeminiRetryDelay(retryDetail == null ? void 0 : retryDetail.retryDelay);
};
const getGeminiRetryDelayFromText = (errorText) => {
  const retryDelayMatch = errorText.match(/"retryDelay"\s*:\s*"([^"]+)"/i);
  if (retryDelayMatch == null ? void 0 : retryDelayMatch[1]) return parseGeminiRetryDelay(retryDelayMatch[1]);
  const retrySecondsMatch = errorText.match(/retry in\s+([0-9.]+)\s*s/i);
  if (retrySecondsMatch == null ? void 0 : retrySecondsMatch[1]) return parseGeminiRetryDelay(`${retrySecondsMatch[1]}s`);
  return null;
};
const parseGeminiErrorBody = (errorText) => {
  try {
    return JSON.parse(errorText);
  } catch {
  }
  const jsonMatch = errorText.match(/\{[\s\S]*\}/);
  if (!(jsonMatch == null ? void 0 : jsonMatch[0])) return null;
  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return null;
  }
};
const isGeminiRateLimitError = (errorBody, errorText) => {
  var _a, _b;
  const errorCode = (_a = errorBody == null ? void 0 : errorBody.error) == null ? void 0 : _a.code;
  const errorStatus = (_b = errorBody == null ? void 0 : errorBody.error) == null ? void 0 : _b.status;
  return errorCode === 429 || errorStatus === "RESOURCE_EXHAUSTED" || /RESOURCE_EXHAUSTED/i.test(errorText) || /quota exceeded/i.test(errorText) || /rate limit/i.test(errorText) || /429/.test(errorText);
};
const getGeminiRateLimitMessage = (modelName, retryDelay) => {
  const retryText = retryDelay ? ` Retry in ${retryDelay}.` : "";
  return `❌ Gemini rate limit exceeded for ${modelName}.${retryText} Check your Gemini API quota and billing.`;
};
async function createGeminiChatCompletion(messages, modelId, apiKey, stream = false) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const modelName = modelId.replace(/^google\//, "").replace(/:byok$/, "");
  const endpoint = stream ? "streamGenerateContent" : "generateContent";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:${endpoint}?key=${apiKey}${stream ? "&alt=sse" : ""}`;
  const systemPrompt = (_a = messages.find((m) => m.role === "system")) == null ? void 0 : _a.content;
  const conversationMessages = messages.filter((m) => m.role !== "system");
  if (systemPrompt && conversationMessages.length === 0) {
    conversationMessages.push({ role: "user", content: systemPrompt });
  } else if (systemPrompt && conversationMessages.length > 0 && ((_b = conversationMessages[0]) == null ? void 0 : _b.role) === "user" && typeof ((_c = conversationMessages[0]) == null ? void 0 : _c.content) === "string") {
    conversationMessages[0].content = `${systemPrompt}

${conversationMessages[0].content}`;
  } else if (systemPrompt && conversationMessages.length > 0) {
    conversationMessages.unshift({ role: "user", content: systemPrompt });
  }
  const contents = conversationMessages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));
  const body = { contents };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errorText = await res.text();
    const errorBody = parseGeminiErrorBody(errorText);
    if (isGeminiRateLimitError(errorBody, errorText)) {
      const retryDelay = getGeminiRetryDelayFromBody(errorBody) ?? getGeminiRetryDelayFromText(errorText);
      throw new Error(getGeminiRateLimitMessage(modelName, retryDelay));
    }
    throw new Error(`❌ Gemini API error: ${errorText}`);
  }
  if (stream) {
    return { success: true, stream: res.body };
  }
  const data = await res.json();
  return { success: true, message: ((_h = (_g = (_f = (_e = (_d = data.candidates) == null ? void 0 : _d[0]) == null ? void 0 : _e.content) == null ? void 0 : _f.parts) == null ? void 0 : _g[0]) == null ? void 0 : _h.text) || "" };
}
async function createGrokChatCompletion(messages, modelId, apiKey, stream = false) {
  var _a, _b, _c;
  const url = "https://api.x.ai/v1/chat/completions";
  const modelName = modelId.replace(/^grok\//, "").replace(/:byok$/, "");
  const body = {
    model: modelName,
    messages,
    temperature: 0.7,
    max_tokens: 1e3,
    stream
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`❌ Grok API error: ${await res.text()}`);
  if (stream) {
    return { success: true, stream: res.body };
  }
  const data = await res.json();
  return { success: true, message: ((_c = (_b = (_a = data.choices) == null ? void 0 : _a[0]) == null ? void 0 : _b.message) == null ? void 0 : _c.content) || "" };
}
const isFailoverError = (error) => {
  var _a, _b, _c, _d, _e, _f, _g;
  return (error == null ? void 0 : error.status) === 500 || (error == null ? void 0 : error.status) === 502 || (error == null ? void 0 : error.status) === 503 || (error == null ? void 0 : error.status) === 504 || (error == null ? void 0 : error.status) === 429 || ((_a = error == null ? void 0 : error.message) == null ? void 0 : _a.includes("500")) || ((_b = error == null ? void 0 : error.message) == null ? void 0 : _b.includes("429")) || ((_c = error == null ? void 0 : error.message) == null ? void 0 : _c.includes("rate limit")) || ((_d = error == null ? void 0 : error.message) == null ? void 0 : _d.includes("quota")) || ((_e = error == null ? void 0 : error.message) == null ? void 0 : _e.includes("limit exceeded")) || ((_f = error == null ? void 0 : error.message) == null ? void 0 : _f.includes("server error")) || ((_g = error == null ? void 0 : error.message) == null ? void 0 : _g.includes("API"));
};
const makeApiCallWithFallback = async (apiCall, maxRetries = 5) => {
  var _a, _b;
  let lastError = null;
  let attempts = 0;
  while (attempts < maxRetries) {
    try {
      const client = createOpenRouterClient();
      const result = await apiCall(client);
      return { success: true, data: result };
    } catch (error) {
      lastError = error;
      attempts++;
      console.error(`❌ OpenRouter API error (attempt ${attempts}/${maxRetries}): `, error);
      const err = error;
      if ((err == null ? void 0 : err.status) === 404 || (err == null ? void 0 : err.code) === 404 || ((_a = err == null ? void 0 : err.message) == null ? void 0 : _a.includes("404"))) {
        const modelMatch = (_b = err == null ? void 0 : err.message) == null ? void 0 : _b.match(/([a-z0-9-]+\/[a-z0-9.-]+(?::[a-z]+)?)/i);
        const modelName = modelMatch ? modelMatch[1] : "the requested model";
        return {
          success: false,
          error: `Model "${modelName}" is not available on OpenRouter. It may have been deprecated or removed. Please try a different model.`
        };
      }
      if (!isFailoverError(error)) {
        break;
      }
    }
  }
  return {
    success: false,
    error: (lastError == null ? void 0 : lastError.message) || "Unknown error occurred after all retries."
  };
};
const createChatCompletion = async (messages, modelId, apiKey) => {
  var _a, _b;
  if (modelId.endsWith(":free")) {
    const result = await makeApiCallWithFallback(
      (client) => client.chat.completions.create({
        model: modelId ?? env.VITE_OPENROUTER_DEFAULT_MODEL,
        messages,
        temperature: 0.7,
        max_completion_tokens: 1e3
      })
    );
    if (!result.success) {
      return { success: false, error: result.error };
    }
    return {
      success: true,
      message: ((_b = (_a = result.data.choices[0]) == null ? void 0 : _a.message) == null ? void 0 : _b.content) || "",
      usage: result.data.usage
    };
  }
  if (modelId.startsWith("openai/")) {
    return { success: false, error: "❌ No OpenAI API key set." };
  }
  if (modelId.startsWith("anthropic/")) {
    return { success: false, error: "❌ No Anthropic API key set." };
  }
  if (modelId.startsWith("google/")) {
    return { success: false, error: "❌ No Gemini API key set." };
  }
  if (modelId.startsWith("grok/")) {
    return { success: false, error: "❌ No Grok API key set." };
  }
  return { success: false, error: "Unknown model provider." };
};
const createChatCompletionStream = async (messages, modelId, apiKey) => {
  if (modelId.endsWith(":free")) {
    const result = await makeApiCallWithFallback(
      (client) => client.chat.completions.create({
        model: modelId ?? env.VITE_OPENROUTER_DEFAULT_MODEL,
        messages,
        temperature: 0.7,
        max_completion_tokens: 1e3,
        stream: true
      })
    );
    if (!result.success) {
      return { success: false, error: result.error, stream: null };
    }
    return { success: true, stream: result.data };
  }
  if (modelId.startsWith("openai/")) {
    if (!apiKey) return { success: false, error: "❌ No OpenAI API key set.", stream: null };
    const client = createNativeOpenAIClient(apiKey);
    try {
      const stream = await client.chat.completions.create({
        model: modelId.replace(/^openai\//, "").replace(/:byok$/, ""),
        messages,
        temperature: 0.7,
        max_tokens: 1e3,
        stream: true
      });
      return { success: true, stream };
    } catch (error) {
      return { success: false, error: error.message, stream: null };
    }
  }
  if (modelId.startsWith("anthropic/")) {
    if (!apiKey) return { success: false, error: "❌ No Anthropic API key set.", stream: null };
    try {
      const result = await createAnthropicChatCompletion(messages, modelId, apiKey, true);
      return { success: true, stream: result.stream };
    } catch (error) {
      return { success: false, error: error.message, stream: null };
    }
  }
  if (modelId.startsWith("google/")) {
    if (!apiKey) return { success: false, error: "❌ No Gemini API key set.", stream: null };
    try {
      const result = await createGeminiChatCompletion(messages, modelId, apiKey, true);
      return { success: true, stream: result.stream };
    } catch (error) {
      return { success: false, error: error.message, stream: null };
    }
  }
  if (modelId.startsWith("grok/")) {
    if (!apiKey) return { success: false, error: "❌ No Grok API key set.", stream: null };
    try {
      const result = await createGrokChatCompletion(messages, modelId, apiKey, true);
      return { success: true, stream: result.stream };
    } catch (error) {
      return { success: false, error: error.message, stream: null };
    }
  }
  return { success: false, error: "Unknown model provider.", stream: null };
};
const tryCatch = async (promise) => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
};
const MODELS = [
  // Free models
  {
    id: "openai/gpt-oss-120b:free",
    name: "GPT-OSS 120B",
    developer: "OpenAI",
    description: "OpenAI's historic open-weight model. This 117B MoE model is designed for high-reasoning and agentic workflows without API costs.",
    isFree: true
  },
  {
    id: "openai/gpt-oss-20b:free",
    name: "GPT-OSS 20B",
    developer: "OpenAI",
    description: "OpenAI's compact open-weight model optimized for fast responses and efficient reasoning on everyday tasks.",
    isFree: true
  },
  {
    id: "google/gemma-3-27b-it:free",
    name: "Gemma 3 27B",
    developer: "Google",
    description: "Google's flagship open-weight multimodal model, delivering strong visual understanding and logical reasoning in an efficient package.",
    isFree: true
  },
  {
    id: "google/gemma-3-12b-it:free",
    name: "Gemma 3 12B",
    developer: "Google",
    description: "A balanced open-weight model from Google, offering strong performance in reasoning and instruction-following tasks with efficient resource usage.",
    isFree: true
  },
  {
    id: "meta-llama/llama-3.3-70b-instruct:free",
    name: "Llama 3.3 70B Instruct",
    developer: "Meta",
    description: "A powerful instruction-tuned model from Meta, offering GPT-4 level performance with excellent multilingual dialogue and reasoning capabilities.",
    isFree: true
  },
  {
    id: "meta-llama/llama-3.2-3b-instruct:free",
    name: "Llama 3.2 3B Instruct",
    developer: "Meta",
    description: "Meta's lightweight instruction model tuned for fast, efficient chats and low-latency reasoning on smaller workloads.",
    isFree: true
  },
  {
    id: "deepseek/deepseek-r1-0528:free",
    name: "DeepSeek R1 0528",
    developer: "DeepSeek",
    description: "A frontier reasoning model from DeepSeek that uses reinforcement learning to solve complex problems with step-by-step thinking processes.",
    isFree: true
  },
  {
    id: "qwen/qwen3-next-80b-a3b-instruct:free",
    name: "Qwen3 Next 80B A3B Instruct",
    developer: "Alibaba",
    description: "A next-gen instruction model from Qwen focused on strong reasoning and long-form responses at high capacity.",
    isFree: true
  },
  {
    id: "qwen/qwen3-coder:free",
    name: "Qwen3 Coder",
    developer: "Alibaba",
    description: "Alibaba's premier coding model, optimized for repository-level reasoning, function calling, and complex agentic software development.",
    isFree: true
  },
  {
    id: "z-ai/glm-4.5-air:free",
    name: "GLM 4.5 Air",
    developer: "Z.ai",
    description: "Z.ai lightweight flagship tuned for fast chat, tool use, and reliable instruction following.",
    isFree: true
  },
  // BYOK models
  {
    id: "openai/gpt-5.2:byok",
    name: "GPT 5.2",
    developer: "OpenAI",
    description: "OpenAI's latest frontier model featuring a 400K context window and adaptive reasoning that scales based on task complexity.",
    isFree: false
  },
  {
    id: "openai/gpt-5-mini:byok",
    name: "GPT 5 Mini",
    developer: "OpenAI",
    description: "A cost-efficient, high-speed variant of GPT-5, offering advanced reasoning and multimodal capabilities for production-scale apps.",
    isFree: false
  },
  {
    id: "openai/o4-mini:byok",
    name: "o4 mini",
    developer: "OpenAI",
    description: "OpenAI's efficient reasoning model optimized for tool use, coding, and autonomous workflow execution with internal thinking tokens.",
    isFree: false
  },
  {
    id: "anthropic/claude-4-sonnet:byok",
    name: "Claude 4 Sonnet",
    developer: "Anthropic",
    description: "Anthropic's latest high-capacity model, delivering superior performance in coding and research with state-of-the-art instruction following.",
    isFree: false
  },
  {
    id: "anthropic/claude-4-opus:byok",
    name: "Claude 4 Opus",
    developer: "Anthropic",
    description: "Anthropic's most intelligent model, designed for complex agentic workflows, long-running tasks, and frontier-level logic.",
    isFree: false
  },
  {
    id: "anthropic/claude-3.7-sonnet:byok",
    name: "Claude 3.7 Sonnet",
    developer: "Anthropic",
    description: 'A highly reliable reasoning model from the Claude 3.5 series with enhanced "thinking" capabilities for accurate problem solving.',
    isFree: false
  },
  {
    id: "google/gemini-3-flash-preview:byok",
    name: "Gemini 3 Flash Preview",
    developer: "Google",
    description: "Google's newest recommended Gemini preview, optimized for fast, capable responses across everyday tasks.",
    isFree: false
  },
  {
    id: "google/gemini-2.5-flash:byok",
    name: "Gemini 2.5 Flash",
    developer: "Google",
    description: "A fast, general-purpose Gemini model tuned for responsive chat and routine work.",
    isFree: false
  },
  {
    id: "google/gemini-2.5-pro:byok",
    name: "Gemini 2.5 Pro",
    developer: "Google",
    description: "Google's high-capability reasoning model for complex problem solving and deep analysis.",
    isFree: false
  },
  {
    id: "google/gemini-2.5-flash-lite:byok",
    name: "Gemini 2.5 Flash Lite",
    developer: "Google",
    description: "A lightweight, high-throughput Gemini model for high-volume chat and low-latency workflows.",
    isFree: false
  },
  {
    id: "google/gemini-2.0-flash:byok",
    name: "Gemini 2.0 Flash",
    developer: "Google",
    description: "A legacy Gemini Flash model maintained for compatibility and migration support.",
    isFree: false
  },
  {
    id: "grok/grok-4:byok",
    name: "Grok 4",
    developer: "xAi",
    description: "The latest flagship model from xAI, blending deep expertise in science and finance with massive knowledge and advanced logic.",
    isFree: false
  }
];
const MODEL_IDS$1 = MODELS.map((model) => model.id);
const chatMessageSchema$1 = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string()
});
const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure.input(
    z.object({
      messages: z.array(chatMessageSchema$1),
      modelId: z.enum(MODEL_IDS$1).optional().default(env.VITE_OPENROUTER_DEFAULT_MODEL)
    })
  ).mutation(async ({ input }) => {
    var _a;
    const { data, error } = await tryCatch(createChatCompletion(input.messages, input.modelId));
    if (error) {
      console.error("❌ Error sending message: ", error);
      return {
        success: false,
        message: "Failed to send message."
      };
    }
    return {
      success: true,
      message: (_a = data.message) == null ? void 0 : _a.trim().replace(/"/g, "")
    };
  }),
  generateChatTitle: publicProcedure.input(z.object({ firstMessage: z.string() })).mutation(async ({ input }) => {
    var _a;
    console.log("🎯 tRPC: Starting title generation for message: ", input.firstMessage);
    const { data, error } = await tryCatch(
      createChatCompletion(
        [
          {
            role: "system",
            content: "You are a helpful assistant that generates concise, descriptive chat titles (3-6 words) based on the user's first message. Respond only with the title, no additional text or punctuation."
          },
          {
            role: "user",
            content: `Generate a concise title for a chat that starts with this message: "${input.firstMessage}"`
          }
        ],
        env.VITE_OPENROUTER_DEFAULT_MODEL
      )
    );
    if (error) {
      console.error("❌ Error generating chat title: ", error);
      return {
        success: false,
        title: "New chat"
      };
    }
    return {
      success: true,
      title: ((_a = data.message) == null ? void 0 : _a.trim().replace(/"/g, "")) || "New chat"
    };
  }),
  createChat: protectedProcedure.input(
    z.object({
      title: z.string().optional(),
      firstMessage: z.string(),
      modelId: z.enum(MODEL_IDS$1).optional().default(env.VITE_OPENROUTER_DEFAULT_MODEL)
    })
  ).mutation(async ({ ctx, input }) => {
    const ensureUserExists = await ctx.db.user.findUnique({ where: { id: ctx.auth.userId } });
    if (!ensureUserExists) {
      throw new Error("User not found.");
    }
    const chat = await ctx.db.chat.create({
      data: {
        title: input.title || `Chat ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US")}`,
        userId: ctx.auth.userId
      }
    });
    await ctx.db.message.create({
      data: {
        role: "user",
        content: input.firstMessage,
        userId: ctx.auth.userId,
        chatId: chat.id
      }
    });
    const result = await createChatCompletion([{ role: "user", content: input.firstMessage }], input.modelId);
    if (!result.success) {
      console.error("❌ Error creating chat: ", result || "Unknown error occurred.");
      return {
        success: false,
        chatId: chat.id
      };
    }
    if (result.success && result.message) {
      await ctx.db.message.create({
        data: {
          role: "assistant",
          content: result.message,
          modelId: input.modelId,
          userId: ctx.auth.userId,
          chatId: chat.id
        }
      });
      return {
        success: true,
        chatId: chat.id,
        message: result.message
      };
    }
  }),
  renameChat: protectedProcedure.input(z.object({ chatId: z.string(), newTitle: z.string() })).mutation(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({ where: { id: input.chatId } });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    await ctx.db.chat.update({
      where: { id: input.chatId },
      data: { title: input.newTitle }
    });
    return {
      success: true,
      chatId: input.chatId,
      newTitle: input.newTitle
    };
  }),
  deleteChat: protectedProcedure.input(z.object({ chatId: z.string() })).mutation(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({ where: { id: input.chatId } });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    await ctx.db.chat.delete({ where: { id: input.chatId } });
    return {
      success: true
    };
  }),
  pinChat: protectedProcedure.input(z.object({ chatId: z.string(), isPinned: z.boolean() })).mutation(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({ where: { id: input.chatId } });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    await ctx.db.chat.update({
      where: { id: input.chatId },
      data: { isPinned: input.isPinned }
    });
    return {
      success: true,
      chatId: input.chatId,
      isPinned: input.isPinned
    };
  }),
  shareChat: protectedProcedure.input(z.object({ chatId: z.string(), isShared: z.boolean() })).mutation(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({ where: { id: input.chatId } });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    await ctx.db.chat.update({
      where: { id: input.chatId },
      data: { isShared: input.isShared }
    });
    return {
      success: true,
      chatId: input.chatId,
      isShared: input.isShared
    };
  }),
  getUserChats: protectedProcedure.query(async ({ ctx }) => {
    const ensureUserExists = await ctx.db.user.findUnique({ where: { id: ctx.auth.userId } });
    if (!ensureUserExists) {
      throw new Error("User not found.");
    }
    const userChats = await ctx.db.chat.findMany({
      where: { userId: ctx.auth.userId },
      orderBy: { createdAt: "desc" }
    });
    return userChats.map((chat) => ({
      id: chat.id,
      title: chat.title,
      isPinned: chat.isPinned,
      isShared: chat.isShared,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      userId: chat.userId
    }));
  }),
  getChatMessages: protectedProcedure.input(z.object({ chatId: z.string() })).query(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({ where: { id: input.chatId } });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    const messages = await ctx.db.message.findMany({
      where: { chatId: input.chatId },
      orderBy: { createdAt: "asc" }
    });
    return messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt
    }));
  }),
  sendMessageToChat: protectedProcedure.input(
    z.object({
      chatId: z.string(),
      message: z.string(),
      modelId: z.enum(MODEL_IDS$1).optional().default(env.VITE_OPENROUTER_DEFAULT_MODEL)
    })
  ).mutation(async ({ ctx, input }) => {
    const ensureUserExists = await ctx.db.user.findUnique({ where: { id: ctx.auth.userId } });
    if (!ensureUserExists) {
      throw new Error("User not found.");
    }
    const chat = await ctx.db.chat.findUnique({ where: { id: input.chatId } });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    const userMessage = await ctx.db.message.create({
      data: {
        role: "user",
        content: input.message,
        userId: ctx.auth.userId,
        chatId: input.chatId
      }
    });
    await ctx.db.chat.update({
      where: { id: input.chatId },
      data: { updatedAt: /* @__PURE__ */ new Date() }
    });
    return {
      success: true,
      messageId: userMessage.id,
      chatId: input.chatId
    };
  }),
  syncLocalChatsToDatabase: protectedProcedure.input(
    z.object({
      chats: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          messages: z.array(
            z.object({
              id: z.string(),
              role: z.enum(["user", "assistant"]),
              content: z.string(),
              modelId: z.string().nullable(),
              createdAt: z.date()
            })
          )
        })
      )
    })
  ).mutation(async ({ ctx, input }) => {
    const ensureUserExists = await ctx.db.user.findUnique({ where: { id: ctx.auth.userId } });
    if (!ensureUserExists) {
      throw new Error("User not found.");
    }
    const syncedChats = [];
    for (const localChat of input.chats) {
      const existingChat = await ctx.db.chat.findUnique({
        where: { id: localChat.id }
      });
      let chat;
      if (!existingChat) {
        chat = await ctx.db.chat.create({
          data: {
            id: localChat.id,
            title: localChat.title,
            userId: ctx.auth.userId,
            createdAt: localChat.createdAt,
            updatedAt: localChat.updatedAt
          }
        });
      } else {
        chat = existingChat;
      }
      for (const localMessage of localChat.messages) {
        const existingMessage = await ctx.db.message.findUnique({
          where: { id: localMessage.id }
        });
        if (!existingMessage) {
          await ctx.db.message.create({
            data: {
              id: localMessage.id,
              role: localMessage.role,
              content: localMessage.content,
              modelId: localMessage.modelId,
              userId: ctx.auth.userId,
              chatId: chat.id,
              createdAt: localMessage.createdAt
            }
          });
        }
      }
      syncedChats.push(chat);
    }
    return {
      success: true,
      syncedChats
    };
  }),
  getAllUserChatsWithMessages: protectedProcedure.query(async ({ ctx }) => {
    const ensureUserExists = await ctx.db.user.findUnique({ where: { id: ctx.auth.userId } });
    if (!ensureUserExists) {
      throw new Error("User not found.");
    }
    const userChatsWithMessages = await ctx.db.chat.findMany({
      where: { userId: ctx.auth.userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return userChatsWithMessages.map((chat) => ({
      id: chat.id,
      title: chat.title,
      isPinned: chat.isPinned,
      isShared: chat.isShared,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      userId: chat.userId,
      messages: chat.messages.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        isError: message.isError,
        modelId: message.modelId,
        createdAt: message.createdAt,
        userId: message.userId,
        chatId: message.chatId
      }))
    }));
  }),
  clearUserChatsFromDatabase: protectedProcedure.mutation(async ({ ctx }) => {
    const ensureUserExists = await ctx.db.user.findUnique({ where: { id: ctx.auth.userId } });
    if (!ensureUserExists) {
      throw new Error("User not found.");
    }
    await ctx.db.chat.deleteMany({
      where: { userId: ctx.auth.userId }
    });
    return {
      success: true,
      message: "All user chats deleted from database"
    };
  }),
  syncChatToDatabase: protectedProcedure.input(
    z.object({
      chat: z.object({
        id: z.string(),
        title: z.string(),
        createdAt: z.date(),
        updatedAt: z.date()
      })
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      const chat = await ctx.db.chat.upsert({
        where: { id: input.chat.id },
        update: {
          title: input.chat.title,
          updatedAt: input.chat.updatedAt
        },
        create: {
          id: input.chat.id,
          title: input.chat.title,
          createdAt: input.chat.createdAt,
          updatedAt: input.chat.updatedAt,
          userId: ctx.auth.userId
        }
      });
      return { success: true, chat };
    } catch (error) {
      console.error("❌ Error syncing chat to database: ", error);
      throw new Error("❌ Failed to sync chat to database.");
    }
  }),
  syncMessageToDatabase: protectedProcedure.input(
    z.object({
      message: z.object({
        id: z.string(),
        role: z.enum(["user", "assistant"]),
        content: z.string(),
        isError: z.boolean(),
        modelId: z.string().nullable(),
        createdAt: z.date(),
        chatId: z.string()
      })
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      const message = await ctx.db.message.upsert({
        where: { id: input.message.id },
        update: {
          content: input.message.content
        },
        create: {
          id: input.message.id,
          role: input.message.role,
          content: input.message.content,
          isError: input.message.isError || false,
          modelId: input.message.modelId,
          createdAt: input.message.createdAt,
          chatId: input.message.chatId,
          userId: ctx.auth.userId
        }
      });
      return { success: true, message };
    } catch (error) {
      console.error("❌ Error syncing message to database: ", error);
      throw new Error("❌ Failed to sync message to database.");
    }
  }),
  getSharedChat: publicProcedure.input(z.object({ chatId: z.string() })).query(async ({ ctx, input }) => {
    var _a;
    const chat = await ctx.db.chat.findUnique({
      where: { id: input.chatId },
      include: { user: { select: { id: true, email: true } } }
    });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    if (!chat.isShared) {
      throw new Error("Chat is not shared.");
    }
    const { clerkClient } = await import("./index-CJMKNngS.js");
    let ownerName = "Unknown User";
    try {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(chat.userId);
      ownerName = clerkUser.fullName || clerkUser.firstName || ((_a = clerkUser.emailAddresses[0]) == null ? void 0 : _a.emailAddress) || "Unknown User";
    } catch (error) {
      console.error("Failed to fetch user from Clerk: ", error);
    }
    return {
      id: chat.id,
      title: chat.title,
      isPinned: chat.isPinned,
      isShared: chat.isShared,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      userId: chat.userId,
      ownerEmail: chat.user.email,
      ownerName
    };
  }),
  getSharedChatMessages: publicProcedure.input(z.object({ chatId: z.string() })).query(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({
      where: { id: input.chatId }
    });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    if (!chat.isShared) {
      throw new Error("Chat is not shared.");
    }
    const messages = await ctx.db.message.findMany({
      where: { chatId: input.chatId },
      orderBy: { createdAt: "asc" }
    });
    return messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      isError: message.isError,
      modelId: message.modelId,
      createdAt: message.createdAt,
      userId: message.userId,
      chatId: message.chatId
    }));
  }),
  // Check if current user is the owner of a chat
  isOwnerOfChat: publicProcedure.input(z.object({ chatId: z.string() })).query(async ({ ctx, input }) => {
    const chat = await ctx.db.chat.findUnique({
      where: { id: input.chatId }
    });
    if (!chat) {
      throw new Error("Chat not found.");
    }
    if (!ctx.auth.userId) {
      return { isOwner: false };
    }
    return { isOwner: chat.userId === ctx.auth.userId };
  }),
  deleteMessagesFromIndex: protectedProcedure.input(
    z.object({
      chatId: z.string(),
      messageIndex: z.number()
    })
  ).mutation(async ({ ctx, input }) => {
    try {
      const chat = await ctx.db.chat.findUnique({
        where: { id: input.chatId }
      });
      if (!chat) {
        throw new Error("Chat not found.");
      }
      if (chat.userId !== ctx.auth.userId) {
        throw new Error("You do not have permission to delete messages from this chat.");
      }
      const messages = await ctx.db.message.findMany({
        where: { chatId: input.chatId },
        orderBy: { createdAt: "asc" }
      });
      const messagesToDelete = messages.slice(input.messageIndex);
      if (messagesToDelete.length > 0) {
        await ctx.db.message.deleteMany({
          where: {
            id: {
              in: messagesToDelete.map((msg) => msg.id)
            }
          }
        });
      }
      return {
        success: true,
        deletedCount: messagesToDelete.length
      };
    } catch (error) {
      console.error("❌ Error deleting messages from database: ", error);
      throw new Error("❌ Failed to delete messages from database.");
    }
  })
});
const userRouter = createTRPCRouter({
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    let userSettings = await ctx.db.userSettings.findUnique({
      where: { userId: ctx.auth.userId }
    });
    if (!userSettings) {
      userSettings = await ctx.db.userSettings.create({
        data: {
          userId: ctx.auth.userId,
          syncWithDb: true,
          language: "en"
        }
      });
    }
    return userSettings;
  }),
  updateSettings: protectedProcedure.input(
    z.object({
      syncWithDb: z.boolean().optional(),
      language: z.string().optional()
    })
  ).mutation(async ({ ctx, input }) => {
    const updatedSettings = await ctx.db.userSettings.upsert({
      where: { userId: ctx.auth.userId },
      update: {
        ...input,
        updatedAt: /* @__PURE__ */ new Date()
      },
      create: {
        userId: ctx.auth.userId,
        ...input
      }
    });
    return updatedSettings;
  }),
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.auth.userId },
      include: {
        UserSettings: true
      }
    });
    return user;
  })
});
const appRouter = createTRPCRouter({
  user: userRouter,
  chat: chatRouter
});
createCallerFactory(appRouter);
const createContext = async (req) => {
  return createTRPCContext({
    headers: req.headers
  });
};
const Route$1 = createFileRoute("/api/trpc/$")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        return fetchRequestHandler({
          endpoint: "/api/trpc",
          req: request,
          router: appRouter,
          createContext: () => createContext(request),
          onError: env.NODE_ENV === "development" ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
          } : void 0
        });
      },
      POST: async ({ request }) => {
        return fetchRequestHandler({
          endpoint: "/api/trpc",
          req: request,
          router: appRouter,
          createContext: () => createContext(request),
          onError: env.NODE_ENV === "development" ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
          } : void 0
        });
      }
    }
  }
});
function createGeminiBYOKStreamParser() {
  const decoder = new TextDecoder();
  let buffer = "";
  return (chunk) => {
    const decodedChunk = decoder.decode(chunk, { stream: true });
    buffer += decodedChunk;
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    return lines.filter((line) => line.startsWith("data:")).map((line) => line.replace(/^data: /, "").trim()).map((line) => {
      var _a, _b, _c, _d, _e;
      const parsed = JSON.parse(line);
      return ((_e = (_d = (_c = (_b = (_a = parsed.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts) == null ? void 0 : _d[0]) == null ? void 0 : _e.text) || "";
    }).join("");
  };
}
const MODEL_IDS = MODELS.map((model) => model.id);
const chatMessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string()
});
const streamRequestSchema = z.object({
  messages: z.array(chatMessageSchema),
  modelId: z.enum(MODEL_IDS).optional().default(env.VITE_OPENROUTER_DEFAULT_MODEL),
  apiKey: z.string().optional()
});
const Route = createFileRoute("/api/chat/stream")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        var _a, _b;
        try {
          const body = await request.json();
          const { messages, modelId, apiKey } = streamRequestSchema.parse(body);
          const { data, error } = await tryCatch(createChatCompletionStream(messages, modelId, apiKey));
          if (error) {
            console.error("❌ Error creating chat completion stream: ", error);
            return new Response(JSON.stringify({ error: "Failed to create streaming response" }), { status: 500 });
          }
          if (!data.stream) {
            console.error("❌ No stream data available: ", data.error);
            const isModelNotFound = ((_a = data.error) == null ? void 0 : _a.includes("not available")) || ((_b = data.error) == null ? void 0 : _b.includes("404"));
            return new Response(JSON.stringify({ error: data.error ?? "No stream data available" }), {
              status: isModelNotFound ? 400 : 500
            });
          }
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            async start(controller) {
              var _a2, _b2;
              try {
                let fullMessage = "";
                const isGeminiBYOK = modelId.startsWith("google/") && modelId.endsWith(":byok");
                const streamAsyncIterable = data.stream;
                for await (const chunk of streamAsyncIterable) {
                  const content = isGeminiBYOK ? createGeminiBYOKStreamParser()(chunk) : ((_b2 = (_a2 = chunk.choices[0]) == null ? void 0 : _a2.delta) == null ? void 0 : _b2.content) || "";
                  if (content) {
                    fullMessage += content;
                    const sseData = JSON.stringify({
                      type: "chunk",
                      content,
                      fullMessage,
                      done: false
                    });
                    controller.enqueue(encoder.encode(`data: ${sseData}

`));
                  }
                }
                const finalData = JSON.stringify({
                  type: "done",
                  content: "",
                  fullMessage: fullMessage.trim().replace(/"/g, ""),
                  done: true
                });
                controller.enqueue(encoder.encode(`data: ${finalData}

`));
                controller.close();
              } catch (streamError) {
                console.error("❌ Error processing stream: ", streamError);
                const errorData = JSON.stringify({
                  type: "error",
                  error: "Error processing streaming response",
                  done: true
                });
                controller.enqueue(encoder.encode(`data: ${errorData}

`));
                controller.close();
              }
            }
          });
          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type"
            }
          });
        } catch (parseError) {
          console.error("❌ Error parsing request: ", parseError);
          return new Response(JSON.stringify({ error: "Invalid request format" }), { status: 400 });
        }
      },
      OPTIONS: async () => {
        return new Response(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        });
      }
    }
  }
});
const SignInRoute = Route$6.update({
  id: "/sign-in",
  path: "/sign-in",
  getParentRoute: () => Route$7
});
const SettingsRoute = Route$5.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$7
});
const ChatIdRoute = Route$4.update({
  id: "/$chatId",
  path: "/$chatId",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ApiWebhooksClerkRoute = Route$2.update({
  id: "/api/webhooks/clerk",
  path: "/api/webhooks/clerk",
  getParentRoute: () => Route$7
});
const ApiTrpcSplatRoute = Route$1.update({
  id: "/api/trpc/$",
  path: "/api/trpc/$",
  getParentRoute: () => Route$7
});
const ApiChatStreamRoute = Route.update({
  id: "/api/chat/stream",
  path: "/api/chat/stream",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  ChatIdRoute,
  SettingsRoute,
  SignInRoute,
  ApiChatStreamRoute,
  ApiTrpcSplatRoute,
  ApiWebhooksClerkRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        refetchOnWindowFocus: false
      }
    }
  });
  const router2 = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true
  });
  return router2;
}
const router = getRouter();
const router$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter,
  router
}, Symbol.toStringTag, { value: "Module" }));
export {
  Avatar as A,
  Button as B,
  Command as C,
  DropdownMenu as D,
  MODELS as M,
  Route$4 as R,
  SignIn as S,
  UserProfile as U,
  auth as a,
  DropdownMenuTrigger as b,
  DropdownMenuContent as c,
  DropdownMenuItem as d,
  clerkThemes as e,
  cn as f,
  AvatarImage as g,
  AvatarFallback as h,
  Dialog as i,
  DialogContent as j,
  DialogHeader as k,
  DialogTitle as l,
  DialogDescription as m,
  useChatStore as n,
  CommandList as o,
  CommandItem as p,
  api as q,
  router$1 as r,
  useUserSettings as u
};
