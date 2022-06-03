import users from './user'
import sites from './sites'
import logs from './logs'
export default app => {
    app.use('/api/v1/users', users)
    app.use('/api/v1/sites', sites)
    app.use('/api/v1/logs', logs)
}