export const baseUrl = "http://localhost:3000/api/v1"

export const urls = {
    user_registration: `${baseUrl}/users/register`,
    user_login: `${baseUrl}/users/login`,

    site_save: `${baseUrl}/sites/save`,
    site_update: `${baseUrl}/sites/update`,
    site_get_one: `${baseUrl}/sites/get-by-id`,
    site_get_all: `${baseUrl}/sites/get-list`,
    site_get_total_count: `${baseUrl}/sites/get-total-count`,

    logs_get_all: `${baseUrl}/logs/get-list`,
}