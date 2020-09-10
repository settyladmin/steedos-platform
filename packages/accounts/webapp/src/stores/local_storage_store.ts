import store from './redux_store';

const getBasePath = () => {return 'steedos'}
const getPreviousSpaceIdKey = (userId) => ['user_prev_space', userId].join(':');
const getWasLoggedInKey = () => 'was_logged_in';


const getPathScopedKey = (path, key) => {
  if (path === '' || path === '/') {
      return key;
  }

  return [path, key].join(':');
};


class LocalStorageStoreClass {
  
  getItem(key, state = store.getState()) {
    const basePath = getBasePath();

    return localStorage.getItem(getPathScopedKey(basePath, key));
  }

  setItem(key, value) {
      const state = store.getState();
      const basePath = getBasePath();

      localStorage.setItem(getPathScopedKey(basePath, key), value);
  }

  removeItem(key) {
    const state = store.getState();
    const basePath = getBasePath();

    localStorage.removeItem(getPathScopedKey(basePath, key));
  }

  getPreviousSpaceId(userId) {
    return this.getItem(getPreviousSpaceIdKey(userId));
  }

  setPreviousSpaceId(userId, spaceId) {
    this.setItem(getPreviousSpaceIdKey(userId), spaceId);
    this.setItem('spaceId', spaceId);
  }

  setUserId(userId, token?:string) {
    if (userId) {
      this.setItem('userId', userId)
      this.setItem('token', token)
      this.setItem(getWasLoggedInKey(), 'true');
    } else {
      this.removeItem('userId')
      this.removeItem('token')
      this.removeItem('spaceId')
      this.setItem(getWasLoggedInKey(), 'false');
    }
  }

  setWasLoggedIn(wasLoggedIn) {
    if (wasLoggedIn) {
        this.setItem(getWasLoggedInKey(), 'true');
    } else {
        this.setItem(getWasLoggedInKey(), 'false');
    }
  }

  getWasLoggedIn() {
      return this.getItem(getWasLoggedInKey()) === 'true';
  }
}

const LocalStorageStore = new LocalStorageStoreClass();

export default LocalStorageStore;
