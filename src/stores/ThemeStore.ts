import { action, computed, makeObservable, observable } from 'mobx';

type Theme = 'light' | 'dark';

export class ThemeStore {
  @observable theme: Theme = 'dark';

  constructor() {
    makeObservable(this);

    const theme = localStorage.getItem('theme');
    if (['light', 'dark'].includes(theme)) {
      this.theme = theme as Theme;
      this.setTheme(theme as Theme);
    } else {
      this.setTheme(this.theme);
    }
  }

  @computed
  get isLight() {
    return this.theme == 'light';
  }

  @action
  toggleTheme() {
    this.theme = this.theme == 'light' ? 'dark' : 'light';
    this.setTheme(this.theme);
  }

  private setTheme(theme: Theme) {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }
}

const themeStore = new ThemeStore();
export { themeStore };
