import axios from 'axios';
const key = '29177919-9234bb4fcf0eb813bd521d382';

export default class SerchImage {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
  }
  async fetchImage() {
    return await axios
      .get(
        `https://pixabay.com/api/?key=${key}&q=${this.serchQuery}&image_type=photo&orientation=horizontal$safesearch=true&page=${this.page}&per_page=40`
      )
      .then(({ data }) => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.serchQuery;
  }
  set query(newQuery) {
    this.serchQuery = newQuery;
  }
}
