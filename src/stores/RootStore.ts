import { themeStore } from './ThemeStore';
import { liveSearchStore } from './LiveSearchStore';
import { blogPostStore } from './BlogPostStore';
import { navUiStore } from './UiStore';

export const rootStore = {
  uiStore: navUiStore,
  themeStore: themeStore,
  blogPostStore: blogPostStore,
  liveSearchStore: liveSearchStore,
};
