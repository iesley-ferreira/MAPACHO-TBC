declare module 'load-script' {
  interface LoadScriptOptions {
    charset?: string;
    attrs?: { [key: string]: string };
  }

  function loadScript(
    url: string,
    options?: LoadScriptOptions | ((err: any, script: HTMLScriptElement) => void),
    callback?: (err: any, script: HTMLScriptElement) => void,
  ): HTMLScriptElement;

  export = loadScript;
}
