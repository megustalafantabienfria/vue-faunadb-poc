import { Client, query } from 'faunadb';

/**
 * FaunaDB CRUD Service
 *
 * @class FaunaDB
 */
class FaunaDB {
  constructor() {
    this.client = Client({ secret: '' });
  }

  /**
   * Get all documents from DB
   *
   * @static
   * @return {Promise<T>}
   * @memberof FaunaDB
   */
  static async getAll() {
    return await this.client.query(
      query.Get(
        query.Ref(
          query.Collection('stuff')
        )
      )
    );
  }

  /**
   *
   *
   * @static
   * @param {String} id
   * @return {Promise<T>}
   * @memberof FaunaDB
   */
  static async getOne(id) {
    return await this.client.query(
      query.Get(
        query.Ref(
          query.Collection('stuff'), id
        )
      )
    );
  }

  /**
   *
   *
   * @static
   * @param {Object} stuffPayload
   * @return {Promise<T>}
   * @memberof FaunaDB
   */
  static async create(stuffPayload) {
    return await this.client.query(
      query.Create(
        query.Collection('stuff'),
        { data: stuffPayload }
      )
    );
  }

  /**
   *
   *
   * @static
   * @param {String} id
   * @param {Object} stuffPayload
   * @return {Promise<T>}
   * @memberof FaunaDB
   */
  static async update(id, stuffPayload) {
    return await this.client.query(
      query.Update(
        query.Ref(
          query.Collection('stuff', id)
        ), 
        { data: stuffPayload }
      )
    );
  }

  /**
   * Delete a specific document by ID from the DB
   *
   * @static
   * @param {String} id
   * @return {Promise<T>}
   * @memberof FaunaDB
   */
  static async delete(id) {
    return await this.client.query(
      query.Delete(
        query.Ref(
          query.Collection('stuff', id)
        )
      )
    );
  }

}

export default new FaunaDB();
