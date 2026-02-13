import { create } from "zustand";
import { persist } from "zustand/middleware";
const STORAGE_EXPIRY_HOURS = 1;
const getTodayString = () => {
  return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
};
const useApiKeyStore = create()(
  persist(
    (set, get) => ({
      currentKeyIndex: 0,
      lastUpdated: Date.now(),
      totalKeys: 1,
      rateLimitedKeys: {},
      openaiApiKey: "",
      anthropicApiKey: "",
      geminiApiKey: "",
      grokApiKey: "",
      setCurrentKeyIndex: (index) => {
        set({
          currentKeyIndex: index,
          lastUpdated: Date.now()
        });
      },
      markKeyAsRateLimited: (keyIndex) => {
        const today = getTodayString();
        set((state) => ({
          rateLimitedKeys: {
            ...state.rateLimitedKeys,
            [keyIndex]: today
          }
        }));
        console.log(`🚫 API key #${keyIndex + 1} marked as rate limited until tomorrow`);
      },
      isKeyRateLimited: (keyIndex) => {
        const { rateLimitedKeys } = get();
        const rateLimitDate = rateLimitedKeys[keyIndex];
        if (!rateLimitDate) return false;
        const today = getTodayString();
        return rateLimitDate === today;
      },
      clearExpiredRateLimits: () => {
        const { rateLimitedKeys } = get();
        const today = getTodayString();
        const updatedRateLimitedKeys = {};
        for (const [keyIndex, date] of Object.entries(rateLimitedKeys)) {
          if (date === today) {
            updatedRateLimitedKeys[Number.parseInt(keyIndex, 10)] = date;
          }
        }
        set({ rateLimitedKeys: updatedRateLimitedKeys });
      },
      getNextAvailableKeyIndex: () => {
        const { totalKeys, isKeyRateLimited } = get();
        get().clearExpiredRateLimits();
        for (let i = 0; i < totalKeys; i++) {
          if (!isKeyRateLimited(i)) {
            return i;
          }
        }
        return null;
      },
      cycleToNext: () => {
        const { currentKeyIndex, totalKeys, getNextAvailableKeyIndex } = get();
        if (totalKeys <= 1) return currentKeyIndex;
        get().clearExpiredRateLimits();
        let nextIndex = (currentKeyIndex + 1) % totalKeys;
        let attempts = 0;
        while (attempts < totalKeys) {
          if (!get().isKeyRateLimited(nextIndex)) {
            set({
              currentKeyIndex: nextIndex,
              lastUpdated: Date.now()
            });
            console.log(`🔄 Cycling to API key #${nextIndex + 1}`);
            return nextIndex;
          }
          nextIndex = (nextIndex + 1) % totalKeys;
          attempts++;
        }
        const availableIndex = getNextAvailableKeyIndex();
        if (availableIndex !== null) {
          set({
            currentKeyIndex: availableIndex,
            lastUpdated: Date.now()
          });
          console.log(`🔄 Cycling to API key #${availableIndex + 1}`);
          return availableIndex;
        }
        console.error("🚫 All API keys are rate limited!");
        return null;
      },
      resetToFirst: () => {
        get().clearExpiredRateLimits();
        const firstAvailable = get().getNextAvailableKeyIndex();
        const keyToUse = firstAvailable !== null ? firstAvailable : 0;
        set({
          currentKeyIndex: keyToUse,
          lastUpdated: Date.now()
        });
        console.log(`🔄 Reset to ${firstAvailable !== null ? "first available" : "first"} API key #${keyToUse + 1}`);
      },
      updateLastUpdated: () => {
        set({ lastUpdated: Date.now() });
      },
      setTotalKeys: (total) => {
        set({ totalKeys: total });
      },
      setOpenaiApiKey: (key) => set({ openaiApiKey: key }),
      setAnthropicApiKey: (key) => set({ anthropicApiKey: key }),
      setGeminiApiKey: (key) => set({ geminiApiKey: key }),
      setGrokApiKey: (key) => set({ grokApiKey: key })
    }),
    {
      name: "openrouter-api-key-store",
      // Check for expiry on hydration and clear expired rate limits
      onRehydrateStorage: () => (state) => {
        if (state) {
          const hoursSinceUpdate = (Date.now() - state.lastUpdated) / (1e3 * 60 * 60);
          if (hoursSinceUpdate >= STORAGE_EXPIRY_HOURS) {
            state.currentKeyIndex = 0;
            state.lastUpdated = Date.now();
          }
          const today = getTodayString();
          const updatedRateLimitedKeys = {};
          if (state.rateLimitedKeys) {
            for (const [keyIndex, date] of Object.entries(state.rateLimitedKeys)) {
              if (date === today) {
                updatedRateLimitedKeys[Number.parseInt(keyIndex, 10)] = date;
              }
            }
          }
          state.rateLimitedKeys = updatedRateLimitedKeys;
        }
      }
    }
  )
);
export {
  useApiKeyStore as u
};
