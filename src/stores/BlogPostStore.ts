import { observable, makeObservable, toJS, computed, action } from 'mobx';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { manifests } from '../content/manifests';
dayjs.extend(customParseFormat);

export class BlogPostStore {
  itemsPerPage = 2;
  @observable currentPage = 0;
  @observable isLoading = true;
  @observable selectedPageKey: string;
  @observable blogPosts: BlogPostModel[] = [];

  constructor() {
    makeObservable(this);
    this.loadPosts();
  }

  @action
  onNavigate(key: string) {
    if (this.selectedPageKey != key) {
      this.isLoading = true;
    }
    this.selectedPageKey = key;
  }

  @action
  onLoadFinish() {
    this.isLoading = false;
  }

  private loadPosts() {
    const content = manifests;
    this.blogPosts = content
      .map(
        (x) =>
          new BlogPostModel(
            {
              id: x.id,
              title: x.title,
              description: x.description,
              date: x.date,
              author: x.author,
              readTime: x.readTime,
              tags: x.tags,
              meta: x.meta,
            },
            x.content,
          ),
      )
      .sort(
        (a, b) =>
          dayjs(a.attributes.date, 'DD-MM-YYYY').valueOf() -
          dayjs(b.attributes.date, 'DD-MM-YYYY').valueOf(),
      );
  }

  @action
  selectPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getByDate(month: number, year: number) {
    return this.blogPosts.filter((x) => {
      const date = dayjs(x.attributes.date, 'DD-MM-YYYY');
      return date.month() + 1 == month && date.year() == year;
    });
  }

  getByTag(tag: string) {
    return this.blogPosts.filter((x) => x.attributes.tags.includes(tag));
  }

  @computed
  get allTags() {
    const allTags = this.blogPosts
      .map((x) => x.attributes.tags)
      .reduce((acc, value) => acc.concat(value), [])
      .sort();

    return [...new Set(allTags)];
  }

  @computed
  get allTitles(): ArticleTitleModel[] {
    return this.blogPosts
      .map((x) => {
        return {
          title: x.attributes.title,
          id: x.attributes.id,
        };
      })
      .reverse();
  }

  @computed
  get allMonths(): ArticleDateModel[] {
    const allDates = this.blogPosts
      .map((x) => dayjs(x.attributes.date, 'DD-MM-YYYY'))
      .reduce((acc, value) => acc.concat(value), [])
      .reverse()
      .map((x) => {
        return {
          displayDate: x.format('MMMM') + ' ' + x.year(),
          queryString: `${x.month() + 1}-${x.year()}`,
        };
      });

    const uniques = Object.fromEntries(allDates.map((x) => [x.displayDate, x.queryString]));
    const allUniqueDates: ArticleDateModel[] = [];
    for (const key in uniques) {
      const val = uniques[key];
      allUniqueDates.push({
        displayDate: key,
        queryString: val,
      });
    }
    return allUniqueDates;
  }

  @computed
  get pageCount() {
    if (this.blogPosts.length <= this.itemsPerPage) return 0;

    return Math.ceil(this.blogPosts.length / this.itemsPerPage);
  }

  getItemsAtPage(pageNumber: number) {
    const startingIndex = pageNumber * this.itemsPerPage;
    const endingIndex = startingIndex + this.itemsPerPage;
    return this.blogPosts
      .map((x) => toJS(x))
      .reverse()
      .slice(startingIndex, endingIndex);
  }

  getBlogPostById(id: string): NavigableBlogPostModel {
    const currentPostIndex = this.blogPosts.findIndex((x) => x.attributes.id == id);
    if (currentPostIndex == -1) {
      return undefined;
    }

    const x = {
      currentPost: toJS(this.blogPosts[currentPostIndex]),
      olderPostId:
        currentPostIndex == 0
          ? undefined
          : toJS(this.blogPosts[currentPostIndex - 1]).attributes.id,
      newerPostId:
        currentPostIndex == this.blogPosts.length - 1
          ? undefined
          : toJS(this.blogPosts[currentPostIndex + 1]).attributes.id,
    };

    return x;
  }
}

export type ArticleTitleModel = {
  title: string;
  id: string;
};

export type ArticleDateModel = {
  displayDate: string;
  queryString: string;
};

export type NavigableBlogPostModel = {
  currentPost: BlogPostModel;
  newerPostId?: string;
  olderPostId?: string;
};

export class BlogPostModel {
  readonly attributes: FrontMatterSchema;
  readonly lazyLoadBody: () => Promise<{ body: string }>;

  constructor(attributes: FrontMatterSchema, lazyLoadBody: () => Promise<{ body: string }>) {
    this.attributes = attributes;
    this.lazyLoadBody = lazyLoadBody;
    this.matches.bind(this.matches);
  }

  matches(searchString: string): boolean {
    return (
      this.attributes.title.toLowerCase().includes(searchString.toLowerCase()) ||
      this.attributes.description.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}

export type FrontMatterSchema = {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  date: string | undefined;
  author: string | undefined;
  readTime: string | undefined;
  meta: string | undefined;
  tags: string[] | undefined;
};

const blogPostStore = new BlogPostStore();
export { blogPostStore };
