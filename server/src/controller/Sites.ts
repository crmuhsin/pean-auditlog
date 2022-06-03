import moment from 'moment';
import db from '../db';
import Helper from './Helper';
import Auditlog from './Auditlog';

const Sites = {
    /**
     * Create A Site
     * @param {object} req 
     * @param {object} res
     * @returns {object} response object
     */
    async saveSite(req, res) {
        const saveQuery = `INSERT INTO
      sites(site_id, name, jurisdiction, description, latitude, longitude, created_at, created_by, last_updated_at, last_updated_by)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      returning *`;
        const values = [
            "site-" + Helper.generateId(),
            req.body.name,
            req.body.jurisdiction,
            req.body.description,
            req.body.latitude,
            req.body.longitude,
            moment(new Date()),
            req.user.username,
            moment(new Date()),
            req.user.username
        ];

        try {
            const { rows } = await db.query(saveQuery, values);
            req.body.site_id = rows[0].site_id
            await Auditlog.saveAuditLog(req, res)
            return res.status(200).send(rows[0]);
        } catch (error) {
            console.log(error);
            return res.status(400).send(error);
        }
    },
    /**
    * Get Count of all site
    * @param {object} req 
    * @param {object} res 
    * @returns {object} response object
    */
   async getTotalCount(req, res) {
       const findAllQuery = 'SELECT count(*) FROM sites';
       try {
           const { rows } = await db.query(findAllQuery, []);
           return res.status(200).send({ rows });
       } catch (error) {
           return res.status(400).send(error);
       }
   },
    /**
     * Get All sites
     * @param {object} req 
     * @param {object} res 
     * @returns {object} response object
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM sites ORDER BY created_at LIMIT $1 OFFSET $2';
        try {
            let offset_value = req.body.page_number * req.body.page_size
            const { rows, rowCount } = await db.query(findAllQuery, [req.body.page_size, offset_value]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get A site
     * @param {object} req 
     * @param {object} res
     * @returns {object} response object
     */
    async getOne(req, res) {
        const text = 'SELECT * FROM sites WHERE site_id = $1';
        try {
            const { rows } = await db.query(text, [req.body.site_id]);
            if (!rows[0]) {
                return res.status(200).send(rows[0]);
            }
            return res.status(200).send(rows[0]);
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    /**
     * Update A site
     * @param {object} req 
     * @param {object} res 
     * @returns {object} response object
     */
    async update(req, res) {
        const updateOneQuery = `UPDATE sites
      SET name=$1, jurisdiction=$2, description=$3, latitude=$4, longitude=$5, last_updated_at=$6, last_updated_by=$7 WHERE site_id=$8 returning *`;
        try {
            const values = [
                req.body.name,
                req.body.jurisdiction,
                req.body.description,
                req.body.latitude,
                req.body.longitude,
                moment(new Date()),
                req.user.username,
                req.body.site_id
            ];
            const response = await db.query(updateOneQuery, values);
            await Auditlog.saveAuditLog(req, res)
            return res.status(200).send(response.rows[0]);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}

export default Sites;