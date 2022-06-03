CREATE TABLE public.sites (
	site_id varchar(50) NOT NULL,
	name varchar(256) NOT NULL,
	jurisdiction varchar(256) NOT NULL,
	description text NULL,
	latitude varchar(50) NOT NULL,
	longitude varchar(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	last_updated_at timestamp NULL,
	last_updated_by varchar(50) null,
	CONSTRAINT pk_sites PRIMARY KEY (site_id)
);

CREATE TABLE public.auditlog (
	log_id varchar(50) NOT NULL,
	site_id varchar(50) NOT NULL,
	update_count int NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	CONSTRAINT pk_auditlog PRIMARY KEY (log_id),
	CONSTRAINT fk_sites FOREIGN KEY(site_id) REFERENCES sites(site_id)
);

CREATE TABLE public.users (
	user_id varchar(50) NOT NULL,
	username varchar(50) NOT NULL,
	"password" varchar(70) NOT NULL,
	email varchar(50) NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by varchar(50) NOT NULL DEFAULT 'System'::character varying,
	CONSTRAINT pk_users PRIMARY KEY (user_id),
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_username_key UNIQUE (username)
);