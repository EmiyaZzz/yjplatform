import Vue from 'vue'
import { localStorage, sessionStorage } from 'mp-storage'

class Storage {
  constructor (storage) {
    this.storage = storage
    this.options = {
      namespace: ''
    }
    Object.defineProperty(this, 'length', {
      /**
       * Define length property
       *
       * @return {number}
       */
      get () {
        return this.storage.length
      }
    })
  }

  setOptions (options = {}) {
    this.options = Object.assign(this.options, options)
  }

  /**
   * Set item
   *
   * @param {string} name
   * @param {*} value
   * @param {number} expire - seconds
   */
  set (name, value, expire = null) {
    const stringifyValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire : null
    })

    this.storage.setItem(this.options.namespace + name, stringifyValue)
  }

  /**
    * Get item
    *
    * @param {string} name
    * @param {*} def - default value
    * @returns {*}
    */
  get (name, def = null) {
    const item = this.storage.getItem(this.options.namespace + name)

    if (item !== null) {
      try {
        const data = JSON.parse(item)

        if (data.expire === null) {
          return data.value
        }

        if (data.expire >= new Date().getTime()) {
          return data.value
        }

        this.remove(name)
      } catch (err) {
        return def
      }
    }

    return def
  }

  /**
   * Remove item
   *
   * @param {string} name
   * @return {boolean}
   */
  remove (name) {
    return this.storage.removeItem(this.options.namespace + name)
  }

  /**
  * Get item by key
  *
  * @param {number} index
  * @return {*}
  */
  key (index) {
    return this.storage.key(index)
  }

  /**
   * Clear storage
   */
  clear () {
    if (this.length === 0) {
      return
    }

    const removedKeys = []

    for (let i = 0; i < this.length; i++) {
      const key = this.storage.key(i)
      const regexp = new RegExp(`^${this.options.namespace}.+`, 'i')

      if (regexp.test(key) === false) {
        continue
      }

      removedKeys.push(key)
    }

    for (const key in removedKeys) {
      this.storage.removeItem(removedKeys[key])
    }
  }
}

const Plugin = {
  install (Vue, options) {
    const ls = new Storage(localStorage)
    Vue.ls = ls

    ls.setOptions(Object.assign(ls.options, options))

    Object.defineProperty(Vue.prototype, '$ls', {
      get () {
        return ls
      }
    })

    const ss = new Storage(sessionStorage)

    Vue.ss = ss

    ss.setOptions(Object.assign(ss.options, options))

    Object.defineProperty(Vue.prototype, '$ss', {
      get () {
        return ss
      }
    })
  }
}

Vue.use(Plugin, {
  namespace: 'RCYJ-SCORE-MOBILE__'
})
