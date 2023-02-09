declare module '*.md' {
  const body: string;
  export { body };
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}
