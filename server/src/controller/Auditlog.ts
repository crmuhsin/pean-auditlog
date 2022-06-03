import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const Auditlog = {
    /**
     * Save Auditlog
     * @param {object} req 
     * @param {object} res
     * @returns {object} responses object 
     */
    async saveAuditLog(req, res) {
        let update_count = await this.getOneBySiteId(req.body.site_id)
        const saveQuery = `INSERT INTO
      auditlog(log_id, site_id, update_count, created_at, created_by)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
        const values = [
            "log-" + Helper.generateId(),
            req.body.site_id,
            update_count + 1,
            moment(new Date()),
            req.user.username
        ];

        try {
            const { rows } = await db.query(saveQuery, values);
            return rows[0];
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * Get All Log by site_id
     * @param {object} req 
     * @param {object} res 
     * @returns {object} responses array
     */
    async getAll(req, res) {
        const findAllQuery = 'SELECT * FROM auditlog where site_id =$1 order by update_count';
        try {
            const { rows, rowCount } = await db.query(findAllQuery, [req.body.site_id]);
            return res.status(200).send({ rows, rowCount });
        } catch (error) {
            return res.status(400).send(error);
        }
    },
    /**
     * Get A Log by site_id
     * @param {object} req 
     * @param {object} res
     * @returns {object} responses object
     */
     async getOneBySiteId(site_id) {
        const text = 'SELECT * FROM auditlog where site_id =$1 order by update_count desc limit 1';
        try {
            const { rows } = await db.query(text, [site_id]);
            if (!rows[0]) {
                return 0
            }
            return rows[0].update_count
        } catch (error) {
            console.log(error);
        }
    },
}

export default Auditlog;