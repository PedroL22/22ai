import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import throttle from "lodash/throttle.js";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { v4 } from "uuid";
import { Sparkles, Code, MessageSquare, Lightbulb, ChevronsUpDown, Info, Check, Copy, ExternalLink, RefreshCcw, Edit, GitBranch, Share2, Loader2, ArrowDown, ArrowUp } from "lucide-react";
import { f as cn, n as useChatStore, M as MODELS, B as Button, C as Command, o as CommandList, p as CommandItem, u as useUserSettings, q as api } from "./router-BbxO0Be2.js";
import { cva } from "class-variance-authority";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { toast } from "sonner";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { u as useApiKeyStore } from "./useApiKeyStore-BnN6lbs-.js";
import { useUser } from "@clerk/clerk-react";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "field-sizing-content flex min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 sm:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
const suggestions = [
  {
    icon: /* @__PURE__ */ jsx(Sparkles, { className: "size-4" }),
    title: "Generate ideas",
    prompt: "Help me brainstorm creative ideas for a new project"
  },
  {
    icon: /* @__PURE__ */ jsx(Code, { className: "size-4" }),
    title: "Code assistance",
    prompt: "Help me debug this code or explain a programming concept"
  },
  {
    icon: /* @__PURE__ */ jsx(MessageSquare, { className: "size-4" }),
    title: "Write content",
    prompt: "Help me write a professional email or document"
  },
  {
    icon: /* @__PURE__ */ jsx(Lightbulb, { className: "size-4" }),
    title: "Learn something",
    prompt: "Explain a complex topic in simple terms"
  }
];
const EmptyState = ({ onSuggestionClickAction }) => {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
      className: "flex w-full max-w-3xl flex-col items-center justify-center space-y-8",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4 text-center", children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5, delay: 0.2 },
              className: "relative",
              children: [
                /* @__PURE__ */ jsx("div", { className: "rounded-full bg-gradient-to-br from-blue-500 to-[#7c3aed] p-4 shadow-lg dark:to-[#8b5cf6]", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-8 text-white" }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/20 to-[#7c3aed]/20 blur-lg dark:to-[#8b5cf6]/20" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.3 },
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx("h1", { className: "font-bold text-2xl text-foreground sm:text-3xl", children: "Welcome to 22AI" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm sm:text-base", children: "Your intelligent AI assistant is ready to help. What would you like to explore today?" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.4 },
            className: "grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2",
            children: suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs(
              motion.button,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.3 + index * 0.1 },
                className: "group relative flex items-start space-x-3 rounded-xl border border-border/50 bg-card/50 p-4 text-left backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-card hover:shadow-md",
                onClick: () => onSuggestionClickAction(suggestion.prompt),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20", children: suggestion.icon }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-foreground text-sm transition-colors group-hover:text-primary", children: suggestion.title }),
                    /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-muted-foreground text-xs", children: suggestion.prompt })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-[#7c3aed]/5 opacity-0 transition-opacity group-hover:opacity-100 dark:to-[#8b5cf6]/5" })
                ]
              },
              suggestion.title
            ))
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5, delay: 0.8 },
            className: "text-center",
            children: /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-xs", children: [
              "💡 Tip: Press ",
              /* @__PURE__ */ jsx("kbd", { className: "rounded bg-muted px-1.5 py-0.5 font-mono text-xs", children: "Enter" }),
              " to send,",
              /* @__PURE__ */ jsx("kbd", { className: "ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs", children: "Shift + Enter" }),
              " for new line"
            ] })
          }
        )
      ]
    }
  );
};
function Popover({ ...props }) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      ),
      ...props
    }
  ) });
}
function TooltipProvider({ delayDuration = 0, ...props }) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, { "data-slot": "tooltip-provider", delayDuration, ...props });
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 500, children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in text-balance rounded-md border bg-accent px-3 py-1.5 text-xs text-zinc-600 shadow-2xl data-[state=closed]:animate-out dark:text-zinc-300",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] border-r border-b bg-accent fill-accent dark:fill-text-zinc-300 dark:text-zinc-300" })
      ]
    }
  ) });
}
const getDeveloperIcon = (developer) => {
  switch (developer) {
    case "OpenAI":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/openai.svg", alt: "OpenAI Logo", width: 16, height: 16, className: "size-4" });
    case "Anthropic":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/anthropic.svg", alt: "Anthropic Logo", width: 16, height: 16, className: "size-4" });
    case "Google":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/gemini.svg", alt: "Gemini Logo", width: 16, height: 16, className: "size-4" });
    case "Meta":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/meta.svg", alt: "Meta Logo", width: 16, height: 16, className: "size-4" });
    case "DeepSeek":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/deepseek.svg", alt: "DeepSeek Logo", width: 16, height: 16, className: "size-4" });
    case "xAi":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/xai.svg", alt: "xAi Logo", width: 16, height: 16, className: "size-4" });
    case "Alibaba":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/alibaba.svg", alt: "Alibaba Logo", width: 16, height: 16, className: "size-4" });
    case "Z.ai":
      return /* @__PURE__ */ jsx("img", { src: "/images/icons/zai.svg", alt: "Z.ai Logo", width: 16, height: 16, className: "size-4" });
    default:
      return /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-zinc-400" });
  }
};
const getModelName = (modelId) => {
  const modelNames = {
    // Free models
    "openai/gpt-oss-120b:free": "GPT-OSS 120B",
    "openai/gpt-oss-20b:free": "GPT-OSS 20B",
    "google/gemma-3-27b-it:free": "Gemma 3 27B",
    "google/gemma-3-12b-it:free": "Gemma 3 12B",
    "meta-llama/llama-3.3-70b-instruct:free": "Llama 3.3 70B Instruct",
    "meta-llama/llama-3.2-3b-instruct:free": "Llama 3.2 3B Instruct",
    "deepseek/deepseek-r1-0528:free": "DeepSeek R1 0528",
    "qwen/qwen3-next-80b-a3b-instruct:free": "Qwen3 Next 80B A3B Instruct",
    "qwen/qwen3-coder:free": "Qwen3 Coder",
    "z-ai/glm-4.5-air:free": "GLM 4.5 Air",
    // BYOK models
    "openai/gpt-5.2:byok": "GPT 5.2",
    "openai/gpt-5-mini:byok": "GPT 5 Mini",
    "openai/o4-mini:byok": "o4 mini",
    "anthropic/claude-4-sonnet:byok": "Claude 4 Sonnet",
    "anthropic/claude-4-opus:byok": "Claude 4 Opus",
    "anthropic/claude-3.7-sonnet:byok": "Claude 3.7 Sonnet",
    "google/gemini-3-flash-preview:byok": "Gemini 3 Flash Preview",
    "google/gemini-2.5-flash:byok": "Gemini 2.5 Flash",
    "google/gemini-2.5-pro:byok": "Gemini 2.5 Pro",
    "google/gemini-2.5-flash-lite:byok": "Gemini 2.5 Flash Lite",
    "google/gemini-2.0-flash:byok": "Gemini 2.0 Flash",
    "grok/grok-4:byok": "Grok 4"
  };
  return modelNames[modelId] || modelId;
};
const ModelSelector = ({ trigger, onModelSelect, selectedModelId }) => {
  const [activeDeveloper, setActiveDeveloper] = useState(null);
  const geminiApiKey = useApiKeyStore((s) => s.geminiApiKey);
  const openaiApiKey = useApiKeyStore((s) => s.openaiApiKey);
  const anthropicApiKey = useApiKeyStore((s) => s.anthropicApiKey);
  const grokApiKey = useApiKeyStore((s) => s.grokApiKey);
  const isModelBlocked = (model) => {
    if (model.isFree) return false;
    if (model.developer === "OpenAI") return !openaiApiKey;
    if (model.developer === "Anthropic") return !anthropicApiKey;
    if (model.developer === "Google") return !geminiApiKey;
    if (model.developer === "xAi") return !grokApiKey;
    return false;
  };
  const [open, setOpen] = useState(false);
  const selectedModelIdFromStore = useChatStore((state) => state.selectedModelId);
  const setSelectedModelId = useChatStore((state) => state.setSelectedModelId);
  const resolvedSelectedModelId = selectedModelId ?? selectedModelIdFromStore;
  const selectedModel = MODELS.find((model) => model.id === resolvedSelectedModelId);
  const groupedModels = MODELS.reduce((acc, model) => {
    if (!acc[model.developer]) {
      acc[model.developer] = [];
    }
    acc[model.developer].push(model);
    return acc;
  }, {});
  const developerOrder = [
    "OpenAI",
    "Anthropic",
    "Google",
    "Meta",
    "DeepSeek",
    "xAi",
    "Alibaba",
    "Z.ai"
  ];
  const getBlockReason = (model) => {
    if (model.developer === "OpenAI") return "Add your OpenAI API key in Settings to use this model.";
    if (model.developer === "Anthropic") return "Add your Anthropic API key in Settings to use this model.";
    if (model.developer === "Google") return "Add your Gemini API key in Settings to use this model.";
    if (model.developer === "xAi") return "Add your xAi API key in Settings to use this model.";
    if (model.developer === "Alibaba") return "Add your Alibaba API key in Settings to use this model.";
    if (model.developer === "Z.ai") return "Add your Z.ai API key in Settings to use this model.";
    return "API key required.";
  };
  useEffect(() => {
    if (open && selectedModel) setActiveDeveloper(selectedModel.developer);
  }, [open, selectedModel]);
  const handleSelect = (model) => {
    if (isModelBlocked(model)) return;
    if (onModelSelect) {
      onModelSelect(model.id);
    } else {
      setSelectedModelId(model.id);
    }
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: trigger ? trigger : /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        "aria-expanded": open,
        className: "mx-1 justify-between self-start rounded-sm border-0 bg-transparent px-2 py-1 text-muted-foreground text-sm shadow-none transition-all ease-in hover:bg-muted/50 hover:text-muted-foreground",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          selectedModel ? getDeveloperIcon(selectedModel.developer) : /* @__PURE__ */ jsx(Sparkles, { className: "size-3" }),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: selectedModel ? selectedModel.name : getModelName(resolvedSelectedModelId) }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "ml-2 size-4 shrink-0 opacity-50" })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        side: "top",
        onOpenAutoFocus: (e) => e.preventDefault(),
        className: "min-w-[375px] overflow-hidden rounded-2xl border-none p-0 shadow-2xl sm:min-w-[480px]",
        children: /* @__PURE__ */ jsxs("div", { className: "flex h-[495px] w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-40 shrink-0 flex-col border-muted/30 border-r bg-linear-to-b from-muted/5 to-muted/20 py-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-4 pb-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground text-sm", children: "AI Providers" }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-xs", children: "Choose your model provider" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1 px-2", children: developerOrder.map((developer) => {
              const devModels = groupedModels[developer] || [];
              const devBlocked = devModels.every((m) => isModelBlocked(m));
              const modelCount = devModels.length;
              return /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    disabled: devBlocked,
                    onClick: () => {
                      if (!devBlocked) setActiveDeveloper(developer);
                    },
                    type: "button",
                    className: cn(
                      "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition-all ease-in",
                      devBlocked ? "cursor-not-allowed text-muted-foreground opacity-40" : activeDeveloper === developer ? "border border-primary/20 bg-primary/10 font-semibold text-primary shadow-sm" : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    ),
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      getDeveloperIcon(developer),
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: developer }),
                        /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                          modelCount,
                          " model",
                          modelCount !== 1 ? "s" : ""
                        ] })
                      ] })
                    ] })
                  }
                ) }),
                devBlocked && /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsxs("span", { children: [
                  "Add your ",
                  developer,
                  " API key in Settings to use these models."
                ] }) })
              ] }, developer);
            }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full flex-1 rounded-none p-3", children: /* @__PURE__ */ jsx(Command, { children: /* @__PURE__ */ jsx(CommandList, { className: "scrollbar-hide max-h-full", children: activeDeveloper && Array.isArray(groupedModels[activeDeveloper]) && groupedModels[activeDeveloper].length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 bg-[#fffcfc] px-1 pb-4 backdrop-blur-sm dark:bg-[#18181b]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-semibold text-foreground text-lg", children: [
                getDeveloperIcon(activeDeveloper),
                activeDeveloper,
                " Models"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
                "Choose from ",
                groupedModels[activeDeveloper].length,
                " available models"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-full space-y-2 overflow-y-auto", children: groupedModels[activeDeveloper].map((model) => {
              const blocked = isModelBlocked(model);
              const isSelected = resolvedSelectedModelId === model.id;
              return /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
                  CommandItem,
                  {
                    value: model.id,
                    onSelect: () => handleSelect(model),
                    className: cn(
                      "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-all ease-in",
                      blocked ? "pointer-events-none border-transparent opacity-40" : isSelected ? "border-primary/30 bg-primary/10 font-medium text-primary shadow-sm" : "border-transparent hover:border-muted hover:bg-muted/50"
                    ),
                    disabled: blocked,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                        getDeveloperIcon(model.developer),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1.5", children: [
                          /* @__PURE__ */ jsx("span", { className: "font-medium text-sm", children: model.name }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: cn(
                                  "rounded-md px-1.5 py-0.5 font-semibold text-[10px] uppercase tracking-wide",
                                  model.isFree ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                ),
                                children: model.isFree ? "Free" : "BYOK"
                              }
                            ),
                            /* @__PURE__ */ jsxs(Tooltip, { children: [
                              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "pointer-events-auto inline-flex", children: /* @__PURE__ */ jsx(Info, { className: "size-3 text-muted-foreground transition-colors hover:text-foreground" }) }) }),
                              /* @__PURE__ */ jsx(TooltipContent, { className: "max-w-[300px]", children: model.description })
                            ] })
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx(
                        Check,
                        {
                          className: cn(
                            "hidden size-5 shrink-0 text-primary transition-all ease-in md:inline-flex",
                            isSelected ? "opacity-100" : "opacity-0"
                          )
                        }
                      )
                    ]
                  }
                ) }) }),
                blocked && /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("span", { children: getBlockReason(model) }) })
              ] }, model.id);
            }) })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col items-center justify-center p-8 text-center", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "mb-4 size-12 text-muted-foreground/50" }),
            /* @__PURE__ */ jsx("div", { className: "mb-2 font-medium text-foreground", children: "Select a Provider" }),
            /* @__PURE__ */ jsx("p", { className: "max-w-xs text-muted-foreground text-sm", children: "Choose an AI provider from the sidebar to view available models and start chatting." })
          ] }) }) }) })
        ] })
      }
    )
  ] });
};
const CodeBlock = ({ className, children, ...props }) => {
  const [codeBlockCopied, setCodeBlockCopied] = useState(false);
  const codeRef = useRef(null);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";
  const copyCode = () => {
    const codeText = String(children).replace(/\n$/, "");
    navigator.clipboard.writeText(codeText);
    toast.success("Copied code to clipboard!");
    setCodeBlockCopied(true);
    setTimeout(() => setCodeBlockCopied(false), 1e3);
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative my-4 overflow-hidden rounded-sm bg-muted/50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-zinc-300 px-4 py-1 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium font-mono text-sm", children: language || "code" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          title: "Copy code",
          className: "aspect-square size-8 shrink-0 rounded-sm hover:bg-accent-foreground/5 dark:hover:bg-accent-foreground/5",
          onClick: copyCode,
          children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: codeBlockCopied ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.8 },
              animate: { scale: 1 },
              exit: { scale: 0.8 },
              className: "flex items-center gap-1",
              children: /* @__PURE__ */ jsx(Check, { className: "size-4" })
            },
            "check"
          ) : /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0.8 },
              animate: { scale: 1 },
              exit: { scale: 0.8 },
              className: "flex items-center gap-1",
              children: /* @__PURE__ */ jsx(Copy, { className: "size-4" })
            },
            "copy"
          ) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("pre", { className: "overflow-x-auto bg-zinc-200 p-4 text-sm leading-[1.75] dark:bg-background/15", children: /* @__PURE__ */ jsx("code", { ref: codeRef, className, ...props, children }) })
  ] });
};
const MarkdownLink = ({ href, children, ...props }) => {
  const isExternal = href == null ? void 0 : href.startsWith("http");
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: isExternal ? "_blank" : void 0,
      rel: isExternal ? "noopener noreferrer" : void 0,
      className: "inline-flex items-center gap-1 text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary/60",
      ...props,
      children: [
        children,
        isExternal && /* @__PURE__ */ jsx(ExternalLink, { className: "size-3 opacity-70" })
      ]
    }
  );
};
const MarkdownTable = ({ children, ...props }) => /* @__PURE__ */ jsx("div", { className: "my-4 overflow-x-auto rounded-md border", children: /* @__PURE__ */ jsx("table", { className: "w-full text-sm", ...props, children }) });
const formatMessageDateForChatHistory = (timestamp) => {
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
    return `Today at ${timeString}`;
  }
  if (messageDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${timeString}`;
  }
  if (messageDate.getFullYear() === now.getFullYear()) {
    const weekday2 = messageDate.toLocaleDateString("en-US", { weekday: "long" });
    const dateString2 = messageDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit"
    });
    return `${weekday2.charAt(0).toUpperCase() + weekday2.slice(1)}, ${dateString2} at ${timeString}`;
  }
  const weekday = messageDate.toLocaleDateString("en-US", { weekday: "long" });
  const dateString = messageDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${dateString} at ${timeString}`;
};
const messageVariants = cva("group relative flex flex-col gap-0.5 rounded-2xl text-sm", {
  variants: {
    variant: {
      user: "max-w-[70%] self-end bg-primary px-4 py-3",
      assistant: "max-w-full self-start bg-transparent",
      error: "mt-1 max-w-full self-start border border-destructive/20 bg-destructive/10 px-4 py-3"
    }
  },
  defaultVariants: {
    variant: "user"
  }
});
const Message = ({ message, messageIndex, isStreaming, onRetry, onEdit, onBranch }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const messageModelId = message.modelId;
  const markdownOptions = useMemo(
    () => ({
      remarkPlugins: [remarkGfm, remarkMath, remarkDirective],
      rehypePlugins: [rehypeKatex, rehypeHighlight, rehypeRaw],
      components: {
        a: MarkdownLink,
        code: ({
          inline,
          className,
          children,
          ...props
        }) => {
          if (inline === true || !className && !String(children).includes("\n")) {
            return /* @__PURE__ */ jsx(
              "code",
              {
                className: "select-all rounded-sm bg-zinc-200 px-1.5 py-0.5 font-medium font-mono text-sm dark:bg-zinc-700",
                ...props,
                children
              }
            );
          }
          return /* @__PURE__ */ jsx(CodeBlock, { className, ...props, children });
        },
        pre: ({ children }) => {
          return /* @__PURE__ */ jsx(Fragment, { children });
        },
        table: MarkdownTable,
        thead: ({ children, ...props }) => /* @__PURE__ */ jsx("thead", { className: "bg-muted/50", ...props, children }),
        th: ({ children, ...props }) => /* @__PURE__ */ jsx("th", { className: "border-b px-4 py-2 text-left font-semibold", ...props, children }),
        td: ({ children, ...props }) => /* @__PURE__ */ jsx("td", { className: "border-b px-4 py-2", ...props, children }),
        blockquote: ({ children, ...props }) => /* @__PURE__ */ jsx("blockquote", { className: "my-2 border-primary border-l-4 bg-muted/50 py-2 pr-4 pl-4 italic", ...props, children }),
        h1: ({ children, ...props }) => /* @__PURE__ */ jsx("h1", { className: "mt-4 mb-1 font-bold text-2xl", ...props, children }),
        h2: ({ children, ...props }) => /* @__PURE__ */ jsx("h2", { className: "mt-3 mb-1 font-semibold text-xl", ...props, children }),
        h3: ({ children, ...props }) => /* @__PURE__ */ jsx("h3", { className: "mt-2 font-semibold text-lg", ...props, children }),
        h4: ({ children, ...props }) => /* @__PURE__ */ jsx("h4", { className: "mt-2 font-semibold text-base", ...props, children }),
        ul: ({ children, ...props }) => /* @__PURE__ */ jsx("ul", { className: "my-1 ml-4 list-disc space-y-0.5 text-sm", ...props, children }),
        ol: ({ children, ...props }) => /* @__PURE__ */ jsx("ol", { className: "my-1 ml-4 list-decimal space-y-0.5 text-sm", ...props, children }),
        li: ({ children, ...props }) => /* @__PURE__ */ jsx("li", { className: "text-sm leading-relaxed", ...props, children }),
        p: ({ children, ...props }) => /* @__PURE__ */ jsx("p", { className: "my-1 text-sm leading-relaxed", ...props, children }),
        hr: ({ ...props }) => /* @__PURE__ */ jsx("hr", { className: "my-3 border-border", ...props }),
        input: ({ type, checked, ...props }) => {
          if (type === "checkbox") {
            return /* @__PURE__ */ jsx("input", { type: "checkbox", checked, disabled: true, className: "mr-2 cursor-default text-sm", ...props });
          }
          return /* @__PURE__ */ jsx("input", { type, ...props });
        }
      }
    }),
    []
  );
  const handleRetry = (modelId) => {
    if (onRetry) {
      onRetry(messageIndex, modelId);
    }
  };
  const handleBranch = (modelId) => {
    if (onBranch) {
      onBranch(messageIndex, modelId);
    }
  };
  const handleEdit = () => {
    if (onEdit && editContent.trim() !== message.content) {
      onEdit(messageIndex, editContent.trim());
    }
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: isEditing && message.role === "user" ? /* @__PURE__ */ jsxs("div", { className: "max-w-[70%] space-y-2 self-end", children: [
    /* @__PURE__ */ jsx(
      Textarea,
      {
        value: editContent,
        className: "min-h-20 resize-none bg-accent/50",
        onChange: (e) => setEditContent(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleEdit();
          }
          if (e.key === "Escape") {
            handleCancelEdit();
          }
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: handleCancelEdit, children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "default", onClick: handleEdit, children: "Save" })
    ] })
  ] }) : /* @__PURE__ */ jsxs("div", { className: messageVariants({ variant: message.isError ? "error" : message.role }), children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        "data-role": message.role,
        className: cn("wrap-break-word max-w-none whitespace-pre-wrap data-[role=user]:text-white", {
          "text-destructive": message.isError
        }),
        children: /* @__PURE__ */ jsx(ReactMarkdown, { ...markdownOptions, children: message.content })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        "data-role": message.role,
        "data-is-error": message.isError,
        className: cn(
          "absolute flex flex-row-reverse items-center self-start whitespace-nowrap text-muted-foreground transition-all ease-in sm:gap-1 dark:data-[role=user]:text-zinc-300",
          "-bottom-8",
          "data-[is-error=true]:-bottom-11 sm:data-[is-error=true]:-bottom-10",
          "data-[role=user]:-bottom-11 sm:data-[role=user]:-bottom-10",
          "data-[role=user]:right-0 data-[role=user]:flex-row data-[role=user]:self-end",
          // Position logic: error takes precedence over role
          (message.isError || message.role === "assistant") && "-left-1",
          isStreaming ? "pointer-events-none opacity-0" : "opacity-0 group-hover:opacity-100"
        ),
        children: [
          /* @__PURE__ */ jsx("p", { className: "shrink-0 whitespace-nowrap px-1 text-xs sm:px-3", children: `${message.modelId ? `${getModelName(message.modelId)} ` : ""}${formatMessageDateForChatHistory(message.createdAt.toISOString())}` }),
          /* @__PURE__ */ jsx(
            ModelSelector,
            {
              trigger: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  title: "Retry message",
                  "data-role": message.role,
                  className: "aspect-square size-8 shrink-0 rounded-sm hover:bg-accent-foreground/5 dark:hover:bg-accent-foreground/5",
                  children: /* @__PURE__ */ jsx(RefreshCcw, { className: "size-4" })
                }
              ),
              selectedModelId: messageModelId,
              onModelSelect: (modelId) => handleRetry(modelId)
            }
          ),
          message.role === "user" && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              title: "Edit message",
              "data-role": message.role,
              className: "aspect-square size-8 shrink-0 rounded-sm hover:bg-accent-foreground/5 dark:hover:bg-accent-foreground/5",
              onClick: () => setIsEditing(true),
              children: /* @__PURE__ */ jsx(Edit, { className: "size-4" })
            }
          ),
          !message.isError && message.role === "assistant" && onBranch && /* @__PURE__ */ jsx(
            ModelSelector,
            {
              trigger: /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  title: "Branch from here",
                  "data-role": message.role,
                  className: "aspect-square size-8 shrink-0 rounded-sm hover:bg-accent-foreground/5 dark:hover:bg-accent-foreground/5",
                  children: /* @__PURE__ */ jsx(GitBranch, { className: "size-4" })
                }
              ),
              selectedModelId: messageModelId,
              onModelSelect: (modelId) => handleBranch(modelId)
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              title: "Copy message",
              "data-role": message.role,
              className: "aspect-square size-8 shrink-0 rounded-sm hover:bg-accent-foreground/5 dark:hover:bg-accent-foreground/5",
              onClick: () => {
                navigator.clipboard.writeText(message.content);
                toast.success("Copied to clipboard!");
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1e3);
              },
              children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isCopied ? /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { scale: 0.75 },
                  animate: { scale: 1 },
                  exit: { scale: 0 },
                  transition: { duration: 0.1, ease: "easeIn" },
                  children: /* @__PURE__ */ jsx(Check, { className: "size-4" })
                },
                "check"
              ) : /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { scale: 0.75 },
                  animate: { scale: 1 },
                  exit: { scale: 0 },
                  transition: { duration: 0.1, ease: "easeIn" },
                  children: /* @__PURE__ */ jsx(Copy, { className: "size-4" })
                },
                "copy"
              ) })
            }
          )
        ]
      }
    )
  ] }) });
};
async function* streamChatCompletion(messages, modelId) {
  try {
    const { openaiApiKey, anthropicApiKey, geminiApiKey, grokApiKey } = useApiKeyStore.getState();
    let apiKey;
    if (modelId.startsWith("openai/")) apiKey = openaiApiKey;
    else if (modelId.startsWith("anthropic/")) apiKey = anthropicApiKey;
    else if (modelId.startsWith("google/")) apiKey = geminiApiKey;
    else if (modelId.startsWith("grok/")) apiKey = grokApiKey;
    const response = await fetch("/api/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages,
        modelId,
        apiKey
      })
    });
    if (!response.ok) {
      let errorMsg = `HTTP error ${response.status}`;
      const contentType = response.headers.get("content-type") || "";
      try {
        if (contentType.includes("application/json")) {
          const json = await response.json();
          errorMsg = json.error || JSON.stringify(json);
        } else {
          errorMsg = await response.text();
        }
      } catch {
      }
      throw new Error(errorMsg);
    }
    if (!response.body) {
      throw new Error("No response body.");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              yield data;
              if (data.done) {
                return;
              }
            } catch (parseError) {
              console.warn("⚠️ Failed to parse SSE data: ", parseError);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (err) {
    console.error("❌ Error in streamChatCompletion: ", err);
    yield {
      type: "error",
      error: err instanceof Error ? err.message : "Unknown error occurred.",
      done: true
    };
  }
}
async function createStreamingChatCompletion(messages, modelId, onChunk, onComplete, onError) {
  try {
    for await (const chunk of streamChatCompletion(messages, modelId)) {
      onChunk(chunk);
      if (chunk.type === "done" && chunk.fullMessage) {
        onComplete(chunk.fullMessage);
        return;
      }
      if (chunk.type === "error") {
        onError(chunk.error || "Unknown error occurred.");
        return;
      }
    }
  } catch (err) {
    onError(err instanceof Error ? err.message : "Unknown error occurred.");
  }
}
const useRealtimeSync = () => {
  const { isSignedIn } = useUser();
  const { settings } = useUserSettings();
  const syncChatMutation = api.chat.syncChatToDatabase.useMutation({
    onError: (error) => {
      console.error("❌ Failed to sync chat to database: ", error);
    }
  });
  const syncMessageMutation = api.chat.syncMessageToDatabase.useMutation({
    onError: (error) => {
      console.error("❌ Failed to sync message to database: ", error);
    }
  });
  const deleteMessagesFromIndexMutation = api.chat.deleteMessagesFromIndex.useMutation({
    onError: (error) => {
      console.error("❌ Failed to delete messages from database: ", error);
    }
  });
  const shouldSync = isSignedIn && (settings == null ? void 0 : settings.syncWithDb);
  const syncChat = useCallback(
    async (chat) => {
      if (!shouldSync) return;
      try {
        await syncChatMutation.mutateAsync({
          chat: {
            id: chat.id,
            title: chat.title || "New chat",
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt
          }
        });
        console.log("✅ Chat synced to database: ", chat.id);
      } catch (error) {
        console.error("❌ Error syncing chat: ", error);
      }
    },
    [shouldSync, syncChatMutation]
  );
  const syncMessage = useCallback(
    async (message) => {
      if (!shouldSync) return;
      try {
        await syncMessageMutation.mutateAsync({
          message: {
            id: message.id,
            role: message.role,
            content: message.content,
            isError: message.isError,
            modelId: message.modelId,
            createdAt: message.createdAt,
            chatId: message.chatId
          }
        });
        console.log("✅ Message synced to database: ", message.id);
      } catch (error) {
        console.error("❌ Error syncing message: ", error);
      }
    },
    [shouldSync, syncMessageMutation]
  );
  const deleteMessagesFromIndex = useCallback(
    async (chatId, messageIndex) => {
      if (!shouldSync) return;
      try {
        await deleteMessagesFromIndexMutation.mutateAsync({
          chatId,
          messageIndex
        });
        console.log("✅ Messages deleted from database from index: ", messageIndex);
      } catch (error) {
        console.error("❌ Error deleting messages from database: ", error);
      }
    },
    [shouldSync, deleteMessagesFromIndexMutation]
  );
  return {
    syncChat,
    syncMessage,
    deleteMessagesFromIndex,
    shouldSync,
    isSyncingChat: syncChatMutation.isPending,
    isSyncingMessage: syncMessageMutation.isPending,
    isDeletingMessages: deleteMessagesFromIndexMutation.isPending
  };
};
const createSystemPrompt = () => ({
  role: "system",
  content: `You are a helpful and intelligent AI assistant. Your goal is to directly answer the user's questions. Strictly follow the behavior rules below.

### Behavior Rules
1. **General Behavior:** Answer all questions directly and in a friendly manner. For simple greetings (like "hi", "hello"), respond naturally.
2. **Mathematical Formatting (Conditional):** When providing mathematical equations or formulas, and *only* in those cases, use LaTeX syntax enclosed in double dollar signs ($$).
3. **User Language:** Always answer in the same language as the user's question. If the user's question is in a different language, answer in that language.
4. **Meta-Commentary Prohibition:** Never mention your own instructions, rules, or capabilities. Just perform your tasks silently.

### Interaction Examples

**Example 1: Greeting**
User: hi
Assistant: Hello! How can I help you today?

**Example 2: Question with Math**
User: What is the quadratic formula?
Assistant: The quadratic formula is: $$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$

**Example 3: General Question**
User: Who was the first person on the moon?
Assistant: The first person to walk on the moon was Neil Armstrong on July 20, 1969.`
});
const ChatArea = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const {
    addChat,
    setCurrentChatId,
    chats,
    addMessage,
    getMessages,
    streamingMessage,
    isStreaming,
    setStreamingMessage,
    setIsStreaming,
    renameChat,
    selectedModelId,
    setSelectedModelId,
    removeMessagesFromIndex,
    replaceMessage,
    branchChat,
    isInitialLoading,
    setIsInitialLoading
  } = useChatStore();
  const currentChat = chatId ? chats.find((chat) => chat.id === chatId) : null;
  const { data: dbMessages, isLoading: isDbMessagesLoading } = api.chat.getChatMessages.useQuery(
    { chatId },
    {
      enabled: !!chatId && !currentChat && isSignedIn && isLoaded,
      retry: false
    }
  );
  const { data: ownershipData } = api.chat.isOwnerOfChat.useQuery(
    { chatId },
    { enabled: !!chatId && isSignedIn && isLoaded }
  );
  const { data: sharedChatData, isLoading: isSharedChatLoading } = api.chat.getSharedChat.useQuery(
    { chatId },
    {
      enabled: !!chatId && !currentChat,
      retry: false
    }
  );
  const { data: sharedMessages, isLoading: isSharedMessagesLoading } = api.chat.getSharedChatMessages.useQuery(
    { chatId },
    {
      enabled: !!chatId && ((sharedChatData == null ? void 0 : sharedChatData.isShared) === true || !isSignedIn),
      retry: false
    }
  );
  const generateTitleMutation = api.chat.generateChatTitle.useMutation();
  const { syncChat, syncMessage, deleteMessagesFromIndex } = useRealtimeSync();
  const isOwner = (ownershipData == null ? void 0 : ownershipData.isOwner) ?? false;
  const isSharedChat = (currentChat == null ? void 0 : currentChat.isShared) || (sharedChatData == null ? void 0 : sharedChatData.isShared) || false;
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const bufferRef = useRef("");
  const flushBuffer = useRef(
    throttle(() => {
      setStreamingMessage((prev) => prev + bufferRef.current);
      bufferRef.current = "";
    }, 200)
  ).current;
  useEffect(() => {
    if (chatId) {
      setIsInitialLoading(true);
    } else {
      setIsInitialLoading(false);
    }
  }, [chatId]);
  useEffect(() => {
    if (chatId) {
      if (sharedMessages) {
        setMessages(sharedMessages);
        setIsInitialLoading(false);
      } else if (dbMessages && !currentChat) {
        const transformedMessages = dbMessages.map((msg) => ({
          ...msg,
          chatId,
          modelId: null,
          isError: false,
          userId: ""
        }));
        setMessages(transformedMessages);
        setIsInitialLoading(false);
      } else if (currentChat) {
        const storedMessages = getMessages(chatId);
        setMessages(storedMessages);
        setIsInitialLoading(false);
      } else {
        if (!isDbMessagesLoading && !isSharedMessagesLoading && !isSharedChatLoading) {
          setMessages([]);
          setIsInitialLoading(false);
        }
      }
    } else {
      setMessages([]);
      setIsInitialLoading(false);
    }
    setTimeout(() => {
      var _a;
      const hasMessages = chatId && (sharedMessages && sharedMessages.length > 0 || dbMessages && dbMessages.length > 0 || currentChat && getMessages(chatId).length > 0);
      if (hasMessages && !userScrolledUp) {
        (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
        setShowScrollToBottom(false);
        setUserScrolledUp(false);
      }
    }, 100);
  }, [
    chatId,
    sharedMessages,
    dbMessages,
    currentChat,
    userScrolledUp,
    isDbMessagesLoading,
    isSharedMessagesLoading,
    isSharedChatLoading
  ]);
  useEffect(() => {
    var _a;
    if (isStreaming && !userScrolledUp) {
      (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      setShowScrollToBottom(false);
    }
  }, [isStreaming, streamingMessage, userScrolledUp]);
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;
      const container2 = chatContainerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container2;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      if (!isAtBottom && !userScrolledUp) {
        setShowScrollToBottom(true);
        setUserScrolledUp(true);
      } else if (isAtBottom) {
        setShowScrollToBottom(false);
        setUserScrolledUp(false);
      }
    };
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);
  useEffect(() => {
    return () => {
      flushBuffer.cancel();
    };
  }, [flushBuffer]);
  const scrollToBottom = () => {
    var _a;
    (_a = messagesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    setShowScrollToBottom(false);
    setUserScrolledUp(false);
  };
  const handleSuggestionClick = (suggestion) => {
    if (isStreaming) return;
    setMessage(suggestion);
  };
  const handleSendMessage = async () => {
    if (!message.trim() || isStreaming) return;
    if (isSharedChat && !isOwner) {
      console.warn("Cannot send messages to shared chats that you do not own");
      return;
    }
    const userMessage = message.trim();
    setMessage("");
    setUserScrolledUp(false);
    try {
      let currentChatId = chatId;
      if (!currentChatId) {
        currentChatId = v4();
        navigate({ to: "/$chatId", params: { chatId: currentChatId } });
        const newChat = {
          id: currentChatId,
          title: "",
          isPinned: false,
          isShared: false,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          userId: ""
        };
        addChat(newChat);
        setCurrentChatId(currentChatId);
        syncChat(newChat);
        generateTitleMutation.mutateAsync({ firstMessage: userMessage }).then((result) => {
          const newTitle = result.success && result.title ? result.title : "New chat";
          renameChat(currentChatId, newTitle);
          const updatedChat = {
            id: currentChatId,
            title: newTitle,
            isPinned: false,
            isShared: false,
            createdAt: newChat.createdAt,
            updatedAt: /* @__PURE__ */ new Date(),
            userId: ""
          };
          syncChat(updatedChat);
        }).catch((error) => {
          console.error("❌ Failed to generate title: ", error);
          renameChat(currentChatId, "New chat");
          const updatedChat = {
            id: currentChatId,
            title: "New chat",
            isPinned: false,
            isShared: false,
            createdAt: newChat.createdAt,
            updatedAt: /* @__PURE__ */ new Date(),
            userId: ""
          };
          syncChat(updatedChat);
        });
      }
      const tempUserMessage = {
        id: v4(),
        role: "user",
        content: userMessage,
        isError: false,
        createdAt: /* @__PURE__ */ new Date(),
        userId: "",
        chatId: currentChatId,
        modelId: null
      };
      setMessages((prev) => [...prev, tempUserMessage]);
      addMessage(currentChatId, tempUserMessage);
      syncMessage(tempUserMessage);
      const currentChat2 = chats.find((chat) => chat.id === currentChatId);
      if (currentChat2) {
        const updatedChat = {
          ...currentChat2,
          updatedAt: /* @__PURE__ */ new Date()
        };
        syncChat(updatedChat);
      }
      const allMessages = [createSystemPrompt(), ...messages, tempUserMessage].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));
      setIsStreaming(true);
      setStreamingMessage("");
      bufferRef.current = "";
      await createStreamingChatCompletion(
        allMessages,
        selectedModelId,
        (chunk) => {
          if (chunk.type === "chunk" && chunk.content) {
            bufferRef.current += chunk.content;
            flushBuffer();
          }
        },
        async (fullMessage) => {
          const assistantMessage = {
            id: v4(),
            role: "assistant",
            content: fullMessage,
            isError: false,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId: currentChatId,
            modelId: selectedModelId
          };
          addMessage(currentChatId, assistantMessage);
          syncMessage(assistantMessage);
          const currentChat3 = chats.find((chat) => chat.id === currentChatId);
          if (currentChat3) {
            const updatedChat = {
              ...currentChat3,
              updatedAt: /* @__PURE__ */ new Date()
            };
            syncChat(updatedChat);
          }
          setMessages(getMessages(currentChatId));
          flushBuffer.cancel();
          bufferRef.current = "";
          setStreamingMessage("");
          setIsStreaming(false);
        },
        async (error) => {
          console.error("❌ Streaming error: ", error);
          const errorMessage = {
            id: v4(),
            role: "assistant",
            content: error,
            isError: true,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId: currentChatId,
            modelId: selectedModelId
          };
          addMessage(currentChatId, errorMessage);
          syncMessage(errorMessage);
          setMessages(getMessages(currentChatId));
          flushBuffer.cancel();
          bufferRef.current = "";
          setStreamingMessage("");
          setIsStreaming(false);
        }
      );
    } catch (err) {
      console.error("❌ Error sending message: ", err);
      if (chatId) {
        const errorMessage = {
          id: v4(),
          role: "assistant",
          content: err instanceof Error ? err.message : "An unexpected error occurred while sending your message.",
          isError: true,
          createdAt: /* @__PURE__ */ new Date(),
          userId: "",
          chatId,
          modelId: selectedModelId
        };
        addMessage(chatId, errorMessage);
        syncMessage(errorMessage);
        setMessages(getMessages(chatId));
      }
      flushBuffer.cancel();
      bufferRef.current = "";
      setStreamingMessage("");
      setIsStreaming(false);
    }
  };
  const handleEdit = async (messageIndex, newContent) => {
    if (isStreaming || !chatId) return;
    const targetMessage = messages[messageIndex];
    if (!targetMessage || targetMessage.role !== "user") return;
    if (isSharedChat && !isOwner) {
      console.warn("Cannot edit messages in shared chats that you do not own");
      return;
    }
    const updatedMessage = {
      ...targetMessage,
      content: newContent
    };
    replaceMessage(chatId, messageIndex, updatedMessage);
    syncMessage(updatedMessage);
    const nextMessageIndex = messageIndex + 1;
    if (nextMessageIndex < messages.length) {
      removeMessagesFromIndex(chatId, nextMessageIndex);
      await deleteMessagesFromIndex(chatId, nextMessageIndex);
    }
    const updatedMessages = messages.slice(0, messageIndex);
    updatedMessages[messageIndex] = updatedMessage;
    setMessages(updatedMessages);
    const currentChat2 = chats.find((chat) => chat.id === chatId);
    if (currentChat2) {
      const updatedChat = {
        ...currentChat2,
        updatedAt: /* @__PURE__ */ new Date()
      };
      syncChat(updatedChat);
    }
    try {
      const allMessages = [createSystemPrompt(), ...updatedMessages].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));
      setIsStreaming(true);
      setStreamingMessage("");
      bufferRef.current = "";
      await createStreamingChatCompletion(
        allMessages,
        selectedModelId,
        (chunk) => {
          if (chunk.type === "chunk" && chunk.content) {
            bufferRef.current += chunk.content;
            flushBuffer();
          }
        },
        async (fullMessage) => {
          const assistantMessage = {
            id: v4(),
            role: "assistant",
            content: fullMessage,
            isError: false,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId,
            modelId: selectedModelId
          };
          addMessage(chatId, assistantMessage);
          syncMessage(assistantMessage);
          setMessages((prev) => [...prev, assistantMessage]);
          setIsStreaming(false);
          flushBuffer.cancel();
          bufferRef.current = "";
          setStreamingMessage("");
        },
        async (error) => {
          console.error("❌ Streaming error after edit: ", error);
          const errorMessage = {
            id: v4(),
            role: "assistant",
            content: error,
            isError: true,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId,
            modelId: selectedModelId
          };
          addMessage(chatId, errorMessage);
          syncMessage(errorMessage);
          setMessages((prev) => [...prev, errorMessage]);
          setIsStreaming(false);
          flushBuffer.cancel();
          bufferRef.current = "";
          setStreamingMessage("");
        }
      );
    } catch (error) {
      console.error("❌ Failed to get AI response after edit: ", error);
      const errorMessage = {
        id: v4(),
        role: "assistant",
        content: error instanceof Error ? error.message : "An unexpected error occurred while getting AI response after edit.",
        isError: true,
        createdAt: /* @__PURE__ */ new Date(),
        userId: "",
        chatId,
        modelId: selectedModelId
      };
      addMessage(chatId, errorMessage);
      syncMessage(errorMessage);
      setMessages((prev) => [...prev, errorMessage]);
      setIsStreaming(false);
      setStreamingMessage("");
    }
  };
  const handleRetry = async (messageIndex, modelId) => {
    if (isStreaming || !chatId) return;
    const targetMessage = messages[messageIndex];
    if (!targetMessage) return;
    if (isSharedChat && !isOwner) {
      console.warn("Cannot retry messages in shared chats that you do not own");
      return;
    }
    const retryModelId = modelId || targetMessage.modelId || selectedModelId;
    const updatedTargetMessage = {
      ...targetMessage,
      createdAt: /* @__PURE__ */ new Date()
    };
    replaceMessage(chatId, messageIndex, updatedTargetMessage);
    syncMessage(updatedTargetMessage);
    setMessages(getMessages(chatId));
    if (targetMessage.role === "user") {
      const nextAssistantIndex = messages.findIndex((msg, idx) => idx > messageIndex && msg.role === "assistant");
      if (nextAssistantIndex !== -1) {
        removeMessagesFromIndex(chatId, nextAssistantIndex);
        await deleteMessagesFromIndex(chatId, nextAssistantIndex);
        setMessages(getMessages(chatId));
      }
      const contextMessages = [createSystemPrompt(), ...messages.slice(0, messageIndex + 1)].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));
      setIsStreaming(true);
      setStreamingMessage("");
      bufferRef.current = "";
      await createStreamingChatCompletion(
        contextMessages,
        retryModelId,
        (chunk) => {
          if (chunk.type === "chunk" && chunk.content) {
            bufferRef.current += chunk.content;
            flushBuffer();
          }
        },
        async (fullMessage) => {
          const assistantMessage = {
            id: v4(),
            role: "assistant",
            content: fullMessage,
            isError: false,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId,
            modelId: retryModelId
          };
          addMessage(chatId, assistantMessage);
          syncMessage(assistantMessage);
          const currentChat2 = chats.find((chat) => chat.id === chatId);
          if (currentChat2) {
            const updatedChat = {
              ...currentChat2,
              updatedAt: /* @__PURE__ */ new Date()
            };
            syncChat(updatedChat);
          }
          setMessages(getMessages(chatId));
          flushBuffer.cancel();
          bufferRef.current = "";
          setStreamingMessage("");
          setIsStreaming(false);
        },
        async (error) => {
          console.error("❌ Retry streaming error: ", error);
          const errorMessage = {
            id: v4(),
            role: "assistant",
            content: error,
            isError: true,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId,
            modelId: retryModelId
          };
          addMessage(chatId, errorMessage);
          syncMessage(errorMessage);
          setMessages(getMessages(chatId));
          setStreamingMessage("");
          setIsStreaming(false);
        }
      );
    } else if (targetMessage.role === "assistant") {
      removeMessagesFromIndex(chatId, messageIndex);
      await deleteMessagesFromIndex(chatId, messageIndex);
      setMessages(getMessages(chatId));
      const contextMessages = [createSystemPrompt(), ...messages.slice(0, messageIndex)].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));
      setIsStreaming(true);
      setStreamingMessage("");
      bufferRef.current = "";
      await createStreamingChatCompletion(
        contextMessages,
        retryModelId,
        (chunk) => {
          if (chunk.type === "chunk" && chunk.content) {
            bufferRef.current += chunk.content;
            flushBuffer();
          }
        },
        async (fullMessage) => {
          const assistantMessage = {
            id: v4(),
            role: "assistant",
            content: fullMessage,
            isError: false,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId,
            modelId: retryModelId
          };
          addMessage(chatId, assistantMessage);
          syncMessage(assistantMessage);
          const currentChat2 = chats.find((chat) => chat.id === chatId);
          if (currentChat2) {
            const updatedChat = {
              ...currentChat2,
              updatedAt: /* @__PURE__ */ new Date()
            };
            syncChat(updatedChat);
          }
          setMessages(getMessages(chatId));
          setStreamingMessage("");
          setIsStreaming(false);
        },
        async (error) => {
          console.error("❌ Retry streaming error: ", error);
          const errorMessage = {
            id: v4(),
            role: "assistant",
            content: error,
            isError: true,
            createdAt: /* @__PURE__ */ new Date(),
            userId: "",
            chatId,
            modelId: retryModelId
          };
          addMessage(chatId, errorMessage);
          syncMessage(errorMessage);
          setMessages(getMessages(chatId));
          setStreamingMessage("");
          setIsStreaming(false);
        }
      );
    }
  };
  const handleBranch = async (messageIndex, modelId) => {
    if (!chatId) return;
    try {
      const { id: newChatId, chat: newChat } = branchChat(chatId, messageIndex);
      await syncChat(newChat);
      for (const message2 of newChat.messages) {
        await syncMessage(message2);
      }
      navigate({ to: "/$chatId", params: { chatId: newChatId } });
      if (modelId) {
        setSelectedModelId(modelId);
      }
    } catch (error) {
      console.error("❌ Failed to branch chat: ", error);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative flex w-full flex-col items-center bg-accent", children: [
    isSharedChat && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-medium text-primary text-xs backdrop-blur-sm", children: [
      /* @__PURE__ */ jsx(Share2, { className: "size-3" }),
      /* @__PURE__ */ jsx("span", { children: "Shared" }),
      (sharedChatData == null ? void 0 : sharedChatData.ownerName) && /* @__PURE__ */ jsxs("span", { className: "text-primary/70", children: [
        "by ",
        isOwner ? "you" : sharedChatData.ownerName
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: chatContainerRef,
        className: "scrollbar-hide w-full max-w-[768px] flex-1 space-y-10 overflow-y-auto overscroll-contain px-6 lg:px-4 [&:not(*:is(@supports(-moz-appearance:none)))]:py-36 sm:[&:not(*:is(@supports(-moz-appearance:none)))]:py-38 [@supports(-moz-appearance:none)]:py-42 sm:[@supports(-moz-appearance:none)]:py-44",
        children: [
          messages.length === 0 && !isStreaming ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center pb-4 sm:h-full sm:pb-0", children: isInitialLoading ? /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.3 },
              className: "flex flex-col items-center justify-center",
              children: /* @__PURE__ */ jsx(Loader2, { className: "size-8 animate-spin text-muted-foreground" })
            }
          ) : /* @__PURE__ */ jsx(EmptyState, { onSuggestionClickAction: handleSuggestionClick }) }) : /* @__PURE__ */ jsxs(AnimatePresence, { initial: false, children: [
            messages.map((msg, index) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 5 },
                transition: { duration: 0.2 },
                layout: "position",
                className: "flex flex-col",
                children: [
                  " ",
                  /* @__PURE__ */ jsx(
                    Message,
                    {
                      message: msg,
                      messageIndex: index,
                      isStreaming,
                      onRetry: handleRetry,
                      onEdit: handleEdit,
                      onBranch: handleBranch
                    }
                  )
                ]
              },
              `${msg.role}-${msg.content}-${new Date(msg.createdAt).getTime()}-${index}`
            )),
            isStreaming && streamingMessage && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.2 },
                layout: "position",
                className: "flex flex-col",
                children: /* @__PURE__ */ jsx(
                  Message,
                  {
                    message: {
                      role: "assistant",
                      content: streamingMessage,
                      isError: false,
                      createdAt: /* @__PURE__ */ new Date(),
                      modelId: selectedModelId
                    },
                    messageIndex: messages.length,
                    isStreaming: true,
                    onRetry: handleRetry,
                    onEdit: handleEdit,
                    onBranch: handleBranch
                  }
                )
              }
            ),
            isStreaming && !streamingMessage && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 5 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.2 },
                layout: "position",
                className: "flex flex-col",
                children: /* @__PURE__ */ jsx("div", { className: "animate-pulse p-4 text-muted-foreground text-sm", children: "Assistant is thinking..." })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { ref: messagesEndRef, className: "h-1" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showScrollToBottom && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
        transition: { duration: 0.2 },
        className: "absolute right-1/2 not-[@supports(-moz-appearance:none)]:bottom-32.5 z-10 translate-x-1/2 sm:not-[@supports(-moz-appearance:none)]:bottom-30 [@supports(-moz-appearance:none)]:bottom-36",
        children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "secondary",
            title: "Scroll to bottom",
            className: "rounded-full border-2 border-zinc-600/5 bg-border/80 text-xs shadow-2xl backdrop-blur-sm dark:border-background/10",
            onClick: scrollToBottom,
            children: [
              /* @__PURE__ */ jsx(ArrowDown, { className: "size-3.5" }),
              " Scroll to bottom"
            ]
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-1/2 flex w-full max-w-[calc(100%-1rem)] -translate-x-1/2 flex-col gap-2 rounded-t-xl border-6 border-zinc-600/5 border-b-0 bg-border/80 pt-2 pr-2 pb-4 pl-1 shadow-2xl backdrop-blur-sm lg:max-w-[768px] dark:border-background/10 dark:bg-zinc-700/80", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex w-full items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "chat-message-input",
            placeholder: isSharedChat && !isOwner ? "Only the chat owner can send messages" : "Type your message here...",
            title: isSharedChat && !isOwner ? "Only the chat owner can send messages" : "Type your message here...",
            disabled: isStreaming || isSharedChat && !isOwner,
            value: message,
            className: "scrollbar-hide min-h-9 resize-none whitespace-nowrap rounded-t-xl border-none bg-transparent text-sm shadow-none placeholder:select-none placeholder:text-sm focus-visible:ring-0 sm:text-base sm:placeholder:text-base dark:bg-transparent",
            onChange: (e) => setMessage(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) {
                  return;
                }
                e.preventDefault();
                handleSendMessage();
              }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            title: "Send",
            variant: "default",
            size: "icon",
            disabled: isStreaming || !message.trim() || isSharedChat && !isOwner,
            isLoading: isStreaming,
            onClick: handleSendMessage,
            children: /* @__PURE__ */ jsx(ArrowUp, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ModelSelector, {})
    ] })
  ] });
};
export {
  ChatArea as C
};
