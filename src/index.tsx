/**
 * @author Gabe Ragland
 * @description Fork of https://usehooks.com/useScript/. Tailored it for globally namespaced
 * components.
 */

import { useState, useEffect } from "react";

let cachedScripts: string[] = [];

export function useScript(src: string, namespace: string) {
  let script: any
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
    component: null
  });

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          component: window[namespace].default,
          loaded: true,
          error: false
        });
      } else {
        cachedScripts.push(src);

        // Create script
        script = document.createElement("script");
        script.src = src;
        script.async = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          // @ts-ignore
          if(window[namespace] && window[namespace].default) {
            setState({
              // @ts-ignore
              component: window[namespace].default,
              loaded: true,
              error: false
            });
          }
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) cachedScripts.splice(index, 1);
          script.remove();

          setState({
            component: null,
            loaded: true,
            error: true
          });
        };

        script.addEventListener("load", onScriptLoad);
        script.addEventListener("error", onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener("load", onScriptLoad);
          script.removeEventListener("error", onScriptError);
        };
      }
    },
    [src] // Only re-run effect if script src changes
  );

  return { component: state.component, error: state.error };
}
