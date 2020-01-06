import { Client, query } from 'faunadb';

/**
 * FaunaDBService CRUD Service
 *
 * @class FaunaDBService
 */
class FaunaDBService {
  constructor() {
    this.client = new Client({ secret: '' });
  }

  /**
   * Get all documents from DB
   *
   * @async
   * @return {Promise<Object>}
   * @memberof FaunaDBService
   */
  async getAll() {
    return await 
      this.client.paginate(
        query.Match(
          query.Index('all_stuff')
        ),
      )
      .map(ref => query.Get(ref))
      .nextPage()
  }

  /**
   *
   *
   * @async
   * @param {String} id
   * @return {Promise<Object>}
   * @memberof FaunaDBService
   */
  async getOne(id) {
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
   * @async
   * @param {Object} stuffPayload
   * @return {Promise<Object>}
   * @memberof FaunaDBService
   */
  async create(stuffPayload) {
    return await Promise(async (res, rej) => {
      try {
        await this.client.query(
          query.Create(
            query.Collection('stuff'),
            { data: stuffPayload }
          )
        );

        res({ message: 'Stuff created successfully!' });
      } catch (error) {
        // TODO - Error handling
        rej({ error });
      }
    });
  }

  /**
   *
   *
   * @async
   * @param {String} id
   * @param {Object} stuffPayload
   * @return {Promise<Object>}
   * @memberof FaunaDBService
   */
  async update(id, stuffPayload) {
    return await Promise(async (res, rej) => {
      try {
        await this.client.query(
          query.Update(
            query.Ref(
              query.Collection('stuff'), id
            ), 
            { data: stuffPayload }
          )
        );

        res({ message: 'Stuff updated succesfully!' });
      } catch (error) {
        // TODO - Error handling
        rej({ error });
      }
    });
  }

  /**
   * Delete a specific document by ID from the DB
   *
   * @async
   * @param {String} id
   * @return {Promise<Object>}
   * @memberof FaunaDBService
   */
  async delete(id) {
    return await Promise(async (res, rej) => {
      try {
        await this.client.query(
          query.Delete(
            query.Ref(
              query.Collection('stuff'), id
            )
          )
        );

        res({ message: 'Stuff deleted successfully!' });
      } catch (error) {
        // TODO - Error handling
        rej({ error });
      } 
    });
  }

}

const DB = new FaunaDBService();

export default DB;