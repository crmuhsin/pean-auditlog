import moment from 'moment';
import db from '../db';
import Helper from './Helper';

const User = {
    /**
     * Create A User
     * @param {object} req 
     * @param {object} res
     * @returns {object} response object
     */
    async register(req, res) {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const hashPassword = Helper.hashPassword(req.body.password);

        const createQuery = `INSERT INTO
        users(user_id, email, username, password, created_at)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
        const values = [
            "user-" + Helper.generateId(),
            req.body.email,
            req.body.username,
            hashPassword,
            moment(new Date())
        ];

        try {
            const { rows } = await db.query(createQuery, values);
            const token = Helper.generateToken(rows[0].username);
            return res.status(200).send({ token });
        } catch (error) {
            if (error.routine === '_bt_check_unique') {
                return res.status(400).send({ 'message': 'Email or username already exist' })
            }
            return res.status(400).send(error);
        }
    },
    /**
     * Login
     * @param {object} req 
     * @param {object} res
     * @returns {object} response object
     */
    async login(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ 'message': 'Some values are missing' });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);
            if (!rows[0]) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            if (!Helper.comparePassword(rows[0].password, req.body.password)) {
                return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
            }
            const token = Helper.generateToken(rows[0].username);
            return res.status(200).send({ token });
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

export default User;