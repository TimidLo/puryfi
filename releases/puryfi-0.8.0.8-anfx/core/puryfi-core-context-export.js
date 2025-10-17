// Re-export the core context directly to the window object as that's how the options and popup page still expects it
for (let key in window.puryfiCoreContext) {
   window[key] = window.puryfiCoreContext[key];
}
