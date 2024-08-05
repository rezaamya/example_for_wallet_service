CREATE TABLE IF NOT EXISTS migration
(
    meta_key   VARCHAR(100) PRIMARY KEY,
    meta_value VARCHAR(255) DEFAULT NULL
);

INSERT INTO migration (meta_key, meta_value)
VALUES ('version', '000.000.000')
ON CONFLICT
    (meta_key)
    DO NOTHING;

-----------------------------------------------------------------------------------------------------------------------

DO
$$
    DECLARE
        version        VARCHAR(20) := (SELECT meta_value
                                       FROM migration
                                       WHERE meta_key = 'version');
        DECLARE v1_0_0 VARCHAR(20) := '001.000.000';
    BEGIN

        -- v1.0.0
        IF version < v1_0_0 THEN
            create table if not exists transactions
            (
                reference_id serial
                    constraint transactions_pk
                        primary key,
                user_id         numeric                       not null,
                amount          numeric                       not null,
                created_at      timestamp default now(),
                balance         numeric                       not null
            );

            create unique index if not exists transactions_reference_id_uindex
                on transactions (reference_id);

            create index if not exists transactions_user_id_created_at_index
                on transactions (user_id asc, created_at desc);

            UPDATE migration
            SET meta_value = v1_0_0
            WHERE meta_key = 'version';
        END IF;

    END
$$;

