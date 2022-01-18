CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


CREATE TABLE IF NOT EXISTS application_user
(
    uuid uuid DEFAULT uuid_generate_v4(),
    userName VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY(uuid)
);

INSERT INTO application_user (userName, password) VALUES ('Paulo', crypt('admin', 'my_salt'));
