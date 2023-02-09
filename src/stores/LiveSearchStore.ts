import { action, makeObservable, observable, toJS } from 'mobx';
import { blogPostStore } from './BlogPostStore';

export class LiveSearchStore {
  @observable searchString = '';
  @observable matches: SearchContent[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  clearSearch() {
    this.searchString = '';
  }

  @action
  updateSearchString(currentSearchString: string) {
    this.searchString = currentSearchString;
    this.updateMatches(this.searchString);
  }

  @action
  private updateMatches(currentSearchString: string) {
    if (!currentSearchString) {
      this.matches = [];
      return;
    }

    this.matches = toJS(blogPostStore.blogPosts)
      .filter((x) => x.matches(currentSearchString))
      .map((x) => {
        return {
          title: x.attributes.title,
          description: x.attributes.description,
          reference: x.attributes.id,
        };
      });
  }
}

export type SearchContent = {
  title: string;
  description: string;
  reference: string;
};

const liveSearchStore = new LiveSearchStore();
export { liveSearchStore };
